import { Staff } from './staff';
import { Vehicle } from './vehicle';
import { Driver } from './driver';

export class Assignment {
  id: string;
  user_type: string;
  staff_id: Staff; // staff_id from Api holds but Staff object
  driver_id: Driver;
  request_date: Date;
  task_id: string;
  asset_type: string;
  vehicle_id: Vehicle;  // vehicle_id from Api holds but Vehicle object
  asset_id: string;
  issued_date: Date;
  issued_by: string;
  issuer_remark: string;
  request_status: string;
  assignment_status: string;
  is_returnable: boolean;
  expected_returned_date: Date;
  actual_returned_date: Date;
  collected_date: Date;
  collected_by: string;
  collected_remark: string;
  // driver: any;
}
