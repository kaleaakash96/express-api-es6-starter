import bcrypt from 'bcrypt';
import BaseModel from '../base/baseModel';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends BaseModel {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  static getFillableCollumns(){
    return [
      "first_name",
      "last_name",
      "email",
      "mobile_no",
      "password",
      "balance",
      "created_at",
      "updated_at"
    ]
  }


  /**
   * I tried intercepting the while saving hook in bookshelf how ever....
   * the object is imutable some how in that hook so had to manually pass thru this function before saving everytime 
   * @param {Object} attrs 
   */
  static processInputForSave(attrs){
    var result ={};
    // remove all collumns that are not valid 
    let keys = Object.keys(attrs);
    keys.map(item => {
      if(User.getFillableCollumns().includes(item)){
        result[""+item] = attrs[""+item];
      }
    });
    return User.processForPassword(result,keys);
  }

  static async processForPassword(attrs,keys){
    if('password' in attrs){
      attrs["password"] = await User.hashPassword(attrs["password"]);
    }
    return attrs;
  }

  static hashPassword(password) {
    return bcrypt.hash(password, 10)
  }
 
  static validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }



  initialize() {
    // this.on('saving', (model, attrs, options) => {
    //   // This is fired before a model insert ot update is called 
    // });
  }

}

export default User;
