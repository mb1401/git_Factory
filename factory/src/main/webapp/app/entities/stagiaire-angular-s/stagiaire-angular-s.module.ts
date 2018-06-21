import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './stagiaire-angular-s.pipe';

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
import {CapFilterPipe} from '../salle-angular-s/salle-angular-s.pipe';

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
        FilterPipe,
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
    exports: [
        FilterPipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryStagiaireAngularSModule {}
