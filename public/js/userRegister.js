console.log('userRegister.js connected');

//$('form-register').addEventListener('submit', function(e) {
  //  e.preventDefault();
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
  const verifyEmail = async (email) => {
    try {
      let response = await fetch("/api/usuarios/verify-email", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      let result = await response.json();
  
      console.log(result);
  
      return result.verified;
    } catch (error) {
      console.error;
    }
  };




  $("name").addEventListener("blur", function ({ target }) {
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
        msgError(
          "errorApellido",
          "El Apellido como mínimino debe tener 5 caracteres",
          target
        );
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
        msgError("errorApellido", "Solo se aceptan numeros", target);
        break;
      default:
        validField("errorPhone", target);
        break;
    }
  });
 $("email").addEventListener("blur", async function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorEmail", "El email es obligatorio", target);
        break;
      case !exRegs.exRegEmail.test(this.value):
        msgError("errorEmail", "El email tiene un formato incorrecto", target);
        break;
      case await verifyEmail(this.value):
        msgError("errorEmail", "El email ya está registrado", target);
        break;
      default:      //con apis
        validField("errorEmail", target);
        break;
   
    }
 });

  $("pass").addEventListener("focus", () => {
    $("msgPass").hidden = false;
  });
  
  $("pass").addEventListener("blur", function ({ target }) {
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
  
  $("pass").addEventListener("keyup", function ({ target }) {
    validPass("mayu", exRegs.exRegMayu, target.value);
    validPass("minu", exRegs.exRegMinu, target.value);
    validPass("num", exRegs.exRegNum, target.value);
    validPass("esp", exRegs.exRegEsp, target.value);
    validPass("min", exRegs.exRegMin, target.value);
  });
  
  $("pass2").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorPass2", "Debes verificar la contraseña", target);
        break;
      case this.value.trim() !== $('pass').value.trim():
        msgError("errorPass2","Las contraseñas no coinciden",target);
        break;
      default:
        validField("errorPass2", target);
        break;
    }
  });







 /*   Swal.fire({
        position: "center",
        icon: "info",
        title: "Recibirás un email para confirmar tu registración",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then((result) => {
        if (result.isConfirmed) {
            this.submit();
        }
    }); 


         

//}
//);

/*
$("btn-show-pass").addEventListener("click", ({ target}) => {
    if (target.localName === "i"){
        target.classList.toggle("fa-eye");
        $('pass').type = $('pass').type ==='text' ? 'password' : 'text'

        
    }else{
        target.childNodes[0].classList.toggle("fa-eye");
        $('pass').type = $('pass').type ==='text' ? 'password' : 'text'
    }
})*/