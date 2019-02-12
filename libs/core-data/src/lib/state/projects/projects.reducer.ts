import { Project } from './../../projects/project.model';
import { ProjectActions, ProjectActionTypes, SelectProject } from './projects.actions';
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
        selectedProjectId: !!action.payload && !!action.payload.id ? action.payload.id : null
      };
    case ProjectActionTypes.ProjectLoaded:
      return adapter.addMany(action.payload, state);
    case ProjectActionTypes.ProjectAdded:
      return adapter.addOne(action.payload, state)
    case ProjectActionTypes.ProjectUpdated:{
      console.log('ProjectUpdated: ', action.payload);
      return adapter.upsertOne(action.payload, state)
    }
    case ProjectActionTypes.ProjectDeleted:{
      console.log('ProjectDeleted: ', action.payload);
      return adapter.removeOne(action.payload.id, state);
    }
    default: {
      return state;
    }
  }
}

export const getSelectedProjectId = (state: ProjectState) => {
  console.log('state.selectedProjectId: ', state.selectedProjectId);
  return state.selectedProjectId
};

const { selectIds, selectEntities, selectAll} = adapter.getSelectors();
export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;



