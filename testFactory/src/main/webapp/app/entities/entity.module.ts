import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestJhypsterRessourceAngularSModule } from './ressource-angular-s/ressource-angular-s.module';
import { TestJhypsterOrdinateurAngularSModule } from './ordinateur-angular-s/ordinateur-angular-s.module';
import { TestJhypsterVideoProjecteurAngularSModule } from './video-projecteur-angular-s/video-projecteur-angular-s.module';
import { TestJhypsterSalleAngularSModule } from './salle-angular-s/salle-angular-s.module';
import { TestJhypsterFormationAngularSModule } from './formation-angular-s/formation-angular-s.module';
import { TestJhypsterModuleAngularSModule } from './module-angular-s/module-angular-s.module';
import { TestJhypsterUtilisateurAngularSModule } from './utilisateur-angular-s/utilisateur-angular-s.module';
import { TestJhypsterTechnicienAngularSModule } from './technicien-angular-s/technicien-angular-s.module';
import { TestJhypsterGestionnaireAngularSModule } from './gestionnaire-angular-s/gestionnaire-angular-s.module';
import { TestJhypsterStagiaireAngularSModule } from './stagiaire-angular-s/stagiaire-angular-s.module';
import { TestJhypsterFormateurAngularSModule } from './formateur-angular-s/formateur-angular-s.module';
import { TestJhypsterMatiereAngularSModule } from './matiere-angular-s/matiere-angular-s.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TestJhypsterRessourceAngularSModule,
        TestJhypsterOrdinateurAngularSModule,
        TestJhypsterVideoProjecteurAngularSModule,
        TestJhypsterSalleAngularSModule,
        TestJhypsterFormationAngularSModule,
        TestJhypsterModuleAngularSModule,
        TestJhypsterUtilisateurAngularSModule,
        TestJhypsterTechnicienAngularSModule,
        TestJhypsterGestionnaireAngularSModule,
        TestJhypsterStagiaireAngularSModule,
        TestJhypsterFormateurAngularSModule,
        TestJhypsterMatiereAngularSModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhypsterEntityModule {}
