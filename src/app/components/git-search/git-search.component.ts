import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DataObj} from '../../models/models';
import {SelectService} from '../../services/select.service';
import {PaginationService} from '../../services/pagination.service';


@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit  {


  searchData: DataObj
  searchTypes: DataObj
  pages: any
  input: string
  currentPage

  constructor(private paginationService: PaginationService, private apiService: ApiService, private selectService: SelectService) { }

  ngOnInit(): void {
    this.searchTypes = this.selectService.createData();

  }

  setSearchType(selected: any): void {
    this.selectService.updateStatus(selected, this.searchTypes)
  }

  openGitProfile(item:any): void {
    window.open('http://github.com/' + item.login)
  }

  changePage(page:Number): void {
   this.currentPage = page
   this.getUserData()
  }

  setSearchData(value:DataObj){
    this.searchData=value
  }

  setPages(){
    this.pages=this.paginationService
      .getPages(this.currentPage ? this.currentPage : 1, this.searchData.total_count)
  }

  getUserData(): void {

  if (typeof this.input !== 'undefined' && this.input.length !== 0){
    const searchParam = this.searchTypes.find(item => (item.checked === true));
      this.apiService.fetch(searchParam.value, this.input, this.currentPage ? this.currentPage : 1)
          .subscribe((res:DataObj) => {
              this.setSearchData(res)
              this.setPages()
      },
      (error) => {
         console.log('getData not implemented', error.status)
      });

  }

  }
}
