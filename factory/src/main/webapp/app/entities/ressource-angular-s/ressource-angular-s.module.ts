import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './ressource-angular-s.pipe';

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
    ressourcePopupRoute
} from './';
import {OrdinateurAngularSComponent} from '../ordinateur-angular-s';
import {FactoryOrdinateurAngularSModule} from '../ordinateur-angular-s/ordinateur-angular-s.module';
import {CapFilterPipe} from '../salle-angular-s/salle-angular-s.pipe';
const ENTITY_STATES = [
    ...ressourceRoute,
    ...ressourcePopupRoute,
];

@NgModule({
    imports: [
        FactorySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        FactoryOrdinateurAngularSModule
    ],
    declarations: [
        FilterPipe,
        RessourceAngularSComponent,
        RessourceAngularSDetailComponent,
        RessourceAngularSDialogComponent,
        RessourceAngularSDeleteDialogComponent,
        RessourceAngularSPopupComponent,
        RessourceAngularSDeletePopupComponent
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
    exports: [
        FilterPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryRessourceAngularSModule {}
