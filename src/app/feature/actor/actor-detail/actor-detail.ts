import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../../../service/actor-service';

@Component({
  selector: 'app-actor-detail',
  standalone: false,
  templateUrl: './actor-detail.html',
  styleUrl: './actor-detail.css'
})

export class ActorDetail implements OnInit, OnDestroy {
  title: string = 'Actor-Detail';
  subscription!: Subscription;
  actorId!: number;
  actor!: Actor;

  constructor(
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the id from the URL
    this.actRoute.params.subscribe((parms) => {
      this.actorId = parms['id'];
      // get the actor for that actor
      this.subscription = this.actorSvc.getById(this.actorId).subscribe({
        next: (resp) => {
          this.actor = resp;
        },
        error: (err) => {
          console.log(
            'Error retrieving Actor for this id: ' + this.actorId,
            err
          );
        },
      });
    });
  }
  
  delete() {
    this.actorSvc.delete(this.actorId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/actor-list');
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



