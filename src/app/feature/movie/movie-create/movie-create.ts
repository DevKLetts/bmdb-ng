import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Movie } from '../../../model/movie';
import { MovieService } from '../../../service/movie-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  standalone: false,
  templateUrl: './movie-create.html',
  styleUrl: './movie-create.css',
})
export class MovieCreate implements OnInit, OnDestroy {
  title: string = 'Movie-Create';
  subscription!: Subscription;
  movies: Movie[] = [];
  newMovie: Movie = new Movie();
  ratings: string[] = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  trackByMovieId!: TrackByFunction<Movie>;

  constructor(
    private movieSvc: MovieService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  addMovie() {
    this.subscription = this.movieSvc.add(this.newMovie).subscribe({
      next: (rsp) => {
        this.router.navigateByUrl('movie-list');
      },
      error: (err) => {
        console.log('Error creating new movie.', err);
      },
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}