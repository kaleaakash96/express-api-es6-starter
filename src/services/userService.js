import { Boom, conflict, notFound }  from '@hapi/boom';

import User from '../models/user';
import authService from './auth.service';
import BaseService from '../base/baseService';
class UserService extends BaseService{

  
  getModelInstance(attrsObj){
    return new User(attrsObj);
  }

  getModel(){
    return User;
  }

  /**
   * Create new user.
   *
   * @param   {Object}  user
   * @returns {Promise}
   */
  create(user) {
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
  update(id, user) {
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
   * Signin a user
   * 
   * @param {Object} req 
   */
  async signIn(reqBody){
    return this.fetchByParam({param:'email',paramvalue:[reqBody.email]})
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
}
export default UserService;