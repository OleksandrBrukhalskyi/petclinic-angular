import { Injectable } from '@angular/core';
import {Owner} from '../model/owner';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

	baseUrl = `http://localhost:8080/api/owner`;

  constructor(private http: HttpClient) { }

  getOwners() {
  	return this.http.get(`${this.baseUrl}`);
  }

  add(owner: Owner) {
  	return this.http.post(`${this.baseUrl}/add`, owner);
  }

  update(owner: Owner, id: any) {
  	return this.http.put(`${this.baseUrl}/${id}`, owner);
  }
  delete(id: any) {
  	return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
