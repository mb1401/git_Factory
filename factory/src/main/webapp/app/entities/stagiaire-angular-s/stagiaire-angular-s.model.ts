import { BaseEntity } from './../../shared';

export class StagiaireAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public numeroRue?: string,
        public rue?: string,
        public codePostal?: string,
        public ville?: string,
        public pays?: string,
        public mail?: string,
        public numeroTel?: string,
        public username?: string,
        public password?: string,
        public enable?: boolean,
        public formationId?: number,
        public ordinateurId?: number,
    ) {
        this.enable = false;
    }
}
