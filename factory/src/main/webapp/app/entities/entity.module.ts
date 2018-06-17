import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FactoryRessourceAngularSModule } from './ressource-angular-s/ressource-angular-s.module';
import { FactoryOrdinateurAngularSModule } from './ordinateur-angular-s/ordinateur-angular-s.module';
import { FactoryVideoProjecteurAngularSModule } from './video-projecteur-angular-s/video-projecteur-angular-s.module';
import { FactorySalleAngularSModule } from './salle-angular-s/salle-angular-s.module';
import { FactoryFormationAngularSModule } from './formation-angular-s/formation-angular-s.module';
import { FactoryModuleAngularSModule } from './module-angular-s/module-angular-s.module';
import { FactoryUtilisateurAngularSModule } from './utilisateur-angular-s/utilisateur-angular-s.module';
import { FactoryTechnicienAngularSModule } from './technicien-angular-s/technicien-angular-s.module';
import { FactoryGestionnaireAngularSModule } from './gestionnaire-angular-s/gestionnaire-angular-s.module';
import { FactoryStagiaireAngularSModule } from './stagiaire-angular-s/stagiaire-angular-s.module';
import { FactoryFormateurAngularSModule } from './formateur-angular-s/formateur-angular-s.module';
import { FactoryMatiereAngularSModule } from './matiere-angular-s/matiere-angular-s.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FactoryRessourceAngularSModule,
        FactoryOrdinateurAngularSModule,
        FactoryVideoProjecteurAngularSModule,
        FactorySalleAngularSModule,
        FactoryFormationAngularSModule,
        FactoryModuleAngularSModule,
        FactoryUtilisateurAngularSModule,
        FactoryTechnicienAngularSModule,
        FactoryGestionnaireAngularSModule,
        FactoryStagiaireAngularSModule,
        FactoryFormateurAngularSModule,
        FactoryMatiereAngularSModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FactoryEntityModule {}
