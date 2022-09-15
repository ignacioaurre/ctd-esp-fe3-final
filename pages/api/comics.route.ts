import type { NextApiRequest, NextApiResponse } from 'next';
import type { Comic } from 'dh-marvel/features/comic.types';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Comic[]>){
    const { offset } = req.query;
    const offsetNumber = offset ? parseInt(offset.toString(), 10) : 0;
    let limit = 12;
    const response = await getComics(offsetNumber, limit)
    res.status(200).json(response.data.results); 
}