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
      '',
      149.99
    ),
    new Place(
      'p2',
      'L\'Amour Toujours',
      'A Romantic Place in Paris!',
      '',
      189.99
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      '',
      99.99
    )
  ];

  constructor() {}

  get_places() {
    return [...this.places];
  }
}
