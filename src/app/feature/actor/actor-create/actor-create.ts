import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Actor } from '../../../model/actor';
import { ActorService } from '../../../service/actor-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actor-create',
  standalone: false,
  templateUrl: './actor-create.html',
  styleUrl: './actor-create.css'
})

export class ActorCreate implements OnInit, OnDestroy {
  title: string = 'Actor-Create';
  subscription!: Subscription;
  actors: Actor[] = [];
  newActor: Actor = new Actor();
  genders: string[] = ['M','F'];
  trackByActorId!: TrackByFunction<Actor>;

  constructor(
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  addActor() {
    this.subscription = this.actorSvc.add(this.newActor).subscribe({
      next: (rsp) => {
        this.router.navigateByUrl('actor-list');
      },
      error: (err) => {
        console.log('Error creating new actor.', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {}
}

