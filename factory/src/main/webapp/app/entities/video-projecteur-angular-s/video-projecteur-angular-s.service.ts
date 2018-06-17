import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VideoProjecteurAngularS } from './video-projecteur-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VideoProjecteurAngularS>;

@Injectable()
export class VideoProjecteurAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/video-projecteurs';

    constructor(private http: HttpClient) { }

    create(videoProjecteur: VideoProjecteurAngularS): Observable<EntityResponseType> {
        const copy = this.convert(videoProjecteur);
        return this.http.post<VideoProjecteurAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(videoProjecteur: VideoProjecteurAngularS): Observable<EntityResponseType> {
        const copy = this.convert(videoProjecteur);
        return this.http.put<VideoProjecteurAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VideoProjecteurAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VideoProjecteurAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<VideoProjecteurAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VideoProjecteurAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VideoProjecteurAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VideoProjecteurAngularS[]>): HttpResponse<VideoProjecteurAngularS[]> {
        const jsonResponse: VideoProjecteurAngularS[] = res.body;
        const body: VideoProjecteurAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VideoProjecteurAngularS.
     */
    private convertItemFromServer(videoProjecteur: VideoProjecteurAngularS): VideoProjecteurAngularS {
        const copy: VideoProjecteurAngularS = Object.assign({}, videoProjecteur);
        return copy;
    }

    /**
     * Convert a VideoProjecteurAngularS to a JSON which can be sent to the server.
     */
    private convert(videoProjecteur: VideoProjecteurAngularS): VideoProjecteurAngularS {
        const copy: VideoProjecteurAngularS = Object.assign({}, videoProjecteur);
        return copy;
    }
}
