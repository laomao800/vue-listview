module.exports =
  process.env.DOC_MODE === 'private'
    ? require('./config-private')
    : require('./config-default')
