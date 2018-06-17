import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StagiaireAngularSComponent } from './stagiaire-angular-s.component';
import { StagiaireAngularSDetailComponent } from './stagiaire-angular-s-detail.component';
import { StagiaireAngularSPopupComponent } from './stagiaire-angular-s-dialog.component';
import { StagiaireAngularSDeletePopupComponent } from './stagiaire-angular-s-delete-dialog.component';

export const stagiaireRoute: Routes = [
    {
        path: 'stagiaire-angular-s',
        component: StagiaireAngularSComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.stagiaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stagiaire-angular-s/:id',
        component: StagiaireAngularSDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.stagiaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stagiairePopupRoute: Routes = [
    {
        path: 'stagiaire-angular-s-new',
        component: StagiaireAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.stagiaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stagiaire-angular-s/:id/edit',
        component: StagiaireAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.stagiaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stagiaire-angular-s/:id/delete',
        component: StagiaireAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.stagiaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
