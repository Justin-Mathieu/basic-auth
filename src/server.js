'use strict';

// 3rd Party Dependencies (modules)
const express = require('express');



// Our own custom modules
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const auth = require('./middleware/auth/routes.js');
const userRoutes = require('./routes/user');
const foodRoutes = require('./routes/food.js');
const clothesRoutes = require('./routes/clothes.js');
const app = express();
const validate = require('./middleware/auth/auth.js');
const refresh = require('../src/middleware/auth/token');



// Express Global Middleware
app.use(express.json());
app.use(auth);
app.use(validate);
// app.use(refresh);

// Our own Global Middleware
app.use(logger);



// Use our routes from the routing module...
app.use(foodRoutes);
app.use(clothesRoutes);
app.use(userRoutes);




// STRETCH GOAL
// app.use('/api/v1', v1Routes);

// Our Error Handlers -- need to be the last things defined!
// These use the external modules we required above
app.use('*', notFoundHandler);
app.use(errorHandler);




// Export an object with the express app and separate method that can start the server
module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};