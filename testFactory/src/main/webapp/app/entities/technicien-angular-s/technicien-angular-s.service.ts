import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TechnicienAngularS } from './technicien-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TechnicienAngularS>;

@Injectable()
export class TechnicienAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/techniciens';

    constructor(private http: HttpClient) { }

    create(technicien: TechnicienAngularS): Observable<EntityResponseType> {
        const copy = this.convert(technicien);
        return this.http.post<TechnicienAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(technicien: TechnicienAngularS): Observable<EntityResponseType> {
        const copy = this.convert(technicien);
        return this.http.put<TechnicienAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TechnicienAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TechnicienAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<TechnicienAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TechnicienAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TechnicienAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TechnicienAngularS[]>): HttpResponse<TechnicienAngularS[]> {
        const jsonResponse: TechnicienAngularS[] = res.body;
        const body: TechnicienAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TechnicienAngularS.
     */
    private convertItemFromServer(technicien: TechnicienAngularS): TechnicienAngularS {
        const copy: TechnicienAngularS = Object.assign({}, technicien);
        return copy;
    }

    /**
     * Convert a TechnicienAngularS to a JSON which can be sent to the server.
     */
    private convert(technicien: TechnicienAngularS): TechnicienAngularS {
        const copy: TechnicienAngularS = Object.assign({}, technicien);
        return copy;
    }
}
