import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SalleAngularS } from './salle-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SalleAngularS>;

@Injectable()
export class SalleAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/salles';

    constructor(private http: HttpClient) { }

    create(salle: SalleAngularS): Observable<EntityResponseType> {
        const copy = this.convert(salle);
        return this.http.post<SalleAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(salle: SalleAngularS): Observable<EntityResponseType> {
        const copy = this.convert(salle);
        return this.http.put<SalleAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SalleAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SalleAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalleAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SalleAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SalleAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SalleAngularS[]>): HttpResponse<SalleAngularS[]> {
        const jsonResponse: SalleAngularS[] = res.body;
        const body: SalleAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SalleAngularS.
     */
    private convertItemFromServer(salle: SalleAngularS): SalleAngularS {
        const copy: SalleAngularS = Object.assign({}, salle);
        return copy;
    }

    /**
     * Convert a SalleAngularS to a JSON which can be sent to the server.
     */
    private convert(salle: SalleAngularS): SalleAngularS {
        const copy: SalleAngularS = Object.assign({}, salle);
        return copy;
    }
}
