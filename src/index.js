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
const express_1 = __importDefault(require("express"));
const Camisa_1 = __importDefault(require("./models/Camisa"));
const Pedido_1 = __importDefault(require("./models/Pedido"));
const PedidoItem_1 = __importDefault(require("./models/PedidoItem"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./config/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)(cors_2.corsConfig));
// Rutas básicas y endpoints
app.use("/api/auth", auth_1.default);
app.get("/", (req, res) => {
    res.send("hola mundo");
});
// Crear Camisa
app.post("/crearCamisa", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camisa = yield Camisa_1.default.create(req.body);
        res.status(201).json(camisa);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}));
// Eliminar Camisa
app.delete("/deleteCamisa/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedRows = yield Camisa_1.default.destroy({
            where: { id },
        });
        if (deletedRows === 0) {
            return res.status(404).json({ error: "Camisa no encontrada" });
        }
        res.json({ mensaje: "Camisa eliminada correctamente" });
    }
    catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la camisa" });
    }
}));
// Consultar camisa individual
app.get("/getCamisa/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const camisa = yield Camisa_1.default.findByPk(id);
        if (!camisa) {
            return res.status(404).json({ error: "Camisa no encontrada" });
        }
        res.json(camisa);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener la camisa" });
    }
}));
// Modificar Camisa
app.put("/modCamisa/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const nuevosDatos = req.body;
    try {
        const [modifiedRows] = yield Camisa_1.default.update(nuevosDatos, { where: { id } });
        if (modifiedRows === 0) {
            return res.status(404).json({ mensaje: "Camisa no encontrada" });
        }
        res.status(200).json({ mensaje: "Camisa Modificada con éxito" });
    }
    catch (error) {
        res.status(500).json({ mensaje: "No se pudo modificar la camisa" });
    }
}));
// Consultar todas las camisas en stock
app.get("/getCamisasStock", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camisas = yield Camisa_1.default.findAll();
        if (camisas.length === 0) {
            return res.status(404).json({ mensaje: "No hay camisas en stock" });
        }
        res.status(200).json(camisas);
    }
    catch (error) {
        res.status(500).json({ mensaje: "Error al consultar las camisas" });
    }
}));
// Crear Pedido con items
app.post("/crearPedido", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, telefono, direccion, ciudad, codigoPostal, carrito } = req.body;
    try {
        const nuevoPedido = yield Pedido_1.default.create({
            nombre,
            correo,
            telefono,
            direccion,
            ciudad,
            codigoPostal,
        });
        const items = carrito.map((item) => ({
            pedidoId: nuevoPedido.getDataValue("id"),
            productoId: item.id,
            nombreCamisa: item.nombreCamisa,
            precio: item.precio,
            cantidad: item.cantidad,
            talla: item.talla || "Mediana",
        }));
        yield PedidoItem_1.default.bulkCreate(items);
        res.status(201).json({
            mensaje: "Pedido creado correctamente",
            pedidoId: nuevoPedido.getDataValue("id"),
        });
    }
    catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ mensaje: "Error al crear el pedido" });
    }
}));
// Función principal para iniciar el servidor sin modificar DB
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ❌ NO sincronizamos la DB automáticamente para evitar crear tablas
            // await sequelize.sync();
            console.log("Servidor iniciado. Base de datos no modificada automáticamente.");
            app.listen(port, () => {
                console.log(`Servidor corriendo en puerto: ${port}`);
            });
        }
        catch (error) {
            console.error("Error al iniciar la aplicación:", error);
        }
    });
}
main();
