import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { AuthService } from '../../services/auth.service'
import { SettingsService } from '../../services/settings.service'

@Component({
  selector: 'app-protected-place',
  templateUrl: './protected-place.component.html',
  styleUrls: ['./protected-place.component.css']
})
export class ProtectedPlaceComponent implements OnInit {

  response: string;
  constructor(
      private http: Http,
      private authService: AuthService,
      private settingsService: SettingsService
  ) { }

  ngOnInit() {
    let header = new Headers({ 'Authorization': this.authService.getAuthorizationHeaderValue() });
    let options = new RequestOptions({ headers: header });
    this.http.get(this.settingsService.settings.api.url + "/api/identity", options)
      .subscribe(response => this.response = response.text());
  }
}
