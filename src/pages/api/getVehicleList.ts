// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { VehicleTableEntry } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<VehicleTableEntry[]>) {
  try {
    const { data, status } = await axios.get(`${process.env.DATABASE_BASE_URL}vehicle/all`);
    if (status === 200) res.status(200).json(data);
    else res.status(400).send([]);
  } catch (e) {
    console.error(e);
    res.status(400).send([]);
  }
}
