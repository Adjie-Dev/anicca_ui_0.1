import { useState, useCallback } from 'react'
import { ValidationRule } from '../../rules'

/**
 * Configuration for useAniccaForm hook.
 */
export interface UseAniccaFormConfig<T extends Record<string, unknown>> {
  /** Initial form values */
  initialValues: T
  /** Validation schema mapping field names to validation rules */
  validationSchema?: Partial<Record<keyof T, ValidationRule[]>>
  /** Submit handler called with valid form values */
  onSubmit?: (values: T) => void | Promise<void>
}

/**
 * Return type for useAniccaForm hook.
 */
export interface UseAniccaFormReturn<T extends Record<string, unknown>> {
  /** Current form values */
  values: T
  /** Current field errors */
  errors: Partial<Record<keyof T, string>>
  /** Fields that have been touched (blurred) */
  touched: Partial<Record<keyof T, boolean>>
  /** Whether the form is currently valid (no errors) */
  isValid: boolean
  /** Whether the form is currently submitting */
  isSubmitting: boolean
  /** Returns a change handler for a specific field */
  handleChange: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  /** Returns a blur handler for a specific field */
  handleBlur: (field: keyof T) => () => void
  /** Submit handler (validates all fields first) */
  handleSubmit: (e?: React.FormEvent) => Promise<void>
  /** Reset form to initial values */
  reset: () => void
  /** Set a specific field value programmatically */
  setFieldValue: (field: keyof T, value: unknown) => void
  /** Set a specific field error programmatically */
  setFieldError: (field: keyof T, error: string) => void
}

/**
 * useAniccaForm — A comprehensive form state management hook with
 * field-level validation, touch tracking, and async submit support.
 *
 * @param config - Form configuration with initial values, validation schema, and submit handler
 * @returns Form state and handler methods
 *
 * @example
 * ```tsx
 * const form = useAniccaForm({
 *   initialValues: { email: '', password: '' },
 *   validationSchema: {
 *     email: [required(), email()],
 *     password: [required(), minLength(8)],
 *   },
 *   onSubmit: async (values) => { await login(values) },
 * })
 * ```
 */
export function useAniccaForm<T extends Record<string, unknown>>(
  config: UseAniccaFormConfig<T>
): UseAniccaFormReturn<T> {
  const { initialValues, validationSchema, onSubmit } = config

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback(
    (field: keyof T, value: unknown): string | undefined => {
      const rules = validationSchema?.[field]
      if (!rules) return undefined
      for (const rule of rules) {
        if (!rule.validate(value)) {
          return rule.message
        }
      }
      return undefined
    },
    [validationSchema]
  )

  const validateAll = useCallback((): Partial<Record<keyof T, string>> => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    for (const field of Object.keys(initialValues) as (keyof T)[]) {
      const error = validateField(field, values[field])
      if (error) {
        newErrors[field] = error
      }
    }
    return newErrors
  }, [initialValues, validateField, values])

  const isValid = Object.keys(errors).length === 0

  const handleChange = useCallback(
    (field: keyof T) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.value
        setValues((prev) => ({ ...prev, [field]: value }))
        if (touched[field]) {
          const error = validateField(field, value)
          setErrors((prev) => {
            const next = { ...prev }
            if (error) {
              next[field] = error
            } else {
              delete next[field]
            }
            return next
          })
        }
      },
    [touched, validateField]
  )

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      const error = validateField(field, values[field])
      setErrors((prev) => {
        const next = { ...prev }
        if (error) {
          next[field] = error
        } else {
          delete next[field]
        }
        return next
      })
    },
    [validateField, values]
  )

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault()
      const allTouched: Partial<Record<keyof T, boolean>> = {}
      for (const field of Object.keys(initialValues) as (keyof T)[]) {
        allTouched[field] = true
      }
      setTouched(allTouched)

      const newErrors = validateAll()
      setErrors(newErrors)

      if (Object.keys(newErrors).length === 0 && onSubmit) {
        setIsSubmitting(true)
        try {
          await onSubmit(values)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [initialValues, onSubmit, validateAll, values]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const setFieldValue = useCallback(
    (field: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [field]: value }))
      if (touched[field]) {
        const error = validateField(field, value)
        setErrors((prev) => {
          const next = { ...prev }
          if (error) {
            next[field] = error
          } else {
            delete next[field]
          }
          return next
        })
      }
    },
    [touched, validateField]
  )

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }))
  }, [])

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  }
}
