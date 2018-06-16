import { BaseEntity } from './../../shared';

export class FormationAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public dateDebut?: any,
        public dateFin?: any,
        public description?: string,
        public stagiaires?: BaseEntity[],
        public modules?: BaseEntity[],
        public formateurs?: BaseEntity[],
        public gestionnaireId?: number,
    ) {
    }
}
