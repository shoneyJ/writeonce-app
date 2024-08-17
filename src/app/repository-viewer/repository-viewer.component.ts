import { Component, OnInit } from '@angular/core';
import { GitlabService } from '../gitlab.service';

@Component({
  selector: 'app-repository-viewer',
  templateUrl: './repository-viewer.component.html',
  styleUrls: ['./repository-viewer.component.css']
})
export class RepositoryViewerComponent implements OnInit {
  project: any;
  repositoryTree: any;

  constructor(private gitlabService: GitlabService) { }

  ngOnInit(): void {
    this.loadProject();
    this.loadRepositoryTree();
  }

  loadProject(): void {
    this.gitlabService.getProject().subscribe(
      (data) => this.project = data,
      (error) => console.error(error)
    );
  }

  loadRepositoryTree(): void {
    this.gitlabService.getRepositoryTree().subscribe(
      (data) => this.repositoryTree = data,
      (error) => console.error(error)
    );
  }
}
