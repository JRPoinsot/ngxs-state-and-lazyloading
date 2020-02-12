import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const USER_END_POINT = '/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this._http.get(`${environment.apiUrl}${USER_END_POINT}`);
  }

  public getUser(userId: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}${USER_END_POINT}${userId}`);
  }
}
