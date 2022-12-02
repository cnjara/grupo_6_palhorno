console.log('productModifica.js listttoooo ')

const msgError = (element, msg, target) => {
    $(element).innerText = msg;
    target.classList.add("is-invalid");
  };
  
  const validField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove("is-invalid");
    target.classList.add("is-valid");
  };

$("nombre").addEventListener("blur", function ({ target }) {
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
        validField("errorNombre", target);
        break;
    }
  });