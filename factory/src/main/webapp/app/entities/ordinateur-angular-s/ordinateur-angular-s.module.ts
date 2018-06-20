import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FactorySharedModule } from '../../shared/index';
import {
    OrdinateurAngularSService,
    OrdinateurAngularSPopupService,
    OrdinateurAngularSComponent,
    OrdinateurAngularSDetailComponent,
    OrdinateurAngularSDialogComponent,
    OrdinateurAngularSPopupComponent,
    OrdinateurAngularSDeletePopupComponent,
    OrdinateurAngularSDeleteDialogComponent,
    ordinateurRoute,
    ordinateurPopupRoute
} from './index';
const ENTITY_STATES = [
    ...ordinateurRoute,
    ...ordinateurPopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrdinateurAngularSComponent,
        OrdinateurAngularSDetailComponent,
        OrdinateurAngularSDialogComponent,
        OrdinateurAngularSDeleteDialogComponent,
        OrdinateurAngularSPopupComponent,
        OrdinateurAngularSDeletePopupComponent,
    ],
    entryComponents: [
        OrdinateurAngularSComponent,
        OrdinateurAngularSDialogComponent,
        OrdinateurAngularSPopupComponent,
        OrdinateurAngularSDeleteDialogComponent,
        OrdinateurAngularSDeletePopupComponent
    ],
    providers: [
        OrdinateurAngularSService,
        OrdinateurAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [OrdinateurAngularSComponent]
})
export class FactoryOrdinateurAngularSModule {}
