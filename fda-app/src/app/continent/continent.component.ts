import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.css']
})
export class ContinentComponent implements OnInit, OnDestroy {

  id: string
  private sub: any;
  countries = [];
  loading = true;
 

  constructor(private route: ActivatedRoute, private _location: Location, private apollo: Apollo) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;

    });
    this.apollo.watchQuery({
      query: gql`{
        countries(name:"${this.id}") {
          name
          callingCodes
          capital
          currencies{
            symbol
            name
            code
          }
          languages{
            name
            iso639_1
          }
          flag
        }
      }`
    }).valueChanges.subscribe((result: any) => {
      this.countries = result?.data?.countries;
      this.loading = false;
    }); 

  }

  ngOnDestroy() {
    this.sub.unsubscribe();   
  }

  backClicked() {
    this._location.back();
  }

}
