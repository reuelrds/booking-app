import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://media.architecturaldigest.com/photos/59caa80a839a9e7c5d248e96/16:9/w_2560,c_limit/bon1.jpg',
      149.99
    ),
    new Place(
      'p2',
      'L\'Amour Toujours',
      'A Romantic Place in Paris!',
      'https://tinyurl.com/y2ww9a5b',
      189.99
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://live.staticflickr.com/4711/26100810738_0f74f58b9b_b.jpg',
      99.99
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}


  getPlace(placeId: string): Place {
    return {...this._places.find(place => place.id === placeId)};
  }
}
