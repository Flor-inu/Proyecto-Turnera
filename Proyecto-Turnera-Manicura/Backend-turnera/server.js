const express = require('express');
const path = require('path');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// --- 1. CONFIGURACIÓN E INICIALIZACIÓN ---
const app = express();
const prisma = new PrismaClient();

// Obtener puerto y origen desde variables de entorno
const PORT = process.env.PORT || 8080;
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:4200';

const corsOptions = {
    origin: allowedOrigin,
    optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// --- 2. RUTAS API (CRUD CON PRISMA) ---

// 📘 GET: Obtener todos los turnos
app.get('/api/turnos', async (req, res) => {
    try {
        const turnos = await prisma.turno.findMany({
            orderBy: {
                fecha: 'asc', // Ordenar por fecha ascendente
            }
        });
        res.json(turnos);
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        res.status(500).json({ error: 'Error interno al obtener los turnos' });
    }
});

// ➕ POST: Agregar un turno
app.post('/api/turnos', async (req, res) => {
    try {
        const { nombre, apellido, fecha, hora, servicio, conQuien, telefono, status } = req.body;

        // Validación simple de datos requeridos
        if (!nombre || !fecha || !hora) {
            return res.status(400).json({ error: 'Faltan datos obligatorios (nombre, fecha, hora)' });
        }

        const nuevoTurno = await prisma.turno.create({
            data: {
                nombre,
                apellido,
                // Asegurarse de que la fecha sea un objeto Date compatible con Prisma
                fecha: new Date(fecha), 
                hora,
                servicio,
                conQuien,
                telefono,
                status
            }
        });
        
        res.status(201).json(nuevoTurno);
    } catch (error) {
        console.error('Error al crear turno:', error);
        res.status(500).json({ error: 'Error al guardar el turno en la base de datos' });
    }
});

// ✏️ PUT: Modificar un turno
app.put('/api/turnos/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        // Si viene fecha en el body, la convertimos a Date object
        if (data.fecha) {
            data.fecha = new Date(data.fecha);
        }

        // Eliminamos el ID del body para evitar errores de Prisma (el ID no se debe actualizar)
        delete data.id;

        const turnoActualizado = await prisma.turno.update({
            where: { id: id },
            data: data
        });

        res.json({ mensaje: `Turno ID ${id} actualizado.`, turno: turnoActualizado });
    } catch (error) {
        // Prisma lanza error código 'P2025' si no encuentra el registro
        if (error.code === 'P2025') {
            return res.status(404).json({ mensaje: `Turno ID ${id} no encontrado.` });
        }
        console.error('Error al actualizar turno:', error);
        res.status(500).json({ error: 'Error interno al actualizar' });
    }
});

// ❌ DELETE: Eliminar un turno
app.delete('/api/turnos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.turno.delete({
            where: { id: id }
        });
        res.json({ mensaje: `Turno ID ${id} eliminado correctamente.` });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ mensaje: `Turno ID ${id} no encontrado.` });
        }
        console.error('Error al eliminar turno:', error);
        res.status(500).json({ error: 'Error interno al eliminar' });
    }
});

// -------------------- 🌐 SERVIR FRONTEND (ANGULAR) --------------------
// Ruta relativa al directorio donde se ejecuta el script
const DIST_PATH = path.join(__dirname, '..', 'turnera-manicura', 'dist', 'turnera-manicura');

if (require('fs').existsSync(DIST_PATH)) {
    app.use(express.static(DIST_PATH));

    // Redirigir cualquier ruta que no sea API al index.html (SPA)
    app.get('*', (req, res) => {
        if (!req.url.startsWith('/api')) { 
             res.sendFile(path.join(DIST_PATH, 'index.html'));
        }
    });
} else {
    // Ruta por defecto si no existe el build de Angular
    app.get('/', (req, res) => {
        res.send(`
            <h1>API Backend Activa (Modo DB)</h1>
            <p>El frontend no fue encontrado en: ${DIST_PATH}</p>
            <p>Asegúrate de ejecutar 'ng build' en la carpeta del frontend.</p>
        `);
    });
}

// -------------------- 🚀 INICIAR SERVIDOR --------------------
app.listen(PORT, () => {
    console.log(`🚀 Servidor con Prisma corriendo en el puerto ${PORT}`);
});