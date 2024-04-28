import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Selector } from '../model/Selector';
import { Website } from '../model/Website';

@Injectable({
  providedIn: 'root'
})
export class ApiWebsiteService {
  private apiUrl = 'http://localhost:8000/selectors/';
  private apiUrl2 = 'http://localhost:8000/websites/';
  private apiUrl3 = 'http://localhost:8081/scrape/';
  private apiUrl4 = 'http://localhost:8081/api/documents/';
  private baseUrl = 'http://localhost:8000/'; // Change this to your Django API base URL

  constructor(private http: HttpClient) { }
  getSelectorsForWebsite(websiteId: number): Observable<any[]> {
    const url = `${this.baseUrl}websites/${websiteId}/selectors/`;
    return this.http.get<any[]>(url);
  }


  getWebsitesWithSelectors(pageIndex: number = 1, pageSize: number = 5): Observable<any[]> {
    const params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<Website[]>(`${this.apiUrl2}`, { params }).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }
  addWebsiteWithSelectors(websiteData: { website: Website, selectors: any[] }): Observable<Website> {
    return this.http.post<Website>(this.baseUrl + 'addWebsiteSelectors/', websiteData);
  }



  getWebsites(page: number, pageSize: number): Observable<Website[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<Website[]>(this.apiUrl2, { params }).pipe(
      catchError(error => throwError(error))
    );
  }

  scrapeWebsite(pk: number): Observable<any> {
    const url = `${this.apiUrl3}${pk}/`;
    return this.http.get<any>(url);
  }
  getDocuments(page: number,searchTerm?: string): Observable<any> {
    return this.http.get(`${this.apiUrl4}?page=${page}`);
  }
  getSelectors(page: number, pageSize: number): Observable<Selector[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<Selector[]>(this.apiUrl, { params }).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }

  editWebsiteWithSelectors(websiteId: number, selectorsData: any): Observable<any> {
    const url = `${this.baseUrl}editWebSel/${websiteId}/edit/`; // Endpoint pour mettre à jour le site avec les sélecteurs
    return this.http.put(url, selectorsData);
  }
  getSelector(id: number): Observable<Selector> {
    return this.http.get<Selector>(`${this.apiUrl}${id}/`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }


  getWebsite(id: number): Observable<Website> {
    return this.http.get<Website>(`${this.apiUrl2}${id}/`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  createSelector(selector: Selector): Observable<Selector> {
    return this.http.post<Selector>(this.apiUrl, selector).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  createWebsite(website: Website): Observable<Website> {
    return this.http.post<Website>(this.apiUrl2, website).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  updateSelector(id: number, selector: Selector): Observable<Selector> {
    return this.http.put<Selector>(`${this.apiUrl}${selector.id}/`, selector).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  updateWebsite(website: Website): Observable<Website> {
    return this.http.put<Website>(`${this.apiUrl2}${website.id}/`, website).pipe(
      catchError(error => throwError(error))
    );
  }
  deleteSelector(selectorId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${selectorId}/`).pipe(
      catchError(error => throwError(error))
    );
  }

  deleteWebsite(websiteId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl2}${websiteId}/`).pipe(
      catchError(error => throwError(error))
    );
  }
}
