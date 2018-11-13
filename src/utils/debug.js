function noop() {}

export let warn = noop
export let error = noop

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  warn = msg => {
    // eslint-disable-next-line no-console
    console.warn(`[Listview warn] ${msg}`)
  }

  error = msg => {
    // eslint-disable-next-line no-console
    console.error(`[Listview error] ${msg}`)
  }
}
