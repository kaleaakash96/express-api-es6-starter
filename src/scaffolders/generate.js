let fs = require('fs');
let path = require('path');
let cmd = require('node-cmd');

// Helpers
let log = require('./helpers/envlog');
let makefile = require('./helpers/makefile');
let string_ = require('./helpers/string');

module.exports.g = function(res, next, options) {
    if(!res){
        res = process.env.npm_config_res;
    };

    if(!options){
        options = {
            api:true
        }
    };
    
    let createTask = {
    model: false,
    controller: false,
    view: false,
    route: true,
    service: false,
    validator: false
  }

  // set literal path
  let literals = {
    router_file: 'src/scaffolders/literals/routes-file',
    controller: 'src/scaffolders/literals/controller',
    model: 'src/scaffolders/literals/model',
    router: './literals/routes.js',
    service: 'src/scaffolders/literals/service',
    validator: 'src/scaffolders/literals/validator',
  }
  
  if (options.api) {
    // literals.controller = './base/literals/api/controller';
    // literals.router = './base/literals/api/routes';
    createTask.view = false;
  }

  // validate resource
  if (!res) {
    throw console.error("resource not defined. ("+res+")");
  }

  /// STEP 1. Start: Load libraries and paths ///

  log("\n");
  log("# Start: Load libraries and paths");
  log('1. Check helpers load ~>', typeof log === 'function', typeof makefile === 'function');

  const rootpath = process.env.PWD; // TODO: Need to change stable path wherever running command.
  const pkgpath = __dirname;
  const routerpath = path.join(rootpath, 'src', 'routes.js');
  const view_dirpath = path.join(rootpath, 'src','views');

  let resource = string_.normalizer(res);
  log('2. Check app project rootpath ~>', rootpath);
  log('3. Check pkg project rootpath ~>', pkgpath);
  log('4. Check argumented resource name ~>', resource);

  let invoke_callback = function(err, inputs) {
    console.log('invoke', inputs.path.replace(rootpath, '').replace(/\//, "\t\t"));
  }


  /// STEP 2. Generate Necessary files ///
  if (Object.values(createTask).includes(true)) {
    
    log("\n");
    log("# Generate Necessary files");

    // [Dir] core/
    // fs.stat(`${rootpath}/core`, function(err, stats) {
    //   if (err && (err.errno === 34 || err.errno === -2)) {
    //     log("<~(async) Making directory ...", `${rootpath}/core`);
    //     cmd.run(`cp -r ${pkgpath}/base/core ${rootpath}/core`);
    //   }
    // });

    // [File] routes.js
    // fs.access(routerpath, (err) => {
    //   if(err && (err.errno === -2 || err.errno === 34)) {
    //     makefile(routerpath, require(literals.router_file), invoke_callback);
    //   };
    // });

    // [Dir] views/
    // if (createTask.view) {
    //   fs.mkdir(view_dirpath, (err) => {
    //     log(err);
    //   });
    // }
  }
  

  /// STEP 3. Generate Controller file ///
  if (createTask.controller) {
    
    log("\n");
    log("# Generate Controller file");

    // Generate Controller file

    const controller_filename = `${resource}Controller.js`;
    const controller_filepath = path.join(rootpath,'src','controllers', controller_filename);
    const controller_literal = require(literals.controller)(resource);
    makefile(controller_filepath, controller_literal, invoke_callback);
    log('1. Check "controller_filename" ~>', controller_filename);
    log('2. Check "controller_filepath" ~>', controller_filepath);
    log('3. Check "controller_literal" ~>', typeof controller_literal === 'string');
  }
  


  /// STEP 4. Generate Model file ///
  if (createTask.model) {
  
    log("\n");
    log("# Generate Model file");

    // Generate Model file

    const model_filename = `${resource}.js`;
    const model_filepath = path.join(rootpath,'src', 'models', model_filename);
    const model_literal = require(literals.model)(resource);
    makefile(model_filepath, model_literal, invoke_callback);
    log('1. Check "model_filename" ~>', model_filename);
    log('2. Check "model_filepath" ~>', model_filepath);
    log('3. Check "model_literal" ~>', typeof model_literal === 'string');
  }

  /// STEP 4. Generate Service file ///
  if (createTask.service) {
  
    log("\n");
    log("# Generate Service file");

    // Generate Service file

    const service_filename = `${resource}Service.js`;
    const service_filepath = path.join(rootpath,'src', 'services', service_filename);
    const service_literal = require(literals.service)(resource);
    makefile(service_filepath, service_literal, invoke_callback);
    log('1. Check "service_filename" ~>', service_filename);
    log('2. Check "service_filepath" ~>', service_filepath);
    log('3. Check "service_literal" ~>', typeof service_literal === 'string');
  }


  /// STEP 5. Generate View file ///
//   if (createTask.view) {

//     log("\n");
//     log("# Generate View file");

//     // Generate View files

//     let viewfiles = [
//       'index',
//       'show',
//       'new',
//       'edit',
//       '_form',
//       'components/item'
//     ];

//     function makeViewFile(file) {
//       const view_filename = `${file}.ejs`;
//       const view_filepath = path.join(rootpath, 'views', resource, view_filename);
//       const view_literal = `<h2>${resource}/${view_filename}</h2>`;
//       log(`>. Check "view_filepath" ~>`, `(${view_filename})`, view_filepath);
//       makefile(view_filepath, view_literal, invoke_callback);
//     }
//     // for (let i in viewfiles) {
//     //   console.log(viewfiles)
//     //   makeViewFile(viewfiles[i])
//     // }
//     viewfiles.forEach(viewfile => {
//       makeViewFile(viewfile);
//     })
//   }


  /// STEP 6. Generate Routes ///
  if (createTask.route) {
    log("\n");
    log("# Generate Routes");

    // Generate entity route file
    const resourceSingular = string_.singularizer(resource);

    const route_filename = `${resourceSingular}Routes.js`;
    const route_filepath = path.join(rootpath,'src', 'routes', route_filename);
    const route_literal = require(literals.router)(resource);
    makefile(route_filepath, route_literal, invoke_callback);
    log('1. Check "route_filename" ~>', route_filename);
    log('2. Check "route_filepath" ~>', route_filepath);
    log('3. Check "route_literal" ~>', typeof route_literal === 'string');

    // Generate Routes

    function insertRouter(routerpath) {
      fs.readFile(routerpath, 'utf8', function(err, data) {
        
        let import_entity_route_file_literal = `import ${resourceSingular}Routes from './routes/${resourceSingular}Routes.js';`
        let route_literal = `router.use('/${resource}', ${resourceSingular}Routes);`

        data = data.replace("\n\n"+route_literal, '');
        data = data.replace(import_entity_route_file_literal, '');

        let splitByLine = data.split(/\n/);
        let import_index = splitByLine.indexOf('// import routes');
        let index = splitByLine.indexOf('export default router;');
        
        if (import_index === -1) { import_index = -1 }
        if (index === -1) { index = splitByLine.length - 2 }

        splitByLine.splice(index, 0, '{{route_literal}}');
        splitByLine.splice(import_index + 1, 0, '{{import_entity_route_file_literal}}');

        let newdata = splitByLine.join("\n");
        newdata = newdata.replace('{{import_entity_route_file_literal}}', import_entity_route_file_literal);
        newdata = newdata.replace('{{route_literal}}', route_literal);
        log(">. literals\n", route_literal);

        makefile(routerpath, newdata, (err, inputs) => {
          invoke_callback(err, inputs);
          console.log("");
        //   next();
        });
      });
    }

    if (fs.existsSync(routerpath)) {
      insertRouter(routerpath);
    } else {
      fs.writeFile(routerpath, '', 'utf8', err => {
        insertRouter(routerpath);
      })
    }
  }
  else {
    //   if(next){
    //     next();
    //   }else{
    //       console.log("completed scaffolding.");
    //   }
  }

  log("scaffolding completed.");
  
}