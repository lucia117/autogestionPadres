/* global Api */

var VerAlumno = function () {
    //variables globales
    var codigo;
    var Nivel;
    var Colegio;

    //metodos privados
    var inicializacionDeComponentes = function () {
        codigo = localStorage.getItem('alumno_codigo');
        Nivel = localStorage.getItem('alumno_nivel');
        Colegio = localStorage.getItem('colegio');

        var objeto = {
            codigo: codigo,
            nivel: Nivel,
            colegio: Colegio,

        };
        Api.getStudentData(objeto, 'DATOS_GENERALES', VerAlumno.cargarDatos);
        Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasMedio);

        $("#medio").removeClass('hide');


    };



    var mostrarMensajes = function (datos) {

        var contenedor = $('#bodyMensajes');
        var itemPadre = $('#row_0');

        if (datos.length > 0) {
            $.each(datos, function (key, d) {
                var item = itemPadre.clone(true, true);
                item.attr('id', 'row' + (key + 1));
                item.removeClass('hide');
                item.find('.tituloMje').text(d.titulo);
                item.find('.fechaMje').text(d.fecha_hora);
                item.find('.deMje').text(d.escrito_por);
                item.find('.mensajeMje').text(d.texto);
                contenedor.append(item);

            });
        } else {
            contenedor.html('<tr><td>No hay Mensajes</td></tr>');
        }

    };

    var mostrarNotas = function (datos) {
        var contenedor = $("#contenedorNotas");
        var itemPadre = $('#row_0');

        if(datos.length >0){
            $.each(datos, function(key,d){
                var item = itemPadre.clone(true,true);
                item.attr('id','row' + (key+1));
                itemPadre.removeClass('hide');
                item.find('nombre').text(d.nombre); 
                item.find('e1_1').text(d.e1_1);
                item.find('e1_2').text(d.e1_2);
                item.find('e1_3').text(d.e1_3);
                item.find('e1_4').text(d.e1_4);
                item.find('e1_5').text(d.e1_5);
                item.find('e1_6').text(d.e1_6);
                item.find('e1_5').text(d.e1_5);
                
                contenedor.append(item);
            });
        }else{
            contenedor.html('<tr><td>No hay notas cargadas</td></tr>')
        }
    };



  
    //metodos publicos

    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },
        

        //MEDIO
        cargarNotas: function (respuesta) {
            if (respuesta.estado) {
                switch (respuesta.objeto.forma_cursado) {
                    case 'T':
                        mostrarNotasMedio(respuesta.objeto.datos_notas);
                        break;

                    case 'E':
                        mostrarNotasMedioAdaptacion(respuesta.objeto.datos_notas);
                        break;

                    case 'A':
                        mostrarNotasMedioNocturno(respuesta.objeto.datos_notas);
                        break;

                    case 'B':
                        mostrarNotasMedioBimestral(respuesta.objeto.datos_notas);
                        break;

                    default:
                        break;
                }
                //mostrarNotasMedio(respuesta.objeto.datos_notas);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarNotasMedioNocturno: function (respuesta) {
            if (respuesta.estado) {
                mostrarNotasMedioNocturno(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarNotasMedioAdaptacion: function (respuesta) {
            if (respuesta.estado) {
                mostrarNotasMedioAdaptacion(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },
        cargarNotasMedioBimestral: function (respuesta) {
            if (respuesta.estado) {
                mostrarNotasMedioBimestral(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

     
    };


    function formato(texto) {
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    }
    ;



}();

