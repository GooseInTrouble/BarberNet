export default class Salons {

    constructor(
      public name: string,
      public location: string,
      public image: string,
      public workers: string[],  // Масив ідентифікаторів робітників салону
      public services: string[], // Service ID array 
      public tools: string[]  // Масив ідентифікаторів інструментів салону
    ) {}
  }
  