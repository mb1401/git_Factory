import { BaseEntity } from './../../shared';
import {OrdinateurAngularS} from '../ordinateur-angular-s';
import {FormationAngularS} from '../formation-angular-s';

export class StagiaireAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public numeroRue?: string,
        public codePostal?: string,
        public ville?: string,
        public pays?: string,
        public mail?: string,
        public numeroTel?: string,
        public username?: string,
        public password?: string,
        public enable?: boolean,
        public formationId?: number,
        public formation?: FormationAngularS,
        public ordinateurId?: number,
        public ordinateur?: OrdinateurAngularS
    ) {
        this.enable = false;
    }
}
