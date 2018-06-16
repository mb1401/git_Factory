import { BaseEntity } from './../../shared';

export class FormateurAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public modules?: BaseEntity[],
        public formations?: BaseEntity[],
        public matieres?: BaseEntity[],
    ) {
    }
}
