  const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,8}$/,
    exRegMayu: /[A-Z]/,
    exRegMinu: /[a-z]/,
    exRegNum: /[0-9]/,
    exRegEsp: /[$@$!%*?&]/,
    exRegMin: /.{6,}/
  };
  
  const msgError = (element, msg, target) => {
    $(element).innerText = msg;
    target.classList.add("is-invalid");
  };
  
  const validField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove("is-invalid");
    target.classList.add("is-valid");
  };
  
  const validPass = (element, exReg, value) => {
    if (!exReg.test(value)) {
      $(element).classList.add("text-danger");
    } else {
      $(element).classList.add("text-success");
      $(element).classList.remove("text-danger");
    }
  };

  $("nombre").addEventListener("blur", function ({ target }) {
    
    console.log("result");
    switch (true) {
      case !this.value.trim():
        msgError("errorNombre", "El nombre es obligatorio", target);
        break;
      case this.value.trim().length < 5:
        msgError(
          "errorNombre",
          "El nombre como mínimino debe tener 5 caracteres",
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
  
  $("apellido").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorApellido", "El Apellido es obligatorio", target);
        break;
      case this.value.trim().length < 5:
        msgError("errorApellido","El Apellido como mínimino debe tener 5 caracteres",target);
        break;
      case !exRegs.exRegAlfa.test(this.value):
        msgError("errorApellido", "El Apellido debe tener solo letras", target);
        break;
      default:
        validField("errorApellido", target);
        break;
    }
  });

  $("telefono").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorPhone", "Ingrese un número", target);
        break;c
      case this.value.trim().length != 10:
        msgError(
          "errorPhone",
          "ingrese un numero de 10 digitos",
          target
        );
        break;
      case !exRegs.exRegNum.test(this.value):
        msgError("errorPhone", "Solo se aceptan numeros", target);
        break;
      default:
        validField("errorPhone", target);
        break;
    }
  });