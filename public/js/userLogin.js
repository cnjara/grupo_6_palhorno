console.log('userLogin.js connected ')

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

  $("passw").addEventListener("focus", () => {
    $("msgPass").hidden = false;
  });
  
  $("passw").addEventListener("blur", function ({ target }) {
    $("msgPass").hidden = true;
    switch (true) {
      case !this.value.trim():
        msgError("errorPass", "La contraseña es obligatoria", target);
                break;
      default:
        validField("errorPass", target);
        break;
    }
  });