import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MatiereAngularS } from './matiere-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MatiereAngularS>;

@Injectable()
export class MatiereAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/matieres';

    constructor(private http: HttpClient) { }

    create(matiere: MatiereAngularS): Observable<EntityResponseType> {
        const copy = this.convert(matiere);
        return this.http.post<MatiereAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(matiere: MatiereAngularS): Observable<EntityResponseType> {
        const copy = this.convert(matiere);
        return this.http.put<MatiereAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MatiereAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MatiereAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<MatiereAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MatiereAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MatiereAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MatiereAngularS[]>): HttpResponse<MatiereAngularS[]> {
        const jsonResponse: MatiereAngularS[] = res.body;
        const body: MatiereAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MatiereAngularS.
     */
    private convertItemFromServer(matiere: MatiereAngularS): MatiereAngularS {
        const copy: MatiereAngularS = Object.assign({}, matiere);
        return copy;
    }

    /**
     * Convert a MatiereAngularS to a JSON which can be sent to the server.
     */
    private convert(matiere: MatiereAngularS): MatiereAngularS {
        const copy: MatiereAngularS = Object.assign({}, matiere);
        return copy;
    }
}
