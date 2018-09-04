import {
  camelCaseObjectKey,
  snakeCaseObjectKey,
  pascalCaseObjectKey
} from '@/utils/utils'

describe('transformObjectKey', () => {
  const originData = {
    page_index: 0,
    pageSize: 1
  }

  it('camelCaseObjectKey', () => {
    const trans = camelCaseObjectKey(originData)
    expect(Object.keys(trans)).toEqual(['pageIndex', 'pageSize'])
  })

  it('snakeCaseObjectKey', () => {
    const trans = snakeCaseObjectKey(originData)
    expect(Object.keys(trans)).toEqual(['page_index', 'page_size'])
  })

  it('pascalCaseObjectKey', () => {
    const trans = pascalCaseObjectKey(originData)
    expect(Object.keys(trans)).toEqual(['PageIndex', 'PageSize'])
  })
})
