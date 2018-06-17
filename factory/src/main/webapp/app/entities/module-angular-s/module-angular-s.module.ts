import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FactorySharedModule } from '../../shared';
import {
    ModuleAngularSService,
    ModuleAngularSPopupService,
    ModuleAngularSComponent,
    ModuleAngularSDetailComponent,
    ModuleAngularSDialogComponent,
    ModuleAngularSPopupComponent,
    ModuleAngularSDeletePopupComponent,
    ModuleAngularSDeleteDialogComponent,
    moduleRoute,
    modulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...moduleRoute,
    ...modulePopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ModuleAngularSComponent,
        ModuleAngularSDetailComponent,
        ModuleAngularSDialogComponent,
        ModuleAngularSDeleteDialogComponent,
        ModuleAngularSPopupComponent,
        ModuleAngularSDeletePopupComponent,
    ],
    entryComponents: [
        ModuleAngularSComponent,
        ModuleAngularSDialogComponent,
        ModuleAngularSPopupComponent,
        ModuleAngularSDeleteDialogComponent,
        ModuleAngularSDeletePopupComponent,
    ],
    providers: [
        ModuleAngularSService,
        ModuleAngularSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryModuleAngularSModule {}
