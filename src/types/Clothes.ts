import { ItemProps } from "./ItemProps";

export type ItemCategory =
  | "Shirts"
  | "Jeans"
  | "Jackets"
  | "Shoes"

export default class Clothes {
  constructor(
    public name: string,
    public ItemCategory: ItemCategory,
    public size: number,
    public props: ItemProps,
    public image: string = "/placeholder.jpg",
  ) {}
}
