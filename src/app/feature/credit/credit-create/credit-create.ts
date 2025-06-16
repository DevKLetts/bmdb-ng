import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Movie } from '../../../model/movie';
import { MovieService } from '../../../service/movie-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit-service';

@Component({
  selector: 'app-credit-create',
  standalone: false,
  templateUrl: './credit-create.html',
  styleUrl: './credit-create.css'
})

export class CreditCreate implements OnInit, OnDestroy {
  title: string = 'Credit Create';
  subscription!: Subscription;
  credit: Credit[] = [];
  newCredit: Credit = new Credit();

  constructor(
    private creditSvc: CreditService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}
}

