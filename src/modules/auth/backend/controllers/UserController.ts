import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'
import { userRepository } from '../providers/dependencies'

export class UserController extends BaseController {
  public index = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!('userId' in req.session) || typeof req.session.userId !== 'string')
      return BaseController.unauthorized(res)

    const user = await userRepository.getById(req.session.userId)
    if (!user) return BaseController.unauthorized(res)

    return res.send(user)
  }
}
