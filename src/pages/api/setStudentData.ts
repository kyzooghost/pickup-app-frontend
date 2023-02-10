// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  try {
    const { status, statusText } = await axios.post(
      `${process.env.DATABASE_BASE_URL}student`,
      {},
      {
        params: {
          student_id: req?.query?.student_id,
          class_id: req?.query?.class_id,
          name: req?.query?.name,
          pick_up_vehicle: req?.query?.pick_up_vehicle,
          has_left_class: req?.query?.has_left_class,
        },
      }
    );
    if (status === 200) res.status(200).send('true');
    else res.status(400).send(statusText);
  } catch (e) {
    console.error(e);
    res.status(400).send('false');
  }
}
