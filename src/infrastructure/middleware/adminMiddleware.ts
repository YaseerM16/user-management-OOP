import { Request, Response, NextFunction } from 'express'
import SessionService from '../../application/services/SessionService'

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const session = SessionService.getInstance().getSession()
    if (!session || !session.adminLogin) {
        return res.redirect('/adminLogin')
    }
    next()
}

export default isAdmin