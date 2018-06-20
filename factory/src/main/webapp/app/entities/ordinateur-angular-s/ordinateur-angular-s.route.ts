import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared/index';
import { OrdinateurAngularSComponent } from './ordinateur-angular-s.component';
import { OrdinateurAngularSDetailComponent } from './ordinateur-angular-s-detail.component';
import { OrdinateurAngularSPopupComponent } from './ordinateur-angular-s-dialog.component';
import { OrdinateurAngularSDeletePopupComponent } from './ordinateur-angular-s-delete-dialog.component';

export const ordinateurRoute: Routes = [
    {
        path: 'ordinateur-angular-s',
        component: OrdinateurAngularSComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.ordinateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ordinateur-angular-s/:id',
        component: OrdinateurAngularSDetailComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.ordinateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ordinateurPopupRoute: Routes = [
    {
        path: 'ordinateur-angular-s-new',
        component: OrdinateurAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.ordinateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ordinateur-angular-s/:id/edit',
        component: OrdinateurAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.ordinateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ordinateur-angular-s/:id/delete',
        component: OrdinateurAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.ordinateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
