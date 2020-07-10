import bookshelf from '../db';

/**
 * Base model.
 */
class BaseModel extends bookshelf.Model {
  
  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * 
   */
  get hidden(){
    return ['password','deleted_at'];
  }

  get soft(){
    return ['deleted_at'];
  }

  initialize() {
    // this.on('saving', (model, attrs, options) => {
    //   // This is fired before a model insert ot update is called 
    // });
  }

}

export default BaseModel;
