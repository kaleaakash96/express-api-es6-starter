import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as userService from '../services/userService';

// Validation schema
const schema = Joi.object({
  email: Joi.string()
    .label('email')
    .email({ minDomainSegments: 2, tlds: { }}),
  first_name: Joi.string()
    .label('first_name')
    .max(90),
  last_name: Joi.string()
    .label('last_name')
    .max(90),
  mobile_no: Joi.string()
    .label('mobile_no')
    .max(90),
  password: Joi.string()
    .label('password')
    .max(90)
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
  password2: Joi.ref('password'),
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findUser(req, res, next) {
  return userService
    .fetchById(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUser, userValidator };
