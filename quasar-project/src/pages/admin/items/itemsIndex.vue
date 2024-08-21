<template>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        title="Materiales"
        :rows="materiales"
        :columns="columns"
        row-key="id_material"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="id_material" :props="props">
              {{ props.row.id_material }}
            </q-td>
            <q-td key="nombre" :props="props">
              {{ props.row.nombre }}
            </q-td>
            <q-td key="descripcion" :props="props">
              {{ props.row.descripcion }}
            </q-td>
            <q-td key="cantidad" :props="props">
              {{ props.row.cantidad }}
            </q-td>
            <q-td key="fecha_ingreso" :props="props">
              {{ props.row.fecha_ingreso }}
            </q-td>
            <q-td key="id_categoria" :props="props">
              {{ props.row.id_categoria }}
            </q-td>
            <q-td key="actions" :props="props" class="text-center">
                <q-btn
                icon="edit"
                round
                dense
                color="yellow"
                class="q-ml-md q-mb-md"
                @click="$router.push({ name: 'updateProduct', params: { id_material: props.row.id_material } })"
              />
              <q-btn
                icon="delete"
                round
                dense
                color="red"
                class="q-ml-md q-mb-md"
                @click="openDeleteDialog(props.row.id_material)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="button-container">
        <q-btn icon="add" label="Crear" color="primary" class="q-ml-md q-mb-md" @click="$router.push('/createProduct')" />
        <q-btn icon="picture_as_pdf" label="Exportar PDF" color="primary" class="q-ml-md q-mb-md" @click="exportToPDF" />
        <q-btn icon="table_view" label="Exportar Excel" color="primary" class="q-ml-md q-mb-md" @click="exportToExcel" />
      </div>
      <q-dialog v-model="showDeleteDialog">
        <q-card>
          <q-card-section>
            <q-card-title>Eliminar Material</q-card-title>
            <q-card-text>
              ¿Estás seguro de que deseas eliminar este material?
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
              @click="deleteMaterial(selectedMaterialId); showDeleteDialog = false"
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
        materiales: [],
        columns: [
          { name: "id_material", label: "ID" },
          { name: "nombre", label: "Nombre" },
          { name: "descripcion", label: "Descripción" },
          { name: "cantidad", label: "Cantidad" },
          { name: "fecha_ingreso", label: "Fecha de Ingreso" },
          { name: "id_categoria", label: "ID de Categoría" },
          { name: "actions", label: "Acciones", align: "center" },
        ],
        showDeleteDialog: false,
        selectedMaterialId: null,
      };
    },
  
    mounted() {
      this.getMateriales();
    },
    methods: {
      async getMateriales() {
        const response = await fetch("http://localhost:8080/api/materiales");
        this.materiales = await response.json();
      },
      openDeleteDialog(id_material) {
        this.selectedMaterialId = id_material;
        this.showDeleteDialog = true;
      },
      async deleteMaterial(id_material) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/materiales/${id_material}`,
            {
              method: "DELETE",
            }
          );
  
          if (response.ok) {
            console.log(`Material con ID ${id_material} eliminado correctamente`);
            this.getMateriales();
          } else {
            console.error("Error al eliminar el material:", response.statusText);
          }
        } catch (error) {
          console.error("Error al eliminar el material:", error);
        }
      },
      exportToPDF() {
        const doc = new jsPDF({ orientation: 'landscape' });
        const columns = this.columns.filter(col => col.name !== 'actions').map(col => col.label);
        const rows = this.materiales.map(material => [
          material.id_material,
          material.nombre,
          material.descripcion,
          material.cantidad,
          material.fecha_ingreso,
          material.id_categoria
        ]);
  
        doc.autoTable(columns, rows);
        doc.save("materiales.pdf");
      },
      exportToExcel() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Materiales");
  
        worksheet.columns = this.columns.filter(col => col.name !== 'actions').map(col => ({ header: col.label, key: col.name }));
  
        this.materiales.forEach(material => {
          worksheet.addRow(material);
        });
  
        workbook.xlsx.writeBuffer().then(buffer => {
          const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "materiales.xlsx";
          link.click();
        });
      },
      onRowClick(row) {
        // Aquí puedes agregar acciones adicionales al hacer clic en una fila
      },
    }
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
  