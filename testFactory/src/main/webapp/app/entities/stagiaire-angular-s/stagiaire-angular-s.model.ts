import { BaseEntity } from './../../shared';

export class StagiaireAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public formationId?: number,
        public ordinateurId?: number,
    ) {
    }
}
