import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FormateurAngularSComponent } from './formateur-angular-s.component';
import { FormateurAngularSDetailComponent } from './formateur-angular-s-detail.component';
import { FormateurAngularSPopupComponent } from './formateur-angular-s-dialog.component';
import { FormateurAngularSDeletePopupComponent } from './formateur-angular-s-delete-dialog.component';

export const formateurRoute: Routes = [
    {
        path: 'formateur-angular-s',
        component: FormateurAngularSComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'formateur-angular-s/:id',
        component: FormateurAngularSDetailComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formateurPopupRoute: Routes = [
    {
        path: 'formateur-angular-s-new',
        component: FormateurAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formateur-angular-s/:id/edit',
        component: FormateurAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formateur-angular-s/:id/delete',
        component: FormateurAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
