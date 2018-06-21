import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './matiere-angular-s.pipe';

import { FactorySharedModule } from '../../shared';
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
import {CapFilterPipe} from '../salle-angular-s/salle-angular-s.pipe';

const ENTITY_STATES = [
    ...matiereRoute,
    ...matierePopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FilterPipe,
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
    exports: [
        FilterPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryMatiereAngularSModule {}
