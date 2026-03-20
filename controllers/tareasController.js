const pool = require('../db/connection');

// Obtener todas las tareas
const obtenerTareas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tareas');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear tarea
const crearTarea = async (req, res) => {
    try {
        const { descripcion } = req.body;

        if (!descripcion) {
            return res.status(400).json({ error: "Descripción requerida" });
        }

        const result = await pool.query(
            'INSERT INTO tareas (descripcion) VALUES ($1) RETURNING *',
            [descripcion]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear tarea para usuario autenticado
const crearTareaUsuario = async (req, res) => {
    try {
        const { descripcion } = req.body;
        const usuarioId = req.usuario.id;

        const result = await pool.query(
            'INSERT INTO tareas (descripcion, usuario_id) VALUES ($1, $2) RETURNING *',
            [descripcion, usuarioId]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener tarea por id
const obtenerTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM tareas WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener tarea por Usuario
const obtenerTareaUsuario = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const result = await pool.query(
            'SELECT * FROM tareas WHERE usuario_id = $1',
            [usuarioId]
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar tarea por id (descripción y/o completada)
const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, completada } = req.body;

        const result = await pool.query(
            `UPDATE tareas 
             SET 
                descripcion = COALESCE($1, descripcion),
                completada = COALESCE($2, completada)
             WHERE id = $3
             RETURNING *`,
            [descripcion, completada, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar tarea por id
const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM tareas WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        res.json({ mensaje: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar todas las tareas
const eliminarTareas = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM tareas RETURNING *');

        res.json({ mensaje: "Todas las tareas eliminadas", count: result.rows.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerTareas,
    crearTarea,
    crearTareaUsuario,
    obtenerTarea,
    obtenerTareaUsuario,
    actualizarTarea,
    eliminarTarea,
    eliminarTareas
};