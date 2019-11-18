import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private URL: string='http://localhost:3000/users/'
  constructor(private http: HttpClient) { }

  list() { return this.http.get(this.URL); }
  create(user) { return this.http.post(this.URL, user); }
  update(id, user) { return this.http.put(this.URL + id, user); }
  remove(id) { return this.http.delete(this.URL + id); }
  get(id) { return this.http.get(this.URL + id); }
}
