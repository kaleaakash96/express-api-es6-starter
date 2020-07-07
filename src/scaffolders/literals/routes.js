const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);

  return `
/// ${string_.denormalizer(resource)} ROUTES ///
import { Router } from 'express';

import * as ${resource}Controller from '../controllers/${resource}Controller';
import { ${resource}Validator } from '../validators/${resource}Validator';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

/**
 * GET /api/${resource}
 */
router.get('/', jwtMiddleware ,${resource}Controller.fetchAll);

/**
 * GET /api/${resource}/:id
 */
router.get('/:id',jwtMiddleware,${resource}Controller.fetchById);

/**
 * POST /api/${resource}
 */
router.post('/', ${resource}Validator, ${resource}Controller.create);


/**
 * PUT /api/${resource}/:id
 */
router.put('/:id', jwtMiddleware, ${resource}Validator,(req, res, next) => jwtMiddleware(req, res, next),${resource}Controller.update);

/**
 * DELETE /api/${resource}/:id
 */
router.delete('/:id', jwtMiddleware , ${resource}Controller.deleteUser);

export default router;
`;
}

module.exports = literal