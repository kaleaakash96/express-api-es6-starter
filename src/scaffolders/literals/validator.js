const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
import Joi from '@hapi/joi';

import validate from '../utils/validate';
import  ${resourceDenormalized}Service from '../services/${resourceSingular}Service';

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
 * Validate create/update ${resourceSingular} request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function ${resourceSingular}Validator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate ${resource} existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function find${resourceDenormalized}(req, res, next) {
  return new ${resourceDenormalized}Service()
    .fetchById(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { find${resourceDenormalized}, ${resourceSingular}Validator };

`;
}

module.exports = literal