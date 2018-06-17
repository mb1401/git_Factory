import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UtilisateurAngularS } from './utilisateur-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UtilisateurAngularS>;

@Injectable()
export class UtilisateurAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/utilisateurs';

    constructor(private http: HttpClient) { }

    create(utilisateur: UtilisateurAngularS): Observable<EntityResponseType> {
        const copy = this.convert(utilisateur);
        return this.http.post<UtilisateurAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(utilisateur: UtilisateurAngularS): Observable<EntityResponseType> {
        const copy = this.convert(utilisateur);
        return this.http.put<UtilisateurAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UtilisateurAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UtilisateurAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<UtilisateurAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UtilisateurAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UtilisateurAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UtilisateurAngularS[]>): HttpResponse<UtilisateurAngularS[]> {
        const jsonResponse: UtilisateurAngularS[] = res.body;
        const body: UtilisateurAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UtilisateurAngularS.
     */
    private convertItemFromServer(utilisateur: UtilisateurAngularS): UtilisateurAngularS {
        const copy: UtilisateurAngularS = Object.assign({}, utilisateur);
        return copy;
    }

    /**
     * Convert a UtilisateurAngularS to a JSON which can be sent to the server.
     */
    private convert(utilisateur: UtilisateurAngularS): UtilisateurAngularS {
        const copy: UtilisateurAngularS = Object.assign({}, utilisateur);
        return copy;
    }
}
