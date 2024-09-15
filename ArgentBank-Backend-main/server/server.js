const express = require('express');
const cookieParser = require('cookie-parser');
const dotEnv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('./swagger.yaml');
const dbConnection = require('./database/connection');

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
dbConnection();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookieParser());

// Handle custom routes
app.use(
  '/api/v1/user',
  (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    next();
  },
  require('./routes/userRoutes')
);
app.use(
  '/api/v1/account',
  (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    next();
  },
  require('./routes/accountRoutes')
);

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
