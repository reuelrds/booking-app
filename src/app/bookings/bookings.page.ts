import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { IonItemSliding, LoadingController } from '@ionic/angular';
import { WebIntent } from '@ionic-native/web-intent/ngx';

import { PlacesService } from '../places/places.service';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  isLoading = false;

  private bookingsSub: Subscription;

  constructor(
    private intent: WebIntent,
    private placesService: PlacesService,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.bookingsSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService
      .fetchBookings()
      .subscribe(() => (this.isLoading = false));
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // Cancel booking with id offerId
    this.loadingCtrl
      .create({
        message: 'Canceling your booking...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  onOpenMap(placeId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.placesService
      .getPlace(placeId)
      .pipe(take(1))
      .subscribe(place => {
        const options = {
          action: this.intent.ACTION_VIEW,
          url: `google.navigation:q=${place.location.lat},${place.location.lng}`
        };
        this.intent
          .startActivity(options)
          .then(() => console.log('success!!'), () => console.log('denied'))
          .catch(error => console.log(error));
      });
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }
}
