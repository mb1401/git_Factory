import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhypsterSharedModule } from '../../shared';
import {
    VideoProjecteurAngularSService,
    VideoProjecteurAngularSPopupService,
    VideoProjecteurAngularSComponent,
    VideoProjecteurAngularSDetailComponent,
    VideoProjecteurAngularSDialogComponent,
    VideoProjecteurAngularSPopupComponent,
    VideoProjecteurAngularSDeletePopupComponent,
    VideoProjecteurAngularSDeleteDialogComponent,
    videoProjecteurRoute,
    videoProjecteurPopupRoute,
} from './';

const ENTITY_STATES = [
    ...videoProjecteurRoute,
    ...videoProjecteurPopupRoute,
];

@NgModule({
    imports: [
        TestJhypsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VideoProjecteurAngularSComponent,
        VideoProjecteurAngularSDetailComponent,
        VideoProjecteurAngularSDialogComponent,
        VideoProjecteurAngularSDeleteDialogComponent,
        VideoProjecteurAngularSPopupComponent,
        VideoProjecteurAngularSDeletePopupComponent,
    ],
    entryComponents: [
        VideoProjecteurAngularSComponent,
        VideoProjecteurAngularSDialogComponent,
        VideoProjecteurAngularSPopupComponent,
        VideoProjecteurAngularSDeleteDialogComponent,
        VideoProjecteurAngularSDeletePopupComponent,
    ],
    providers: [
        VideoProjecteurAngularSService,
        VideoProjecteurAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhypsterVideoProjecteurAngularSModule {}
