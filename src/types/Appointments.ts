export default class Appointments {
    constructor(
      public date: Date,
      public serviceId: string,
      public workerId: string,
      public totalCost: number
    ) {}
  }
  