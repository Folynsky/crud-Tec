<template>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        title="Categorías"
        :rows="categorias"
        :columns="columns"
        row-key="id_categoria"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="id_categoria" :props="props">
              {{ props.row.id_categoria }}
            </q-td>
            <q-td key="nombre" :props="props">
              {{ props.row.nombre }}
            </q-td>
            <q-td key="descripcion" :props="props">
              {{ props.row.descripcion }}
            </q-td>
            <q-td key="actions" :props="props" class="text-center">
              <q-btn
                icon="edit"
                round
                dense
                color="yellow"
                class="q-ml-md q-mb-md"
                @click="updateCategory(props.row)"
              />
              <q-btn
                icon="delete"
                round
                dense
                color="red"
                class="q-ml-md q-mb-md"
                @click="openDeleteDialog(props.row.id_categoria)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="button-container">
        <q-btn icon="add" label="Crear" color="primary" class="q-ml-md q-mb-md" @click="$router.push('/createCategory')" />
        <q-btn icon="picture_as_pdf" label="Exportar PDF" color="primary" class="q-ml-md q-mb-md" @click="exportToPDF" />
        <q-btn icon="table_view" label="Exportar Excel" color="primary" class="q-ml-md q-mb-md" @click="exportToExcel" />
      </div>
      <q-dialog v-model="showDeleteDialog">
        <q-card>
          <q-card-section>
            <q-card-title>Eliminar Categoría</q-card-title>
            <q-card-text>
              ¿Estás seguro de que deseas eliminar esta categoría?
            </q-card-text>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Cancelar"
              color="primary"
              @click="showDeleteDialog = false"
            />
            <q-btn
              label="Eliminar"
              color="negative"
              @click="deleteCategoria(selectedCategoryId); showDeleteDialog = false"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import ExcelJS from "exceljs";
  
  export default {
    data() {
      return {
        categorias: [],
        columns: [
          { name: "id_categoria", label: "ID" },
          { name: "nombre", label: "Nombre" },
          { name: "descripcion", label: "Descripción" },
          { name: "actions", label: "Acciones", align: "center" },
        ],
        showDeleteDialog: false,
        selectedCategoryId: null,
      };
    },
  
    mounted() {
      this.getCategorias();
    },
  
    methods: {
      async getCategorias() {
        const response = await fetch("http://localhost:8080/api/categorias");
        this.categorias = await response.json();
      },
  
      async updateCategory(category) {
        try {
          this.$router.push({ path: `/updateCategory/${category.id_categoria}` });
        } catch (error) {
          console.error("Error al actualizar categoría:", error);
        }
      },
  
      openDeleteDialog(id_categoria) {
        this.selectedCategoryId = id_categoria;
        this.showDeleteDialog = true;
      },
  
      async deleteCategoria(id_categoria) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/categorias/${id_categoria}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            console.log(`Categoría con ID ${id_categoria} eliminada correctamente`);
            this.getCategorias();
          } else {
            console.error("Error al eliminar la categoría:", response.statusText);
          }
        } catch (error) {
          console.error("Error al eliminar la categoría:", error);
        }
      },
  
      async onRowClick(row) {},
  
      exportToPDF() {
        const doc = new jsPDF({ orientation: 'landscape' });
        const columns = this.columns.filter(col => col.name !== 'actions').map(col => col.label);
        const rows = this.categorias.map(categoria => [
          categoria.id_categoria,
          categoria.nombre,
          categoria.descripcion
        ]);
  
        doc.autoTable(columns, rows);
        doc.save("categorias.pdf");
      },
  
      exportToExcel() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Categorías");
  
        worksheet.columns = this.columns.filter(col => col.name !== 'actions').map(col => ({ header: col.label, key: col.name }));
  
        this.categorias.forEach(categoria => {
          worksheet.addRow(categoria);
        });
  
        workbook.xlsx.writeBuffer().then(buffer => {
          const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "categorias.xlsx";
          link.click();
        });
      }
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
  }
  </style>
  