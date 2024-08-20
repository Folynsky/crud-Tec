import { categoriasModel } from "../models/categoriasModel.js";

// Controlador para obtener todas las categorías
const getAll = async (req, res) => {
    try {
        const response = await categoriasModel.findAll();
        res.json(response);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para buscar una categoría por su ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await categoriasModel.getCategoryById(id);
        if (categoria) {
            res.json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error('Error al buscar categoría por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para crear una nueva categoría
const createCategory = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const newCategory = await categoriasModel.createCategory(nombre, descripcion);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error al registrar categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para actualizar una categoría por su ID
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        const updatedCategory = await categoriasModel.updateCategory(id, nombre, descripcion);
        if (updatedCategory) {
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar categoría por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una categoría por su ID
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await categoriasModel.deleteCategory(id);
        if (deletedCategory) {
            res.json({ message: 'Categoría eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar categoría por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const categoriasController = {
    getAll,
    getCategoryById, 
    createCategory,
    updateCategory,
    deleteCategory,
};
