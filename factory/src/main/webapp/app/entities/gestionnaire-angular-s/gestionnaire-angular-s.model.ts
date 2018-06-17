import { BaseEntity } from './../../shared';

export class GestionnaireAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public formations?: BaseEntity[],
    ) {
    }
}
