import {AdEntity} from "../types";
import { ValidationError } from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

export class AddRecord implements  AdEntity {
   public description: string;
   public id: string;
   public lat: number;
   public lon: number;
   public name: string;
   public price: number;
   public url: string;

   constructor(obj: NewAdEntity) {
      if (!obj.name || obj.name.length > 100) {
         throw new ValidationError('Nazwa ogłoszenie nie moze byc pusta ani przekraczac 100 znakow');
   }

      if (obj.description.length > 1000) {
         throw new ValidationError('Tresc ogłoszenie nie moze przekraczac 1000 znakow ');
      }

      if (obj.price < 0 || obj.price > 9999999) {
         throw new ValidationError('Cena nie moze byc mniejsza niz 0 lub wieksza niz 9 999 999');
      }

      //@TODO: Check if URL is volid!
      if (!obj.url || obj.url.length > 100) {
         throw new ValidationError('Link ogłoszenie nie moze byc pusty ani przekraczac 100 znakow');
      }
      if (typeof obj.lat !== 'number'|| typeof obj.lon !== 'number') {
         throw new ValidationError('nie mozna zlokalizowac ogloszenia');
      }

      this.name = obj.name;
      this.description = obj.description;
      this.price = obj.price;
      this.url = obj.url;
      this.lat = obj.lat;
      this.lon = obj.lon;
   }
}