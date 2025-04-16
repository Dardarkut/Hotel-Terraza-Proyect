  

    
  document.getElementById('miFormulario').addEventListener('submit', function(event) {
         event.preventDefault(); // Evita el envío del formulario por defecto
 
            // Obtener los valores de los campos del formulario
         const nombre = document.getElementById('nombre').value;
         const apellidos = document.getElementById('apellidos').value;
         const correo = document.getElementById('correo').value;
         const asunto = document.getElementById('asunto').value;
         const texarea = document.getElementById('texarea').value;

            // Validar los campos del formulario
         if (nombre === '' || apellidos === '' || correo === '' || asunto === '' || texarea === '') {
                // Si algún campo está vacío, muestra un mensaje de error
             Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Por favor, completa todos los campos.',
             });
             
      
         }else{
              Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Formulario enviado correctamente.',
              });
         }
 
        
     });

  
      
    