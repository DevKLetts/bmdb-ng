import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Actor } from '../../../model/actor';
import { ActorService } from '../../../service/actor-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actor-edit',
  standalone: false,
  templateUrl: './actor-edit.html',
  styleUrl: './actor-edit.css'
})
  
export class ActorEdit implements OnInit, OnDestroy{
  title: string = 'Actor Edit';
  subscription!: Subscription;
  actor!: Actor;
  actorId!: number;
  newActor: Actor = new Actor();
  genders: string[] = ['M','F'];

  constructor(
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

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
          console.log("Error retrieving Actor for this id: " + this.actorId, err);
        },
      });
    })
  }

  save() {
    this.subscription = this.actorSvc.update(this.actor).subscribe({
      next: (resp) => {
        this.actor = resp;
        this.router.navigateByUrl('/actor-list');
      },
      error: (err) => {
        console.log('error saving actor', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}



