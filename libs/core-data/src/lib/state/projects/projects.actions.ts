import { Project } from '@workshop/core-data';
import { Action } from '@ngrx/store';

export enum ProjectActionTypes {
  ProjectSelected = '[Projects] Selected',
  AddProject = '[Projects] Add project',
  ProjectAdded = '[Projects] Project added',
  LoadProject = '[Projects] Load projects',
  ProjectLoaded = '[Projects] Project Loaded',
  UpdateProject = '[Projects] Update project',
  ProjectUpdated = '[Projects] Project Updated',
  DeleteProject = '[Projects] Delete project',
  ProjectDeleted = '[Projects] Project Deleted'
}

export class SelectProject implements Action {
  readonly type = ProjectActionTypes.ProjectSelected;

  constructor(public payload: Project) {}
}

export class LoadProject implements Action {
  readonly type = ProjectActionTypes.LoadProject;

  constructor(public payload: Project[]) {}
}

export class ProjectLoaded implements Action {
  readonly type = ProjectActionTypes.ProjectLoaded;

  constructor(public payload: Project[]) {}
}

export class AddProject implements Action {
  readonly type = ProjectActionTypes.AddProject;

  constructor(public payload: Project) {}
}

export class ProjectAdded implements Action {
  readonly type = ProjectActionTypes.ProjectAdded;

  constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectActionTypes.UpdateProject;

  constructor(public payload: Project) {}
}

export class ProjectUpdated implements Action {
  readonly type = ProjectActionTypes.ProjectUpdated;

  constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectActionTypes.DeleteProject;

  constructor(public payload: Project) {}
}

export class ProjectDeleted implements Action {
  readonly type = ProjectActionTypes.ProjectDeleted;

  constructor(public payload: Project) {}
}

export type ProjectActions =
  | SelectProject
  | AddProject
  | ProjectAdded
  | LoadProject
  | ProjectLoaded
  | UpdateProject
  | ProjectUpdated
  | DeleteProject;
