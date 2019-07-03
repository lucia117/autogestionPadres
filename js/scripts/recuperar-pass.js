/* global hola */

var RecuperarPass = function () {
    //variables globales

    //metodos privados
    var inicializacionDeComponentes = function () {
        //var codigo = localStorage.getItem('alumno_codigo');

        $('#botonRecuperar').click(function (e) {
            e.preventDefault();
            var Correo_electronico = $('#emailRec').val();
            var Rol = $('#rolRec').val();
            var Codigo = $('#codigoRec').val();
            if (Rol === null || Correo_electronico === '' || Codigo === '') {
                swal({
                    icon: "warning",
                    type: 'error',
                    title: 'Falta ingresar algun dato',
                    text: 'Verifique que todos los campos esten cargados',

                });
            } else {
                var alumno = {
                    correo_electronico: Correo_electronico,
                    rol: Rol,
                    codigo: Codigo
                };
                
                Api.setStudentData(alumno, 'VINCULO_CONTRASENIA', RecuperarPass.recuperarOk);
                hodooor();
            }
        });

    };

    //metodos publicos
    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },

        usuarioOk: function (respuesta) {
            if (respuesta.estado) {
                swal("Good job!", respuesta.mensaje, "success");
            } else {
                swal("Atención!", respuesta.mensaje, "warning");
            }
        },

        recuperarOk: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                swal(respuesta.mensaje)
                        .then((value) => {
                            window.location.assign('index.html');
                        });

            } else {
                swal("Atención!", respuesta.mensaje, "warning");
            }
        },

        setExample: function (g) {
            mostrarExamples(g);
        }
    };


}();


