// Feb 7, 2022
export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = new Date().toDateString().split(' ')[1]
  const day = date.getDate()
  return `${month} ${day}, ${year}`
}

// 2022-2-9 14:14
export const formatDateTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() + 1
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${year}-${month}-${day} ${hour}:${minute}`
}
