import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pokemon } from '../models/pokemon';
import { Genero } from '../models/genero';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private firestore:AngularFirestore) { }

  getPokemones(){
    return this.firestore.collection('pokemones').snapshotChanges();
  }

  getGeneros(){
    return this.firestore.collection('generos').snapshotChanges();
  }

  //metodo para insertar un documento nuevo en la colección
  createPokemon(pokemon:Pokemon){
    return this.firestore.collection('pokemones').add(Object.assign({},pokemon));
  }

  //metodo para actualizar un documento existente
  updatePokemon(pokemon:Pokemon){
    this.firestore.doc('pokemones/'+pokemon.id).update(pokemon);

  }

  //metodo para eliminar un documento de la coleccion
  deletePokemon(pokemonId:string){
    this.firestore.doc('pokemones/'+pokemonId).delete();
  }
}