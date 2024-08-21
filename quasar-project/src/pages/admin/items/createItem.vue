<template>
    <div class="q-pa-md">
      <h3>Crear Producto</h3>
      <q-form @submit="handleSubmit">
        <q-input label="Nombre" v-model="newProduct.nombre" />
        <q-input label="Descripción" v-model="newProduct.descripcion" />
        <q-select
          v-model="selectedCategory"
          label="Categoría"
          :options="
            categories.length > 0
              ? categories.map((category) => ({
                  label: `${category.nombre} (${category.idcategoria})`,
                  value: category.idcategoria,
                }))
              : []
          "
        />
        <q-input
          label="Cantidad"
          v-model="newProduct.cantidad"
          type="number"
        />
        
        <!-- Campo para la fecha de ingreso -->
        <q-date
          v-model="newProduct.fecha_ingreso"
          label="Fecha de Ingreso"
          mask="YYYY-MM-DD"
          format="YYYY-MM-DD"
        />
    
        <q-btn
          type="submit"
          label="Crear Producto"
          color="primary"
          class="q-mt-md"
        />
        <q-btn
          v-if="selectedCategory !== null"
          @click="resetCategory"
          label="Reiniciar Categoría"
          color="primary"
          flat
          class="q-ml-md"
        />
      </q-form>
    </div>
  </template>
  <script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const newProduct = ref({
      nombre: "",
      precio: 0,
      cantidad: 0,
      descripcion: "",
      fecha_ingreso: "",
      idcategoria: null,
    });
    const categories = ref([]);
    const selectedCategory = ref(null);

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categorias");
        if (response.ok) {
          categories.value = await response.json();
        } else {
          console.error(
            "Error al obtener las categorías:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    const createProduct = async () => {
      try {
        if (!selectedCategory.value) {
          console.error("Debe seleccionar una categoría");
          return;
        }

        // Asignar el ID de la categoría al producto
        newProduct.value.idcategoria = selectedCategory.value;

        // Depurar valores antes de enviar
        console.log("Datos del producto a enviar:", newProduct.value);

        const response = await fetch("http://localhost:8080/api/materiales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct.value),
        });

        if (response.ok) {
          console.log("Producto creado correctamente");
          router.push("/products");
        } else {
          console.error("Error al crear el producto:", response.statusText);
        }
      } catch (error) {
        console.error("Error al crear el producto:", error);
      }
    };

    const resetCategory = () => {
      selectedCategory.value = null;
    };

    const handleSubmit = () => {
      if (!selectedCategory.value) {
        console.error("Debe seleccionar una categoría");
        return;
      }

      createProduct();
    };

    fetchCategories();

    return {
      newProduct,
      categories,
      selectedCategory,
      resetCategory,
      handleSubmit,
    };
  },
};
</script>
