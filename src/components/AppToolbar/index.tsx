import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import {
  VAppBar,
  VAppBarNavIcon,
  VSpacer,
  VBtn
} from 'vuetify/lib'

import './styles.sass'

@Component({
  components: {
    VAppBar,
    VAppBarNavIcon,
    VSpacer,
    VBtn
  }
})
export class AppToolbar extends Vue {
  goBack (): void {
    this.$router.push('/')
  }

  handleDrawerToggle (): void {
    this.$emit('sideIconClick')
  }

  render (): VNode {
    return (
      <v-app-bar color="primary" dark app>
        <v-app-bar-nav-icon onClick={this.handleDrawerToggle} />

        <v-btn class="logo" text onClick={this.goBack}>
          <img
            src="https://image.flaticon.com/icons/png/512/235/235889.png"
            alt="Logo"
          />
        </v-btn>
      </v-app-bar>
    )
  }
}

export default AppToolbar
