import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './formation-angular-s.pipe';

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
import {CapFilterPipe} from '../salle-angular-s/salle-angular-s.pipe';

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
        FilterPipe,
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
    exports: [
        FilterPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryFormationAngularSModule {}
