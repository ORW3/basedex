window.addEventListener('DOMContentLoaded', (event) => {
    interactive('pc', { resize: false, close: false, minMax: false });
    interactive('agregar', { resize: false, close: false, minMax: false });
    interactive('acerca', { resize: false, close: false, minMax: false });
    document.getElementById("pc").style.display = "none";
    document.getElementById("agregar").style.display = "none";

    tamaño

    function tamaño() {
        document.getElementById('magikarp-gemelo').style.width = document.getElementById("magikarp-juego").width + 'px';
        document.getElementById('magikarp-gemelo').style.height = (document.getElementById("magikarp-juego").width * 80) / 60 + 'px';
    }

    window.onload = window.onresize = tamaño;
    /*
    //Abrir ventana en ubicacion aleatoria

    function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var left = getRandomValue(0, window.innerWidth / 2 - document.getElementById("pc").offsetWidth / 2);
    var top = getRandomValue(0, window.innerHeight / 2 - document.getElementById("pc").offsetWidth / 2);
    
    document.getElementById("pc").style.left = left + "px";
    document.getElementById("pc").style.top = top + "px";
    */

    // paginacion
    const itemsPorPagina = 30;
    let paginaActual = 0;

    $('#nextPage').on('click', function () {
        if (paginaActual < Math.ceil($('.tabla-poke .col').length / itemsPorPagina) - 1) {
            paginaActual++;
            mostrarPagina(paginaActual);
        }
    });

    $('#prevPage').on('click', function () {
        if (paginaActual > 0) {
            paginaActual--;
            mostrarPagina(paginaActual);
        }
    });

    function mostrarPagina(pagina) {
        $('.tabla-poke .col').each(function (i) {
            if (i >= pagina * itemsPorPagina && i < (pagina + 1) * itemsPorPagina) {
                $(this).css('display', 'block');
            } else {
                $(this).css('display', 'none');
            }
        });

        $('#bibli-pagina').text('CAJA ' + (pagina + 1));
    }

    $(document).ready(function () {
        mostrarPagina(paginaActual)
        $(".tabla-poke").on('DOMSubtreeModified', function () {
            mostrarPagina(paginaActual);
        });
        $("#imagen-pokemon").on('input', function () {
            setTimeout(function () {
                graficas();
            }, 1);
        });
        $("#añadir-tipo-id").on('DOMSubtreeModified', function () {
            colorBarraAgregar();
        });
    });

    // -------------- 🔎 B U S Q U E D A 🔎 (Basado en estadias)--------------

    const searchResult = document.querySelector(".search-result");
    const inputBox = document.querySelector(".input-box");

    inputBox.addEventListener("input", mostrarResultados);
    inputBox.addEventListener("click", mostrarResultados);
    inputBox.addEventListener("blur", limpiarBusquedaResultado)
    inputBox.addEventListener("keyup", function (e) {
        if (e.keyCode === 13 || e.keyCode === 9) {
            $('.item-busqueda').first().trigger('click');
            limpiarBusquedaResultado()
        } else if (e.keyCode === 8) {
            mostrarResultados()
        } else if (e.keyCode === 46) {
            limpiarBusqueda()
        }
    })

    function mostrarResultados() { //primera función
        var input = inputBox.value;
        if (input.length) {
            buscar(input)
        } else {
            limpiarBusquedaResultado();
        }
    }

    function limpiarBusqueda() {
        inputBox.value = ""
        searchResult.innerHTML = "";
    }

    function limpiarBusquedaResultado() {
        setTimeout(function () {
            searchResult.innerHTML = "";
        }, 150);
    }

    function display(result) {
        const content = result.map((list) => {
            return "</li><li class='item-busqueda' onclick=selectInput(this,"
                + list.pkdx_id + ")>" + list.name + "</li></div>";
        });
        searchResult.innerHTML = "<ul>" + content.join("") + "</ul>"
    }

    function buscar(name) {
        const url = 'assets/json/pokemon.json';
        let pokemon = []
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    if (item.name.toLowerCase().includes(name.toLowerCase())) {
                        if (pokemon.length < 6) {
                            pokemon.push(item);
                        }
                    }
                });

                display(pokemon);
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
    }

    //Tipos

    var inputTipo = document.getElementById('tipos-poke').value;
    var inputTipoElem = document.getElementById('tipos-poke');
    var tipoContainer = document.getElementById('tipoContainer');

    mostrarTipos

    inputTipoElem.addEventListener('input', mostrarTipos)
    inputTipoElem.addEventListener('change', mostrarTipos)

    function mostrarTipos() {
        if (inputTipo.length) {
            var elementos = inputTipo.split(',').map(item => item.trim());

            tipoContainer.innerHTML = '';

            elementos.forEach(function (elemento) {
                var imagen = document.createElement('img');
                imagen.src = "assets/img/tipos/" + elemento + ".png";
                imagen.alt = elemento;
                imagen.classList.add('mx-2');
                imagen.style.height = "15px"
                imagen.style.imageRendering = "pixelated"
                tipoContainer.appendChild(imagen);
            });
        } else {
            tipoContainer.innerHTML = '';

            var imagen = document.createElement('img');
            imagen.src = "assets/img/tipos/none.png";
            imagen.style.height = "15px"
            imagen.style.imageRendering = "pixelated"
            tipoContainer.appendChild(imagen);
        }
    }

    //imagen
    var imagenPokemono = document.getElementById('imagen-pokemon');
    imagenPokemono.addEventListener('input', cambiarImagen)

    function cambiarImagen() {
        var perfilImagen = document.getElementById('perfil-img');

        if (imagenPokemono.value.length) {
            perfilImagen.src = imagenPokemono.value;
        } else {
            perfilImagen.src = "assets/img/missingno.png"
        }
    }

    function graficas() {
        $('#salud-barra').css('width', 100 - (((255 - $('#salud').val()) / 255) * 100) + '%');
        $('#ataque-barra').css('width', 100 - (((255 - $('#ataque').val()) / 255) * 100) + '%');
        $('#defensa-barra').css('width', 100 - (((255 - $('#defensa').val()) / 255) * 100) + '%');
        $('#ataque-especial-barra').css('width', 100 - (((255 - $('#ataque-especial').val()) / 255) * 100) + '%');
        $('#defensa-especial-barra').css('width', 100 - (((255 - $('#defensa-especial').val()) / 255) * 100) + '%');
        $('#velocidad-barra').css('width', 100 - (((255 - $('#velocidad').val()) / 255) * 100) + '%');
    }
});

function pc() {
    var pcerda = document.getElementById("pc");
    if (pcerda.style.display === "none") {
        pcerda.style.display = "block";
    } else {
        pcerda.style.display = "none";
    }
}

function agregar() {
    var agregar = document.getElementById("agregar");
    if (agregar.style.display === "none") {
        agregar.style.display = "block";
    } else {
        agregar.style.display = "none";
    }
}

function selectInput(este, id) {
    var eventoInput = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    document.querySelector(".input-box").value = este.innerHTML;
    document.getElementById("input-box").dispatchEvent(eventoInput);

    //Llama a la funcion de la api Pokémon
    encuentraPokemon(id);
}

//PokeAPI

function encuentraPokemon(id) {
    try {
        pokemonDatos = $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + id,
            method: "GET"
        });
        pokemonDatos.done(function (datos) {
            var eventoInput = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            const habilidades = datos.abilities.map(habilidad => habilidad.ability.name).join(', ');
            const tipos = datos.types.map(tipo => tipo.type.name).join(', ');
            document.getElementById("name").value = datos.name;
            document.getElementById("name").dispatchEvent(eventoInput);
            document.getElementById("tipos-poke").value = tipos;
            document.getElementById("tipos-poke").dispatchEvent(eventoInput);
            mostrarTipos2()
            document.getElementById("habilidades").value = habilidades;
            document.getElementById("habilidades").dispatchEvent(eventoInput);
            document.getElementById("experiencia").value = datos.base_experience;
            document.getElementById("experiencia").dispatchEvent(eventoInput);
            document.getElementById("estatura").value = datos.height;
            document.getElementById("estatura").dispatchEvent(eventoInput);
            document.getElementById("peso").value = datos.weight;
            document.getElementById("peso").dispatchEvent(eventoInput);
            document.getElementById("salud").value = datos.stats[0].base_stat;
            document.getElementById("salud").dispatchEvent(eventoInput);
            document.getElementById("salud-barra").style.width = calcularPorcentaje(datos.stats[0].base_stat) + "%";
            document.getElementById("ataque").value = datos.stats[1].base_stat;
            document.getElementById("ataque").dispatchEvent(eventoInput);
            document.getElementById("ataque-barra").style.width = calcularPorcentaje(datos.stats[1].base_stat) + "%";
            document.getElementById("defensa").value = datos.stats[2].base_stat;
            document.getElementById("defensa").dispatchEvent(eventoInput);
            document.getElementById("defensa-barra").style.width = calcularPorcentaje(datos.stats[2].base_stat) + "%";
            document.getElementById("ataque-especial").value = datos.stats[3].base_stat;
            document.getElementById("ataque-especial").dispatchEvent(eventoInput);
            document.getElementById("ataque-especial-barra").style.width = calcularPorcentaje(datos.stats[3].base_stat) + "%";
            document.getElementById("defensa-especial").value = datos.stats[4].base_stat;
            document.getElementById("defensa-especial").dispatchEvent(eventoInput);
            document.getElementById("defensa-especial-barra").style.width = calcularPorcentaje(datos.stats[4].base_stat) + "%";
            document.getElementById("velocidad").value = datos.stats[5].base_stat;
            document.getElementById("velocidad").dispatchEvent(eventoInput);
            document.getElementById("velocidad-barra").style.width = calcularPorcentaje(datos.stats[5].base_stat) + "%";
            document.getElementById("imagen-pokemon").value = datos.sprites.front_default;
            document.getElementById("imagen-pokemon").dispatchEvent(eventoInput);
        });
    } catch (e) {
        console.log("Ha ocurrido un error:", e);
    }
}

function calcularPorcentaje(valor) {
    return 100 - (((255 - valor) / 255) * 100);
}

function mostrarTipos2() {
    if (document.getElementById('tipos-poke').value.length) {
        var elementos = document.getElementById('tipos-poke').value.split(',').map(item => item.trim());

        document.getElementById('tipoContainer').innerHTML = '';

        elementos.forEach(function (elemento) {
            var imagen = document.createElement('img');
            imagen.src = "assets/img/tipos/" + elemento + ".png";
            imagen.alt = elemento;
            imagen.classList.add('mx-2');
            imagen.style.height = "15px";
            imagen.style.imageRendering = "pixelated";
            document.getElementById('tipoContainer').appendChild(imagen);
        });
    } else {
        document.getElementById('tipoContainer').innerHTML = '';

        var imagen = document.createElement('img');
        imagen.src = "assets/img/tipos/none.png";
        imagen.style.height = "15px"
        imagen.style.imageRendering = "pixelated"
        document.getElementById('tipoContainer').appendChild(imagen);
    }
}

function mostrarTodasVentanas() {
    if (document.getElementById("pc").style.display === "block" && document.getElementById("agregar").style.display === "block") {
        document.getElementById("pc").style.display = "none"
        document.getElementById("agregar").style.display = "none"
    } else {
        document.getElementById("pc").style.display = "block"
        document.getElementById("agregar").style.display = "block"
    }
}

function subir() {
    $("#agregar").animate({ scrollTop: 0 }, 200);
}

function agregar2() {
    var agregar = document.getElementById("agregar");
    agregar.style.display = "block";
    var eventoInput = new Event('input', {
        bubbles: true,
        cancelable: true,
    });

    setTimeout(function () {
        document.getElementById("name").dispatchEvent(eventoInput);
        document.getElementById("tipos-poke").dispatchEvent(eventoInput);
        mostrarTipos2();
        document.getElementById("habilidades").dispatchEvent(eventoInput);
        document.getElementById("experiencia").dispatchEvent(eventoInput);
        document.getElementById("estatura").dispatchEvent(eventoInput);
        document.getElementById("peso").dispatchEvent(eventoInput);
        document.getElementById("salud").dispatchEvent(eventoInput);
        document.getElementById("ataque").dispatchEvent(eventoInput);
        document.getElementById("defensa").dispatchEvent(eventoInput);
        document.getElementById("ataque-especial").dispatchEvent(eventoInput);
        document.getElementById("defensa-especial").dispatchEvent(eventoInput);
        document.getElementById("velocidad").dispatchEvent(eventoInput);
        document.getElementById("imagen-pokemon").dispatchEvent(eventoInput);
    }, 1);

    subir()
}

function limpiar() {
    $('#formulario-pokemon')[0].reset();
    agregar2()
}

function moverse() {
    const magikarp = document.getElementById("magikarp-juego");
    const magikarpSombra = document.getElementById('magikarp-gemelo');

    var arriba = Math.floor(Math.random() * 500);
    var izquierda = Math.floor(Math.random() * 1000);
    var arriba1 = arriba + "px";
    var izquierda1 = izquierda + "px";
    magikarp.style.top = arriba1;
    magikarp.style.left = izquierda1;
    magikarpSombra.style.top = arriba1;
    magikarpSombra.style.left = izquierda1;
}

function colorBarraAgregar() {
    setTimeout(function () {
        if (document.getElementById('tipos-poke').value.length) {
            var elementos = document.getElementById('tipos-poke').value.split(',').map(item => item.trim());
            const colorThief = new ColorThief();
            const colorImagen = document.createElement('img');
            colorImagen.src = "assets/img/tipos/" + elementos[0] + ".png";
            colorTipo = colorThief.getColor(colorImagen);
            document.getElementById("agregarHeader").style.background = "rgb(" + colorTipo[0] + "," + colorTipo[1] + "," + colorTipo[2] + ")";
        }
        else {
            document.getElementById("agregarHeader").style.background = "#78C2AD";
        }
    }, 50);//100
}