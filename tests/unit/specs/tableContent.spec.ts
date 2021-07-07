import { createListviewWrapper } from '../helpers'

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

  it('Row select', async () => {
    const tableColumns = [
      { label: 'column1' },
      { label: 'column1' },
      { label: 'column1' },
    ]
    const { wrapper, storeWrapper, storeVm } = await createListviewWrapper({
      tableColumns,
    })
    const rowEl = wrapper
      .findComponent({ name: 'ElTableBody' })
      .findAll('.el-table__row')
    await rowEl.at(1).find('td').element.click()
    await rowEl.at(2).find('td').element.click()
    expect(storeWrapper.emitted('update:tableSelection')!.length).toBe(2)
    expect(storeVm.internalSelection.length).toBe(2)
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
    const rowEl = wrapper
      .findComponent({ name: 'ElTableBody' })
      .findAll('.el-table__row')
    await rowEl.at(1).find('td').element.click()
    await rowEl.at(2).find('td').element.click()
    expect(storeWrapper.emitted('update:tableSelection')!.length).toBe(2)
    expect(storeVm.internalSelection.length).toBe(1)
  })
})
