import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';
import { Project } from '../projects/project.model';

export interface AppState {
  customers: fromCustomers.CustomersState;
  projects: fromProjects.ProjectState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectReducer
};

export const selectProjectsState = createFeatureSelector<
  fromProjects.ProjectState
>('projects');

export const selectCurrentProjectId = createSelector(
  selectProjectsState,
  fromProjects.getSelectedProjectId
);

export const selectProjectsIds = createSelector(
  selectProjectsState,
  fromProjects.selectProjectIds
);
export const selectProjectEntities = createSelector(
  selectProjectsState,
  fromProjects.selectProjectEntities
);
export const selectAllProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAllProjects
);

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
};

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<
  fromCustomers.CustomersState
>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);

export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {
    return projectId ? projectEntities[projectId] : emptyProject;
  }
);

export const selectCustomer = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {
    return customers.map(customer => ({
      ...customers,
      projects: projects.filter(project => project.customerId === customer.id)
    }));
  }
);
