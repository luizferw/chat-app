import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from './router'
import socket from './socket'
import helpers from './helpers'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(helpers)
    .use(socket)
}
