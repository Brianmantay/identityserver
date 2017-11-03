import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingsService {

    private _settings: any;

    constructor(private http: Http) { }

    load(): Promise<any> {
        return this.loadSettings();
    }

    getSettings(): any {
        if (!this._settings) this.loadSettings();
        return this._settings;
    }

    loadSettings(): Promise<any> {
        return this.http
            .get(window.location.href + 'api/settings')
            .map((res: Response) => res.json())
            .toPromise()
            .then((data: any) => this._settings = data)
            .catch((err: any) => Promise.resolve());
    }
}