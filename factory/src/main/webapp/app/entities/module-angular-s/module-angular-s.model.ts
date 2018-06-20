import { BaseEntity } from './../../shared';
import {FormateurAngularS, FormateurAngularSDetailComponent} from '../formateur-angular-s';
import {MatiereAngularS} from '../matiere-angular-s';
import {SalleAngularS} from '../salle-angular-s';
import {VideoProjecteurAngularS} from '../video-projecteur-angular-s';
import {FormationAngularS} from '../formation-angular-s';

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
        public matiere?: MatiereAngularS,
        public salleId?: number,
        public salle?: SalleAngularS,
        public formation?: FormationAngularS,
        public videoProjecteurId?: number,
        public videoProjecteur?: VideoProjecteurAngularS

    ) {
    }
}
