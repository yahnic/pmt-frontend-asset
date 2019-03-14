import { FlwSubaccount } from './flw-subaccount';
import { City } from './city';
import { County } from './county';


export class Terminal {
    id: string;
    name: string;
    manager: string;
    phone: string;
    quarter: string;
    city_id: City;
    county_id: County;
    address: string;
    longitude: number;
    latitude: number;
    capacity: number;
    is_pml_operational: boolean;
    is_pmt_operational: boolean;
    is_pmt_online: boolean;
    photo: string;
    flw_subaccount_id: FlwSubaccount;
}
