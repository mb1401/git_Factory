import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './salle-angular-s.pipe';
import { HttpModule } from '@angular/http';

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
        // BrowserModule,
        // FormsModule,
        // HttpModule,
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FilterPipe,
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
    exports: [
        FilterPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactorySalleAngularSModule {}
