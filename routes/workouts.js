import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, workoutsCtrl.index)
router.post('/', checkAuth, workoutsCtrl.create)

export { router }