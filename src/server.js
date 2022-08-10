'use strict';

// 3rd Party Dependencies (modules)
const express = require('express');



// Our own custom modules
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const authRouter = require('./middleware/auth/routes.js');
const app = express();
const validate = require('./middleware/auth/auth.js');
const protectedRoutes = require('./routes/v2');
const unProtectedRoutes = require('./routes/v1.js');
const { Food, Clothes, User } = require('./models/index.js');




// Express Global Middleware
app.use(express.json());


//middleware and routes in order 

app.use(authRouter);


app.use('/v1', unProtectedRoutes([Clothes]));
app.use(validate);
app.use('/v2', protectedRoutes([Food, User]));
app.use(logger);




app.use('*', notFoundHandler);
app.use(errorHandler);





module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};