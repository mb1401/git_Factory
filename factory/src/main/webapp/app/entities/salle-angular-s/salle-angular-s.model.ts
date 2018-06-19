import { BaseEntity } from './../../shared';

export class SalleAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public cout?: number,
        public capacite?: number,
        public modules?: BaseEntity[],
    ) {
    }
}
