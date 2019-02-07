import { AddProject, UpdateProject, DeleteProject } from './../../../../../libs/core-data/src/lib/state/projects/projects.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  Customer,
  Project,
  ProjectsService,
  NotificationsService,
  CustomersService,
  ProjectState
} from '@workshop/core-data';
import { map } from 'rxjs/operators';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private ns: NotificationsService,
    private store: Store<ProjectState>
  ) {
    this.projects$ = store.pipe(
      select('projects'),
      map((projectsState: ProjectState) => projectsState.projects)
    );
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project))


    this.ns.emit('Project created!');
    this.getProjects();
  }

  updateProject(project) {
    this.projectsService.update(project).subscribe(response => {
      this.resetCurrentProject();
    });


    this.store.dispatch(new UpdateProject(project))

    this.ns.emit('Project saved!');
    this.getProjects();
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project))

    this.ns.emit('Project deleted!');
    this.getProjects();
  }
}
