import { BaseEntity } from './../../shared';

export class VideoProjecteurAngularS implements BaseEntity {
    constructor(
        public id?: number,
        public cout?: number,
        public modules?: BaseEntity[],
    ) {
    }
}
