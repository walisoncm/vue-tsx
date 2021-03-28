export interface CartItem {
  hash?: string;
  uuid: number;
  name: string;
  quantity: number;
  price: number;
  addons: any[];
}

export function cartItemTotal (item: CartItem) {
  const extra = item.addons.reduce((acc: number, cur) => acc + cur.price, 0)
  return (item.price + extra) * item.quantity
}
