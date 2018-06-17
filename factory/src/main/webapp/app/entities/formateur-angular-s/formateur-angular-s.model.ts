import { BaseEntity } from './../../shared';

export class FormateurAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public formations?: BaseEntity[],
        public modules?: BaseEntity[],
        public matieres?: BaseEntity[],
    ) {
    }
}
