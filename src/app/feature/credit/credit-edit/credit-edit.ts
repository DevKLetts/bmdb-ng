
import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-credit-edit',
  standalone: false,
  templateUrl: './credit-edit.html',
  styleUrl: './credit-edit.css'
})
  
export class CreditEdit implements OnInit, OnDestroy{
  title: string = 'Credit Edit';
  subscription!: Subscription;
  credit!: Credit;
  creditId!: number;
  newCredit: Credit = new Credit();

  
  constructor(
    private creditSvc: CreditService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    // get the id from the URL
    this.actRoute.params.subscribe((parms) => {
      this.creditId = parms['id'];
      // get the credit for that credit
      this.subscription = this.creditSvc.getById(this.creditId).subscribe({
        next: (resp) => {
          this.credit = resp;
        },
        error: (err) => {
          console.log("Error retrieving Credit for this id: " + this.creditId, err);
        },
      });
    })
  }

  save() {
    this.subscription = this.creditSvc.update(this.credit).subscribe({
      next: (resp) => {
        this.credit = resp;
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.log('error saving credit', err);
      },
    });
  }
}




