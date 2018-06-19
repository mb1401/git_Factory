import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ModuleAngularSComponent } from './module-angular-s.component';
import { ModuleAngularSDetailComponent } from './module-angular-s-detail.component';
import { ModuleAngularSPopupComponent } from './module-angular-s-dialog.component';
import { ModuleAngularSDeletePopupComponent } from './module-angular-s-delete-dialog.component';

export const moduleRoute: Routes = [
    {
        path: 'module-angular-s',
        component: ModuleAngularSComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.module.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'module-angular-s/:id',
        component: ModuleAngularSDetailComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.module.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modulePopupRoute: Routes = [
    {
        path: 'module-angular-s-new',
        component: ModuleAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.module.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'module-angular-s/:id/edit',
        component: ModuleAngularSPopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.module.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'module-angular-s/:id/delete',
        component: ModuleAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_MANAGER'],
            pageTitle: 'factoryApp.module.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
