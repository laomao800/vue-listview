function noop() {}

export let warn = noop
export let error = noop

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  warn = msg => {
    // eslint-disable-next-line no-console
    console.warn(
      `%c Listview warn %c ${msg}`,
      'background:#f90;padding:1px;border-radius:3px;color:#fff',
      'background:transparent'
    )
  }

  error = msg => {
    // eslint-disable-next-line no-console
    console.error(
      `%c Listview error %c ${msg}`,
      'background:#e30;padding:1px;border-radius:3px;color:#fff',
      'background:transparent'
    )
  }
}
