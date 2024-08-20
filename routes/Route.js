import { Router } from "express";
import { categoriasController } from "../controllers/categoriasController.js";
import { materialesController } from "../controllers/materialesController.js";

const router = new Router();


router.get('/categorias/', categoriasController.getAll);
router.get('/categorias/:id', categoriasController.getCategoryById);
router.post('/categorias/', categoriasController.createCategory);
router.put('/categorias/:id', categoriasController.updateCategory);
router.delete('/categorias/:id', categoriasController.deleteCategory);
//router.get('/employees/departments/:id', employeesController.getDepartmentByIdEmployee);

router.get('/materiales/', materialesController.getAllMaterials);
router.get('/materiales/:id', materialesController.getMaterialById);
router.post('/materiales/', materialesController.createMaterial);
router.put('/materiales/:id', materialesController.updateMaterial);
router.delete('/materiales/:id', materialesController.deleteMaterial);
//router.get('/departments/employees/:id', departmentsController.getEmployeesByIdDepartment);

export default router;

