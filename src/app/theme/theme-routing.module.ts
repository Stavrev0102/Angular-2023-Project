import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { CurrentThemeComponent } from './current-theme/current-theme.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuard } from '../auth/auth-guard.guard';
import { ThemeListComponent } from '../theme-list/theme-list.component';
import { EditThemeComponent } from './edit-theme/edit-theme.component';
import { AuthGuardEdit } from '../auth/edit-guard.guard';
import { ThemeGuard } from '../auth/theme.guard';
//import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: 'themes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ThemeListComponent,
      },
      {
        path:':themeId',
        component:CurrentThemeComponent,
        canActivate: [AuthGuard,ThemeGuard],

      },
    ], 
  },
  {
    path: 'add-theme',
    component: NewThemeComponent,
    canActivate:[AuthGuard],
  },
  {
    path:'edit-theme',
    children:[
      {
      path:':themeId',
      component:EditThemeComponent,
      canActivate:[AuthGuard,AuthGuardEdit]
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
