import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UtilisateurAngularSComponent } from './utilisateur-angular-s.component';
import { UtilisateurAngularSDetailComponent } from './utilisateur-angular-s-detail.component';
import { UtilisateurAngularSPopupComponent } from './utilisateur-angular-s-dialog.component';
import { UtilisateurAngularSDeletePopupComponent } from './utilisateur-angular-s-delete-dialog.component';

export const utilisateurRoute: Routes = [
    {
        path: 'utilisateur-angular-s',
        component: UtilisateurAngularSComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'utilisateur-angular-s/:id',
        component: UtilisateurAngularSDetailComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const utilisateurPopupRoute: Routes = [
    {
        path: 'utilisateur-angular-s-new',
        component: UtilisateurAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utilisateur-angular-s/:id/edit',
        component: UtilisateurAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utilisateur-angular-s/:id/delete',
        component: UtilisateurAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.utilisateur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
