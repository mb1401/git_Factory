import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SalleAngularSComponent } from './salle-angular-s.component';
import { SalleAngularSDetailComponent } from './salle-angular-s-detail.component';
import { SalleAngularSPopupComponent } from './salle-angular-s-dialog.component';
import { SalleAngularSDeletePopupComponent } from './salle-angular-s-delete-dialog.component';

export const salleRoute: Routes = [
    {
        path: 'salle-angular-s',
        component: SalleAngularSComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'salle-angular-s/:id',
        component: SalleAngularSDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sallePopupRoute: Routes = [
    {
        path: 'salle-angular-s-new',
        component: SalleAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salle-angular-s/:id/edit',
        component: SalleAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salle-angular-s/:id/delete',
        component: SalleAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
