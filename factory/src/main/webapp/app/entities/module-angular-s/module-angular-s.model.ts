import { BaseEntity } from './../../shared';
import {FormateurAngularS, FormateurAngularSDetailComponent} from "../formateur-angular-s";

export const enum Niveau {
    'FACILE',
    'MOYEN',
    'DIFFICILE'
}

export class ModuleAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public titre?: string,
        public contenu?: string,
        public objectif?: string,
        public niveau?: Niveau,
        public dateDebut?: any,
        public dateFin?: any,
        public formationId?: number,
        public formateurId?: number,
        public formateur?: FormateurAngularS,
        public matiereId?: number,
        public salleId?: number,
        public videoProjecteurId?: number,
    ) {
    }
}
