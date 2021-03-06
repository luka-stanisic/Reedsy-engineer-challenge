import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchText: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(){
    if(this.searchText){
      this.router.navigate(['/books'], { queryParams: { search: this.searchText } });
      this.searchText = '';
    }
  }

}
