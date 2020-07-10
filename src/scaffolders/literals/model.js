const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
  import bcrypt from 'bcrypt';
  import BaseModel from '../base/baseModel';
  
  const TABLE_NAME = '${resource}';
  
  /**
   * ${resourceDenormalized} model.
   */
  class ${resourceDenormalized} extends BaseModel {
    /**
     * Get table name.
     */
    get tableName() {
      return TABLE_NAME;
    }
  
  }
  
  export default ${resourceDenormalized};
  
`;
}

module.exports = literal