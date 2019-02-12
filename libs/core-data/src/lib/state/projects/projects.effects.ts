import { ProjectState } from './projects.reducer';
import { DataPersistence } from '@nrwl/nx';
import { ProjectActionTypes, LoadProject, ProjectLoaded, AddProject, ProjectAdded, UpdateProject, ProjectUpdated, ProjectDeleted, DeleteProject } from './projects.actions';
import { ProjectsService } from './../../projects/projects.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { Project } from '../../projects/project.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectEffects {

    @Effect()
    loadProject$: Observable<ProjectLoaded> = this.dataPersistance.fetch(ProjectActionTypes.LoadProject, {
        run: (action: LoadProject, state: ProjectState) => {
            return this.projectsService.all()
                .pipe(
                    map((res: Project[]) => {
                        console.log('response: ', res);
                        return new ProjectLoaded(res)
                    })
                )
        },
        onError: (action: LoadProject, error) => {
            console.error('ERROR: ', error);
        }
    })
    // this.actions$.pipe(
    //     ofType(ProjectActionTypes.LoadProject),
    //     switchMap((action: LoadProject) => {
    //         return this.projectsService.all()
    //             .pipe(
    //                 map((res: Project[]) => {
    //                     return new ProjectLoaded(res)
    //                 })
    //             )
    //     })
    // );


    @Effect()
    addProjectt$: Observable<ProjectAdded> = this.dataPersistance.pessimisticUpdate(ProjectActionTypes.AddProject, {
        run: (action: AddProject, state: ProjectState) => {
            return this.projectsService.create(action.payload)
                .pipe(
                    map((res: Project) => {
                        return new ProjectAdded(res);
                    })
                )
        },
        onError: (action: AddProject, error) => {
            console.error('Error: ', error);
        }
    })
    //  this.actions$.pipe(
    //     ofType(ProjectActionTypes.AddProject),
    //     switchMap((action: AddProject) => {
    //         return this.projectsService.create(action.payload)
    //             .pipe(
    //                 map((res: Project) => {
    //                     return new ProjectAdded(res)
    //                 })
    //             )
    //     })
    // );

    @Effect()
    updateProject$: Observable<ProjectUpdated> =
        this.dataPersistance.pessimisticUpdate(ProjectActionTypes.UpdateProject, {
            run: (action: UpdateProject, state: ProjectState) => {
                return this.projectsService.update(action.payload)
                    .pipe(
                        map((res: Project) => {
                            return new ProjectUpdated(res)
                    }))
            },
            onError: (action: UpdateProject, error) => {
                console.error('Error: ', error);
            }
        });
    //  this.actions$.pipe(
    //     ofType(ProjectActionTypes.UpdateProject),
    //     switchMap((action: AddProject) => {
    //         return this.projectsService.update(action.payload)
    //             .pipe(
    //                 map((res: Project) => {
    //                     return new ProjectUpdated(res)
    //                 })
    //             )
    //     })
    // );

    @Effect()
    removeProject$: Observable<ProjectDeleted> = this.dataPersistance.pessimisticUpdate(ProjectActionTypes.DeleteProject, {
        run: (action: DeleteProject, state: ProjectState)=> {
            return this.projectsService.delete(action.payload)
                .pipe(
                    map((res: Project) => new ProjectDeleted(action.payload))
                )
        },
        onError: (action: DeleteProject, err) => {
            console.log('err: ', err);
        }
    });
    //  this.actions$.pipe(
    //     ofType(ProjectActionTypes.DeleteProject),
    //     tap(elm => console.log('remove Project: ', elm)),
    //     switchMap((action: DeleteProject) => {
    //         return this.projectsService.delete(action.payload)
    //             .pipe(
    //                 map((res: Project) => {
    //                     console.log('res');
    //                     return new ProjectDeleted(res)
    //                 })
    //             )
    //     })
    // );



  constructor(
    private actions$: Actions,
    private dataPersistance: DataPersistence<ProjectState>,
    private projectsService: ProjectsService
  ) {}
}
