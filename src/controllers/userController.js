import HttpStatus from 'http-status-codes';
import BaseController from '../base/baseController'
import UserService from '../services/userService';

const userServce = new UserService();

class UserController extends BaseController{
  
  /**
   * return user service
   */
  getService(){
    super.getService();
    return userServce;
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

export default UserController;
