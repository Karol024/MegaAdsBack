import { AddRecord } from "../records/ad.record";

const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megak.pl',
    price:0,
    lat: 9,
    lon: 9,
};

test('Can build AddRecord', ()=> {
   const ad = new AddRecord(defaultObj);

   expect(ad.name).toBe('Test Name');
   expect(ad.description).toBe('blah');
});

test('Validates invalid price', ()=>{
       expect(() => new AddRecord ({
           ...defaultObj,
           price: -3,
       })).toThrow('Cena nie moze byc mniejsza niz 0 lub wieksza niz 9 999 999')
});

// @TODO: Validate: Check all the validations