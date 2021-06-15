declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'has-values' {
  const hasValue: (input: any) => boolean
  export default hasValue
}
