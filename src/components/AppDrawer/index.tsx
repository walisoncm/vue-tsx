import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import {
  VImg,
  VList,
  VListItem,
  VListItemAvatar,
  VListItemTitle,
  VNavigationDrawer
} from 'vuetify/lib'

import './styles.scss'

@Component({
  components: {
    VImg,
    VList,
    VListItem,
    VListItemAvatar,
    VListItemTitle,
    VNavigationDrawer
  }
})
export class AppDrawer extends Vue {
  mini = false
  drawer = false
  drawerWidth = 256

  @Getter('GET_AVATAR', { namespace: 'user' })
  getAvatar!: string

  @Getter('GET_USERNAME', { namespace: 'user' })
  getUsername!: string

  toggleDrawer (): void {
    this.drawer = !this.drawer
  }

  render (): VNode {
    return (
      <v-navigation-drawer
        app
        class="app-drawer"
        mini-variant={this.mini}
        v-model={this.drawer}
        width={this.drawerWidth}
        dark={this.$vuetify.theme.dark}
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src={this.getAvatar} />
            </v-list-item-avatar>
            <v-list-item-title>
              {this.getUsername}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    )
  }
}

export default AppDrawer
