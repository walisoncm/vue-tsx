import Vue, { VNode } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import {
  VBtn,
  VBtnToggle,
  VCol,
  VContainer,
  VDivider,
  VIcon,
  VLayout,
  VRow,
  VSelect,
  VSubheader,
  VToolbar,
  VToolbarTitle
} from 'vuetify/lib'
import { VuetifyLocale } from 'vuetify/types/services/lang'
import colors from 'vuetify/es5/util/colors'

import './styles.sass'

interface IAvailableLanguage {
  text: string | VuetifyLocale;
  value: string;
}

type ColorOptionValue = {
  sideNav: string;
  mainNav: string;
  sideMenu: string;
}

interface IColorOption {
  key: string;
  value: ColorOptionValue;
}

@Component({
  components: {
    VBtn,
    VBtnToggle,
    VCol,
    VContainer,
    VDivider,
    VIcon,
    VLayout,
    VRow,
    VSelect,
    VSubheader,
    VToolbar,
    VToolbarTitle
  }
})
export class ThemeSettings extends Vue {
  themeColor = 'indigo'
  sideBarOption = 'light'
  colors = colors

  @Watch('themeColor', { immediate: true })
  watchThemeColor (val: string): void {
    this.$vuetify.theme.themes.light.primary = this.colors[val].base
  }

  @Watch('sideBarOption', { immediate: true })
  watchSideBarOption (val: string): void {
    this.$vuetify.theme.dark = val === 'dark'
  }

  get availableLanguages (): IAvailableLanguage[] {
    const { locales } = this.$vuetify.lang

    return Object.keys(locales).map((lang) => {
      return {
        text: locales[lang].label,
        value: lang
      }
    })
  }

  get themeColorOptions (): IColorOption[] {
    return [
      {
        key: 'blue',
        value: {
          sideNav: 'blue',
          mainNav: 'blue',
          sideMenu: 'white'
        }
      },
      {
        key: 'teal',
        value: {
          sideNav: 'teal',
          mainNav: 'teal',
          sideMenu: 'white'
        }
      },
      {
        key: 'red',
        value: {
          sideNav: 'red',
          mainNav: 'red',
          sideMenu: 'white'
        }
      },
      {
        key: 'orange',
        value: {
          sideNav: 'orange',
          mainNav: 'orange',
          sideMenu: 'white'
        }
      },
      {
        key: 'purble',
        value: {
          sideNav: 'purple',
          mainNav: 'purple',
          sideMenu: 'white'
        }
      },
      {
        key: 'indigo',
        value: {
          sideNav: 'indigo',
          mainNav: 'indigo',
          sideMenu: 'white'
        }
      },
      {
        key: 'cyan',
        value: {
          sideNav: 'cyan',
          mainNav: 'cyan',
          sideMenu: 'white'
        }
      },
      {
        key: 'pink',
        value: {
          sideNav: 'pink',
          mainNav: 'pink',
          sideMenu: 'white'
        }
      },
      {
        key: 'green',
        value: {
          sideNav: 'green',
          mainNav: 'green',
          sideMenu: 'white'
        }
      }
    ]
  }

  changeLocale (lang: string): void {
    this.$vuetify.lang.current = lang
  }

  render ():VNode {
    return (
      <div class="themeSettings">
        <v-toolbar color="primary">
          <v-toolbar-title class="white--text">Configurações de tema</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-row column>
            <v-col>
              <v-select
                placeholder="Idioma"
                label="Idioma"
                items={this.availableLanguages}
                v-model={this.$vuetify.lang.current}
                onChange={this.changeLocale}
              />
              <v-subheader class="px-1 my-2">Opções de cores</v-subheader>
              <div class="color-option">
                <v-layout wrap>
                  {this.themeColorOptions.map(option => {
                    return (
                      <label
                        class="color-option--label flex xs6 pa-1"
                      >
                        <input
                          type="radio"
                          name="color"
                          value={option.key}
                          v-model={this.themeColor}
                        />
                        <span class="color-option--item bg">
                          <span class="overlay">
                            <v-icon color="white">mdi-check</v-icon>
                          </span>
                          <span
                            class={`color-option--item--header sideNav ${option.value.sideNav}`}
                          />
                          <span
                            class={`color-option--item--header mainNav ${option.value.mainNav}`}
                          />
                          <span
                            class={`sideMenu ${option.value.sideMenu}`}
                          />
                        </span>
                      </label>
                    )
                  })}
                </v-layout>
              </div>
              <div class="theme-options">
                <v-subheader class="px-1 my-2">Barra lateral</v-subheader>
                <v-divider></v-divider>
                <div class="my-3">
                  <v-btn-toggle v-model={this.sideBarOption}>
                    <v-btn text value="dark">Dark</v-btn>
                    <v-btn text value="light">Light</v-btn>
                  </v-btn-toggle>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    )
  }
}

export default ThemeSettings
