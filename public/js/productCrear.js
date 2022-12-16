console.log('productCrear.js listttoooo ')

const msgError = (element, msg, target) => {
  $(element).innerText = msg;
  target.classList.add("is-invalid");
};

const validField = (element, target) => {
  $(element).innerText = null;
  target.classList.remove("is-invalid");
  target.classList.add("is-valid");
};
const cleanError = (elemet) => {
  $(elemet).innerText = null;
};
/*const validPass = (element, exReg, value) => {
  if (!exReg.test(value)) {
    $(element).classList.add("text-danger");
  } else {
    $(element).classList.add("text-success");
    $(element).classList.remove("text-danger");
  }
};*/

$("articulo").addEventListener("blur", function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("errorNombre", "El nombre es obligatorio", target);
     
      break;

    case this.value.trim().length < 2:
      msgError(
        "errorNombre",
        "El nombre como mínimino debe tener dos caracteres",
        target
      );
      break;
    case !exRegs.exRegAlfa.test(this.value):
      msgError("errorNombre", "El nombre debe tener solo letras", target);
      break;
    default:
      //validField("errorNombre", target);
      cleanError("errorNombre")
      break;
  }
});
  $("precio").addEventListener("blur", function ({ target }) {
    switch (true) {
       case !this.value.trim():
         msgError("errorPrecio", "El Precio es obligatorio", target);
         break;
       case this.value.trim().length < 2:
         msgError(
           "errorPrecio",
           "El Precio como mínimino debe tener dos caracteres",
           target
         );
         break;
       case !exRegs.exRegAlfa.test(this.value):
         msgError("errorPrecio", "El Precio debe tener solo numeros", target);
         break;
       default:
         validField("errorPrecio", target);

         break;
     }
   });

  $("stock").addEventListener("blur", function ({ target }) {
    switch (true) {
       case !this.value.trim():
         msgError("errorStock", "El stock es obligatorio", target);
         break;
       case this.value.trim().length < 1:
         msgError(
           "errorStock",
           "El stock como mínimino debe tener un caracteres",
           target
         );
         break;
       case !exRegs.exRegAlfa.test(this.value):
         msgError("errorStock", "El Stock debe tener solo numeros", target);
         break;
       default:
         validField("errorStock", target);
         break;
     }
   });
   $("descripcion").addEventListener("blur", function ({ target }) {
    switch (true) {
       case !this.value.trim():
         msgError("errorDescripcion", "La descripcion  es obligatoria", target);
         break;
       case this.value.trim().length < 5:
         msgError(
           "errorDescripcion",
           "El Descripcion como mínimino debe tener cinco caracteres",
           target
         );
         break;
       case !exRegs.exRegAlfa.test(this.value):
         msgError("errorDescripcion", "La Descripcion debe tener solo letras", target);
         break;
       default:
         validField("errorDescripcion", target);
         break;
     }
   });
   $("categoria").addEventListener("blur", function ({ target }) {
    switch (true) {
       case !this.value.trim():
         msgError("errorCategoria", "la categoria es obligatoria", target);
         break;
   
     }
   });
   