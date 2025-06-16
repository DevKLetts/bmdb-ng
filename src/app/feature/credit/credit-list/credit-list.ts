import { NgModule, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit-service';


@Component({
  selector: 'app-credit-list',
  standalone: false,
  templateUrl: './credit-list.html',
  styleUrl: './credit-list.css'
})
  
export class CreditList implements OnInit, OnDestroy{
  title: string = 'Credit List';
  subscription!: Subscription;
  credits: Credit[] = [];
  newCredit: Credit = new Credit();
  trackByCreditId!: TrackByFunction<Credit>;
  
  
  addCredit() {
    this.credits.push(this.newCredit);
    this.newCredit = new Credit();
  }
  
  constructor(private creditSvc: CreditService) { }

  removeCredit(id: number) {
  this.credits = this.credits.filter(c => c.creditid !== id);
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    // call creditsvc and populate the list of credits
    this.subscription = this.creditSvc.list().subscribe({
      next: (resp) => {
        this.credits = resp;
        console.log("credits", this.credits);
      },
      error: (err) => {
        console.log("Error retrieving credits list.", err);
      }
    });

  }
}