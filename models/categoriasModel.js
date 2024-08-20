import { pool } from "../database/connection.js";

// Función para obtener todas las categorías
const findAll = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM Categorias ORDER BY id_categoria ASC");
        return rows;
    } catch (error) {
        throw error;
    }
};

// Función para buscar una categoría por su ID
const getCategoryById = async (id) => {
    try {
        const query = 'SELECT * FROM Categorias WHERE id_categoria = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Función para crear una nueva categoría
const createCategory = async (nombre, descripcion) => {
    try {
        const query = 'INSERT INTO Categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *';
        const values = [nombre, descripcion];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Función para actualizar una categoría por su ID
const updateCategory = async (id, nombre, descripcion) => {
    try {
        const query = 'UPDATE Categorias SET nombre = $1, descripcion = $2 WHERE id_categoria = $3 RETURNING *';
        const values = [nombre, descripcion, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Función para eliminar una categoría por su ID
const deleteCategory = async (id) => {
    try {
        const query = 'DELETE FROM Categorias WHERE id_categoria = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const categoriasModel = {
    findAll,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
