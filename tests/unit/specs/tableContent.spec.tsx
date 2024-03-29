import Vue from 'vue'
import { createListviewWrapper } from '../helpers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = new Vue().$createElement

describe('Table content', () => {
  it('Column render', async () => {
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper } = await createListviewWrapper({ tableColumns })
    expect(wrapper.findAllComponents({ name: 'ElTableColumn' }).length).toBe(
      // 加上选择列
      tableColumns.length + 1
    )
  })

  it('Column custom render', async () => {
    const tableColumns = [
      { render: () => <div class="custom-column-render"></div> },
    ]
    const { wrapper } = await createListviewWrapper({ tableColumns })
    expect(wrapper.find('div.custom-column-render').exists()).toBe(true)
  })

  it('Row select', async () => {
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper, storeWrapper, storeVm } = await createListviewWrapper({
      tableColumns,
    })
    const rowWrapper = wrapper
      .findComponent({ name: 'ElTableBody' })
      .findAll('.el-table__row')
    await rowWrapper.at(1).find<HTMLInputElement>('td').element.click()
    await rowWrapper.at(2).find<HTMLInputElement>('td').element.click()
    expect(storeWrapper.emitted('update:selection')!.length).toBe(2)
    expect(storeVm.selection.length).toBe(2)
    expect(wrapper.findAll('tr.row--selected').length).toBe(2)
  })

  it('Row selectable', async () => {
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper, storeWrapper, storeVm } = await createListviewWrapper({
      tableColumns,
      tableSelectionColumn: {
        selectable: (row, index) => index !== 1,
      },
    })
    const rowWrapper = wrapper
      .findComponent({ name: 'ElTableBody' })
      .findAll('.el-table__row')
    // td 点击事件未触发 el-table @row-click ，此处通过点击 el-ckeckbox 触发
    await rowWrapper
      .at(0)
      .find<HTMLInputElement>('td .el-checkbox__original')
      .element.click()
    await rowWrapper
      .at(1)
      .find<HTMLInputElement>('td .el-checkbox__original')
      .element.click()
    await rowWrapper
      .at(2)
      .find<HTMLInputElement>('td .el-checkbox__original')
      .element.click()
    expect(storeWrapper.emitted('update:selection')!.length).toBe(2)
    expect(storeVm.selection.length).toBe(2)
    expect(wrapper.findAll('tr.row--selected').length).toBe(2)
  })

  it('Row single select', async () => {
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper, storeWrapper, storeVm } = await createListviewWrapper({
      tableColumns,
      tableSelectionColumn: 'single',
    })
    const rowWrapper = wrapper
      .findComponent({ name: 'ElTableBody' })
      .findAll('.el-table__row')
    await rowWrapper
      .at(1)
      .find<HTMLInputElement>('td .el-radio__original')
      .element.click()
    await rowWrapper
      .at(2)
      .find<HTMLInputElement>('td .el-radio__original')
      .element.click()
    expect(storeWrapper.emitted('update:selection')!.length).toBe(2)
    expect(storeVm.selection.length).toBe(1)
    expect(wrapper.findAll('tr.row--selected').length).toBe(1)
  })
})
