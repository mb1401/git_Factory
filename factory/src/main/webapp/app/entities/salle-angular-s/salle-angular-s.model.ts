import { BaseEntity } from './../../shared';

export class SalleAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public capacite?: number,
        public modules?: BaseEntity[],
    ) {
    }
}
