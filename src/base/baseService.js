import { Boom, conflict, notFound }  from '@hapi/boom';
import authService from '../services/auth.service';

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
    return this.getModel().fetchAll(options);
  }

  /**
   * Get all resources.
   *
   * @returns {Promise}
   */
  fetchPage(options) {
    return this.getModel().fetchPage(options);
  }

  /**
   * Get a resource.
   *
   * @param   {Number|String}  id
   * @returns {Promise}
   */
  fetchById(id) {
    return this.getModelInstance({ id })
      .fetch()
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
  fetchByParam(req){
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
  create(resource) {
    return this.getModelInstance(resource).save();
  }


  /**
   * Update a resource.
   *
   * @param   {Number|String}  id
   * @param   {Object}         resource
   * @returns {Promise}
   */
  update(id, resource) {
    return this.getModelInstance({ id }).save(resource);
  }

  /**
   * Delete a resource.
   *
   * @param   {Number|String}  id
   * @returns {Promise}
   */
  deleteSoft(id) {
    return this.getModelInstance({ id }).fetch().then(resource => resource.destroy());
  }

  /**
   * Destroy a resource.
   *
   * @param   {Number|String}  id
   * @returns {Promise}
   */
  destroy(id) {
    return this.getModelInstance({ id }).fetch().then(resource => resource.destroy());
  }

}
export default BaseService;