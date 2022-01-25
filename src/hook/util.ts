export const formatDateTime = (date: Date) => {
  const year = date.getFullYear()
  const month = new Date().toDateString().split(' ')[1]
  const day = date.getDate()
  return `${month} ${day}, ${year}`
}
