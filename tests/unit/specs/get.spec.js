import get from '@/utils/getValue'

describe('get and result', function () {
  it('should get string keyed property values', function () {
    const object = { a: 1 }
    expect(get(object, 'a')).toBe(1)
    expect(get(object, ['a'])).toBe(1)
  })

  it('should get deep property values', function () {
    const object = { a: { b: 2 } }
    expect(get(object, 'a.b')).toBe(2)
    expect(get(object, ['a', 'b'])).toBe(2)
  })

  it('should get a key over a path', function () {
    const object = { 'a.b': 1, a: { b: 2 } }
    expect(get(object, 'a.b')).toBe(1)
    expect(get(object, ['a.b'])).toBe(1)
  })

  it('should not coerce array paths to strings', function () {
    const object = { 'a,b,c': 3, a: { b: { c: 4 } } }
    expect(get(object, ['a', 'b', 'c'])).toBe(4)
  })

  it('should not ignore empty brackets', function () {
    const object = { a: { '': 1 } }
    expect(get(object, 'a[]')).toBe(1)
  })

  it('should handle empty paths', function () {
    const object1 = {}
    const object2 = { '': 3 }
    expect(get(object1, '')).toBe(undefined)
    expect(get(object1, [])).toBe(undefined)
    expect(get(object2, '')).toBe(3)
    expect(get(object2, [''])).toBe(3)
  })

  it('should handle complex paths', function () {
    const object = {
      a: {
        '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 8 } } } } } },
      },
    }

    expect(
      get(object, 'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g')
    ).toBe(8)
    expect(
      get(object, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'])
    ).toBe(8)
  })

  it('should return `undefined` when `object` is nullish', function () {
    expect(get(null, 'constructor')).toBe(undefined)
    expect(get(null, ['constructor'])).toBe(undefined)
    expect(get(undefined, 'constructor')).toBe(undefined)
    expect(get(undefined, ['constructor'])).toBe(undefined)
  })

  it('should return `undefined` for deep paths when `object` is nullish', function () {
    expect(get(null, 'constructor.prototype.valueOf')).toBe(undefined)
    expect(get(null, ['constructor', 'prototype', 'valueOf'])).toBe(undefined)
    expect(get(undefined, ['constructor', 'prototype', 'valueOf'])).toBe(
      undefined
    )
    expect(get(undefined, ['constructor', 'prototype', 'valueOf'])).toBe(
      undefined
    )
  })

  it('should return `undefined` if parts of `path` are missing', function () {
    // eslint-disable-next-line no-sparse-arrays
    const object = { a: [, null] }
    expect(get(object, 'a[1].b.c')).toBe(undefined)
    expect(get(object, ['a', '1', 'b', 'c'])).toBe(undefined)
  })

  it('should be able to return `null` values', function () {
    const object = { a: { b: null } }

    expect(get(object, 'a.b')).toBe(null)
    expect(get(object, ['a', 'b'])).toBe(null)
  })

  it('should follow `path` over non-plain objects', function () {
    const numberProto = Number.prototype
    numberProto.a = { b: 2 }
    expect(get(0, 'a.b')).toBe(2)
    expect(get(0, ['a', 'b'])).toBe(2)
    delete numberProto.a
  })

  it('should return the default value for `undefined` values', function () {
    const object = { a: {} }
    const defaultValues = [true, new Date(), 1, /x/, 'a']
    defaultValues.forEach((defaultValue) => {
      expect(get(object, 'a.b', defaultValue)).toBe(defaultValue)
    })
  })

  it('should return the default value when `path` is empty', function () {
    expect(get({}, [], 'a')).toBe('a')
  })
})
