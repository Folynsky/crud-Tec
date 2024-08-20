import { pool } from "../database/connection.js";

// Función para obtener todos los materiales
const findAll = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM Materiales ORDER BY id_material ASC");
        return rows;
    } catch (error) {
        throw error;
    }
};

// Función para buscar un material por su ID
const getMaterialById = async (id) => {
    try {
        const query = 'SELECT * FROM Materiales WHERE id_material = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Función para crear un nuevo material
const createMaterial = async (nombre, descripcion, id_categoria, cantidad, fecha_ingreso) => {
    try {
        const query = 'INSERT INTO Materiales (nombre, descripcion, id_categoria, cantidad, fecha_ingreso) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nombre, descripcion, id_categoria, cantidad, fecha_ingreso];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un material por su ID
const updateMaterial = async (id, nombre, descripcion, id_categoria, cantidad, fecha_ingreso) => {
    try {
        const query = 'UPDATE Materiales SET nombre = $1, descripcion = $2, id_categoria = $3, cantidad = $4, fecha_ingreso = $5 WHERE id_material = $6 RETURNING *';
        const values = [nombre, descripcion, id_categoria, cantidad, fecha_ingreso, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Función para eliminar un material por su ID
const deleteMaterial = async (id) => {
    try {
        const query = 'DELETE FROM Materiales WHERE id_material = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const materialesModel = {
    findAll,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial
};
