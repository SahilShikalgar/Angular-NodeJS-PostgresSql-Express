import { Component, OnInit } from '@angular/core';
import { CompanyService } from './services/company.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  comapanyList: Array<any>;
  company_name: string;
  company_location: string;
  editMode = false;
  selectedCompanyIndex;
  selectedCompanyId;
  subscription: Subscription;
  constructor(private cs: CompanyService) {  }

  ngOnInit() {
    this.getCompaniesList();
  }

  getCompaniesList() {
    this.subscription ? this.subscription.unsubscribe() : null;
    this.subscription = this.cs.getCompanyList().subscribe(companyList => {
      this.comapanyList = companyList.reverse();
    });
  }

  async addCompanyHandler() {
    if (this.editMode) {
      const response = await this.cs.updateCompanyHandler({
        company_name: this.company_name,
        company_location: this.company_location,
        id: this.selectedCompanyId
      });
      if (response) {
        const nextState = {
          id: this.selectedCompanyId,
          name: this.company_name,
          location: this.company_location
        };
        this.comapanyList[this.selectedCompanyIndex] = nextState;
        this.selectedCompanyIndex = -1;
        this.editMode = false;
      }
    }
    else {
      const response = await this.cs.addCompanyHandler({
          company_name: this.company_name,
          company_location: this.company_location
      });
      if (response) {
        setTimeout(() => {
          this.getCompaniesList();
        }, 100)
      }
    }
    this.setInputFieldValues('', '');
  }

  async onEditCompany(index: number) {
    this.editMode = true;
    this.selectedCompanyIndex = index;
    const selectedCompany = this.comapanyList[index];
    this.selectedCompanyId = selectedCompany.id;
    this.setInputFieldValues(selectedCompany.name, selectedCompany.location);
  }

  async onDeleteCompany(index: number) {
    const idToDelete = this.comapanyList[index].id;
    const response = await this.cs.deleteCompanyHandler(idToDelete);
    if (response) {
      this.comapanyList.splice(index, 1);
    }
  }

  setInputFieldValues(name, location) {
    this.company_name = name;
    this.company_location = location;
  }

  onCancelEdit() {
    this.editMode = false;
    this.setInputFieldValues('', '');
  }
}
