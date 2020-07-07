import HttpStatus from 'http-status-codes';
import BaseController from '../base/baseController'
import * as userService from '../services/userService';

class UsersController extends BaseController{
 
  /**
   * return user service
   */
  getService(){
    super.getService();
    return userService;
  }

  /**
 * sign a current user in
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
signin(req, res, next) {
  console.log(this);
  this.getService()
  .signIn(req.body)
  .then(data => res.status(HttpStatus.OK).json({ data }))
  .catch(err => next(err));
}

}

export default UsersController;
