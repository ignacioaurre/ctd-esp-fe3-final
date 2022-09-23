import type { NextApiRequest, NextApiResponse } from 'next';
import type { Comic } from 'dh-marvel/features/Types/comic.types';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Comic>){
    const { id } = req.query;
    const idComic = id ? parseInt(id.toString(), 10) : 0;
    const response = await getComic(idComic)
    res.status(200).json(response); 
}