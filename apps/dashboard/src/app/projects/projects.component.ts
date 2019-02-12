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
    private store: Store<ProjectState>
  ) {
    this.projects$ = store.pipe(select(selectAllProjects));
    this.currentProject$ = store.pipe(select(selectCurrentProject));
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.store.dispatch(new SelectProject(null));
  }

  selectProject(project) {
    this.store.dispatch(new SelectProject(project));
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.store.dispatch(new LoadProject());
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project));

    this.ns.emit('Project created!');
    this.getProjects();
  }

  updateProject(project) {
    this.projectsService.update(project).subscribe(response => {
      this.resetCurrentProject();
    });

    this.store.dispatch(new UpdateProject(project));

    this.ns.emit('Project saved!');
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }
}
