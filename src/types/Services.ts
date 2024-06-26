export type ServiceCategory = "Hairstyling" | "Shaving" | "Coloring";
export default class Services {
  constructor(
    public name: string,
    public price: number,
    public image: string,
    public description: string,
    //public props: ItemProps,
    public ServiceCategory: string[]
  ) {}
}
 /* export default class Services {
  constructor(
    public name: string,
    public price: number,
    public image: string,
    public description: string,
    public ServiceCategory: string[]
  ) {}
}
 */