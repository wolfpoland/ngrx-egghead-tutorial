import { ProjectsFacade } from './../../../../../libs/core-data/src/lib/state/projects/projects.facade';
import {
  AddProject,
  UpdateProject,
  DeleteProject,
  LoadProject,
  SelectProject
} from './../../../../../libs/core-data/src/lib/state/projects/projects.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  Customer,
  Project,
  ProjectsService,
  NotificationsService,
  CustomersService,
  ProjectState,
  initialProjects,
  selectAllProjects,
  selectCurrentProject
} from '@workshop/core-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private ns: NotificationsService,
    private store: Store<ProjectState>,
    private projectsFacade: ProjectsFacade
  ) {
    this.projects$ = this.projectsFacade.projects$;
    this.currentProject$ = this.projectsFacade.currentProject$;
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.projectsFacade.selectProject(null);
  }

  selectProject(project) {
    console.log('select: ', project);
    this.projectsFacade.selectProject(project);
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.projectsFacade.getProjects();
  }

  saveProject(project) {
    console.log('project: ', project);
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.projectsFacade.createProject(project);

    this.ns.emit('Project created!');
    this.getProjects();
  }

  updateProject(project) {
    this.projectsService.update(project).subscribe(response => {
      this.resetCurrentProject();
    });

    this.projectsFacade.updateProject(project);

    this.ns.emit('Project saved!');
  }

  deleteProject(project) {
    this.projectsFacade.deleteProject(project);

    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }
}
