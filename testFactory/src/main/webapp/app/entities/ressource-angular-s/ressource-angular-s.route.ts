import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RessourceAngularSComponent } from './ressource-angular-s.component';
import { RessourceAngularSDetailComponent } from './ressource-angular-s-detail.component';
import { RessourceAngularSPopupComponent } from './ressource-angular-s-dialog.component';
import { RessourceAngularSDeletePopupComponent } from './ressource-angular-s-delete-dialog.component';

export const ressourceRoute: Routes = [
    {
        path: 'ressource-angular-s',
        component: RessourceAngularSComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.ressource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ressource-angular-s/:id',
        component: RessourceAngularSDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.ressource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ressourcePopupRoute: Routes = [
    {
        path: 'ressource-angular-s-new',
        component: RessourceAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.ressource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ressource-angular-s/:id/edit',
        component: RessourceAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.ressource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ressource-angular-s/:id/delete',
        component: RessourceAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.ressource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
