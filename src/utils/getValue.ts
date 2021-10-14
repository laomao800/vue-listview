/**
 * Fork from lodash/get
 *
 * path 不支持 symbol 与 -0
 */

function baseGet(object: Record<string, any>, path: string[] | string) {
  path = castPath(path, object)

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[path[index++]]
  }
  return index && index == length ? object : undefined
}

function castPath(value: any, object: Record<string, any>): string[] {
  if (Array.isArray(value)) {
    return value
  }
  return isKey(value, object) ? [value] : stringToPath(String(value))
}

function isKey(value: any, object: Record<string, any>) {
  if (Array.isArray(value)) {
    return false
  }
  const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
  const reIsPlainProp = /^\w*$/
  const type = typeof value
  if (
    type == 'number' ||
    type == 'symbol' ||
    type == 'boolean' ||
    value == null
  ) {
    return true
  }
  return (
    reIsPlainProp.test(value) ||
    !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
  )
}

function stringToPath(string: string) {
  /** Used to match property names within property paths. */
  const rePropName =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g

  /** Used to match backslashes in property paths. */
  const reEscapeChar = /\\(\\)?/g

  const result = []
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('')
  }
  // @ts-ignore
  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match)
  })
  return result
}

export default function get(
  object: Record<string, any>,
  path: string,
  defaultValue?: any
) {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}
