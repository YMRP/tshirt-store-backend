import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import Usuario from "../models/Usuario";

type UsuarioLogin = {
  correo: string;
  contrasena: string;
};

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "clave_fallback";

router.post(
  "/login",
  async (req: Request<{}, {}, UsuarioLogin>, res: Response) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ error: "Correo y contraseña requeridos" });
    }

    try {
      const usuario = await Usuario.findOne({ where: { correo } });

      if (!usuario) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      let contrasenaGuardada = usuario.getDataValue("contrasena");

      // 🔐 Hashear si está en texto plano
      if (!contrasenaGuardada.startsWith("$2")) {
        const nuevaHash = await bcrypt.hash(contrasenaGuardada, 10);
        await usuario.update({ contrasena: nuevaHash });
        contrasenaGuardada = nuevaHash;
        console.log(`✅ Contraseña migrada a hash para usuario: ${correo}`);
      }

      const passwordValida = await bcrypt.compare(contrasena, contrasenaGuardada);

      if (!passwordValida) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        {
          id: usuario.getDataValue("id"),
          correo: usuario.getDataValue("correo"),
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.status(200).json({
        token,
        usuario: {
          id: usuario.getDataValue("id"),
          correo: usuario.getDataValue("correo"),
          nombre: usuario.getDataValue("nombre") || "",
        },
      });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

export default router;
