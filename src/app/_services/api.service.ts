import { AssetCategory } from './../_models/asset-category';
import { Asset } from './../_models/asset';
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
 } from '../_models';
import { UtilsService } from './utils.service';

const token = window.localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    Authorization: ` Bearer ${token}`
  })
};
@Injectable({ providedIn: 'root' })

export class ApiService {
  [x: string]: any;
    constructor(private http: HttpClient, private utilsService: UtilsService) { }
    apiUrl = 'https://jibrila.herokuapp.com/api';
   // apiUrl = environment.PEACE_API;
  retrieveAssignmet(): any {
    throw new Error('Method not implemented.');
  }

    getAccident(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/accidents${query}`);
    }

    getAssignment(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/asset-request-assignments${query}`, httpOptions);
    }
    getMaintenance(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pmt-maintenances${query}`);
    }

    getOffence(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/offences${query}`);
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

 // Asset

 retrieveAsset(query = ''): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(`${this.apiUrl}/assets${query}`);
}

updateAsset(asset: Asset): Observable<ApiResponse> {
  const id = asset.id;
  delete asset.id;
  const payload = this.utilsService.cleanObject(asset);
  return this.http.put<ApiResponse>(`${this.apiUrl}/assets/${id}`, payload);
}

createAsset(asset: Asset): Observable<ApiResponse> {
  delete asset.id;
  const payload = this.utilsService.cleanObject(asset);
  return this.http.post<ApiResponse>(`${this.apiUrl}/assets`, payload);
}

deleteAsset(id: Asset['id']): Observable<ApiResponse> {
  return this.http.delete<ApiResponse>(`${this.apiUrl}/assets/${id}`);
}
getAsset(assets, id): Asset {
  return assets.filter(obj => obj.id === id);
}

   // Asset-Category

 retrieveAssetCategory(query = ''): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(`${this.apiUrl}/asset-categories${query}`);
 }

updateAssetCategory(assetcategory: AssetCategory): Observable<ApiResponse> {
  const id = assetcategory.id;
  delete assetcategory.id;
  const payload = this.utilsService.cleanObject(assetcategory);
  return this.http.put<ApiResponse>(`${this.apiUrl}/asset-categories/${id}`, payload);
 }

createAssetCategory(assetcategory: AssetCategory): Observable<ApiResponse> {
  delete assetcategory.id;
  const payload = this.utilsService.cleanObject(assetcategory);
  return this.http.post<ApiResponse>(`${this.apiUrl}/asset-categories`, payload);
}

deleteAssetCategory(id: AssetCategory['id']): Observable<ApiResponse> {
  return this.http.delete<ApiResponse>(`${this.apiUrl}/asset-categories/${id}`);
}

  getOneAssetCategory(assetcategory, id): AssetCategory {
  return assetcategory.filter(obj => obj.id === id);
  }

  // assignment
  retrieveAssignment(query = ''): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.apiUrl}/asset-request-assignments${query}`);
  }

  updateAssignment(assignment: Assignment): Observable<ApiResponse> {
      const id = assignment.id;
      delete assignment.id;
      const payload = this.utilsService.cleanObject(assignment);
      return this.http.put<ApiResponse>(`${this.apiUrl}/asset-request-assignments/${id}`, payload);
  }

  createAssignment(assignment: Assignment): Observable<ApiResponse> {
      delete assignment.id;
      const payload = this.utilsService.cleanObject(assignment);
      return this.http.post<ApiResponse>(`${this.apiUrl}/asset-request-assignments`, payload);
  }

  assignmentDelete(id: Assignment['id']): Observable<ApiResponse> {
      return this.http.delete<ApiResponse>(`${this.apiUrl}/asset-request-assignments/${id}`);
  }
  // getAssignment(assignments, id): Assignment {
  //       return assignments.filter(obj => obj.id === id);
  //   }
 getOneAssignment(assignemnts, id): Assignment {
        return assignemnts.filter(obj => obj.id === id);
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
}
