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

  

  $("email").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorEmail", "Debes ingresar un email", target);
        break;
        default:      //con apis
        validField("errorEmail", target);
        break;
   
     
    }
  });
  $("passwo").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorPass", "La contraseña  es obligatorio", target);
        break;
      default:
        validField("errorPass", target);
          break;
     
    }
  });

  $("profile-edit").addEventListener("submit", function ({ target }) {

    e.preventDefault();
    let error = false;
    console.log(target);
    const elements = this.elements;
    for (let i = 0; i < elements.length - 1; i++) {
      console.log('form');
        if (
            !elements[i].value.trim() ||
            elements[i].classList.contains("is-invalid")
        ) {
            elements[i].classList.add("is-invalid");
            $("msgError").innerText = "¡Completá los campos correctamente!";
            error = true;
        }
    }

    !error && this.submit()
});
