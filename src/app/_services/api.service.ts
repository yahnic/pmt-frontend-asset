import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { environment } from '../../environments/environment';
import {
    Accident,
    ApiResponse,
    Assignment,
    Maintenance,
    Offence,
    PmlWaybill,
    PmtWaybill,
    Rating,
    Schedule,
    Spares,
    Staff,
    Terminal,
    Vehicle,
    BankRegister,
    Voucher,
    VoucherStage
 } from '../_models';
import { UtilsService } from './utils.service';


const token = window.localStorage.getItem('token');
let httpOptions;
if (token) {
    httpOptions = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
          'cache-control': 'no-cache',
        })
      };
} else {
    httpOptions = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        })
      };
}


@Injectable({ providedIn: 'root' })

export class ApiService {
apiUrl =  'https://jibrila.herokuapp.com/api';
constructor(private http: HttpClient, private utilsService: UtilsService) { }

    getAccident(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/accidents${query}`);
    }

    getAssignment(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/vehicle-assignments${query}`);
    }
    getMaintenance(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pmt-maintenances${query}`);
    }

    getOffence(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/offences${query}`);
    }
    getBankRegister(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/bank-registers${query}`);
    }
    getPmlWaybill(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pml-waybills${query}`);
    }

    getPmtWaybill(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pmt-waybills${query}`);
    }
    getRating(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/ratings${query}`);
    }

    getSchedule(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pmt-schedules${query}`);
    }
    getSpares(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/spares${query}`);
    }

    getStaff(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/staff${query}`);
    }


    // Terminal
    retrieveTerminal(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/terminals${query}`);
    }

    updateTerminal(terminal: Terminal): Observable<ApiResponse> {
        const id = terminal.id;
        delete terminal.id;
        const payload = this.utilsService.cleanObject(terminal);
        return this.http.put<ApiResponse>(`${this.apiUrl}/terminals/${id}`, payload);
    }

    createTerminal(terminal: Terminal): Observable<ApiResponse> {
        delete terminal.id;
        const payload = this.utilsService.cleanObject(terminal);
        return this.http.post<ApiResponse>(`${this.apiUrl}/terminals`, payload);
    }

    deleteTerminal(id: Terminal['id']): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/terminals/${id}`);
    }

    getTerminal(terminals, id): Terminal {
        return terminals.filter(obj => obj.id === id);
    }

    // Vehicle
    getVehicle(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/vehicles${query}`);
    }

    // City, County, State
    retrieveCity(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/cities${query}`);
    }
    retrieveCounty(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/counties${query}`);
    }
    retrieveState(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/states${query}`);
    }

    // Offence
    retrieveOffence(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/offences${query}`);
    }

    updateOffence(offence: Offence): Observable<ApiResponse> {
        const id = offence.id;
        delete offence.id;
        const payload = this.utilsService.cleanObject(offence);
        return this.http.put<ApiResponse>(`${this.apiUrl}/offences/${id}`, payload);
    }

    createOffence(offence: Offence): Observable<any> {
        console.log(offence);
        delete offence.id;
        const payload = this.utilsService.cleanObject(offence);
        return this.http.post<ApiResponse>(`${this.apiUrl}/offences`, payload, httpOptions);
    }

    deleteOffence(id: Offence['id']): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/offences/${id}`);
    }

    getOneOffence(offences, id): Offence {
        return offences.filter(obj => obj.id === id);
    }

    // Bank - Register
    retrieveBankRegister(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/bank-registers${query}`);
    }
    deleteBankRegister(id: BankRegister['id']): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/bank-registers/${id}`);
    }
    createBankRegister(bankRegister: BankRegister): Observable<any> {
        console.log(bankRegister);
        delete bankRegister.id;
        const payload = this.utilsService.cleanObject(bankRegister);
        return this.http.post<ApiResponse>(`${this.apiUrl}/bank-registers`, payload, httpOptions);
    }
    updateBankRegister(bankRegister: BankRegister): Observable<ApiResponse> {
        const id = bankRegister.id;
        delete bankRegister.id;
        const payload = this.utilsService.cleanObject(bankRegister);
        return this.http.put<ApiResponse>(`${this.apiUrl}/bank-registers/${id}`, payload);
    }
    getOneBankRegister(bankRegisters, id): BankRegister {
        return bankRegisters.filter(obj => obj.id === id);
    }

    // Voucher

    retrieveVoucher(query = ''): Observable<ApiResponse> {
         return this.http.get<ApiResponse>(`${this.apiUrl}/vouchers${query}`);
     }
     getVoucher(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/vouchers${query}`);
    }

    updateVoucher(voucher: Voucher): Observable<ApiResponse> {
        const id = voucher.id;
        delete voucher.id;
        const payload = this.utilsService.cleanObject(voucher);
        return this.http.put<ApiResponse>(`${this.apiUrl}/vouchers/${id}`, payload);
    }

    createVoucher(voucher: Voucher): Observable<any> {
        console.log(voucher);
        delete voucher.id;
        const payload = this.utilsService.cleanObject(voucher);
        return this.http.post<ApiResponse>(`${this.apiUrl}/vouchers`, payload, httpOptions);
    }

    deleteVoucher(id: Voucher['id']): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/vouchers/${id}`);
    }

    getOneVoucher(vouchers, id): Voucher {
        return vouchers.filter(obj => obj.id === id);
    }

    // Voucher Stage

    retrieveVoucherStage(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/voucher-stages${query}`);
    }
    getVoucherStage(query = '') {
       return this.http.get<ApiResponse>(`${this.apiUrl}/voucher-stages${query}`);
   }
   updateVoucherStage(voucherStage: VoucherStage): Observable<ApiResponse> {
    const id = voucherStage.id;
    delete voucherStage.id;
    const payload = this.utilsService.cleanObject(voucherStage);
    return this.http.put<ApiResponse>(`${this.apiUrl}/voucher-stages/${id}`, payload);
}

    createVoucherStage(voucherStage: VoucherStage): Observable<any> {
    console.log(voucherStage);
    delete voucherStage.id;
    const payload = this.utilsService.cleanObject(voucherStage);
    return this.http.post<ApiResponse>(`${this.apiUrl}/voucher-stages`, payload, httpOptions);
}

    deleteVoucherStage(id: VoucherStage['id']): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/voucher-stages/${id}`);
}

    getOneVoucherStage(voucherStage, id): VoucherStage {
    return voucherStage.filter(obj => obj.id === id);
    }
    // staff
    retrieveStaff(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/staff${query}`);
    }

    // Driver
    retrieveDriver(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/drivers${query}`);
    }

    // Account Handing
    retrieveAccountHeading(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/account-headings${query}`);
    }
    // VoucherStage
    // retrieveVoucherStage(query = ''): Observable<ApiResponse> {
    //     return this.http.get<ApiResponse>(`${this.apiUrl}/voucher-stages${query}`);
    // }
}
