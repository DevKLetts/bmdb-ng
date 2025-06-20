
import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../service/movie-service';
import { ActorService } from '../../../service/actor-service';
import { Movie } from '../../../model/movie';
import { Actor } from '../../../model/actor';

@Component({
  selector: 'app-credit-edit',
  standalone: false,
  templateUrl: './credit-edit.html',
  styleUrl: './credit-edit.css'
})
  
export class CreditEdit implements OnInit, OnDestroy {
  title: string = 'Credit Edit';
  credit!: Credit;
  creditId!: number;
  subscription!: Subscription;
  movies: Movie[]=[];
  actors: Actor[]=[];

  
  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

/*   ngOnInit(): void {
    // get the id from the URL
    this.actRoute.params.subscribe((parms) => {
      this.creditId = parms['id'];
      // get the credit for that credit
      this.subscription = this.creditSvc.getById(this.creditId).subscribe({
        next: (resp) => {
          this.credit = resp;
        },
        error: (err) => {
          console.error("Error retrieving Credit for this id: " + this.creditId, err);
        },
      });
      // populate list of movies
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
      // populate list of actors
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
    });
  } */
  ngOnInit(): void {
    // get creditId from the url, then get the credit
    this.actRoute.params.subscribe((parms) => {
      this.creditId = parms['id'];
      this.subscription = this.creditSvc.getById(this.creditId).subscribe({
        next: (resp) => {
          this.credit = resp;
        },
        error: (err) => {
          console.error("Error getting credit for id: "+this.creditId);
        }
      });
    });
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
  
  save() {
    this.subscription = this.creditSvc.update(this.credit).subscribe({
      next: (resp) => {
        this.credit = resp;
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.log('error editing credit', err);
      },
    });
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id == b.id;
  }



  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}




