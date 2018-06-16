import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhypsterSharedModule } from '../../shared';
import {
    TechnicienAngularSService,
    TechnicienAngularSPopupService,
    TechnicienAngularSComponent,
    TechnicienAngularSDetailComponent,
    TechnicienAngularSDialogComponent,
    TechnicienAngularSPopupComponent,
    TechnicienAngularSDeletePopupComponent,
    TechnicienAngularSDeleteDialogComponent,
    technicienRoute,
    technicienPopupRoute,
} from './';

const ENTITY_STATES = [
    ...technicienRoute,
    ...technicienPopupRoute,
];

@NgModule({
    imports: [
        TestJhypsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TechnicienAngularSComponent,
        TechnicienAngularSDetailComponent,
        TechnicienAngularSDialogComponent,
        TechnicienAngularSDeleteDialogComponent,
        TechnicienAngularSPopupComponent,
        TechnicienAngularSDeletePopupComponent,
    ],
    entryComponents: [
        TechnicienAngularSComponent,
        TechnicienAngularSDialogComponent,
        TechnicienAngularSPopupComponent,
        TechnicienAngularSDeleteDialogComponent,
        TechnicienAngularSDeletePopupComponent,
    ],
    providers: [
        TechnicienAngularSService,
        TechnicienAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhypsterTechnicienAngularSModule {}
