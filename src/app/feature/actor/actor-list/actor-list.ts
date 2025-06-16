import { NgModule, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActorService } from '../../../service/actor-service';

@Component({
  selector: 'app-actor-list',
  standalone: false,
  templateUrl: './actor-list.html',
  styleUrl: './actor-list.css'
})
  
export class ActorList implements OnInit, OnDestroy{
  title: string = 'Actor List';
  subscription!: Subscription;
  actors: Actor[] = [];
  newActor: Actor = new Actor();
  trackByActorId!: TrackByFunction<Actor>;
  
  
  
  addActor() {
    this.actors.push(this.newActor);
    this.newActor = new Actor();
  }
  
  constructor(private actorSvc: ActorService) { }

  removeActor(id: number) {
  this.actors = this.actors.filter(m => m.id !== id);
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    // call actorsvc and populate the list of actors
    this.subscription = this.actorSvc.list().subscribe({
      next: (resp) => {
        this.actors = resp;
        console.log("actors", this.actors);
      },
      error: (err) => {
        console.log("Error retrieving actors list.", err);
      }
    });

  }
}