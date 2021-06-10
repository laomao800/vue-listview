/*!
 * get-value
 * fork from <https://github.com/jonschlinkert/get-value>
 */

interface IOptions {
  default: any
  separator: string
  joinChar: string
  join: (seg: string[]) => string
  split: (path: string) => string[]
  isValid: (key: string, target: any) => boolean
}

type Options = Partial<IOptions>

export function getValue(target: any, path: string, options?: Options) {
  if (!isObject(options)) {
    options = { default: options }
  }

  if (!isValidObject(target)) {
    return typeof options.default !== 'undefined' ? options.default : target
  }

  if (typeof path === 'number') {
    path = String(path)
  }

  const isArray = Array.isArray(path)
  const isString = typeof path === 'string'
  const splitChar = options.separator || '.'
  const joinChar =
    options.joinChar || (typeof splitChar === 'string' ? splitChar : '.')

  if (!isString && !isArray) {
    return target
  }

  if (isString && path in target) {
    return isValid(path, target, options) ? target[path] : options.default
  }

  const segs = isArray ? path : split(path, splitChar, options)
  const len = segs.length
  let idx = 0

  do {
    let prop = segs[idx]
    if (typeof prop === 'number') {
      prop = String(prop)
    }

    while (prop && prop.slice(-1) === '\\') {
      prop = join([prop.slice(0, -1), segs[++idx] || ''], joinChar, options)
    }

    if (prop in target) {
      if (!isValid(prop, target, options)) {
        return options.default
      }

      target = target[prop]
    } else {
      let hasProp = false
      let n = idx + 1

      while (n < len) {
        prop = join([prop, segs[n++]], joinChar, options)

        if ((hasProp = prop in target)) {
          if (!isValid(prop, target, options)) {
            return options.default
          }

          target = target[prop]
          idx = n - 1
          break
        }
      }

      if (!hasProp) {
        return options.default
      }
    }
  } while (++idx < len && isValidObject(target))

  if (idx === len) {
    return target
  }

  return options.default
}

function join(segs: [string, string], joinChar: string, options: Options) {
  if (typeof options.join === 'function') {
    return options.join(segs)
  }
  return segs[0] + joinChar + segs[1]
}

function split(path: string, splitChar: string, options: Options) {
  if (typeof options.split === 'function') {
    return options.split(path)
  }
  return path.split(splitChar)
}

function isValid(key: string, target: any, options: Options) {
  if (typeof options.isValid === 'function') {
    return options.isValid(key, target)
  }
  return true
}

function isValidObject(val: any) {
  return isObject(val) || Array.isArray(val) || typeof val === 'function'
}

function isObject(val: any): val is Record<string, unknown> {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}
