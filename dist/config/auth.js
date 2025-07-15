"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const Usuario_1 = __importDefault(require("../models/Usuario"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "clave_fallback";
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        return res.status(400).json({ error: "Correo y contraseña requeridos" });
    }
    try {
        const usuario = yield Usuario_1.default.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        let contrasenaGuardada = usuario.getDataValue("contrasena");
        // 🔐 Hashear si está en texto plano
        if (!contrasenaGuardada.startsWith("$2")) {
            const nuevaHash = yield bcryptjs_1.default.hash(contrasenaGuardada, 10);
            yield usuario.update({ contrasena: nuevaHash });
            contrasenaGuardada = nuevaHash;
            console.log(`✅ Contraseña migrada a hash para usuario: ${correo}`);
        }
        const passwordValida = yield bcryptjs_1.default.compare(contrasena, contrasenaGuardada);
        if (!passwordValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: usuario.getDataValue("id"),
            correo: usuario.getDataValue("correo"),
        }, JWT_SECRET, { expiresIn: "2h" });
        res.status(200).json({
            token,
            usuario: {
                id: usuario.getDataValue("id"),
                correo: usuario.getDataValue("correo"),
                nombre: usuario.getDataValue("nombre") || "",
            },
        });
    }
    catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}));
exports.default = router;
