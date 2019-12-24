import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  getCompanyList(): Observable<any> {
    return this.http.get<Observable<any>>('http://localhost:3000/company');
  }

  addCompanyHandler(companyData) {
    return this.http.post('http://localhost:3000/add-company', companyData).subscribe(response => {
      return response;
    });
  }
}
