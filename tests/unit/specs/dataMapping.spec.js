import { dataMapping } from '@/utils/utils'

describe('dataMapping', () => {
  const data = {
    result: {
      results: [1, 2, 3],
      total_count: 3
    },
    success: true
  }

  it('dataMapping', () => {
    const result = dataMapping(data, {
      items: 'result.results',
      total: 'result.total_count',
      success: 'success',
      unknow: 'result.unknow.prop'
    })
    expect(result).toEqual({
      items: [1, 2, 3],
      total: 3,
      success: true,
      unknow: undefined
    })
  })
})
