import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: string;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  fetchPlaces() {
    return this.httpClient
      .get<{ [key: string]: PlaceData }>(
        'https://lodgesy.firebaseio.com/offered-places.json'
      )
      .pipe(
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  +resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  getPlace(placeId: string): Observable<any> {
    return this.httpClient
      .get<PlaceData>(
        `https://lodgesy.firebaseio.com/offered-places/${placeId}.json`
      )
      .pipe(
        map(resData => {
          return new Place(
            placeId,
            resData.title,
            resData.description,
            resData.imageUrl,
            +resData.price,
            new Date(resData.availableFrom),
            new Date(resData.availableTo),
            resData.userId
          );
        })
      );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;

    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://live.staticflickr.com/4711/26100810738_0f74f58b9b_b.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.httpClient
      .post<{ name: string }>(
        'https://lodgesy.firebaseio.com/offered-places.json',
        {
          ...newPlace,
          id: null
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(place => {
          newPlace.id = generatedId;
          this._places.next(place.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(
          place => place.id === placeId
        );
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.httpClient.put(
          `https://lodgesy.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
