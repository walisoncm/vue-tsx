import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { VApp, VMain } from 'vuetify/lib'
import AppDrawer from '@/components/AppDrawer'
import AppToolbar from '@/components/AppToolbar'

import './styles.scss'

@Component({
  components: {
    VApp,
    VMain,

    AppDrawer,
    AppToolbar
  }
})
export class LayoutDefault extends Vue {
  $refs!: {
    drawer: AppDrawer;
  }

  handleDrawerVisiable (): void {
    this.$refs.drawer.toggleDrawer()
  }

  render (): VNode {
    return (
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer" ref="drawer"/>
        <app-toolbar class="app-toolbar" onSideIconClick={this.handleDrawerVisiable} />

        <v-main>
          <router-view />
        </v-main>
      </v-app>
    )
  }
}

export default LayoutDefault
