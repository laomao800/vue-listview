/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function noop(_msg: string, ..._args: any[]) {
  // noop
}

export let warn = noop
export let error = noop

if (process.env.NODE_ENV !== 'test') {
  /* istanbul ignore next */
  warn = (msg: string, ...args: any[]) => {
    console.warn(
      `%c Listview warn %c ${msg}`,
      'background:#f90;padding:1px;border-radius:3px;color:#fff',
      'background:transparent',
      ...args
    )
  }

  /* istanbul ignore next */
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
