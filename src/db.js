import knexJs from 'knex';
import bookshelfJs from 'bookshelf';

import knexConfig from './knexfile';

/**
 * 
 * there is a chance where improper use of the knex will lead to pool connections
 * maxing out and as result ur db might hang...
 * I have read up on the internet that knex.destroy needs to be called 
 * to free up the pool connection 
 * and so if the below method is causing db hanging issues look into
 * wrapping this below functionality into a function which returns 
 * a new connection of knex based bookshelf instance before exporting ...
 * and then make sure to get a new instance in start of every api call 
 * and then destroy the connection at the end of every api call using the method 
 * bookshelf.knex.destroy();
 * bookshelf gives access to knex using the above way ...!
 * 
 * Database connection.
 */
const knex = knexJs(knexConfig);
const bookshelf = bookshelfJs(knex);

bookshelf.plugin(['bookshelf-virtuals-plugin']);

export default bookshelf;
