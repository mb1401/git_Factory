import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FactorySharedModule } from '../../shared';
import {
    FormationAngularSService,
    FormationAngularSPopupService,
    FormationAngularSComponent,
    FormationAngularSDetailComponent,
    FormationAngularSDialogComponent,
    FormationAngularSPopupComponent,
    FormationAngularSDeletePopupComponent,
    FormationAngularSDeleteDialogComponent,
    formationRoute,
    formationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...formationRoute,
    ...formationPopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FormationAngularSComponent,
        FormationAngularSDetailComponent,
        FormationAngularSDialogComponent,
        FormationAngularSDeleteDialogComponent,
        FormationAngularSPopupComponent,
        FormationAngularSDeletePopupComponent,
    ],
    entryComponents: [
        FormationAngularSComponent,
        FormationAngularSDialogComponent,
        FormationAngularSPopupComponent,
        FormationAngularSDeleteDialogComponent,
        FormationAngularSDeletePopupComponent,
    ],
    providers: [
        FormationAngularSService,
        FormationAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryFormationAngularSModule {}
