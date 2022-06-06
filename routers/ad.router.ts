import {Router} from "express";
import { AddRecord } from "../records/ad.record";

export const adRouter = Router()

.get('/search/:name?', async (req,res) => {

    const ads = await AddRecord.findAll(req.params.name ?? '');

   res.json(ads);
})

.get('/:id', async (req,res) => {
    const ad = await AddRecord.getOne(req.params.id);
    res.json(ad);
})

        .post('/', async (req,res) => {
           const ad = new AddRecord(req.body);
           await ad.insert();
           res.json(ad);
        })
;