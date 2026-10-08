const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { loadEnvironment } = require('./config/environment');
const { initializeDatabase } = require('./config/database');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const projectRoutes = require('./routes/projects');
const templateRoutes = require('./routes/templates');

dotenv.config();

const PORT = process.env.PORT || 3051;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  res.locals.appName = 'MindASCII';
  res.locals.appVersion = '1.0.0';
  next();
});

initializeDatabase();

app.use('/', webRoutes);
app.use('/api', apiRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/templates', templateRoutes);

app.use((req, res) => {
  res.status(404).render('home/index', { title: '404 - Not Found', error: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`MindASCII running on port ${PORT}`);
});

module.exports = app;
