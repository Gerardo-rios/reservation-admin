require('dotenv').config();

export const ENV_VARIABLES = {
  API_URL: process.env.API_URL || 'http://localhost:8000/api/v1'
};
