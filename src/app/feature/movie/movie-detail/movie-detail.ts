import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../../model/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../service/movie-service';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit, OnDestroy {
  title: string = 'Movie-Detail';
  subscription!: Subscription;
  movieId!: number;
  movie!: Movie;

  constructor(
    private movieSvc: MovieService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the id from the URL
    this.actRoute.params.subscribe((parms) => {
      this.movieId = parms['id'];
      // get the movie for that movie
      this.subscription = this.movieSvc.getById(this.movieId).subscribe({
        next: (resp) => {
          this.movie = resp;
        },
        error: (err) => {
          console.log(
            'Error retrieving Movie for this id: ' + this.movieId,
            err
          );
        },
      });
    });
  }
  
  delete() {
    this.movieSvc.delete(this.movieId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/movie-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
