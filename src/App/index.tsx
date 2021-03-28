import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import {
  VApp,
  VBtn,
  VIcon,
  VNavigationDrawer,
  VSnackbar
} from 'vuetify/lib'

import ThemeSettings from '@/components/ThemeSettings'

import './styles.css'

@Component({
  components: {
    VApp,
    VBtn,
    VIcon,
    VNavigationDrawer,
    VSnackbar,

    ThemeSettings
  }
})
export class App extends Vue {
  rightDrawer = false

  snackbar = {
    show: false,
    text: '',
    color: ''
  }

  @Action('LOAD', { namespace: 'restaurant' })
  loadRestaurant!: () => void

  openThemeSettings (): void {
    this.$vuetify.goTo(0)
    this.rightDrawer = !this.rightDrawer
  }

  snackbarShow (): void {
    this.snackbar.show = false
  }

  async created (): Promise<void> {
    this.$on('SHOW_SNACKBAR', (e: any) => {
      this.snackbar = {
        show: true,
        text: e.text,
        color: e.color
      }
    })
  }

  async mounted (): Promise<void> {
    // this.loadRestaurant()
    window._VMA = this
  }

  render (): VNode {
    return (
      <v-app>
        <router-view/>
        <v-btn
          small
          fab
          dark
          fixed
          top="top"
          right="right"
          class="setting-fab"
          color="red"
          onClick={this.openThemeSettings}
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model={this.rightDrawer}
          hide-overlay
          fixed
        >
          <theme-settings />
        </v-navigation-drawer>

        <v-snackbar
          timeout="3000"
          app
          top
          centered
          color={this.snackbar.color}
          v-model={this.snackbar.show}
          scopedSlots={{
            action: () =>
              <v-btn
                icon
                onClick={this.snackbarShow}
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
          }}
        >
          {this.snackbar.text}
        </v-snackbar>
      </v-app>
    )
  }
}

export default App
