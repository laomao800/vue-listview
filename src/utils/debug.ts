// eslint-disable-next-line @typescript-eslint/no-unused-vars
function noop(_msg: string, ..._args: any[]) {
  // noop
}

export let warn = noop
export let error = noop

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  warn = (msg: string, ...args: any[]) => {
    // eslint-disable-next-line no-console
    console.warn(
      `%c Listview warn %c ${msg}`,
      'background:#f90;padding:1px;border-radius:3px;color:#fff',
      'background:transparent',
      ...args
    )
  }

  error = (msg: string, ...args: any[]) => {
    // eslint-disable-next-line no-console
    console.error(
      `%c Listview error %c ${msg}`,
      'background:#e30;padding:1px;border-radius:3px;color:#fff',
      'background:transparent',
      ...args
    )
  }
}
