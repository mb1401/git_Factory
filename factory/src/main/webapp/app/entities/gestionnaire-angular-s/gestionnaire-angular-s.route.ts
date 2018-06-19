import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GestionnaireAngularSComponent } from './gestionnaire-angular-s.component';
import { GestionnaireAngularSDetailComponent } from './gestionnaire-angular-s-detail.component';
import { GestionnaireAngularSPopupComponent } from './gestionnaire-angular-s-dialog.component';
import { GestionnaireAngularSDeletePopupComponent } from './gestionnaire-angular-s-delete-dialog.component';

export const gestionnaireRoute: Routes = [
    {
        path: 'gestionnaire-angular-s',
        component: GestionnaireAngularSComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.gestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gestionnaire-angular-s/:id',
        component: GestionnaireAngularSDetailComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.gestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gestionnairePopupRoute: Routes = [
    {
        path: 'gestionnaire-angular-s-new',
        component: GestionnaireAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.gestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gestionnaire-angular-s/:id/edit',
        component: GestionnaireAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.gestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gestionnaire-angular-s/:id/delete',
        component: GestionnaireAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.gestionnaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
