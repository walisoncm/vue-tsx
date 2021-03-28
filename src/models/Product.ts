export interface Product {
  uuid: number
  name: string
  name2?: string
  description: string
  price: number
  price2?: number
  addongroups: AddonGroup[]
}

export interface AddonGroup {
  name: string
  max_choices: number
  addons: Addon[]
}

export interface Addon {
  name: string
  name2?: string
  price: number
  price2?: number
  pre_selected?: boolean
  compose_name?: boolean
}
