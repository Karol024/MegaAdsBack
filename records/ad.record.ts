import {AdEntity, NewAdEntity} from "../types";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import { FieldPacket} from "mysql2";

type AddRecordResults = [AdEntity[],FieldPacket[]];

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

      this.id = obj.id
      this.name = obj.name;
      this.description = obj.description;
      this.price = obj.price;
      this.url = obj.url;
      this.lat = obj.lat;
      this.lon = obj.lon;
   }
   static async getOne(id: string): Promise<AddRecord | null>{
     const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
         id,
      }) as AddRecordResults;

     return results.length === 0 ? null :  new AddRecord(results[0]);
   }
}