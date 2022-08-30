const { mainrouter } = require('./routes/main');
const { authrouter } = require('./routes/auth');
const { fileObjectrouter } = require('./routes/fileObject');

module.exports = (app) => {
  app.use(mainrouter);

  app.use('/user', authrouter);

  app.use('/files', fileObjectrouter);

};
