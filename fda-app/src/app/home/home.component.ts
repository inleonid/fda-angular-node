import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  continents = [];
  loading = true;

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit() {

    this.apollo.watchQuery({
      query: gql`{
        regions {
          id
          code
          name
        }
      }`
    }).valueChanges.subscribe((result: any) => {
      this.continents = result?.data?.regions;
      this.loading = false;
    }); 
  }

  navigateTo(name: string) {
    this.router.navigate(['/continent/' + name]);
  }

}
