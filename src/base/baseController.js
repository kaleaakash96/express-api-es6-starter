class BaseController {

    /**
     * empty function to be overriden by children
     */
    getService(){

    }

    /**
     * Get all users.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    fetchAll(req, res, next) {
        this.getService()
        .fetchAll()
        .then(data => res.json({ data }))
        .catch(err => next(err));
    }
    
    /**
     * Get a user by its id.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    fetchById(req, res, next) {
        this.getService()
        .fetchById(req.params.id)
        .then(data => res.json({ data }))
        .catch(err => next(err));
    }
    
    /**
     * Create a new user.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    create(req, res, next) {
        this.getService()
        .create(req.body)
        .then(data => res.status(HttpStatus.CREATED).json({ data }))
        .catch(err => next(err));
    }
    
    /**
     * Update a user.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    update(req, res, next) {
        this.getService()
        .update(req.params.id, req.body)
        .then(data => res.json({ data }))
        .catch(err => next(err));
    }
    
    /**
     * Delete a user.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    delete(req, res, next) {
        this.getService()
        .deleteSoft(req.params.id)
        .then(data => res.status(HttpStatus.OK).json({ message:"success",data }))
        .catch(err => next(err));
    }

    /**
     * Delete a user.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    destroy(req, res, next) {
        this.getService()
        .destroy(req.params.id)
        .then(data => res.status(HttpStatus.OK).json({ message:"success",data }))
        .catch(err => next(err));
    }
}

export default BaseController;