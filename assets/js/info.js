
window.addEventListener('DOMContentLoaded', (event) => {
    var juego = document.getElementById("juego");
    var pokemonJ = document.getElementById("pokemon-juego");
    var pokebolas = document.querySelector(".pokebolas-juego");
    var pokemonIzquierda = parseInt(window.getComputedStyle(pokemonJ).getPropertyValue("left"));
    var pokemonAbajo = parseInt(window.getComputedStyle(pokemonJ).getPropertyValue("bottom"));
    var score = 0;
    document.getElementById("acerca").style.display = "none";
    document.getElementById("acercaHeader").style.backgroundColor = "#f3969a";
    document.getElementById("acerca").style.borderRadius = "25px";
    document.getElementById("acercaHeader").style.borderTopLeftRadius = "25px";
    document.getElementById("acercaHeader").style.borderTopRightRadius = "25px";
    document.getElementById("acercaHeader").style.color = "white";
    document.getElementById("acercaHeader").style.textAlign = "center";
    document.getElementById("acercaHeader").style.fontFamily = "Pixelify Sans";

    function moverPokemonIzquierda() {
        if (pokemonIzquierda > 0) {
            pokemonIzquierda -= 10;
            pokemonJ.style.left = pokemonIzquierda + 'px';
        }
    }

    function moverPokemonDerecha() {
        if (pokemonIzquierda < 180) {
            pokemonIzquierda += 10;
            pokemonJ.style.left = pokemonIzquierda + 'px';
        }
    }

    function controlador(e) {
        if (e.key == 'ArrowRight') {
            moverPokemonDerecha();
        }
        if (e.key == 'ArrowLeft') {
            moverPokemonIzquierda();
        }
    }

    function generarPokebolas() {
        var pokebolaAbajo = 320;
        var pokebolaIzquierda = Math.floor(Math.random() * 220);
        var pokebola = document.createElement('div');
        pokebola.setAttribute("class", "pokeball pokesprite ball love");
        pokebolas.appendChild(pokebola);
        function caerPokebola() {
            if (pokebolaAbajo < pokemonAbajo + 50 && pokebolaAbajo > pokemonAbajo && pokebolaIzquierda > pokemonIzquierda -
                32 && pokebolaIzquierda < pokemonIzquierda + 60) {
                pokebolas.removeChild(pokebola)
                clearInterval(caerTiempo)
                score++;
            }

            if (pokebolaAbajo < pokemonAbajo) {
                document.getElementById("acercaHeader").innerHTML = score;
                clearInterval(caerTiempo)
                clearInterval(pokebolaTiempo)
                score=0;
            }
            pokebolaAbajo -= 5;
            pokebola.style.bottom = pokebolaAbajo + 'px';
            pokebola.style.left = pokebolaIzquierda + 'px';
        }
        var caerTiempo = setInterval(caerPokebola, 20);
        var pokebolaTiempo = setTimeout(generarPokebolas, 2000)
    }

    document.addEventListener("keydown", controlador)
    document.getElementById('acerca-de').addEventListener("click", function () {
        var acerca = document.getElementById("acerca");
        if (acerca.style.display === "block") {
            generarPokebolas()
        }
    })
})

function acerca() {
    var acerca = document.getElementById("acerca");
    if (acerca.style.display === "none") {
        acerca.style.display = "block";
    } else {
        acerca.style.display = "none";
    }
}