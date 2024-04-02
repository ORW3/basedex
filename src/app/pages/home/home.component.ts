import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { Genero } from '../../models/genero';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  pokemones: Pokemon[] = [];
  pokemon = new Pokemon();
  generos: Genero[] = [];
  rutaImagen: string = 'assets/img/nada.png';
  informacion: string = ''

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemones().subscribe(data => {
      this.pokemones = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Pokemon,
          id: doc.payload.doc.id
        };
      })
    });
    this.pokemonService.getGeneros().subscribe(data => {
      this.generos = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Genero,
          id: doc.payload.doc.id
        };
      })
    });
  }

  insertarPokemon() {
    if (this.validarFormulario() && this.validarCaracteresEspeciales()) {
      this.pokemonService.createPokemon(this.pokemon);
      this.pokemon = new Pokemon();
    }
  }

  selectPokemon(pokemonSeleccionado: Pokemon) {
    this.pokemon = pokemonSeleccionado;
  }

  updatePokemon() {
    if (this.validarFormulario() && this.validarCaracteresEspeciales()) {
      this.pokemonService.updatePokemon(this.pokemon);
      this.pokemon = new Pokemon();
    }
  }

  deletePokemon(id: string) {
    this.pokemonService.deletePokemon(id);
    this.pokemon = new Pokemon();
  }

  cambiarImagen(pokemonSeleccionado: Pokemon) {
    this.rutaImagen = pokemonSeleccionado.imagen;
    let tiposImagen = "";
    const tipos = pokemonSeleccionado.tipo.split(", ");
    tipos.forEach(tipo => {
      tiposImagen += "<img src='assets/img/tipos/" + tipo + ".png' class='mx-1'/>";
    });
    this.informacion = pokemonSeleccionado.apodo.toUpperCase() + "</br>/" + pokemonSeleccionado.nombre.toUpperCase() + "</br>" + this.generoImagen(pokemonSeleccionado.generoPokemon) + " " + pokemonSeleccionado.estatura + "m " + pokemonSeleccionado.peso + "lbs" + "</br>" + tiposImagen;
  }

  generoImagen(genero: number) {
    if (genero == 1) {
      return "<img src='assets/img/macho-pixel.png'>"
    }
    if (genero == 2) {
      return "<img src='assets/img/hembra-pixel.png'>";
    }
    return "";
  }

  quitarImagen() {
    this.rutaImagen = 'assets/img/nada.png';
    this.informacion = '';
  }

  validarFormulario(): boolean {
    if (!this.pokemon.apodo) {
      alert('Debe ingresar un apodo para el Pokémon.');
      return false;
    }
    if (!this.pokemon.generoPokemon) {
      alert('Debe seleccionar un género para el Pokémon.');
      return false;
    }
    if (!this.pokemon.nombreSprite) {
      alert('Debe seleccionar un Pokémon.');
      return false;
    }
    return true;
  }

  validarCaracteresEspeciales(): boolean {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
    if (!regex.test(this.pokemon.apodo)) {
      alert('El apodo solo puede contener letras y espacios.');
      return false;
    }
    return true;
  }

  limpiarPokemon() {
    this.pokemon = new Pokemon();
    this.quitarImagen()
  }
}
