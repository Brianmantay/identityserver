import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { ProtectedPlaceComponent } from './components/protected-place/protected-place.component';
import { APP_INITIALIZER } from '@angular/core';

const routes = [
    { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
    },
    { 
        path: 'home', 
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
    { 
        path: 'protected', 
        component: ProtectedPlaceComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'auth-callback',
        component: AuthCallbackComponent
    },
    { 
        path: '**', 
        redirectTo: 'home' 
    },
];

export function startupServiceFactory(settingsService: SettingsService): Function {
    return () => settingsService.load();
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        AuthCallbackComponent,
        ProtectedPlaceComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        AuthGuardService,
        AuthService,
        SettingsService,
        {
            provide: APP_INITIALIZER,
            useFactory: startupServiceFactory,
            deps: [SettingsService],
            multi: true
        }
  ]
})
export class AppModuleShared {
}
