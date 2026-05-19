/**
 * A validation rule consisting of a validate function and error message.
 */
export interface ValidationRule {
  /** Validation function that returns true if valid */
  validate: (value: unknown) => boolean
  /** Error message when validation fails */
  message: string
}

/**
 * Creates a required validation rule.
 * Fails if value is null, undefined, empty string, or empty array.
 *
 * @param message - Custom error message
 * @returns ValidationRule
 */
export function required(message: string = 'This field is required'): ValidationRule {
  return {
    validate: (value: unknown): boolean => {
      if (value === null || value === undefined) return false
      if (typeof value === 'string') return value.trim().length > 0
      if (Array.isArray(value)) return value.length > 0
      return true
    },
    message,
  }
}

/**
 * Creates an email validation rule.
 * Fails if value does not match standard email format.
 *
 * @param message - Custom error message
 * @returns ValidationRule
 */
export function email(message: string = 'Invalid email address'): ValidationRule {
  return {
    validate: (value: unknown): boolean => {
      if (typeof value !== 'string') return false
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    message,
  }
}

/**
 * Creates a minimum length validation rule.
 *
 * @param min - Minimum string length
 * @param message - Custom error message
 * @returns ValidationRule
 */
export function minLength(min: number, message?: string): ValidationRule {
  return {
    validate: (value: unknown): boolean => {
      if (typeof value !== 'string') return false
      return value.length >= min
    },
    message: message || `Must be at least ${min} characters`,
  }
}

/**
 * Creates a maximum length validation rule.
 *
 * @param max - Maximum string length
 * @param message - Custom error message
 * @returns ValidationRule
 */
export function maxLength(max: number, message?: string): ValidationRule {
  return {
    validate: (value: unknown): boolean => {
      if (typeof value !== 'string') return false
      return value.length <= max
    },
    message: message || `Must be at most ${max} characters`,
  }
}

/**
 * Creates a regex pattern validation rule.
 *
 * @param regex - Regular expression to test against
 * @param message - Custom error message
 * @returns ValidationRule
 */
export function pattern(regex: RegExp, message: string = 'Invalid format'): ValidationRule {
  return {
    validate: (value: unknown): boolean => {
      if (typeof value !== 'string') return false
      return regex.test(value)
    },
    message,
  }
}

/**
 * Creates a minimum value validation rule for numbers.
 *
 * @param value - Minimum allowed value
 * @param message - Custom error message
 * @returns ValidationRule
 */
export function min(value: number, message?: string): ValidationRule {
  return {
    validate: (v: unknown): boolean => {
      if (typeof v !== 'number') return false
      return v >= value
    },
    message: message || `Must be at least ${value}`,
  }
}

/**
 * Creates a maximum value validation rule for numbers.
 *
 * @param value - Maximum allowed value
 * @param message - Custom error message
 * @returns ValidationRule
 */
export function max(value: number, message?: string): ValidationRule {
  return {
    validate: (v: unknown): boolean => {
      if (typeof v !== 'number') return false
      return v <= value
    },
    message: message || `Must be at most ${value}`,
  }
}

/**
 * Creates a custom validation rule with a user-provided function.
 *
 * @param fn - Custom validation function
 * @param message - Error message when validation fails
 * @returns ValidationRule
 */
export function custom(fn: (value: unknown) => boolean, message: string): ValidationRule {
  return {
    validate: fn,
    message,
  }
}
