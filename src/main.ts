import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router';
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'nl',
    fallbackLocale: 'en',
    messages: {
      en: {
        titles: {
          login: 'Please log in...',
          appTitle: 'Groceries!',
          lists: 'Lists',
          groceries: 'Groceries',
          add: 'Add'
        },
        fieldnames: {
            groceries: {
                name: "Name"
            },
            entry: {
                quantity: "Quantity",
                grocery: "Grocery"
            }
        },
        buttons: {
            save: "Save",
            delete: "Delete"
        },
        messages: {
            created: 'Created by {user} at {time}',
            modified: 'Modified by {user} at {time}: {changes}'
        }
      },
      nl: {
        titles: {
          login: 'Inloggen',
          appTitle: 'Boodschappen!',
          lists: 'Lijstjes',
          groceries: 'Producten',
          add: 'Toevoegen'
        },
        fieldnames: {
            groceries: {
                name: "Naam"
            },
            entry: {
                quantity: "Hoeveelheid",
                grocery: "Product"
            }
        },
        buttons: {
            save: "Opslaan",
            delete: "Verwijderen"
        },
        messages: {
            created: 'Toegevoegd door {user} op {time}',
            modified: 'Gewijzigd door {user} op {time}: {changes}'
        }
      }
    }
  })

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')
