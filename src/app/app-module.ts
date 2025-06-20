import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MovieList } from './feature/movie/movie-list/movie-list';
import { ActorList } from './feature/actor/actor-list/actor-list';
import { CreditList } from './feature/credit/credit-list/credit-list';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MovieDetail } from './feature/movie/movie-detail/movie-detail';
import { MovieCreate } from './feature/movie/movie-create/movie-create';
import { MovieEdit } from './feature/movie/movie-edit/movie-edit';
import { NotFound } from './core/not-found/not-found';
import { ActorDetail } from './feature/actor/actor-detail/actor-detail';
import { ActorEdit } from './feature/actor/actor-edit/actor-edit';
import { ActorCreate } from './feature/actor/actor-create/actor-create';
import { CreditCreate } from './feature/credit/credit-create/credit-create';
import { CreditEdit } from './feature/credit/credit-edit/credit-edit';
import { Menu } from './core/menu/menu';
import { CreditDetail } from './feature/credit/credit-detail/credit-detail';

@NgModule({
  declarations: [
    App,
    MovieList,
    ActorList,
    MovieDetail,
    MovieCreate,
    MovieEdit,
    NotFound,
    ActorDetail,
    ActorEdit,
    ActorCreate,
    CreditList,
    CreditCreate,
    CreditEdit,
    Menu,
    CreditDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
