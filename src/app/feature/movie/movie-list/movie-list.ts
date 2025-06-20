import { NgModule, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../../model/movie';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MovieService } from '../../../service/movie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
  
export class MovieList implements OnInit, OnDestroy{
  title: string = 'Movie-List';
  subscription!: Subscription;
  movies: Movie[] = [];
  trackByMovieId!: TrackByFunction<Movie>;
  welcomeName : string = '';
  
  constructor(
    private movieSvc: MovieService,
    private sysSvc: SystemService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  removeMovie(id: number) {
  this.movies = this.movies.filter(m => m.id !== id);
  }

 
  ngOnInit(): void {
    this.welcomeName=this.sysSvc.loggedInUser.firstName;
    
    // call moviesvc and populate the list of movies
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
        console.log("movies", this.movies);
      },
      error: (err) => {
        console.log("Error retrieving movies list.", err);
      }
    });
  }

  delete(id: number) {
    this.subscription = this.movieSvc.delete(id).subscribe({
      next: () => {
        // refresh the movie list
        this.subscription = this.movieSvc.list().subscribe((resp) => {
          this.movies = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting movie for id: ' + id);
        alert('Error deleting movie for id: ' + id);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
}