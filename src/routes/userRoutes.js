import { Router } from 'express';

import UsersController from '../controllers/usersController' ;
import { findUser, userValidator } from '../validators/userValidator';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

const userController = new UsersController();
/**
 * GET /api/users
 */
router.get('/', jwtMiddleware ,(req,res,next)=>userController.fetchAll(req,res,next));

/**
 * GET /api/users/:id
 */
router.get('/:id',jwtMiddleware,(req,res,next)=>userController.fetchById(req,res,next));

/**
 * POST /api/users
 * public api ( register)
 */
router.post('/', userValidator, (req,res,next)=>userController.create(req,res,next));

/**
 * POST /api/users/signin
 * public api ( register)
 */
router.post('/signin', userValidator,(req,res,next)=> userController.signin(req,res,next));

/**
 * PUT /api/users/:id
 */
router.put('/:id', jwtMiddleware, findUser, userValidator,(req, res, next) => jwtMiddleware(req, res, next) ,(req,res,next)=>userController.update(req,res,next));

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', jwtMiddleware ,findUser, (req,res,next)=>userController.delete(req,res,next));

export default router;
