export function toSwString(str = '', howmany = 0) {
  return str.length > howmany ? str.substring(0, howmany) + '...' : str
}

export function toSwTime(str = '', howmany = 10) {
  return str.length > howmany ? str.substring(0, howmany) : str
}
