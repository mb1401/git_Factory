import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhypsterSharedModule } from '../../shared';
import {
    StagiaireAngularSService,
    StagiaireAngularSPopupService,
    StagiaireAngularSComponent,
    StagiaireAngularSDetailComponent,
    StagiaireAngularSDialogComponent,
    StagiaireAngularSPopupComponent,
    StagiaireAngularSDeletePopupComponent,
    StagiaireAngularSDeleteDialogComponent,
    stagiaireRoute,
    stagiairePopupRoute,
} from './';

const ENTITY_STATES = [
    ...stagiaireRoute,
    ...stagiairePopupRoute,
];

@NgModule({
    imports: [
        TestJhypsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StagiaireAngularSComponent,
        StagiaireAngularSDetailComponent,
        StagiaireAngularSDialogComponent,
        StagiaireAngularSDeleteDialogComponent,
        StagiaireAngularSPopupComponent,
        StagiaireAngularSDeletePopupComponent,
    ],
    entryComponents: [
        StagiaireAngularSComponent,
        StagiaireAngularSDialogComponent,
        StagiaireAngularSPopupComponent,
        StagiaireAngularSDeleteDialogComponent,
        StagiaireAngularSDeletePopupComponent,
    ],
    providers: [
        StagiaireAngularSService,
        StagiaireAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhypsterStagiaireAngularSModule {}
