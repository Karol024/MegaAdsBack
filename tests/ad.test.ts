import {AddRecord} from "../records/ad.record";

test('AddRecord returns data from database for one entry', async ()=>{
   const ad =await AddRecord.getOne('abc');

   expect(ad).toBeDefined();
   expect(ad.id).toBe('abc');
   expect(ad.name).toBe('Testowa');


});

test('AddRecord returns null from database for unexisting entry', async ()=>{
   const ad = await AddRecord.getOne('---');
   expect(ad).toBeNull();
});