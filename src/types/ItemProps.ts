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
  public brand?:
    | "Intel"
    | "AMD"
    | "Asus"
    | "MSI"
    | "Adata"
    | "Corsair"
    | "Nvidia"
    | "Gigabyte"
    | "Toshiba"
    | "G.Skill"
    | "Crucial";
}

export type Socket = "LGA 1151" | "LGA 1155" | "AM5" | "AM4";
export type RamStandard = "DDR5" | "DDR4" | "DDR3";
export type GpuCableType = "None" | "6-pin" | "8-pin" | "6+2-pin";
export type PCIeVersion =
  | "PCIe 1.0"
  | "PCIe 2.0"
  | "PCIe 3.0"
  | "PCIe 4.0"
  | "PCIe 5.0";

export class CpuProps extends ItemProps {
  public socket?: Socket;
  public powerUsage_W?: number;
  public clockspeed_GHz?: number;
  public model?: string;
  public threadCount?: number;
  public coreCount?: number;
}

export class MotherboardProps extends ItemProps {
  public socket?: Socket;
  public ramStandard?: RamStandard;
  public pcieVersion?: PCIeVersion;
  public ramSlotCount?: number;
  public powerUsage_W?: number;
  public model?: string;
  public type?: "ATX" | "Micro-ATX" | "Mini-ITX";
}

export class RamProps extends ItemProps {
  public ramStandard?: RamStandard;
  public frequency_GHz?: number;
  public ramCapacity_Gb?: number;
  public powerUsage_W?: number;
}

export class PowerUnitProps extends ItemProps {
  public gpuCableType?: GpuCableType;
  public power_W?: number;
  public efficiencyCertificate?:
    | "80 Plus"
    | "80 Plus Bronze"
    | "80 Plus Silver"
    | "80 Plus Gold"
    | "80 Plus Platinum"
    | "80 Plus Titanium";
}

export class GpuProps extends ItemProps {
  public pcieVersion?: PCIeVersion;
  public gpuCableType?: GpuCableType;
  public memoryCapacity_Gb?: number;
  public model?: string;
  public memoryStandard?: string;
}

export class HardDriveProps extends ItemProps {
  public memoryCapacity_Gb?: number;
  public readSpeed_MBs?: number;
  public writeSpeed_MBs?: number;
  public type?: "HDD" | "SSD";
  public intrface?: "SATA 3.0" | "NVMe" | "M.2 SATA";
  public powerUsage_W?: number;
}
