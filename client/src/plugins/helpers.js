import help from '@/helpers'

const helpers = () => ({
  install (app) {
    app.config.globalProperties.$helpers = help
  }
})

export default helpers()
