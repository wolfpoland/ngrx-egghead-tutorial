import { Project } from '@workshop/core-data';
import { Action } from '@ngrx/store';

export enum ProjectActionTypes {
  ProjectSelected = '[Projects] Selected',
  AddProject = '[Projects] Add project',
  UpdateProject = '[Projects] Update project',
  DeleteProject = '[Projects] Delete project'
}

export class SelectProject implements Action {
  readonly type = ProjectActionTypes.ProjectSelected;

  constructor(public payload: Project) {}
}

export class AddProject implements Action {
  readonly type = ProjectActionTypes.AddProject;

  constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectActionTypes.UpdateProject;

  constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectActionTypes.DeleteProject;

  constructor(public payload: Project) {}
}

export type ProjectActions = SelectProject | AddProject | UpdateProject | DeleteProject;
