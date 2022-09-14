import type { NextApiRequest, NextApiResponse } from 'next';
import {faq, faqs} from '../../data/faqs';

export default function handler(req: NextApiRequest, res: NextApiResponse<faq[]>) {
    res.status(200).json(faqs); 
}