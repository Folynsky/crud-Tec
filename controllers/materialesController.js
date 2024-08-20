import { materialesModel } from "../models/materialesModel.js";

// Controlador para obtener todos los materiales
const getAllMaterials = async (req, res) => {
    try {
        const response = await materialesModel.findAll();
        res.json(response);
    } catch (error) {
        console.log('Error al obtener los materiales:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para buscar un material por su ID
const getMaterialById = async (req, res) => {
    const { id } = req.params;
    try {
        const material = await materialesModel.getMaterialById(id);
        if (material) {
            res.json(material);
        } else {
            res.status(404).json({ message: 'Material no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar material por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo material
const createMaterial = async (req, res) => {
    const { nombre, descripcion, id_categoria, cantidad, fecha_ingreso } = req.body;
    try {
        const newMaterial = await materialesModel.createMaterial(
            nombre,
            descripcion,
            id_categoria,
            cantidad,
            fecha_ingreso
        );
        res.status(201).json(newMaterial);
    } catch (error) {
        console.error('Error al registrar material:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un material por su ID
const updateMaterial = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, id_categoria, cantidad, fecha_ingreso } = req.body;
    try {
        const updatedMaterial = await materialesModel.updateMaterial(
            id,
            nombre,
            descripcion,
            id_categoria,
            cantidad,
            fecha_ingreso
        );
        if (updatedMaterial) {
            res.json(updatedMaterial);
        } else {
            res.status(404).json({ message: 'Material no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar material por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un material por su ID
const deleteMaterial = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMaterial = await materialesModel.deleteMaterial(id);
        if (deletedMaterial) {
            res.json({ message: 'Material eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Material no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar material por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const materialesController = {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial
};
