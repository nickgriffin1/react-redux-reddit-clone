// Utilities shared accross the application

export function capitalize(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1)
}

export function formatDate(ts) {
  const date = new Date(ts)
  return  date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
}
