import { nodeParents } from '@/utils/utils'

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
  const parent = document.getElementById('parent')
  const child1 = document.getElementById('child1')
  const child2 = document.getElementById('child2')

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
