// Applies the stored theme before styles load, avoiding a flash of the wrong theme.
// Imported first in the entry (before index.css) so `.dark` is set before paint.
if (typeof localStorage !== 'undefined' && localStorage.getItem('anicca-theme') === 'dark') {
  document.documentElement.classList.add('dark')
}
