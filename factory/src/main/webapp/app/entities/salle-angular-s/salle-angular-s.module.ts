import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FactorySharedModule } from '../../shared';
import {
    SalleAngularSService,
    SalleAngularSPopupService,
    SalleAngularSComponent,
    SalleAngularSDetailComponent,
    SalleAngularSDialogComponent,
    SalleAngularSPopupComponent,
    SalleAngularSDeletePopupComponent,
    SalleAngularSDeleteDialogComponent,
    salleRoute,
    sallePopupRoute,
} from './';

const ENTITY_STATES = [
    ...salleRoute,
    ...sallePopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SalleAngularSComponent,
        SalleAngularSDetailComponent,
        SalleAngularSDialogComponent,
        SalleAngularSDeleteDialogComponent,
        SalleAngularSPopupComponent,
        SalleAngularSDeletePopupComponent,
    ],
    entryComponents: [
        SalleAngularSComponent,
        SalleAngularSDialogComponent,
        SalleAngularSPopupComponent,
        SalleAngularSDeleteDialogComponent,
        SalleAngularSDeletePopupComponent,
    ],
    providers: [
        SalleAngularSService,
        SalleAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactorySalleAngularSModule {}
