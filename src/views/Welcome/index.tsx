import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import {
  VBanner,
  VBtn,
  VCol,
  VIcon,
  VLabel,
  VRow,
  VTextField
} from 'vuetify/lib'

import './styles.scss'

@Component({
  components: {
    VBanner,
    VBtn,
    VCol,
    VIcon,
    VLabel,
    VRow,
    VTextField
  }
})
export class Welcome extends Vue {
  address = ''

  @Mutation('SET_LOCATION', { namespace: 'cart' })
  setCartLocation!: (payload: any) => void;

  async onPlaceChanged (place: any): Promise<void> {
    if (!place.formatted_address) {
      alert('Not Located, Pleae PinPoint')
    } else {
      this.setCartLocation({
        location: {
          address: place.formatted_address,
          coord: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        }
      })
    }
  }

  async pinpointOnMaps (): Promise<void> {
    window._VMA.$emit('SHOW_SNACKBAR', {
      text: 'Ainda não implementado',
      color: 'error'
    })
  }

  goToMenu (): void {
    this.$router.push({ name: 'menu' })
  }

  render (): VNode {
    return (
      <div class="page">
        <div class="welcome-image" />
        <div class="welcome-page">
          <div class="welcome-page__title">
            <h1>Apresentação</h1>
          </div>

          <div class="welcome-page__highlight">
            <h2>Subtítulo</h2>
          </div>

          <v-banner elevation="3" color="#d6d6d6aa">
            <v-row>
              <v-col cols="12">
                <label for="input">Informe seu endereço</label>
                <gmap-autocomplete
                  onplace_changed={this.onPlaceChanged}
                  scopedSlots={{
                    input: ({ listeners, attrs }) =>
                      <v-text-field
                        id="input"
                        ref="input"
                        onlistners={listeners}
                        onattrs={attrs}
                        v-model={this.address}
                        hide-details="auto"
                      />
                  }}
                />
              </v-col>

              <v-col cols="12">
                <v-btn block color="primary" onClick={this.goToMenu}>
                  Confirmar
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-label>Não encontrou seu endereço?</v-label><br/>
                <v-label>Marque a localização no nosso mapa</v-label>
                <v-btn icon onClick={this.pinpointOnMaps} elevation="1" color="red">
                  <v-icon>mdi-map-marker</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-banner>
        </div>
      </div>
    )
  }
}

export default Welcome
