import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MatiereAngularSComponent } from './matiere-angular-s.component';
import { MatiereAngularSDetailComponent } from './matiere-angular-s-detail.component';
import { MatiereAngularSPopupComponent } from './matiere-angular-s-dialog.component';
import { MatiereAngularSDeletePopupComponent } from './matiere-angular-s-delete-dialog.component';

export const matiereRoute: Routes = [
    {
        path: 'matiere-angular-s',
        component: MatiereAngularSComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.matiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'matiere-angular-s/:id',
        component: MatiereAngularSDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.matiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const matierePopupRoute: Routes = [
    {
        path: 'matiere-angular-s-new',
        component: MatiereAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.matiere.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'matiere-angular-s/:id/edit',
        component: MatiereAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.matiere.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'matiere-angular-s/:id/delete',
        component: MatiereAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.matiere.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
