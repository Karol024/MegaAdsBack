import {AddRecord} from "../records/ad.record";
import { AdEntity } from "../types/ad/ad-entity";
import {pool} from "../utils/db";


afterAll(async ()=>{
   await pool.end();
});

const defaultObj = {
   name: 'Test Name',
   description: 'blah',
   url: 'https://megak.pl',
   price:0,
   lat: 9,
   lon: 9,
};

test('AddRecord.getOne returns data from database for one entry', async ()=>{
   const ad =await AddRecord.getOne('abc');

   expect(ad).toBeDefined();
   expect(ad.id).toBe('abc');
   expect(ad.name).toBe('Testowa');


});

test('AddRecord.getOne returns null from database for unexisting entry', async ()=>{
   const ad = await AddRecord.getOne('---');
   expect(ad).toBeNull();
});

test('AddRecord.findAll returns array found entries', async ()=>{
   const ads = await AddRecord.findAll('');

   expect(ads).not.toEqual([]);
   expect(ads[0].id).toBeDefined();

});

test('AddRecord.findAll returns array found entries when searching for "a', async ()=>{
   const ads = await AddRecord.findAll('a');

   expect(ads).not.toEqual([]);
   expect(ads[0].id).toBeDefined();

});

test('AddRecord.findAll returns empty array when searching for something that not exists ', async ()=>{
   const ads = await AddRecord.findAll('-------------------');

   expect(ads).toEqual([]);

});

test('AddRecord.findAll returns small amount of date. ', async ()=>{
   const ads = await AddRecord.findAll('');

   expect((ads[0] as AdEntity).price).toBeUndefined();
   expect((ads[0] as AdEntity).description).toBeUndefined();
});

test('AddRecord.insert returns new  UUID. ', async ()=>{
   const ad = new AddRecord(defaultObj)
   await ad.insert();

   expect(ad.id).toBeDefined();
   expect(typeof ad.id).toBe('string');

});

test('AddRecord.insert inserts data to database. ', async ()=>{
   const ad = new AddRecord(defaultObj)
   await ad.insert();

   const foundAd = await AddRecord.getOne(ad.id);

   expect(foundAd).toBeDefined();
   expect(foundAd).not.toBeNull();
   expect(foundAd.id).toBe(ad.id);

});