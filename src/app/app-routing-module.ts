import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound } from './core/not-found/not-found';
import { MovieList } from './feature/movie/movie-list/movie-list';
import { MovieCreate } from './feature/movie/movie-create/movie-create';
import { MovieEdit } from './feature/movie/movie-edit/movie-edit';
import { MovieDetail } from './feature/movie/movie-detail/movie-detail';
import { CreditList } from './feature/credit/credit-list/credit-list';
import { CreditCreate } from './feature/credit/credit-create/credit-create';
import { CreditEdit } from './feature/credit/credit-edit/credit-edit';
import { ActorList } from './feature/actor/actor-list/actor-list';
import { ActorCreate } from './feature/actor/actor-create/actor-create';
import { ActorEdit } from './feature/actor/actor-edit/actor-edit';
import { ActorDetail } from './feature/actor/actor-detail/actor-detail';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'movie-list', component: MovieList },
  { path: 'movie-create', component: MovieCreate },
  { path: 'movie-edit/:id', component: MovieEdit },
  { path: 'movie-detail/:id', component: MovieDetail },
  { path: 'credit-list', component: CreditList },
  { path: 'credit-create', component: CreditCreate },
  { path: 'credit-edit/:id', component: CreditEdit },
  //{ path: 'credit-detail/:id', component: CreditDetail },
  { path: 'actor-list', component: ActorList },
  { path: 'actor-create', component: ActorCreate },
  { path: 'actor-edit/:id', component: ActorEdit },
  { path: 'actor-detail/:id', component: ActorDetail },


  //{ path: 'home', component: HomeComponent },
  //{ path: 'get/:id', component: GetComponent },
  { path: '**', component: NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
