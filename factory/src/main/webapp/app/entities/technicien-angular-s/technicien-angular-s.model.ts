import { BaseEntity } from './../../shared';

export class TechnicienAngularS implements BaseEntity {
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
    ) {
        this.enable = false;
    }
}
