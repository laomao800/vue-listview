export default ({ Vue }) => {
  import('../../')
    .then(({ Listview, ListviewContainer }) => {
      Vue.use(Listview)
      Vue.use(ListviewContainer)
    })
    .catch(() => {})
}
