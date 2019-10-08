export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PlaceLoaction extends Coordinates {
  address: string;
  staticMapImageUrl: string;
}
