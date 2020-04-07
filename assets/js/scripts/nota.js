/* global Api */

var Nota = function () {
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
        Api.getStudentData(objeto, 'NOTA', Nota.cargarNotasMedio);
    };

    var promedio = function (datos, trimestreActual) {
        var sum = 0;
        var cont = 0;
        var atributos = Object.keys(datos);

        $.each(atributos, function (i, atributo) {
            if (atributo.includes('e' + trimestreActual + '_')) {
                if (datos[atributo] !== 0 && !isNaN(parseFloat(datos[atributo]))) {
                    sum = sum + datos[atributo];
                    cont++;
                }
            }
        });

        if (cont !== 0) {
            var promedio = sum / cont;
            Math.trunc(4);
            return promedio.toFixed(2);
        } else {
            return ("--")
        }


    };

    var mostrarNotasMedio = function (datos) {

        var contenedor = $('#body');
        var itemPadre = $('#row_0');
        if (datos.length > 0) {
            $.each(datos, function (key, d) {
                var item = itemPadre.clone(true, true);
                item.attr('id', 'row' + (key + 1));
                item.removeClass('hide');
                

                item.find('.nombre').text(d.nombre);
                item.find('.e1_1').text(d.e1_1);
                item.find('.e1_2').text(d.e1_2);
                item.find('.e1_3').text(d.e1_3);
                item.find('.e1_4').text(d.e1_4);
                item.find('.e1_5').text(d.e1_5);
                item.find('.e1_6').text(d.e1_6);
                item.find('.conduc_1').text(d.conduc_1);
                item.find('.promedio').text(promedio(d[i], 1));
                contenedor.append(item);
                

            });
        } else {
            contenedor.html('<tr><td>No hay Mensajes</td></tr>');
        }
    }

    








    //metodos publicos

    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },





        //MEDIO
        cargarNotasMedio: function (respuesta) {
            if (respuesta.estado) {
                mostrarNotasMedio(respuesta.objeto.datos_notas);
                //mostrarNotasMedio(respuesta.objeto.datos_notas);
            } else {
                alert(respuesta.mensaje);
            }
        },
        setExample: function (g) {
            mostrarExamples(g);
        }
    };


    function formato(texto) {
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    }
    ;



}();