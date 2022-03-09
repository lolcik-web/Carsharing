import { CompanyInfo } from './company-info';
import { AccessInfo } from './access-info';

export class StationDetail {
  constructor(
    public id: number,
    public name: string,
    public latitude: number,
    public longitude: number,
    public retailPrice: number,
    public coordinateReferenceSystem: string,
    public origin: string,
    public spontaneously: boolean,
    public access: AccessInfo,
    public company: CompanyInfo,
    public availableVehicles: number,
    public fixedParking: boolean,
    public bookahead: boolean,
  ) { }
}
