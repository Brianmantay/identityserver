import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingsService {

    private _settings: Settings;

    constructor(private http: Http) { }

    load(): Promise<Settings> {
        return this.loadSettings();
    }

    get settings(): Settings {
        return this._settings;
    }

    loadSettings(): Promise<Settings> {
        return this.http
            .get(window.location.origin + '/api/settings')
            .map((res: Response) => <Settings>res.json())
            .toPromise()
            .then((data: any) => this._settings = data)
            .catch((err: any) => Promise.resolve());
    }
}

export class Settings {
    ocidClient : {
        authority: string,
        client_id: string,
        redirect_uri: string,
        post_logout_redirect_uri: string,
        response_type: string,
        scope: string,
        filterProtocolClaims:boolean
        loadUserInfo:boolean
    }
    api: {
        url: string
    }
}