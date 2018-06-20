import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FactorySharedModule } from '../../shared';
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
import { StagiaireAngularSOfFormationComponent } from './stagiaire-angular-s-of-formation.component';

const ENTITY_STATES = [
    ...stagiaireRoute,
    ...stagiairePopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StagiaireAngularSComponent,
        StagiaireAngularSDetailComponent,
        StagiaireAngularSDialogComponent,
        StagiaireAngularSDeleteDialogComponent,
        StagiaireAngularSPopupComponent,
        StagiaireAngularSDeletePopupComponent,
        StagiaireAngularSOfFormationComponent,
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
export class FactoryStagiaireAngularSModule {}
