import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TechnicienAngularSComponent } from './technicien-angular-s.component';
import { TechnicienAngularSDetailComponent } from './technicien-angular-s-detail.component';
import { TechnicienAngularSPopupComponent } from './technicien-angular-s-dialog.component';
import { TechnicienAngularSDeletePopupComponent } from './technicien-angular-s-delete-dialog.component';

export const technicienRoute: Routes = [
    {
        path: 'technicien-angular-s',
        component: TechnicienAngularSComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.technicien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'technicien-angular-s/:id',
        component: TechnicienAngularSDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.technicien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const technicienPopupRoute: Routes = [
    {
        path: 'technicien-angular-s-new',
        component: TechnicienAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.technicien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'technicien-angular-s/:id/edit',
        component: TechnicienAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.technicien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'technicien-angular-s/:id/delete',
        component: TechnicienAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhypsterApp.technicien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
