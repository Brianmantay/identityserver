import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-protected-place',
  templateUrl: './protected-place.component.html',
  styleUrls: ['./protected-place.component.css']
})
export class ProtectedPlaceComponent implements OnInit {

  response: string;
  constructor(private http: Http, private authService: AuthService) { }

  ngOnInit() {
    let header = new Headers({ 'Authorization': this.authService.getAuthorizationHeaderValue() });
    let options = new RequestOptions({ headers: header });
    this.http.get("http://localhost:5001/api/identity", options)
      .subscribe(response => this.response = response.text());
  }
}
