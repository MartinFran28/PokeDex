const listaPokemon = document.querySelector( "#listaPokemon" );  // Declarando una constante que hace referenci a la lista de pokemones en el HTML
const botonesAside = document.querySelectorAll( ".btn-aside" );  // Declarando una cosntante que tenga todos los botones del aside
// const ventanaEmergente = document.querySelector( ".ventana-emergente" )
let URL = "https://pokeapi.co/api/v2/pokemon/";


// Este for recorre los pokemones de la quinta generacino y los pasa uno a uno como argumento de la funcion para mostrarlos
for ( let i = 494; i <= 649; i++ ) {
    fetch( URL + i + "/" )
    .then( ( respuesta ) => respuesta.json() )  // Convirtiendo la respuesta de la solicitud a json
    .then( datos_pokemon => mostrarPokemon( datos_pokemon ) )  // Ejecutando la funcion mostrarPokemon y pasando los datos del pokemon para mostrarlo en la pagina
}

function mostrarPokemon( poke ) {
    let tipos = poke.types.map( ( type ) => `<p class="${type.type.name} tipo">${type.type.name}</p>` );  // Obteniendo un Array de los tipos de pokemon y agregandolos a una variable
    tipos = tipos.join('');  // Separando el HTML de los tipos por un string vacio, para que no se muestre ',' en la pagina

    let habilidades = poke.abilities.map( ( habilidad ) => `<p class="${habilidad.ability.name} habilidad">${habilidad.ability.name}</p>` );
    habilidades = habilidades.join('');  // Separando el HTML de las habilidades por un string vacio, para que no se muestre ',' en la pagina

    let pokemonID = poke.id.toString();  // obteniendo el id del pokemon para luego completar los dijitos

    // if para que todos los numeros tengan 4 dijitos
    if ( pokemonID.length === 1 ) {
        pokemonID = "000" + pokemonID;
    } else if ( pokemonID.length === 2 ) {
        pokemonID = "00" + pokemonID;
    } else if (pokemonID.length === 3) {
        pokemonID = "0" + pokemonID;
    } else {
        pokemonID = pokemonID;
    }

    const div = document.createElement( "div" );  // Creando el elemento div que luego agregare a la listaPokemon

    div.classList.add( "pokemon" ); // Agregando el elemento pokemon al div

    // Con .innerHTML crearemos el HTML para el pokemon que estemos recorreindo en el for
    div.innerHTML = `
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokemonID}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-habilidades">
            ${habilidades}
        </div>
        <div class="pokemon-estadisticas">
            <p class="dato">${poke.height}M</p>
            <p class="dato">${poke.weight}KG</p>
            <p class="dato">BASE XP: ${poke.base_experience}</p>
        </div>
    </div>
    `;

    // agregarEventoClick(div, poke);

    listaPokemon.append( div );  // Agregando el div a la lista de pokemones
}

botonesAside.forEach( boton => boton.addEventListener( "click", ( event ) => {  // funcion para ejecutar el evento de click en los botones del aside
    const botonPresionado = event.currentTarget.id;  // Obteniendo el id del boton presionado para compararlo con los tipos de pokemon

    listaPokemon.innerHTML = "";  // Limpiando la lista de pokemones para agregar los nuevos filtrados por tipo 

    for ( let i = 494; i <= 649; i++ ) {  // Recorriendo todos los elementos nevamente para filtrarlos tipo
        fetch(URL + i)
        .then( ( response ) => response.json() )
        .then( datos_pokemon => {

            if( botonPresionado === "ver-todos" ) {
                mostrarPokemon( datos_pokemon );  // Si el boton presionado es VER TODOS, se mostraran todos
            } else {
                const tipos = datos_pokemon.types.map( tipo => tipo.type.name );  // Obteniendo los tipos del pokemon
                if ( tipos.some( tipo => tipo.includes( botonPresionado ) ) ) {  // Comprobando si al menos uno de los tipos del pokemon coincide con el id del boton presionado
                    mostrarPokemon( datos_pokemon );  // Mostrando el pokemon si es que cumple con el if
                }
            }

        } )
    }
} ) )

// // Esta funcion la uso para agregar un evento de click indirectamente a cada Pokemon en la funcion de mostrarPokemon
// function agregarEventoClick( div, data ) {
//     div.addEventListener("click", function() {
//         mostrarVentanaEmergente(data);
//     });
// }

// function mostrarVentanaEmergente( poke ) {
//     // Selecciona la ventana emergente
//     const ventanaEmergente = document.querySelector("#ventanaEmergente");
//     const fondoOscuro = document.querySelector("#fondoOscuro");

//     // Construye el contenido de la ventana emergente con la información del Pokémon
//     const ventanaContenido = ``;

//     // Insertando el contenido en la ventana emergente
//     ventanaEmergente.innerHTML = ventanaContenido;

//     // Mostrando la ventana emergente y el fondo oscuro
//     ventanaEmergente.style.display = "block";
//     fondoOscuro.style.display = "block";
// }

// function cerrarVentanaEmergente() {
//     document.getElementById('ventanaEmergente').style.display = 'none';
//     document.getElementById('fondoOscuro').style.display = 'none';
// }
