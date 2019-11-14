import get from '@/utils/getValue'

describe('get value:', function() {
  it('should return non-object when given as the first argument', function() {
    expect(get(null)).toEqual(null)
    expect(get('foo')).toEqual('foo')
    expect(get(['a'])).toEqual(['a'])
  })

  it('should get a value', function() {
    expect(get({ a: 'a', b: { c: 'd' } }, 'a')).toEqual('a')
    expect(get({ a: 'a', b: { c: 'd' } }, 'b.c')).toEqual('d')
    expect(get({ foo: 'bar' }, 'foo.bar')).toEqual(undefined)
  })

  it('should get a property that has dots in the key', function() {
    expect(get({ 'a.b': 'c' }, 'a.b')).toEqual('c')
  })

  it('should support using dot notation to get nested values', function() {
    const fixture = {
      a: { locals: { name: { first: 'Brian' } } },
      b: { locals: { name: { last: 'Woodward' } } },
      c: { locals: { paths: ['a.txt', 'b.js', 'c.hbs'] } }
    }
    expect(get(fixture, 'a.locals.name')).toEqual({ first: 'Brian' })
    expect(get(fixture, 'b.locals.name')).toEqual({ last: 'Woodward' })
    expect(get(fixture, 'b.locals.name.last')).toBe('Woodward')
    expect(get(fixture, 'c.locals.paths.0')).toBe('a.txt')
    expect(get(fixture, 'c.locals.paths.1')).toBe('b.js')
    expect(get(fixture, 'c.locals.paths.2')).toBe('c.hbs')
  })

  it('should support a custom separator on options.separator', function() {
    const fixture = { 'a.b': { c: { d: 'e' } } }
    expect(get(fixture, 'a.b/c/d', { separator: '/' })).toBe('e')
    expect(get(fixture, 'a\\.b.c.d', { separator: /\\?\./ })).toBe('e')
  })

  it('should support a custom split function', function() {
    const fixture = { 'a.b': { c: { d: 'e' } } }
    expect(get(fixture, 'a.b/c/d', { split: path => path.split('/') })).toBe(
      'e'
    )
    expect(
      get(fixture, 'a\\.b.c.d', { split: path => path.split(/\\?\./) })
    ).toBe('e')
  })

  it('should support a custom join character', function() {
    const fixture = { 'a-b': { c: { d: 'e' } } }
    const options = { joinChar: '-' }
    expect(get(fixture, 'a.b.c.d', options)).toBe('e')
  })

  it('should support a custom join function', function() {
    const fixture = { 'a-b': { c: { d: 'e' } } }
    const options = {
      split: path => path.split(/[-/]/),
      join: segs => segs.join('-')
    }
    expect(get(fixture, 'a/b-c/d', options)).toBe('e')
  })

  it('should support a default value as the last argument', function() {
    const fixture = { foo: { c: { d: 'e' } } }
    expect(get(fixture, 'foo.bar.baz', 'quz')).toBe('quz')
    expect(get(fixture, 'foo.bar.baz', true)).toBe(true)
    expect(get(fixture, 'foo.bar.baz', false)).toBe(false)
    expect(get(fixture, 'foo.bar.baz', null)).toBe(null)
  })

  it('should support options.default', function() {
    const fixture = { foo: { c: { d: 'e' } } }
    expect(get(fixture, 'foo.bar.baz', { default: 'qux' })).toBe('qux')
    expect(get(fixture, 'foo.bar.baz', { default: true })).toBe(true)
    expect(get(fixture, 'foo.bar.baz', { default: false })).toBe(false)
    expect(get(fixture, 'foo.bar.baz', { default: null })).toBe(null)
    expect(get(fixture, 'foo.bar.baz', { default: { one: 'two' } })).toEqual({
      one: 'two'
    })
  })

  it('should support a custom function for validating the object', function() {
    const isEnumerable = Object.prototype.propertyIsEnumerable
    const options = {
      isValid: function(key, obj) {
        return isEnumerable.call(obj, key)
      }
    }

    const fixture = { 'a.b': { c: { d: 'e' } } }
    expect(get(fixture, 'a.b.c.d', options)).toBe('e')
  })

  it('should support nested keys with dots', function() {
    expect(get({ 'a.b.c': 'd' }, 'a.b.c')).toBe('d')
    expect(get({ 'a.b': { c: 'd' } }, 'a.b.c')).toBe('d')
    expect(get({ 'a.b': { c: { d: 'e' } } }, 'a.b.c.d')).toBe('e')
    expect(get({ a: { b: { c: 'd' } } }, 'a.b.c')).toBe('d')
    expect(get({ a: { 'b.c': 'd' } }, 'a.b.c')).toBe('d')
    expect(get({ 'a.b.c.d': 'e' }, 'a.b.c.d')).toBe('e')
    expect(get({ 'a.b.c.d': 'e' }, 'a.b.c')).toBe(undefined)

    expect(get({ 'a.b.c.d.e.f': 'g' }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ 'a.b.c.d.e': { f: 'g' } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ 'a.b.c.d': { e: { f: 'g' } } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ 'a.b.c': { d: { e: { f: 'g' } } } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ 'a.b': { c: { d: { e: { f: 'g' } } } } }, 'a.b.c.d.e.f')).toBe(
      'g'
    )
    expect(
      get({ a: { b: { c: { d: { e: { f: 'g' } } } } } }, 'a.b.c.d.e.f')
    ).toBe('g')

    expect(get({ 'a.b.c.d.e': { f: 'g' } }, 'a.b.c.d.e')).toEqual({
      f: 'g'
    })
    expect(get({ 'a.b.c.d': { 'e.f': 'g' } }, 'a.b.c.d.e')).toBe(undefined)
    expect(get({ 'a.b.c': { 'd.e.f': 'g' } }, 'a.b.c')).toEqual({
      'd.e.f': 'g'
    })
    expect(get({ 'a.b': { 'c.d.e.f': 'g' } }, 'a.b')).toEqual({
      'c.d.e.f': 'g'
    })
    expect(get({ a: { 'b.c.d.e.f': 'g' } }, 'a')).toEqual({
      'b.c.d.e.f': 'g'
    })

    expect(get({ 'a.b.c.d.e': { f: 'g' } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ 'a.b.c.d': { 'e.f': 'g' } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ 'a.b.c': { 'd.e.f': 'g' } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ 'a.b': { 'c.d.e.f': 'g' } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ a: { 'b.c.d.e.f': 'g' } }, 'a.b.c.d.e.f')).toBe('g')

    expect(get({ 'a.b': { 'c.d': { 'e.f': 'g' } } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ 'a.b': { c: { 'd.e.f': 'g' } } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ a: { 'b.c.d.e': { f: 'g' } } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ a: { 'b.c.d': { 'e.f': 'g' } } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ a: { 'b.c': { 'd.e.f': 'g' } } }, 'a.b.c.d.e.f')).toBe('g')
    expect(get({ a: { b: { 'c.d.e.f': 'g' } } }, 'a.b.c.d.e.f')).toBe('g')
  })

  it('should support return default when options.isValid returns false', function() {
    const fixture = { foo: { bar: { baz: 'qux' }, 'a.b.c': 'xyx', yyy: 'zzz' } }
    const options = val => {
      return Object.assign(
        {},
        {
          default: val,
          isValid: function(key) {
            return key !== 'bar' && key !== 'a.b.c'
          }
        }
      )
    }

    expect(get(fixture, 'foo.bar.baz', options('fez'))).toBe('fez')
    expect(get(fixture, 'foo.bar.baz', options(true))).toBe(true)
    expect(get(fixture, 'foo.bar.baz', options(false))).toBe(false)
    expect(get(fixture, 'foo.bar.baz', options(null))).toBe(null)

    expect(get(fixture, 'foo.a.b.c', options('fez'))).toBe('fez')
    expect(get(fixture, 'foo.a.b.c', options(true))).toBe(true)
    expect(get(fixture, 'foo.a.b.c', options(false))).toBe(false)
    expect(get(fixture, 'foo.a.b.c', options(null))).toBe(null)

    expect(get(fixture, 'foo.yyy', options('fez'))).toBe('zzz')
  })

  it('should get a value from an array', function() {
    const fixture = {
      a: { paths: ['a.txt', 'a.js', 'a.hbs'] },
      b: {
        paths: {
          '0': 'b.txt',
          '1': 'b.js',
          '2': 'b.hbs',
          3: 'b3.hbs'
        }
      }
    }
    expect(get(fixture, 'a.paths.0')).toBe('a.txt')
    expect(get(fixture, 'a.paths.1')).toBe('a.js')
    expect(get(fixture, 'a.paths.2')).toBe('a.hbs')

    expect(get(fixture, 'b.paths.0')).toBe('b.txt')
    expect(get(fixture, 'b.paths.1')).toBe('b.js')
    expect(get(fixture, 'b.paths.2')).toBe('b.hbs')
    expect(get(fixture, 'b.paths.3')).toBe('b3.hbs')
  })

  it('should get a value from an object in an array', function() {
    expect(get({ a: { b: [{ c: 'd' }] } }, 'a.b.0.c')).toBe('d')
    expect(get({ a: { b: [{ c: 'd' }, { e: 'f' }] } }, 'a.b.1.e')).toBe('f')
  })

  it('should return `undefined` if the path is not found', function() {
    const fixture = { a: { b: {} } }
    expect(get(fixture, 'a.b.c')).toBe(undefined)
    expect(get(fixture, 'a.b.c.d')).toBe(undefined)
  })

  it('should get the specified property', function() {
    expect(get({ a: 'aaa', b: 'b' }, 'a')).toEqual('aaa')
    expect(get({ first: 'Jon', last: 'Schlinkert' }, 'first')).toBe('Jon')
    expect(get({ locals: { a: 'a' }, options: { b: 'b' } }, 'locals')).toEqual({
      a: 'a'
    })
  })

  it('should support passing a property formatted as an array', function() {
    expect(get({ a: 'aaa', b: 'b' }, ['a'])).toEqual('aaa')
    expect(get({ a: { b: { c: 'd' } } }, ['a', 'b', 'c'])).toEqual('d')
    expect(get({ first: 'Harry', last: 'Potter' }, ['first'])).toBe('Harry')
    expect(
      get({ locals: { a: 'a' }, options: { b: 'b' } }, ['locals'])
    ).toEqual({
      a: 'a'
    })
  })

  it('should support escaped dots', function() {
    expect(get({ 'a.b': 'a', b: { c: 'd' } }, 'a\\.b')).toEqual('a')
    expect(get({ 'a.b': { b: { c: 'd' } } }, 'a\\.b.b.c')).toEqual('d')
  })

  it('should get the value of a deeply nested property', function() {
    expect(
      get({ a: { b: 'c', c: { d: 'e', e: 'f', g: { h: 'i' } } } }, 'a.c.g.h')
    ).toBe('i')
  })

  it('should return the entire object if no property is passed', function() {
    expect(get({ a: 'a', b: { c: 'd' } })).toEqual({
      a: 'a',
      b: { c: 'd' }
    })
  })
})

/**
 * These tests are from the "dot-prop" library
 */

describe('dot-prop tests:', function() {
  it('should pass dot-prop tests', function() {
    const f1 = { foo: { bar: 1 } }
    expect(get(f1)).toEqual(f1)
    f1[''] = 'foo'
    expect(get(f1, '')).toEqual('foo')
    expect(get(f1, 'foo')).toEqual(f1.foo)
    expect(get({ foo: 1 }, 'foo')).toEqual(1)
    expect(get({ foo: null }, 'foo')).toEqual(null)
    expect(get({ foo: undefined }, 'foo')).toEqual(undefined)
    expect(get({ foo: { bar: true } }, 'foo.bar')).toEqual(true)
    expect(get({ foo: { bar: { baz: true } } }, 'foo.bar.baz')).toBe(true)
    expect(get({ foo: { bar: { baz: null } } }, 'foo.bar.baz')).toBe(null)
    expect(get({ '\\': true }, '\\')).toEqual(true)
    expect(get({ '\\foo': true }, '\\foo')).toEqual(true)
    expect(get({ 'bar\\': true }, 'bar\\')).toEqual(true)
    expect(get({ 'foo\\bar': true }, 'foo\\bar')).toEqual(true)
    expect(get({ '\\.foo': true }, '\\\\.foo')).toEqual(true)
    expect(get({ 'bar\\.': true }, 'bar\\\\.')).toEqual(true)
    expect(get({ 'foo\\.bar': true }, 'foo\\\\.bar')).toEqual(true)
    expect(get({ foo: 1 }, 'foo.bar')).toEqual(undefined)

    function fn() {}
    fn.foo = { bar: 1 }
    expect(get(fn)).toEqual(fn)
    expect(get(fn, 'foo')).toEqual(fn.foo)
    expect(get(fn, 'foo.bar')).toEqual(1)

    const f3 = { foo: null }
    expect(get(f3, 'foo.bar')).toEqual(undefined)
    expect(get(f3, 'foo.bar', 'some value')).toEqual('some value')

    expect(get({ 'foo.baz': { bar: true } }, 'foo\\.baz.bar')).toBe(true)
    expect(get({ 'fo.ob.az': { bar: true } }, 'fo\\.ob\\.az.bar')).toBe(true)

    expect(get(null, 'foo.bar', false)).toEqual(false)
    expect(get('foo', 'foo.bar', false)).toEqual(false)
    expect(get([], 'foo.bar', false)).toEqual(false)
    expect(get(undefined, 'foo.bar', false)).toEqual(false)
  })

  it('should use a custom options.isValid function', function() {
    const isEnumerable = Object.prototype.propertyIsEnumerable
    const options = {
      isValid: (key, obj) => isEnumerable.call(obj, key)
    }

    const target = {}
    Object.defineProperty(target, 'foo', {
      value: 'bar',
      enumerable: false
    })

    expect(get(target, 'foo', options)).toEqual(undefined)
    expect(get({}, 'hasOwnProperty', options)).toEqual(undefined)
  })

  it('should return a default value', function() {
    expect(get({ foo: { bar: 'a' } }, 'foo.fake')).toEqual(undefined)
    expect(get({ foo: { bar: 'a' } }, 'foo.fake.fake2')).toBe(undefined)
    expect(get({ foo: { bar: 'a' } }, 'foo.fake.fake2', 'some value')).toBe(
      'some value'
    )
  })

  it('should pass all of the dot-prop tests', function() {
    const f1 = { foo: { bar: 1 } }
    expect(get(f1)).toEqual(f1)
    expect(get(f1, 'foo')).toEqual(f1.foo)
    expect(get({ foo: 1 }, 'foo')).toEqual(1)
    expect(get({ foo: null }, 'foo')).toEqual(null)
    expect(get({ foo: undefined }, 'foo')).toEqual(undefined)
    expect(get({ foo: { bar: true } }, 'foo.bar')).toEqual(true)
    expect(get({ foo: { bar: { baz: true } } }, 'foo.bar.baz')).toBe(true)
    expect(get({ foo: { bar: { baz: null } } }, 'foo.bar.baz')).toBe(null)
    expect(get({ foo: { bar: 'a' } }, 'foo.fake.fake2')).toBe(undefined)
  })
})

/**
 * These tests are from the "object-path" library
 */

describe('object-path .get tests', function() {
  function getTestObj() {
    return {
      a: 'b',
      b: {
        c: [],
        d: ['a', 'b'],
        e: [{}, { f: 'g' }],
        f: 'i'
      }
    }
  }

  it('should return the value using unicode key', function() {
    const obj = { '15\u00f8C': { '3\u0111': 1 } }
    expect(get(obj, '15\u00f8C.3\u0111')).toBe(1)
    expect(get(obj, ['15\u00f8C', '3\u0111'])).toBe(1)
  })

  it('should return the value using dot in key (with array of segments)', function() {
    const obj = { 'a.b': { 'looks.like': 1 } }
    expect(get(obj, ['a.b', 'looks.like'])).toBe(1)
  })

  // object-path fails this test
  it('should return the value using dot in key', function() {
    const obj = { 'a.b': { 'looks.like': 1 } }
    expect(get(obj, 'a.b.looks.like')).toBe(1)
  })

  it('should return the value under shallow object', function() {
    const obj = getTestObj()
    expect(get(obj, 'a')).toBe('b')
    expect(get(obj, ['a'])).toBe('b')
  })

  it('should work with number path', function() {
    const obj = getTestObj()
    expect(get(obj.b.d, 0)).toBe('a')
    expect(get(obj.b, 0)).toBe(undefined)
  })

  it('should return the value under deep object', function() {
    const obj = getTestObj()
    expect(get(obj, 'b.f')).toBe('i')
    expect(get(obj, ['b', 'f'])).toBe('i')
  })

  it('should return the value under array', function() {
    const obj = getTestObj()
    expect(get(obj, 'b.d.0')).toBe('a')
    expect(get(obj, ['b', 'd', 0])).toBe('a')
  })

  it('should return the value under array deep', function() {
    const obj = getTestObj()
    expect(get(obj, 'b.e.1.f')).toBe('g')
    expect(get(obj, ['b', 'e', 1, 'f'])).toBe('g')
  })

  it('should return undefined for missing values under object', function() {
    const obj = getTestObj()
    expect(get(obj, 'a.b')).toBe(undefined)
    expect(get(obj, ['a', 'b'])).toBe(undefined)
  })

  it('should return undefined for missing values under array', function() {
    const obj = getTestObj()
    expect(get(obj, 'b.d.5')).toBe(undefined)
    expect(get(obj, ['b', 'd', '5'])).toBe(undefined)
  })

  it('should return the value under integer-like key', function() {
    const obj = { '1a': 'foo' }
    expect(get(obj, '1a')).toBe('foo')
    expect(get(obj, ['1a'])).toBe('foo')
  })

  it('should return the default value when the key doesnt exist', function() {
    const obj = { '1a': 'foo' }
    expect(get(obj, '1b', null)).toBe(null)
    expect(get(obj, ['1b'], null)).toBe(null)
  })

  // this test differs from behavior in object-path. I was unable to figure
  // out exactly how the default values work in object-path.
  it('should return the default value when path is empty', function() {
    const obj = { '1a': 'foo' }
    expect(get(obj, '', null)).toEqual(null)
    expect(get(obj, [])).toEqual(undefined)
    expect(get({}, ['1'], 'foo')).toBe('foo')
  })

  it('should return the default value when object is null or undefined', function() {
    expect(get(null, 'test', 'a')).toEqual('a')
    expect(get(undefined, 'test', 'a')).toEqual('a')
  })

  it('should not fail on an object with a null prototype', function assertSuccessForObjWithNullProto() {
    const foo = 'FOO'
    const objWithNullProto = Object.create(null)
    objWithNullProto.foo = foo
    expect(get(objWithNullProto, 'foo')).toBe(foo)
  })

  // this differs from object-path, which does not allow
  // the user to get non-own properties for some reason.
  it('should get non-"own" properties', function() {
    const Base = function() {}
    Base.prototype = {
      one: {
        two: true
      }
    }
    const Extended = function() {
      Base.call(this, true)
    }
    Extended.prototype = Object.create(Base.prototype)

    const extended = new Extended()

    expect(get(extended, ['one', 'two'])).toBe(true)
    extended.enabled = true

    expect(get(extended, 'enabled')).toBe(true)
    expect(get(extended, 'one')).toEqual({ two: true })
  })
})

describe('deep-property unit tests', function() {
  it('should handle invalid input', function() {
    const a = undefined
    const b = {}

    expect(get(a, 'sample')).toBe(undefined)
    expect(get(b, undefined)).toEqual({})
    expect(get(b, '')).toEqual(undefined)
    expect(get(b, '...')).toEqual(undefined)
  })

  it('should get shallow properties', function() {
    const fn = function() {}
    const a = {
      sample: 'string',
      example: fn,
      unknown: undefined
    }

    expect(get(a, 'example')).toBe(fn)
    expect(get(a, 'sample')).toBe('string')
    expect(get(a, 'unknown')).toBe(undefined)
    expect(get(a, 'invalid')).toBe(undefined)
  })

  it('should get deep properties', function() {
    const a = {
      b: { example: { type: 'vegetable' } },
      c: { example: { type: 'mineral' } }
    }

    expect(get(a, 'b.example.type')).toBe('vegetable')
    expect(get(a, 'c.example.type')).toBe('mineral')
    expect(get(a, 'c.gorky.type')).toBe(undefined)
  })

  it('should get properties on non-objects', function() {
    const fn = function() {}

    // the commented out lines are from from the "deep-property" lib,
    // but it's invalid javascript. This is a good example of why it's always
    // better to use "use strict" (and lint your code).

    // const str = 'An example string';
    // const num = 42;

    fn.path = { to: { property: 'string' } }
    // str.path = { to: { property: 'string' } };
    // num.path = { to: { property: 'string' } };

    expect(get(fn, 'path.to.property')).toBe('string')
    // expect(get(str, 'path.to.property')).toBe( undefined);
    // expect(get(num, 'path.to.property')).toBe( undefined);
  })
})
