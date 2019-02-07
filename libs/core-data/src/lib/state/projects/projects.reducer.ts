import { Project } from './../../projects/project.model';
import { ProjectActions, ProjectActionTypes } from './projects.actions';

const initialProjects: Project[] = [
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
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);


export interface ProjectState{
  projects: Project[];
  selectedProjectId: string | null;
}

export const initialState: ProjectState = {
  projects: initialProjects,
  selectedProjectId: null
};

export function projectReducer(state = initialState, action: ProjectActions): ProjectState{
  switch(action.type){
    case ProjectActionTypes.ProjectSelected:
      return {
        ...state,
        selectedProjectId: action.payload.id
      }
    case ProjectActionTypes.AddProject:
      return {
        ...state,
        projects: createProject(state.projects, action.payload)
      }
    case ProjectActionTypes.UpdateProject:
    return {
      ...state,
      projects: updateProject(state.projects, action.payload)
    }
    case ProjectActionTypes.DeleteProject:
    return {
      ...state,
      projects: deleteProject(state.projects, action.payload)
    }
    default:{
      return state;
    }
  }
}

