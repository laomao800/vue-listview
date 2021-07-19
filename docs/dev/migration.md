# 迁移

## API 差异

### Props

- `contentMessage` 其中 `message` 属性名更名为 `text`
- `tableProps` 更名为 `contentProps`
- `tableEvents` 更名为 `contentEvents`
- `tableSelection` 更名为 `selection`
- `validateResponse` 默认为 `null`
- `resolveResponseErrorMessage` 默认为 `null`
- `filterFields` 取消 `get` 属性，建议使用 `transformRequestData` 统一管理数据转换

### Slots

- `prepend-filterbar-submit` 更名为 `prepend-submit`
- `append-filterbar-submit` 更名为 `append-submit`
- `prepend-filterbar-more` 更名为 `prepend-more`
- `append-filterbar-more` 更名为 `append-more`

### Events

- `before-request` 参数调整
- `requested` 参数调整
