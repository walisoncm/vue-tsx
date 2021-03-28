import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { VApp, VBtn, VContainer, VLayout } from 'vuetify/lib'

import './styles.sass'

@Component({
  components: {
    VApp,
    VBtn,
    VContainer,
    VLayout
  }
})
export class NotFound extends Vue {
  goBach (): void {
    this.$router.go(-1)
  }

  render (): VNode {
    return (
      <v-app class="exception">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <div class="text-md-center">
              <h1>404</h1>
              <h2 class="my-3 headline">Sorry, page not found</h2>
              <div><v-btn color="primary" onClick={this.goBach}>Go Back</v-btn></div>
            </div>
          </v-layout>
        </v-container>
      </v-app>
    )
  }
}

export default NotFound
