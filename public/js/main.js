/*const btnLogout = document.getElementById('btn-logout')
btnLogout.addEventListener('click', (e) => {
  e.preventDefault();*/
  const $ = (element) => document.getElementById(element);

  $('btn-logout') && $('btn-logout').addEventListener('click', (e) => {
      e.preventDefault();
  Swal.fire({
    title: '¿Te vas tan pronto?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, me voy'
  }).then((result) => {
    if (result.isConfirmed) {
        window.location.href = e.target.pathname
        
    }else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Gracias por quedarte un ratito más ',
            showConfirmButton: false,
            timer: 1500
          }) 
    }
  });
})
$('btn-destroy') && $('btn-destroy').addEventListener('click', (e) => {
  e.preventDefault();
Swal.fire({
title: '¡Alto! Lo estas por eliminar',
icon: 'question',
showCancelButton: true,
confirmButtonColor: '#3085d6',
cancelButtonColor: '#d33',
confirmButtonText: 'Confirmar'
}).then((result) => {
if (result.isConfirmed) {
    window.location.href = e.target.pathname
    
}else {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te arrepentiste ',
        showConfirmButton: false,
        timer: 1500
      }) 
}
});
})
