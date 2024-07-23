import { prisma } from "../database/db.js";

import nodemailer from "nodemailer";

// Configura el transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // o el servicio de correo que prefieras
  auth: {
    user: "pablocesaraltuzar04@gmail.com",
    pass: "sfeb injd vjrl vueu",
  },
});

const handleError = (res, message) => {
  return (error) => {
    console.error(error);
    return res.status(500).json({ error: message });
  };
};

export const obtenerReservaciones = async (req, res) => {
  try {
    return res.json({
      reservaciones: await prisma.reservaciones.findMany({
        where: { estado: true },
      }),
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const obtenerReservacionId = async (req, res) => {
  try {
    const reservacion = await prisma.reservaciones.findUnique({
      where: { id: req.params.id },
    });
    if (!reservacion) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }
    return res.json({ reservacion });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};



export const crearReservacion = async (req, res) => {
  try {
    const nuevaReservacion = await prisma.reservaciones.create({
      data: req.body,
    });

    // Construye el contenido del correo electrónico
    const mailOptions = {
      from: "pablocesaraltuzar04@gmail.com",
      to: req.body.email,
      subject: "Confirmación de Reservación",
      text: `Estimado/a ${nuevaReservacion.nombre} ${nuevaReservacion.apellido},

Gracias por su reservación. Aquí están los detalles de su reservación:

- Nombre: ${nuevaReservacion.nombre}
- Apellido: ${nuevaReservacion.apellido}
- Email: ${nuevaReservacion.email}
- Teléfono: ${nuevaReservacion.phone}
- Número de personas: ${nuevaReservacion.amountOfPeople}
- Día: ${nuevaReservacion.dia}
- Hora: ${nuevaReservacion.hora}

Por favor, tenga en cuenta que tiene un margen de 10 minutos de retraso para llegar a la reservación, de lo contrario, será cancelada.

Saludos cordiales,

El equipo de [Tu Restaurante]`,
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({
            msg: "Error al enviar el correo electrónico: " + error.message,
          });
      }
      console.log("Correo electrónico enviado: " + info.response);
    });

    return res.status(201).json({ reservacion: nuevaReservacion });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const actualizarReservacion = async (req, res) => {
  try {
    const reservacionActualizada = await prisma.reservaciones.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.json({ reservacion: reservacionActualizada });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const eliminarReservacion = async (req, res) => {
  try {
    const reservacionEliminada = await prisma.reservaciones.update({
      where: { id: req.params.id },
      data: { estado: false },
    });
    return res.json({
      msg: "reservacion cancelada",
      reservacionEliminada,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
