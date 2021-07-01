import { dataMapping, nodeParents } from '@/utils'

describe('dataMapping', () => {
  const data = {
    result: {
      results: [1, 2, 3],
      total_count: 3,
    },
    success: true,
  }

  it('dataMapping', () => {
    const result = dataMapping(data, {
      items: 'result.results',
      total: 'result.total_count',
      success: 'success',
      unknow: 'result.unknow.prop',
    })
    expect(result).toEqual({
      items: [1, 2, 3],
      total: 3,
      success: true,
      unknow: undefined,
    })
  })
})

describe('nodeParents', () => {
  document.documentElement.innerHTML = `
    <div id="wrapper">
      <div class="row">
        <div class="col">col</div>
        <div class="col" id="child1">col</div>
        <div class="col" id="parent">
          <div class="row">
            <div class="col">col</div>
            <div class="col">col</div>
            <div class="col" id="child2">col</div>
          </div>
        </div>
      </div>
    </div>
  `
  const parent = document.getElementById('parent') as Element
  const child1 = document.getElementById('child1') as Element
  const child2 = document.getElementById('child2') as Element

  it('unmatch parent selector', () => {
    expect(nodeParents(child1, '#not-exist')).toBe(null)
  })
  it('unmatch parent', () => {
    expect(nodeParents(child1, '#parent')).toBe(null)
  })
  it('matched parent', () => {
    expect(nodeParents(child2, '#parent')).toBe(parent)
  })
})
