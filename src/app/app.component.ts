import { Component, OnInit } from '@angular/core';
import { CompanyService } from './services/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  comapanyList: Observable<any>;
  company_name: string;
  company_location: string;
  constructor(private cs: CompanyService) {  }

  ngOnInit() {
    this.comapanyList = this.cs.getCompanyList();
  }

  async addCompanyHandler() {
    const response = await this.cs.addCompanyHandler({
        company_name: this.company_name,
        company_location: this.company_location
    });
    if (response) {
      this.company_name = '';
      this.company_location = '';
    }

    setTimeout(() => {
      this.comapanyList = this.cs.getCompanyList()
    }, 100);
  }
}
