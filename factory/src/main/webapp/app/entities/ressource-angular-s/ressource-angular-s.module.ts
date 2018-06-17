import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FactorySharedModule } from '../../shared';
import {
    RessourceAngularSService,
    RessourceAngularSPopupService,
    RessourceAngularSComponent,
    RessourceAngularSDetailComponent,
    RessourceAngularSDialogComponent,
    RessourceAngularSPopupComponent,
    RessourceAngularSDeletePopupComponent,
    RessourceAngularSDeleteDialogComponent,
    ressourceRoute,
    ressourcePopupRoute,
} from './';

const ENTITY_STATES = [
    ...ressourceRoute,
    ...ressourcePopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RessourceAngularSComponent,
        RessourceAngularSDetailComponent,
        RessourceAngularSDialogComponent,
        RessourceAngularSDeleteDialogComponent,
        RessourceAngularSPopupComponent,
        RessourceAngularSDeletePopupComponent,
    ],
    entryComponents: [
        RessourceAngularSComponent,
        RessourceAngularSDialogComponent,
        RessourceAngularSPopupComponent,
        RessourceAngularSDeleteDialogComponent,
        RessourceAngularSDeletePopupComponent,
    ],
    providers: [
        RessourceAngularSService,
        RessourceAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryRessourceAngularSModule {}
