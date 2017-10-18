// Utilities shared accross the application

export function capitalize(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1)
}

export function formatDate(ts, fullDate) {
  const date = new Date(ts)
  const baseDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
  const hours = '0' + date.getHours()
  const minutes = '0' + date.getMinutes()
  const hoursDate = hours.substr(-2) + ':' + minutes.substr(-2)
  return  fullDate ? hoursDate + ' ' + baseDate : baseDate
}
