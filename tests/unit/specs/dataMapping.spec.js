import { dataMapping } from '@/utils/utils'

describe('dataMapping', () => {
  const data = {
    result: {
      results: [1, 2, 3],
      total: 3
    },
    success: true
  }

  it('dataMapping', () => {
    const result = dataMapping(data, {
      results: 'result.results',
      total_count: 'result.total',
      success: 'success',
      unknow: 'result.unkndow.prop'
    })
    expect(result).toEqual({
      results: [1, 2, 3],
      total_count: 3,
      success: true,
      unknow: undefined
    })
  })
})
