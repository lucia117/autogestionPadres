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
        /*Api.getStudentData(objeto, 'DATOS_GENERALES', VerAlumno.cargarDatos);*/

        switch (objeto.nivel) {
            case 'I':
                Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasInicial);
                Api.getStudentData(objeto, 'INASISTENCIAS', VerAlumno.cargarListadoInasistencias);
                $("#inicial").removeClass('hide');
                hodooor();
                break;
            case 'P':
                Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasPrimario);
                Api.getStudentData(objeto, 'INASISTENCIAS', VerAlumno.cargarListadoInasistencias);
                $("#primario").removeClass('hide');
                hodooor();
                break;
            case 'M':
                Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasMedio);
                Api.getStudentData(objeto, 'INASISTENCIAS', VerAlumno.cargarListadoInasistencias);
                Api.getStudentData(objeto, 'SANCIONES', VerAlumno.cargarListadoSanciones);
                
                $("#medio").removeClass('hide');
                hodooor();
                break;
            case 'T':
                Api.getStudentData(objeto, 'NOTA', VerAlumno.cargarNotasTerciario);
                $("#terciario").removeClass('hide');
                hodooor();
                break;
            default:
                return [];
        }

    };

   /* var mostrarDatos = function (datos) {
        $('#alumnoNombre').text(datos.nombre);
        $('#alumnoDni').text(datos.codigo);
        $('#alumnoGrado').text(datos.grado);
        $('#alumnoDivision').text(datos.division);
        var turno;
        if (datos.turno === "M") {
            turno = "Mañana";
        } else {
            turno = "Tarde";
        }
        $('#alumnoTurno').text(turno);
        $('#colegioNombre').text(datos.colegio);
        console.log(datos);
    };*/

    $('.seccionSanciones').click(function (e) {
        e.preventDefault();
        $(".cargarSanciones").removeClass('hide');
    });

    $('.seccionInasistencias').click(function (e) {
        e.preventDefault();
        $("#cargarInasistencias").removeClass('hide');

    });

    $('.boton-notas').click(function (e) {
        e.preventDefault();
        switch (Nivel) {
            case 'I':
                $("#cargarNotasI").removeClass('hide');

                break;
            case 'P':
                $("#cargarNotasP").removeClass('hide');

                break;
            case 'M':
                $("#cargarNotasM").removeClass('hide');

                break;

            default:
                break;
        }

    });


    $('#cerrarSesion').click(function (e) {
        e.preventDefault();
        localStorage.clear();
        location.href = "index.html";
    });




    var mostrarListadoSanciones = function (datos) {
        if (datos.length === 0) {
            //swal('El alumno no tiene sanciones/observaciones ');
            $('#seccionSanciones').change();
        } else {

            var fecha;

            var d = '<tr>' +
                '<th>fecha</th>' +
                '<th>motivo</th>' +
                '</tr>';


            for (var i = 0; i < datos.length; i++) {
                fecha = formato(datos[i].fecha);
                d += '<tr>' +
                    '<td>' + fecha + '</td>' +
                    '<td>' + datos[i].motivo + '</td>' +
                    '</tr>';

            }
            $("#tablaSanciones-" + Nivel).append(d);

        }
    };

    var mostrarListadoInasistencias = function (datos) {
        if (datos.length === 0) {
            //swal('El alumno no tiene inasistencias ');
        } else {
            var fecha;
            var justi;

            var d = '<tr>' +
                '<th>Fecha</th>' +
                '<th>Cant</th>' +
                '<th>Justifica</th>' +
                '<th>Tipo</th>' +
                '</tr>';


            for (var i = 0; i < datos.length; i++) {
                var motivo;
                if (datos[i].motivo === null) {
                    motivo = '--';
                } else {
                    motivo = datos[i].motivo;
                }
                if (datos[i].justifica === 1) {
                    justi = 'Si'
                } else {
                    justi = 'No'
                }
                fecha = formato(datos[i].fecha);

                d += '<tr>' +
                    '<td>' + fecha + '</td>' +
                    '<td>' + datos[i].cantidad + '</td>' +
                    '<td>' + justi + '</td>' +
                    '<td>' + datos[i].tipoFalta + '</td>' +
                    '</tr>';

            }
            $("#tablaInasistencia-" + Nivel).append(d);

        }

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



    var mostrarMensajes1 = function (datos) {

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



    //INICIAL
    var mostrarNotasInicial = function (datos) {

        //PRIMER CUATRIMESTRE 
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th> </th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].a_1 + '</td>' +
                '</tr>';

        }
        $("#tablaNotasInicialPrimero").append(d);
        //SEGUNDO CUATRIMETRE
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th> </th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].a_2 + '</td>' +
                '</tr>';

        }

        $("#tablaNotasInicialSegundo").append(d);



    };

    //PRIMARIO
    var mostrarNotasPrimario = function (datos) {

        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th class="text-center"><small>Primer Trimestre</small></th>' +
            '<th class="text-center"><small>Segundo Trimestre</small></th>' +
            '<th class="text-center"><small>Tercer Trimestre</small></th>' +
            '</tr>';


        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td class="text-center">' + datos[i].nombre + '</td>' +
                '<td class="text-center">' + datos[i].e_1 + '</td>' +
                '<td class="text-center">' + datos[i].e_2 + '</td>' +
                '<td lass="text-center">' + datos[i].e_3 + '</td>' +
                '</tr>';

        }
        $("#tablaNotasPrimario").append(d);


    };

    //---------NIVEL MEDIO------------

    //MEDIO TRIMESTRAL
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
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '<th>Pr</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e1_1 + '</td>' +
                '<td>' + datos[i].e1_2 + '</td>' +
                '<td>' + datos[i].e1_3 + '</td>' +
                '<td>' + datos[i].e1_4 + '</td>' +
                '<td>' + datos[i].e1_5 + '</td>' +
                '<td>' + datos[i].e1_6 + '</td>' +
                '<td>' + datos[i].conduc_1 + '</td>' +
                '<td>' + promedio(datos[i], 1) + '</td>' +
                '</tr>';
        }
        $("#tablaPrimerTrimestreM").append(d);


        '<h1>Segundo Trimestre</h1>'
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '<th>Pr</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e2_1 + '</td>' +
                '<td>' + datos[i].e2_2 + '</td>' +
                '<td>' + datos[i].e2_3 + '</td>' +
                '<td>' + datos[i].e2_4 + '</td>' +
                '<td>' + datos[i].e2_5 + '</td>' +
                '<td>' + datos[i].e2_6 + '</td>' +
                '<td>' + datos[i].conduc_2 + '</td>' +
                '<td>' + promedio(datos[i], 2) + '</td>' +
                '</tr>';

        }
        $("#tablaSegundoTrimestreM").append(d);


        '<h1>Tercer Trimestre</h1>'
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '<th>Pr</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e3_1 + '</td>' +
                '<td>' + datos[i].e3_2 + '</td>' +
                '<td>' + datos[i].e3_3 + '</td>' +
                '<td>' + datos[i].e3_4 + '</td>' +
                '<td>' + datos[i].e3_5 + '</td>' +
                '<td>' + datos[i].e3_6 + '</td>' +
                '<td>' + datos[i].conduc_3 + '</td>' +
                '<td>' + promedio(datos[i], 3) + '</td>' +
                '</tr>';
        }
        $("#tablaTercerTrimestreM").append(d);
        $("#cargarNotasTrimestralM").removeClass('hide');
    };

    //MEDIO NOCTURNO 
    var mostrarNotasMedioNocturno = function (datos) {
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>R1</th>' +
            '<th>c2</th>' +
            '<th>R2</th>' +
            '<th>c3</th>' +
            '<th>R3</th>' +
            '<th>c4</th>' +
            '<th>R4</th>' +
            '<th>c5</th>' +
            '<th>R5</th>' +
            '<th>c6</th>' +
            '<th>R6</th>' +
            '<th>c7</th>' +
            '<th>R7</th>' +
            '<th>c8</th>' +
            '<th>R8</th>' +
            '<th>IA</th>' +
            '<th>Promedio</th>' +
            '</tr>';

        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].c1 + '</td>' +
                '<td>' + datos[i].r1 + '</td>' +
                '<td>' + datos[i].c2 + '</td>' +
                '<td>' + datos[i].r2 + '</td>' +
                '<td>' + datos[i].c3 + '</td>' +
                '<td>' + datos[i].r3 + '</td>' +
                '<td>' + datos[i].c4 + '</td>' +
                '<td>' + datos[i].r4 + '</td>' +
                '<td>' + datos[i].c5 + '</td>' +
                '<td>' + datos[i].r5 + '</td>' +
                '<td>' + datos[i].c6 + '</td>' +
                '<td>' + datos[i].r6 + '</td>' +
                '<td>' + datos[i].c7 + '</td>' +
                '<td>' + datos[i].r7 + '</td>' +
                '<td>' + datos[i].c8 + '</td>' +
                '<td>' + datos[i].r8 + '</td>' +
                '<td>' + datos[i].ia + '</td>' +
                '<td>' + datos[i].promedio + '</td>' +
                '</tr>';
        }
        $("#tablaNocturnoM").append(d);
        $("#mostrarNotasMedioNocturno").removeClass('hide');
    };

    //MEDIO ADAPTACION  - CUATRIMESTRAL
    var mostrarNotasMedioAdaptacion = function (datos) {
        '<h1>Primer Cuatrimestre</h1>'
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e1_1 + '</td>' +
                '<td>' + datos[i].e1_2 + '</td>' +
                '<td>' + datos[i].e1_3 + '</td>' +
                '<td>' + datos[i].e1_4 + '</td>' +
                '<td>' + datos[i].e1_5 + '</td>' +
                '<td>' + datos[i].e1_6 + '</td>' +
                '<td>' + datos[i].conduc_1 + '</td>' +
                '</tr>';
        }
        $("#tablaPrimerCuatrimestreM").append(d);

        '<h1>Segundo Cuatrimestre</h1>'
        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>c1</th>' +
            '<th>c2</th>' +
            '<th>c3</th>' +
            '<th>c4</th>' +
            '<th>c5</th>' +
            '<th>In</th>' +
            '<th>C</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + datos[i].e2_1 + '</td>' +
                '<td>' + datos[i].e2_2 + '</td>' +
                '<td>' + datos[i].e2_3 + '</td>' +
                '<td>' + datos[i].e2_4 + '</td>' +
                '<td>' + datos[i].e2_5 + '</td>' +
                '<td>' + datos[i].e2_6 + '</td>' +
                '<td>' + datos[i].conduc_2 + '</td>' +
                '</tr>';

        }
        $("#tablaSegundoCuatrimestreM").append(d);
        $("#mostrarNotasMedioAdaptacion").removeClass('hide');
    };

    //MEDIO BIMESTRAL
    var mostrarNotasMedioBimestral = function (datos) {

        var d = '<tr>' +
            '<th>Materia</th>' +
            '<th>1 Bimestre</th>' +
            '<th>2 Bimestre</th>' +
            '<th>3 Bimestre</th>' +
            '<th>4 Bimestre</th>' +
            '<th>Calificación Final</th>' +
            '</tr>';
        for (var i = 0; i < datos.length; i++) {
            var n1 = (datos[i].e1_1) / 10;
            var n2 = (datos[i].e1_2) / 10;
            var n3 = (datos[i].e1_3) / 10;
            var n4 = (datos[i].e1_4) / 10;
            var numero = (datos[i].definitiva) / 10;
            var final =  Number(numero.toFixed(2));
          

            d += '<tr>' +
                '<td>' + datos[i].nombre + '</td>' +
                '<td>' + n1 + '</td>' +
                '<td>' + n2 + '</td>' +
                '<td>' + n3 + '</td>' +
                '<td>' + n4 + '</td>' +
                '<td>' + final + '</td>' +
                '</tr>';
        }
        $("#tablaBimestralM").append(d);

        $("#mostrarNotasBimestral").removeClass('hide');
    };



    //metodos publicos

    return {
        //main function to initiate the module
        init: function () {
            inicializacionDeComponentes();
        },
        cargarTotalSanciones: function (respuesta) {

            if (respuesta.estado) {
                mostrarSanciones(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }

        },
        /*cargarDatos: function (respuesta) {

            if (respuesta.estado) {
                mostrarDatos(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }

        },*/
        cargarListadoSanciones: function (respuesta) {

            if (respuesta.estado) {
                mostrarListadoSanciones(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarListadoInasistencias: function (respuesta) {

            if (respuesta.estado) {
                mostrarListadoInasistencias(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarMensajes: function (respuesta) {
            if (respuesta.estado) {
                mostrarMensajes(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        //INICIAL
        cargarNotasInicial: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasInicial(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        //PRIMARIO
        cargarNotasPrimario: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasPrimario(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        //MEDIO
        cargarNotasMedio: function (respuesta) {
            chauHodooor();
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
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasMedioNocturno(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        cargarNotasMedioAdaptacion: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasMedioAdaptacion(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },
        cargarNotasMedioBimestral: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasMedioBimestral(respuesta.objeto);
            } else {
                alert(respuesta.mensaje);
            }
        },

        //TERCIARIO
        cargarNotasTerciario: function (respuesta) {
            chauHodooor();
            if (respuesta.estado) {
                mostrarNotasTerciario(respuesta.objeto);
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

