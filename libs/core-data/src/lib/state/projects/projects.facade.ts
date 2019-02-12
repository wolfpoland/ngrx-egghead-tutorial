import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "../../projects/project.model";
import { ProjectState } from "./projects.reducer";
import { Store, select } from "@ngrx/store";
import { selectAllProjects, selectCurrentProject } from "../index";
import { LoadProject, SelectProject, AddProject, UpdateProject, DeleteProject } from "./projects.actions";

@Injectable({ providedIn: 'root'})
export class ProjectsFacade{
    projects$: Observable<Project[]>;
    currentProject$: Observable<Project>;

    constructor(private store: Store<ProjectState>){
        this.projects$ = store.pipe(
            select(selectAllProjects)
        )
        this.currentProject$ = store.pipe(
            select(selectCurrentProject)
        )
    }

    getProjects() {
        this.store.dispatch(new LoadProject());
    }

    selectProject(project){
        this.store.dispatch(new SelectProject(project));
    }

    createProject(project){
        this.store.dispatch(new AddProject(project));
    }
    
    updateProject(project){
        this.store.dispatch(new UpdateProject(project));
    }

    deleteProject(project){
        this.store.dispatch(new DeleteProject(project));
    }

}