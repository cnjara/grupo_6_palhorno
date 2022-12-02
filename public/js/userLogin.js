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
     
    }
  });
  $("passwo").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorPasswo", "La contraseña  es obligatorio", target);
        break;
     
    }
  });