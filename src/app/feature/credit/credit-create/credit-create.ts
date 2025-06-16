import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Movie } from '../../../model/movie';
import { MovieService } from '../../../service/movie-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit-service';
import { ActorService } from '../../../service/actor-service';
import { Actor } from '../../../model/actor';

@Component({
  selector: 'app-credit-create',
  standalone: false,
  templateUrl: './credit-create.html',
  styleUrl: './credit-create.css',
})
export class CreditCreate implements OnInit, OnDestroy {
  title: string = 'Credit Create';
  subscription!: Subscription;
  credit: Credit[] = [];
  newCredit: Credit = new Credit();
  movies!: Movie[];
  actors!: Actor[];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router
  ) {}

  addCredit() {
    this.subscription = this.creditSvc.add(this.newCredit).subscribe({
      next: (rsp) => {
        this.router.navigateByUrl('credit-list');
      },
      error: (err) => {
        console.log('Error creating new credit.', err);
      },
    });
  }

  ngOnInit(): void {
    //populate list of movies
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading movies.' + err.message
        );
      },
    });
    //populate list of actors
    this.subscription = this.actorSvc.list().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading actors.' + err.message
        );
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
