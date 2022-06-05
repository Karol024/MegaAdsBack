import {AddRecord} from "../records/ad.record";
import { AdEntity } from "../types/ad/ad-entity";
import {pool} from "../utils/db";

afterAll(async ()=>{
   await pool.end();
});

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