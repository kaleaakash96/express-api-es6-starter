const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
  import HttpStatus from 'http-status-codes';
  import BaseController from '../base/baseController'
  import ${resourceDenormalized}Service from '../services/${resourceSingular}Service';
  
  const ${resourceSingular}Service = new ${resourceDenormalized}Service();
  
  class ${resourceDenormalized}Controller extends BaseController{
    
    /**
     * return ${resourceSingular} service
     */
    getService(){
      super.getService();
      return ${resourceSingular}Service;
    }
  
  }
  
  export default ${resourceDenormalized}Controller;  
`;
}

module.exports = literal