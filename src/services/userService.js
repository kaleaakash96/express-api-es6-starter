import { Boom, conflict, notFound }  from '@hapi/boom';

import User from '../models/user';
import authService from './auth.service';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function fetchAll() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function fetchById(id) {
  return new User({ id })
    .fetch()
    .then(user => user)
    .catch(User.NotFoundError, () => {
      throw notFound('User not found');
    });
}

/**
 * Fetch a user by any of it's Params
 * 
 * @param {String} param 
 * @param {String} paramvalue 
 */
export function fetchByParam(req){
  return  User.where({[req.param]:[req.paramvalue]})
  .fetch()
  .then(user=>user)
  .catch(User.NotFoundError,()=>{
    throw notFound('User not found for '+param+" = "+paramvalue);
  })
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function create(user) {
  return User.processInputForSave(user)
  .then( async (attrsObj)=>{
    //save user in table 
    try{
      let result = await new User(attrsObj).save();
    
      //add jwt token to the user data being returned ..!!
      result.attributes.token = authService().issue({id: result.attributes.id});
      return result;
    }catch(err2){
      throw conflict(err2);
    }
  })
  .catch((err)=>{
    throw conflict(err);
  });
}


/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function update(id, user) {
  return User.processInputForSave(user)
  .then( async (attrsObj)=>{
    try{
      let result = await new User({ id }).save(attrsObj)
      return result;
    }catch(err2){
      throw conflict(err2);
    }
  })
  .catch((err)=>{
    throw conflict(err);
  });;
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteSoft(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

/**
 * Destroy a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function destroy(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}


/**
 * Signin a user
 * 
 * @param {Object} req 
 */
export async function signIn(reqBody){
  return fetchByParam({param:'email',paramvalue:[reqBody.email]})
  .then(async (user)=>{
    if(user){
      const singInVerified = await User.validatePassword(reqBody.password,user.attributes.password);
      if(singInVerified){
        user.attributes.token = authService().issue({id:user.id});
        var data = {
          message:"signin successfull",
          data:{
            'user':user.attributes
          }
        }
        return data;
      }
    }

    //else return unauthroised
    throw Boom.unauthorized('invalid params');
  });
  
}
