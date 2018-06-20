import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OrdinateurAngularS } from './ordinateur-angular-s.model';
import { createRequestOption } from '../../shared/index';

export type EntityResponseType = HttpResponse<OrdinateurAngularS>;

@Injectable()
export class OrdinateurAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/ordinateurs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(ordinateur: OrdinateurAngularS): Observable<EntityResponseType> {
        const copy = this.convert(ordinateur);
        return this.http.post<OrdinateurAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ordinateur: OrdinateurAngularS): Observable<EntityResponseType> {
        const copy = this.convert(ordinateur);
        return this.http.put<OrdinateurAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrdinateurAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrdinateurAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrdinateurAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrdinateurAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrdinateurAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrdinateurAngularS[]>): HttpResponse<OrdinateurAngularS[]> {
        const jsonResponse: OrdinateurAngularS[] = res.body;
        const body: OrdinateurAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrdinateurAngularS.
     */
    private convertItemFromServer(ordinateur: OrdinateurAngularS): OrdinateurAngularS {
        const copy: OrdinateurAngularS = Object.assign({}, ordinateur);
        copy.dateAchat = this.dateUtils
            .convertLocalDateFromServer(ordinateur.dateAchat);
        return copy;
    }

    /**
     * Convert a OrdinateurAngularS to a JSON which can be sent to the server.
     */
    private convert(ordinateur: OrdinateurAngularS): OrdinateurAngularS {
        const copy: OrdinateurAngularS = Object.assign({}, ordinateur);
        copy.dateAchat = this.dateUtils
            .convertLocalDateToServer(ordinateur.dateAchat);
        return copy;
    }
}
