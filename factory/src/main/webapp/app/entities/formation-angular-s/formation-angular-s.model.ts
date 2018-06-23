import { BaseEntity } from './../../shared';
import {FormateurAngularS} from '../formateur-angular-s';
import {GestionnaireAngularS} from '../gestionnaire-angular-s';

export class FormationAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public dateDebut?: any,
        public dateFin?: any,
        public description?: string,
        public stagiaires?: BaseEntity[],
        public modules?: BaseEntity[],
        public formateurId?: number,
        public formateur?: FormateurAngularS,
        public gestionnaire?: GestionnaireAngularS,
        public gestionnaireId?: number,
    ) {
    }
}
