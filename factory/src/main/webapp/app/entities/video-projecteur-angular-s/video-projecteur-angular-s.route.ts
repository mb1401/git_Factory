import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VideoProjecteurAngularSComponent } from './video-projecteur-angular-s.component';
import { VideoProjecteurAngularSDetailComponent } from './video-projecteur-angular-s-detail.component';
import { VideoProjecteurAngularSPopupComponent } from './video-projecteur-angular-s-dialog.component';
import { VideoProjecteurAngularSDeletePopupComponent } from './video-projecteur-angular-s-delete-dialog.component';

export const videoProjecteurRoute: Routes = [
    {
        path: 'video-projecteur-angular-s',
        component: VideoProjecteurAngularSComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.videoProjecteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'video-projecteur-angular-s/:id',
        component: VideoProjecteurAngularSDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.videoProjecteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const videoProjecteurPopupRoute: Routes = [
    {
        path: 'video-projecteur-angular-s-new',
        component: VideoProjecteurAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.videoProjecteur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'video-projecteur-angular-s/:id/edit',
        component: VideoProjecteurAngularSPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.videoProjecteur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'video-projecteur-angular-s/:id/delete',
        component: VideoProjecteurAngularSDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'factoryApp.videoProjecteur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
