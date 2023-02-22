import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, workoutsCtrl.index)
router.get('/:id', checkAuth, workoutsCtrl.show)
router.post('/', checkAuth, workoutsCtrl.create)
router.put('/:id', checkAuth, workoutsCtrl.update)

export { router }