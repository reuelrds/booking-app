import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Place[] = [
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
      'https://tinyurl.com/yx8p7d6a',
      99.99
    )
  ];

  constructor() {}

  get_places() {
    return [...this.places];
  }

  getPlace(placeId: string): Place {
    return {...this.places.find(place => place.id === placeId)};
  }
}
