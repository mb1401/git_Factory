import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FormationAngularS } from './formation-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FormationAngularS>;

@Injectable()
export class FormationAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/formations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(formation: FormationAngularS): Observable<EntityResponseType> {
        const copy = this.convert(formation);
        return this.http.post<FormationAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(formation: FormationAngularS): Observable<EntityResponseType> {
        const copy = this.convert(formation);
        return this.http.put<FormationAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FormationAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FormationAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<FormationAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FormationAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FormationAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FormationAngularS[]>): HttpResponse<FormationAngularS[]> {
        const jsonResponse: FormationAngularS[] = res.body;
        const body: FormationAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FormationAngularS.
     */
    private convertItemFromServer(formation: FormationAngularS): FormationAngularS {
        const copy: FormationAngularS = Object.assign({}, formation);
        copy.dateDebut = this.dateUtils
            .convertLocalDateFromServer(formation.dateDebut);
        copy.dateFin = this.dateUtils
            .convertLocalDateFromServer(formation.dateFin);
        return copy;
    }

    /**
     * Convert a FormationAngularS to a JSON which can be sent to the server.
     */
    private convert(formation: FormationAngularS): FormationAngularS {
        const copy: FormationAngularS = Object.assign({}, formation);
        copy.dateDebut = this.dateUtils
            .convertLocalDateToServer(formation.dateDebut);
        copy.dateFin = this.dateUtils
            .convertLocalDateToServer(formation.dateFin);
        return copy;
    }
}
