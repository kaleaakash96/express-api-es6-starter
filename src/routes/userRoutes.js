import { Router } from 'express';

import * as userController from '../controllers/users';
import { findUser, userValidator } from '../validators/userValidator';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', jwtMiddleware ,userController.fetchAll);

/**
 * GET /api/users/:id
 */
router.get('/:id',jwtMiddleware,userController.fetchById);

/**
 * POST /api/users
 * public api ( register)
 */
router.post('/', userValidator, userController.create);

/**
 * POST /api/users/signin
 * public api ( register)
 */
router.post('/signin', userValidator, userController.signin);

/**
 * PUT /api/users/:id
 */
router.put('/:id', jwtMiddleware, findUser, userValidator,(req, res, next) => jwtMiddleware(req, res, next) ,userController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', jwtMiddleware ,findUser, userController.deleteUser);

export default router;
