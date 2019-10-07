import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController
} from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { BookingService } from '../../../bookings/booking.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;

  private placeSub: Subscription;


  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/offers/tabs/discover');
        return;
      }

      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(place => {
          this.place = place;
          this.isBookable = place.userId !== this.authService.userId;
        });
    });
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
          selectedMode: mode
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(result => {
        if (result.role === 'confirm') {

          this.loadingCtrl
            .create({
              message: 'Booking Place...'
            })
            .then(loadingEl => {
              loadingEl.present();
              const data = result.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
