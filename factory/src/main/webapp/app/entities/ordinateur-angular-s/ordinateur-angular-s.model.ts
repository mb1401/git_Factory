import { BaseEntity } from './../../shared';

export const enum Processeur {
    'P1',
    'P2',
    'P3'
}

export class OrdinateurAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public cout?: number,
        public processeur?: Processeur,
        public ram?: number,
        public quantiteDD?: number,
        public dateAchat?: any,
        public stagiaires?: BaseEntity[],
    ) {
    }
}
