import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FactorySharedModule } from '../../shared';
import {
    GestionnaireAngularSService,
    GestionnaireAngularSPopupService,
    GestionnaireAngularSComponent,
    GestionnaireAngularSDetailComponent,
    GestionnaireAngularSDialogComponent,
    GestionnaireAngularSPopupComponent,
    GestionnaireAngularSDeletePopupComponent,
    GestionnaireAngularSDeleteDialogComponent,
    gestionnaireRoute,
    gestionnairePopupRoute,
} from './';

const ENTITY_STATES = [
    ...gestionnaireRoute,
    ...gestionnairePopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GestionnaireAngularSComponent,
        GestionnaireAngularSDetailComponent,
        GestionnaireAngularSDialogComponent,
        GestionnaireAngularSDeleteDialogComponent,
        GestionnaireAngularSPopupComponent,
        GestionnaireAngularSDeletePopupComponent,
    ],
    entryComponents: [
        GestionnaireAngularSComponent,
        GestionnaireAngularSDialogComponent,
        GestionnaireAngularSPopupComponent,
        GestionnaireAngularSDeleteDialogComponent,
        GestionnaireAngularSDeletePopupComponent,
    ],
    providers: [
        GestionnaireAngularSService,
        GestionnaireAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryGestionnaireAngularSModule {}
