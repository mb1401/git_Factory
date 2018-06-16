import { BaseEntity } from './../../shared';

export class MatiereAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public modules?: BaseEntity[],
        public formateurs?: BaseEntity[],
    ) {
    }
}
