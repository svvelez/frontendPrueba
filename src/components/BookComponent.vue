<template>
  <v-container>
    <v-card elevation="3">
      <v-col >
        <h3 style="color:#cfaeef" class="my-4 mx-4">LIBROS<v-icon class="ml-2" color="#cfaeef">mdi-book-open-page-variant</v-icon></h3>
        <v-text-field v-model="form.name" :error-messages="NameErrors.length > 0 ? NameErrors : []" class="mx-4" filled shaped label="Nombre del lbro" style="max-width: 600px;">
            <template v-slot:error="{ message }">
                <div class="error-message">{{ message }}</div>
            </template>
        </v-text-field>        
        <v-btn class="mx-4 button mt-2 mb-2" @click="createBook()" :loading="loadingCreateBook" elevation="2" color="#cfaeef">Guardar <v-icon class="ml-1">mdi-content-save</v-icon></v-btn>
      </v-col>
    </v-card>

    <v-card elevation="2" class="mt-2">
       <v-col>
        <v-text-field class="mx-4" v-model="search" color="#cfaeef" append-icon="mdi-magnify" label="Búsqueda" single-line hide-details></v-text-field>
            <v-data-table class="mx-4" :loading="loadingBooks" :headers="headers" :items="books" :search="search" 
            hide-default-footer :page.sync="page" @page-count="pageCount = $event" loading-text="Cargando datos...">
                <template slot="item.actions" slot-scope="{ item }">
                    <v-icon color="#cfaeef" class="ml-1" @click="editBook(item.id)">mdi-pencil</v-icon>
                    <v-icon color="#cfaeef" @click="deleteBook(item.id)">mdi-delete</v-icon>
                </template>
            </v-data-table>
            <hr class="mt-0 mx-4">

            <div class="text-center pt-2 pb-3">
                <v-pagination v-model="page" :length="pageCount" :total-visible="9">
                </v-pagination>
            </div>
       </v-col>
    </v-card>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          Editar libro
        </v-card-title>

        <v-card-text>En esta sección se podra editar el nombre del libro.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field filled shaped v-model="getbookEdit.name" label="Nombre libro"></v-text-field>
                <v-btn class="button" @click="updateBook()" :loading="loadignEditBook" color="#cfaeef">Guardar<v-icon class="ml-1">mdi-content-save</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>

import axios from '@/axios.js';
import {required} from 'vuelidate/lib/validators'
import alphaOnly from "../validators/alphaOnly";
  export default {
    name: 'BookComponent',

    data() {
        return {
            form:{
                name:null
            },
            headers: [
                {
                    text: 'Libro',
                    value: 'name',
                    sortable: false
                },
                {
                    text: 'Acciones',
                    value: 'actions',
                    sortable: false
                }
            ],
            books:[],
            loadingBooks:false,
            dialog:false,
            getbookEdit:[],
            loadingCreateBook:false,
            loadignEditBook:false,
            search:'',
            page: 1,
            pageCount: 0,
            itemsPerPage: 6,
            error: false,
            error_msg: '',
            validations: {
                name: true
            },
        }
    },
    validations: {
        form: {
            name: {
                alphaOnly,
                required
            }
        }
    },
    computed: {
        NameErrors () {
            return [
                !this.$v.form.name.alphaOnly && 'Debe ser solo letras',
                !this.$v.form.name.required && 'Es un campo obligatorio'
            ].filter(Boolean)
        }
    },
    created(){
        this.getBooks();
    },
    methods:{
        async createBook(){
            this.loadingCreateBook=true;
            const response = await axios.post('/create-book',this.form);
            if(response.data.success){
                this.$swal({
                    icon: 'success',
                    title: '¡Libro creado!',
                    text: 'Se ha creado libro ade manera correcta',
                    confirmButtonText: 'Aceptar',
                    willClose: () => {
                        console.log(response)
                        this.getBooks();
                        this.form.name=null
                        this.loadingCreateBook=false;
                    }
                })
            }else if(response.data.error){
                this.$swal({
                    icon: 'error',
                    title: 'Error al crear libro',
                    text: response.data.message,
                    confirmButtonText: 'Aceptar',
                    willClose: () => {
                        this.getBooks();
                        this.form.name=null
                        this.loadingCreateBook=false;
                    }
                })
            }
                
        },
        async getBooks(){
            this.loadingBooks=true;
            try{
                const response = await axios.get('/get-books');
                this.books = response.data.books;
            } catch (error) {
                console.error(error);
            } finally {
                this.loadingBooks = false;
            }
        },
       
        async deleteBook(id) {
            const result = await this.$swal({
                title: "¿Estás seguro?",
                text: "Al eliminar este libro no podrá recuperar esta información!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#cfaeef",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, ¡elimínalo!"
            });

            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`/delete-book?id=${id}`); 
                    if (response.data.success) {
                        await this.$swal({
                            icon: 'success',
                            title: '¡Libro eliminado!',
                            text: 'Se ha eliminado el libro de manera correcta',
                            confirmButtonText: 'Aceptar'
                        });
                        this.getBooks();
                    }
                } catch (error) {
                    console.error("Error al eliminar el libro:", error);
                    await this.$swal({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo eliminar el libro. Inténtalo de nuevo.'
                    });
                }
            }
        }
    },
        async editBook(id){
            this.dialog=true
            const response = await axios.post('/get-book',{id:id});
            this.getbookEdit = response.data.book;
        },
        async updateBook(){
            this.loadignEditBook = true;
            let formDataEdit = new FormData()
            formDataEdit.append("id", this.getbookEdit.id)
            formDataEdit.append("name", this.getbookEdit.name)
            try {
                const response = await axios.post('/edit-book', formDataEdit, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Asegúrate de especificar el tipo de contenido
                    }
                });

                if(response.data.success){
                    this.$swal({
                        icon: 'success',
                        title: '¡Libro modificado!',
                        text: 'Se ha actualizado libro ade manera correcta',
                        confirmButtonText: 'Aceptar',
                        willClose: () => {
                            console.log(response)
                            this.getBooks();
                            this.dialog=false
                            this.loadignEditBook = false;
                        }
                    })
                }else if(response.data.error){
                    this.$swal({
                    icon: 'error',
                    title: 'Error al editar libro',
                    text: response.data.message,
                    confirmButtonText: 'Aceptar',
                    willClose: () => {
                        this.getBooks();
                        this.loadignEditBook=false;
                    }
                })
                }
            } catch (error) {
                console.error("Error updating book:", error);
                // Manejo de errores según sea necesario
            }
        }

    }
  
</script>

<style scoped>
.button{
    color:#ffffff;
}
</style>