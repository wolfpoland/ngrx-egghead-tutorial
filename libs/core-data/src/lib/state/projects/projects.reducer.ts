import { Project } from './../../projects/project.model';
import { ProjectActions, ProjectActionTypes } from './projects.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) =>
  projects.map(p => {
    return p.id === project.id ? Object.assign({}, project) : p;
  });
const deleteProject = (projects, project) =>
  projects.filter(w => project.id !== w.id);

export interface ProjectState extends EntityState<Project> {
  selectedProjectId: string | null;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectState = adapter.getInitialState({
  selectedProjectId: null
});

export function projectReducer(
  state = initialState,
  action: ProjectActions
): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.ProjectSelected:
      return {
        ...state,
        selectedProjectId: action.payload.id
      };
    case ProjectActionTypes.LoadProject:
      return adapter.addMany(action.payload, state);
    case ProjectActionTypes.AddProject:
      return adapter.addOne(action.payload, state)
    case ProjectActionTypes.UpdateProject:
      return adapter.upsertOne(action.payload, state)
    case ProjectActionTypes.DeleteProject:
      return adapter.removeOne(action.payload.id, state);
    default: {
      return state;
    }
  }
}
