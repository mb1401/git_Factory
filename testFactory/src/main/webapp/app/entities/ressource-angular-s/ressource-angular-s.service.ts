import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RessourceAngularS } from './ressource-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RessourceAngularS>;

@Injectable()
export class RessourceAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/ressources';

    constructor(private http: HttpClient) { }

    create(ressource: RessourceAngularS): Observable<EntityResponseType> {
        const copy = this.convert(ressource);
        return this.http.post<RessourceAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ressource: RessourceAngularS): Observable<EntityResponseType> {
        const copy = this.convert(ressource);
        return this.http.put<RessourceAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RessourceAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RessourceAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<RessourceAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RessourceAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RessourceAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RessourceAngularS[]>): HttpResponse<RessourceAngularS[]> {
        const jsonResponse: RessourceAngularS[] = res.body;
        const body: RessourceAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RessourceAngularS.
     */
    private convertItemFromServer(ressource: RessourceAngularS): RessourceAngularS {
        const copy: RessourceAngularS = Object.assign({}, ressource);
        return copy;
    }

    /**
     * Convert a RessourceAngularS to a JSON which can be sent to the server.
     */
    private convert(ressource: RessourceAngularS): RessourceAngularS {
        const copy: RessourceAngularS = Object.assign({}, ressource);
        return copy;
    }
}
