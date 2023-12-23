export class ItemProps {
  public color?:
    | "None"
    | "Black"
    | "White"
    | "Grey"
    | "Green"
    | "Red"
    | "Blue"
    | "Yellow";
  public material?: "Denim" | "Leather" | "Synthetic" | "Cotton" | "Canvas";
}
export type ItemCategory = "Shirts" | "Jeans" | "Jackets" | "Shoes";

export default class Clothes {
  constructor(
    public name: string,
    public ItemCategory: ItemCategory,
    public size: number,
    public props: ItemProps,
    public image: string = "/placeholder.jpg"
  ) {}
}
