import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitlabService {
  private baseUrl = 'https://git.writeonce.de/api/v4'; // GitLab API base URL
  private projectId = '7'; // Replace with your project ID

  constructor(private http: HttpClient) { }

  getProject(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${this.projectId}`);
  }

  getRepositoryTree(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${this.projectId}/repository/tree`);
  }

  getPublicRepositories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects?visibility=public`);
  }
}
