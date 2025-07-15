import { CorsOptions } from 'cors';

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://tshirt-ymrp-store.netlify.app',
  'http://localhost:5173', // puerto local para desarrollo
];

export const corsConfig: CorsOptions = {
  origin: function(origin, callback) {
    // Permite si no hay origin (ej: backend a backend o Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  },
  credentials: true,
};
