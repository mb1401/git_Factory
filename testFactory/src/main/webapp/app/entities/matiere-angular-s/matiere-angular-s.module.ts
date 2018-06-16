import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhypsterSharedModule } from '../../shared';
import {
    MatiereAngularSService,
    MatiereAngularSPopupService,
    MatiereAngularSComponent,
    MatiereAngularSDetailComponent,
    MatiereAngularSDialogComponent,
    MatiereAngularSPopupComponent,
    MatiereAngularSDeletePopupComponent,
    MatiereAngularSDeleteDialogComponent,
    matiereRoute,
    matierePopupRoute,
} from './';

const ENTITY_STATES = [
    ...matiereRoute,
    ...matierePopupRoute,
];

@NgModule({
    imports: [
        TestJhypsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MatiereAngularSComponent,
        MatiereAngularSDetailComponent,
        MatiereAngularSDialogComponent,
        MatiereAngularSDeleteDialogComponent,
        MatiereAngularSPopupComponent,
        MatiereAngularSDeletePopupComponent,
    ],
    entryComponents: [
        MatiereAngularSComponent,
        MatiereAngularSDialogComponent,
        MatiereAngularSPopupComponent,
        MatiereAngularSDeleteDialogComponent,
        MatiereAngularSDeletePopupComponent,
    ],
    providers: [
        MatiereAngularSService,
        MatiereAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhypsterMatiereAngularSModule {}
