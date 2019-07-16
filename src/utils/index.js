
/**
 * 判断值是否为空
 * @export
 * @param {*} value
 * @return {boolean} 返回 true or false
 */
export function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}
