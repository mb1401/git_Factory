import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhypsterSharedModule } from '../../shared';
import {
    UtilisateurAngularSService,
    UtilisateurAngularSPopupService,
    UtilisateurAngularSComponent,
    UtilisateurAngularSDetailComponent,
    UtilisateurAngularSDialogComponent,
    UtilisateurAngularSPopupComponent,
    UtilisateurAngularSDeletePopupComponent,
    UtilisateurAngularSDeleteDialogComponent,
    utilisateurRoute,
    utilisateurPopupRoute,
} from './';

const ENTITY_STATES = [
    ...utilisateurRoute,
    ...utilisateurPopupRoute,
];

@NgModule({
    imports: [
        TestJhypsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UtilisateurAngularSComponent,
        UtilisateurAngularSDetailComponent,
        UtilisateurAngularSDialogComponent,
        UtilisateurAngularSDeleteDialogComponent,
        UtilisateurAngularSPopupComponent,
        UtilisateurAngularSDeletePopupComponent,
    ],
    entryComponents: [
        UtilisateurAngularSComponent,
        UtilisateurAngularSDialogComponent,
        UtilisateurAngularSPopupComponent,
        UtilisateurAngularSDeleteDialogComponent,
        UtilisateurAngularSDeletePopupComponent,
    ],
    providers: [
        UtilisateurAngularSService,
        UtilisateurAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhypsterUtilisateurAngularSModule {}
