import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StagiaireAngularS>;

@Injectable()
export class StagiaireAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/stagiaires';

    constructor(private http: HttpClient) { }

    create(stagiaire: StagiaireAngularS): Observable<EntityResponseType> {
        const copy = this.convert(stagiaire);
        return this.http.post<StagiaireAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stagiaire: StagiaireAngularS): Observable<EntityResponseType> {
        const copy = this.convert(stagiaire);
        return this.http.put<StagiaireAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StagiaireAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StagiaireAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<StagiaireAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagiaireAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StagiaireAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StagiaireAngularS[]>): HttpResponse<StagiaireAngularS[]> {
        const jsonResponse: StagiaireAngularS[] = res.body;
        const body: StagiaireAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StagiaireAngularS.
     */
    private convertItemFromServer(stagiaire: StagiaireAngularS): StagiaireAngularS {
        const copy: StagiaireAngularS = Object.assign({}, stagiaire);
        return copy;
    }

    /**
     * Convert a StagiaireAngularS to a JSON which can be sent to the server.
     */
    private convert(stagiaire: StagiaireAngularS): StagiaireAngularS {
        const copy: StagiaireAngularS = Object.assign({}, stagiaire);
        return copy;
    }
}
