import {Response} from 'express'


const notFound = (res:Response) => {
    res.status(404).send('page not found')
}

export default notFound