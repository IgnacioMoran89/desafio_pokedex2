    $(document).ready(function () {
        getPokemon("https://pokeapi.co/api/v2/pokemon");
    });
    

    

    function getPokemon(url) {
        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.results.forEach(function (pokemon) {
            getImage(pokemon);
            });
            $("#more-pokemons").attr("data-next", data.next);
        });
    }

    function addPokemon(pokemon, image) {
        $("#pokedex").append(
        '<div class="card col-xs-12 col-sm-2 m-2" >' +
            '<img src="' +
            image +
            '" class="card-img-top" alt="..."></img>' +
            '<div class="card-body">' +
            '<h5 class="card-title text-center">' +
            pokemon.name +
            "</h5>" +
            '<button class="btn btn-primary btn-pok" data-bs-toggle="modal" data-bs-target="#pokemon-data"  data-pokemon=' +
            pokemon.name +
            "> Quién es ese pokemon?" +
            "</button>" +
            " </div>" +
            "</div>"
        );
    }
    
    function getImage(pokemon) {
        let url_pokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemon.name;
        fetch(url_pokemon)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            image = data.sprites.front_default;
            addPokemon(pokemon, image);
        });
        
    }
    

    function getPokemonData(pokemon) {
        let url_pok = "https://pokeapi.co/api/v2/pokemon/";
        fetch(url_pok + pokemon)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $("#pokemon-data-name").text(data.name);
            $("#pokemon-image").append(
            '<img src="' +
                data.sprites.front_shiny +
                '" class="card-img-top" alt="..."></img>'
            );
            data.types.forEach(function (tipo) {
            $("#pokemon-types").append("<li>" + tipo.type.name + "</li>");
            $("#pokemon-types").append(
                '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#damage-data"  data-type=' +
                tipo.type.name +
                ">Relaciones de daño" +
                "</button>"
            );
            getPokemonGeneration(tipo.type.url);
            });
    
            data.abilities.forEach(function (habilidad) {
            $("#pokemon-abilities").append(
                "<li>" + habilidad.ability.name + "</li>"
            );
            $("#pokemon-abilities").append(
                '<button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#others-pokemon-ability"  data-ability=' +
                habilidad.ability.name +
                "> más pokemones con esta habilidad" +
                "</button>"
            );
            });
    
            let count = 0;
            data.moves.forEach(function (move) {
            count++;
            if (count < 6) {
                $("#pokemon-moves").append("<li>" + move.move.name + "</li>");
            }
            });
        });
    
        vaciarContenido();
    }
    
    function vaciarContenido() {
        $("#pokemon-image").empty();
        $("#pokemon-moves").empty();
        $("#pokemon-data-name").empty();
        $("#pokemon-types").empty();
        $("#pokemon-generations").empty();
        $("#pokemon-abilities").empty();
    }
    
    function getPokemonGeneration(url) {
        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $("#pokemon-generations").append("<li>" + data.generation.name + "</li>");
        });
    }
    
    function damageData(type) {
        let url_damage = "https://pokeapi.co/api/v2/type/" + type;
        fetch(url_damage)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $("#type-name").text(data.name);
    
            data.damage_relations.double_damage_from.forEach(function (damage) {
            $("#double-damage-from").append("<li>" + damage.name + "</li>");
            });
    
            data.damage_relations.double_damage_to.forEach(function (damage) {
            $("#double-damage-to").append("<li>" + damage.name + "</li>");
            });
    
            data.damage_relations.half_damage_from.forEach(function (damage) {
            $("#half-damage-from").append("<li>" + damage.name + "</li>");
            });
    
            data.damage_relations.half_damage_to.forEach(function (damage) {
            $("#half-damage-to").append("<li>" + damage.name + "</li>");
            });
    
            data.damage_relations.no_damage_from.forEach(function (damage) {
            $("#no-damage-from").append("<li>" + damage.name + "</li>");
            });
    
            data.damage_relations.no_damage_to.forEach(function (damage) {
            $("#no-damage-to").append("<li>" + damage.name + "</li>");
            });
        });
        $("#type-name").empty();
        $("#double-damage-from").empty();
        $("#double-damage-to").empty();
        $("#half-damage-from").empty();
        $("#half-damage-to").empty();
        $("#no-damage-from").empty();
        $("#no-damage-to").empty();
    }
    
    function pokemonsWithAbilities(ability) {
        let url_ability = "https://pokeapi.co/api/v2/ability/" + ability;
        fetch(url_ability)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $("#ability-name").text(data.name);
            data.pokemon.forEach(function (pok) {
            $("#ability-pokemons-list").append("<li>" + pok.pokemon.name + "</li>");
            });
        });
    
        $("#ability-name").empty();
        $("#ability-pokemons-list").empty();
    }
    
    // EVENTOS
    
    // click para traer los proximos 20 pokemones
    $("#more-pokemons").click(function () {
        getPokemon(this.dataset.next);
    });
    
    //click para identificar el pokemon
    $("#pokedex").click(function (event) {
        if (event.target.dataset.pokemon) {
        getPokemonData(event.target.dataset.pokemon);
        }
    });
    
    //click para identificar el tipo
    $("#pokemon-types").click(function (event) {
        if (event.target.dataset.type) {
        damageData(event.target.dataset.type);
        }
    });
    
    //click para identificar la abilidad
    $("#pokemon-abilities").click(function (event) {
        if (event.target.dataset.ability) {
        pokemonsWithAbilities(event.target.dataset.ability);
        }
    });