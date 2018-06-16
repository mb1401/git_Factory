import { BaseEntity } from './../../shared';

export const enum Niveau {
    'FACILE',
    'MOYEN',
    'DIFFICILE'
}

export class ModuleAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public tire?: string,
        public contenu?: string,
        public objectif?: string,
        public niveau?: Niveau,
        public dateDebut?: any,
        public dateFin?: any,
        public formationId?: number,
        public formateurId?: number,
        public matiereId?: number,
        public salleId?: number,
        public videoProjecteurId?: number,
    ) {
    }
}
