import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FormateurAngularS } from './formateur-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FormateurAngularS>;

@Injectable()
export class FormateurAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/formateurs';

    constructor(private http: HttpClient) { }

    create(formateur: FormateurAngularS): Observable<EntityResponseType> {
        const copy = this.convert(formateur);
        return this.http.post<FormateurAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(formateur: FormateurAngularS): Observable<EntityResponseType> {
        const copy = this.convert(formateur);
        return this.http.put<FormateurAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FormateurAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FormateurAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<FormateurAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FormateurAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FormateurAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FormateurAngularS[]>): HttpResponse<FormateurAngularS[]> {
        const jsonResponse: FormateurAngularS[] = res.body;
        const body: FormateurAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FormateurAngularS.
     */
    private convertItemFromServer(formateur: FormateurAngularS): FormateurAngularS {
        const copy: FormateurAngularS = Object.assign({}, formateur);
        return copy;
    }

    /**
     * Convert a FormateurAngularS to a JSON which can be sent to the server.
     */
    private convert(formateur: FormateurAngularS): FormateurAngularS {
        const copy: FormateurAngularS = Object.assign({}, formateur);
        return copy;
    }
}
