import { env } from './env';

export const environment = {
  production: true,
  backendURL: env.backendURL,
  storeImageURL: env.storeImageURL,
  firebaseAPIKey: env.firebaseAPIKey,
  googleMapsAPIKey: env.googleMapsAPIKey,
};
