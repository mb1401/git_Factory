import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FormationAngularSComponent } from './formation-angular-s.component';
import { FormationAngularSDetailComponent } from './formation-angular-s-detail.component';
import { FormationAngularSPopupComponent } from './formation-angular-s-dialog.component';
import { FormationAngularSDeletePopupComponent } from './formation-angular-s-delete-dialog.component';

export const formationRoute: Routes = [
    {
        path: 'formation-angular-s',
        component: FormationAngularSComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'formation-angular-s/:id',
        component: FormationAngularSDetailComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formationPopupRoute: Routes = [
    {
        path: 'formation-angular-s-new',
        component: FormationAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formation-angular-s/:id/edit',
        component: FormationAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formation-angular-s/:id/delete',
        component: FormationAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.formation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
