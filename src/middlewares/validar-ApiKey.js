import { prisma } from '../database/db.js';

export const validarApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key no proporcionada' });
  }

  try {
    const key = await prisma.apiKey.findUnique({
      where: { key: apiKey },
    });

    if (!key) {
      return res.status(401).json({ error: 'API key no válida' });
    }

    req.userId = key.userId; // Adjunta el userId a la solicitud para uso posterior
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error al validar la API key', detalle: error.message });
  }
};
