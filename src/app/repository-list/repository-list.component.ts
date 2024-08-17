import { Component, OnInit } from '@angular/core';
import { GitlabService } from '../gitlab.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit {
  repositories: any[] = [];

  constructor(private gitlabService: GitlabService) { }

  ngOnInit(): void {
    this.loadRepositories();
  }

  loadRepositories(): void {
    this.gitlabService.getPublicRepositories().subscribe(
      (data) => this.repositories = data,
      (error) => console.error(error)
    );
  }
}
