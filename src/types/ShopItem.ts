import { ItemProps } from "./ItemProps";

export type ItemCategory =
  | "CPU"
  | "GPU"
  | "Motherboard"
  | "RAM"
  | "Hard Drive"
  | "PSU";

export default class ShopItem {
  constructor(
    public name: string,
    public cost: number,
    public ItemCategory: ItemCategory,
    public props: ItemProps,
    public image: string = "/placeholder.jpg",
    public quantity: number = 0
  ) {}
}
