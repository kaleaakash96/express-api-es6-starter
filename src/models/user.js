import bookshelf from '../db';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
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
  static processInputForSave(attrs){
    var result ={};
    // remove all collumns that are not valid 
    let keys = Object.keys(attrs).map(item => {
      if(User.getFillableCollumns().includes(item)){
        result[""+item] = attrs[""+item];
      }
    });
    return result;
  }
  initialize() {
    // this.on('saving', (model, attrs, options) => {
    //   // This is fired before a model insert ot update is called 
    // });
  }

}

export default User;
