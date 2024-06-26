export default class Appointments {
    constructor(
      public date: Date,
      public time: string,
      public serviceId: string,
      public workerId: string,
      public totalCost: number
    ) {}
  }
  