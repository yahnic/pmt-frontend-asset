export class Voucher {
    id: string;
    transaction_code:	string;
    related_voucher_id: Object;
    voucher_stage_id:	Object;
    account_heading_id:	Object;
    terminal_id:	Object;
    subsidiary: string;
    amount:	number;
    description: string ;
    voucher_type: string;
    processing: string; // "PENDING|COMPLETE|CANCEL" (required)
    beneficiary: string; // "STAFF|DRIVER" (required)
    staff_id:	Object;
    driver_id:	Object;
    acknowledge_by:	Object;
    acknowledge_date: Date;
    endorsed_date:	string;
    endorsed_by: Object;
    authorized_date: Date;
    authorized_by:	Object;
    approved_by:	Object;
    approved_date:	Date;
    paid_by:	Object;
    paid_date:	Date;
    pay_channel: string; // "CASH|CHEQUE|BANKTRANSFER"
    received_by: string;
    received_date:	Date;
    checked_by:	Object;
    checked_date:	Date;
    audited_by:	Object;
    audited_date: Date;
    staff: Object;
}
