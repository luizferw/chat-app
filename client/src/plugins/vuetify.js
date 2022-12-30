import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#10002b',
          secondary: '#3c096c',
          background: '#240046'
        },
      },
    },
  },
})
