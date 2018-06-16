import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GestionnaireAngularS } from './gestionnaire-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GestionnaireAngularS>;

@Injectable()
export class GestionnaireAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/gestionnaires';

    constructor(private http: HttpClient) { }

    create(gestionnaire: GestionnaireAngularS): Observable<EntityResponseType> {
        const copy = this.convert(gestionnaire);
        return this.http.post<GestionnaireAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(gestionnaire: GestionnaireAngularS): Observable<EntityResponseType> {
        const copy = this.convert(gestionnaire);
        return this.http.put<GestionnaireAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GestionnaireAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GestionnaireAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<GestionnaireAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GestionnaireAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GestionnaireAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GestionnaireAngularS[]>): HttpResponse<GestionnaireAngularS[]> {
        const jsonResponse: GestionnaireAngularS[] = res.body;
        const body: GestionnaireAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GestionnaireAngularS.
     */
    private convertItemFromServer(gestionnaire: GestionnaireAngularS): GestionnaireAngularS {
        const copy: GestionnaireAngularS = Object.assign({}, gestionnaire);
        return copy;
    }

    /**
     * Convert a GestionnaireAngularS to a JSON which can be sent to the server.
     */
    private convert(gestionnaire: GestionnaireAngularS): GestionnaireAngularS {
        const copy: GestionnaireAngularS = Object.assign({}, gestionnaire);
        return copy;
    }
}
