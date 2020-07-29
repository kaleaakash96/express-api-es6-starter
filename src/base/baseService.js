import { Boom, conflict, notFound }  from '@hapi/boom';

class BaseService{

    getModelInstance(attrsObj){

    }

    getModel(){

    }

  /**
   * Get all resources.
   *
   * @returns {Promise}
   */
  fetchAll(options) {
    options = this.sanitizeOptions(options)
    return this.getModel().fetchAll(options);
  }

  /**
   * Get all resources.
   *
   * @returns {Promise}
   */
  fetchPage(options) {
    options = this.sanitizeOptions(options)
    return this.getModel().fetchPage(options);
  }


  /**
   * Get a resource.
   *
   * @param   {Number|String}  id
   * @returns {Promise}
   */
  fetchById(id,options) {
    options = this.sanitizeOptions(options)
    return this.getModelInstance({ id })
      .fetch(options)
      .then(resource => resource)
      .catch(this.getModel().NotFoundError, () => {
        throw notFound('Resource not found');
      });
  }

  /**
   * Fetch a resource by any of it's Params
   * 
   * @param {String} param 
   * @param {String} paramvalue 
   */
  fetchByParam(req,options){
    options = this.sanitizeOptions(options)
    return  this.getModel().where({[req.param]:[req.paramvalue]})
    .fetch()
    .then(resource=>resource)
    .catch(this.getModel().NotFoundError,()=>{
      throw notFound('Resource not found for '+param+" = "+paramvalue);
    })
  }

  /**
   * Create new resource.
   *
   * @param   {Object}  resource
   * @returns {Promise}
   */
  create(resource,options) {
    options = this.sanitizeOptions(options)
    return this.getModelInstance(resource).save(null,options);
  }


  /**
   * Update a resource.
   *
   * @param   {Number|String}  id
   * @param   {Object}         resource
   * @returns {Promise}
   */
  update(id, resource,options) {
    options = this.sanitizeOptions(options)
    return this.getModelInstance({ id }).save(resource,options);
  }

  /**
   * Delete a resource.
   *
   * @param   {Number|String}  id
   * @returns {Promise}
   */
  deleteSoft(id,options) {
    options = this.sanitizeOptions(options)
    return this.getModelInstance({ id }).fetch(options).then(resource => resource.destroy(options));
  }

  /**
   * Destroy a resource.
   *
   * @param   {Number|String}  id
   * @returns {Promise}
   */
  destroy(id) {
    options = this.sanitizeOptions(options)
    return this.getModelInstance({ id }).fetch(options).then(resource => resource.destroy(options));
  }

  sanitizeOptions(options){
    if(typeof options === "undefined" ||  options == null ){
      options = {}
    }
    return options;
  }

}
export default BaseService;