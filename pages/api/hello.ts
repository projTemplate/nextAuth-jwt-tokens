// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // let {name} = req.body
    // console.log(name)
    res.status(200).json({name: 'John Doe'})
}
