import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhypsterSharedModule } from '../../shared';
import {
    FormateurAngularSService,
    FormateurAngularSPopupService,
    FormateurAngularSComponent,
    FormateurAngularSDetailComponent,
    FormateurAngularSDialogComponent,
    FormateurAngularSPopupComponent,
    FormateurAngularSDeletePopupComponent,
    FormateurAngularSDeleteDialogComponent,
    formateurRoute,
    formateurPopupRoute,
} from './';

const ENTITY_STATES = [
    ...formateurRoute,
    ...formateurPopupRoute,
];

@NgModule({
    imports: [
        TestJhypsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FormateurAngularSComponent,
        FormateurAngularSDetailComponent,
        FormateurAngularSDialogComponent,
        FormateurAngularSDeleteDialogComponent,
        FormateurAngularSPopupComponent,
        FormateurAngularSDeletePopupComponent,
    ],
    entryComponents: [
        FormateurAngularSComponent,
        FormateurAngularSDialogComponent,
        FormateurAngularSPopupComponent,
        FormateurAngularSDeleteDialogComponent,
        FormateurAngularSDeletePopupComponent,
    ],
    providers: [
        FormateurAngularSService,
        FormateurAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhypsterFormateurAngularSModule {}
