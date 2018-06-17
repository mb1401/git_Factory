import { BaseEntity } from './../../shared';

export class VideoProjecteurAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public modules?: BaseEntity[],
    ) {
    }
}
