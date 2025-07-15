import express, { Request, Response } from "express";
import Camisa from "./models/Camisa";
import Pedido from "./models/Pedido";
import PedidoItem from "./models/PedidoItem";
import cors from "cors";
import { corsConfig } from "./config/cors";
import dotenv from "dotenv";
import authRouter from "./config/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsConfig));

// Rutas básicas y endpoints
app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hola mundo");
});

// Crear Camisa
app.post("/crearCamisa", async (req: Request, res: Response) => {
  try {
    const camisa = await Camisa.create(req.body);
    res.status(201).json(camisa);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Eliminar Camisa
app.delete("/deleteCamisa/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedRows = await Camisa.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Camisa no encontrada" });
    }

    res.json({ mensaje: "Camisa eliminada correctamente" });
  } catch (error: any) {
    res.status(500).json({ mensaje: "Error al eliminar la camisa" });
  }
});

// Consultar camisa individual
app.get("/getCamisa/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const camisa = await Camisa.findByPk(id);

    if (!camisa) {
      return res.status(404).json({ error: "Camisa no encontrada" });
    }

    res.json(camisa);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la camisa" });
  }
});

// Modificar Camisa
app.put("/modCamisa/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const nuevosDatos = req.body;

  try {
    const [modifiedRows] = await Camisa.update(nuevosDatos, { where: { id } });

    if (modifiedRows === 0) {
      return res.status(404).json({ mensaje: "Camisa no encontrada" });
    }

    res.status(200).json({ mensaje: "Camisa Modificada con éxito" });
  } catch (error: any) {
    res.status(500).json({ mensaje: "No se pudo modificar la camisa" });
  }
});

// Consultar todas las camisas en stock
app.get("/getCamisasStock", async (req: Request, res: Response) => {
  try {
    const camisas = await Camisa.findAll();

    if (camisas.length === 0) {
      return res.status(404).json({ mensaje: "No hay camisas en stock" });
    }

    res.status(200).json(camisas);
  } catch (error: any) {
    res.status(500).json({ mensaje: "Error al consultar las camisas" });
  }
});

// Crear Pedido con items
app.post("/crearPedido", async (req: Request, res: Response) => {
  const { nombre, correo, telefono, direccion, ciudad, codigoPostal, carrito } = req.body;

  try {
    const nuevoPedido = await Pedido.create({
      nombre,
      correo,
      telefono,
      direccion,
      ciudad,
      codigoPostal,
    });

    const items = carrito.map((item: any) => ({
      pedidoId: nuevoPedido.getDataValue("id"),
      productoId: item.id,
      nombreCamisa: item.nombreCamisa,
      precio: item.precio,
      cantidad: item.cantidad,
      talla: item.talla || "Mediana",
    }));

    await PedidoItem.bulkCreate(items);

    res.status(201).json({
      mensaje: "Pedido creado correctamente",
      pedidoId: nuevoPedido.getDataValue("id"),
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ mensaje: "Error al crear el pedido" });
  }
});

// Función principal para iniciar el servidor sin modificar DB
async function main() {
  try {
    // ❌ NO sincronizamos la DB automáticamente para evitar crear tablas
    // await sequelize.sync();

    console.log("Servidor iniciado. Base de datos no modificada automáticamente.");

    app.listen(port, () => {
      console.log(`Servidor corriendo en puerto: ${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
  }
}

main();
