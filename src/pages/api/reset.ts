// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  try {
    const { status, statusText } = await axios.get(`${process.env.DATABASE_BASE_URL}reset`);
    if (status === 200) res.status(200).send('true');
    else res.status(400).send(statusText);
  } catch (e) {
    console.error(e);
    res.status(400).send('false');
  }
}
