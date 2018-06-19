import { BaseEntity } from './../../shared';

export class RessourceAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public cout?: number,
    ) {
    }
}
