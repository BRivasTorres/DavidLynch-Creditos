let pagina = 5;
const btnSiguiente = document.getElementById("btnSiguiente");
const btnAnterior = document.getElementById("btnAnterior");

btnSiguiente.addEventListener("click", () => {
    if(pagina < 1000) {
        pagina += 1
        cargarPeliculas()
        console.log("hola");
    }
})
btnAnterior.addEventListener("click", () => {
    if(pagina > 1) {
        pagina -= 1
        cargarPeliculas()
        console.log("hola");
    }
})

const cargarPeliculas = async() => {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/person/5602-david-lynch/movie_credits?api_key=a22a574f9c8d1ac493ad479d8ab44fc4&page=${pagina}`)
        console.log(respuesta);

        //VERIFICANDO SI LA RESPUESTA ES CORRECTA
        if(respuesta.status === 200) {
            const datos = await respuesta.json()

            let peliculas = ""
            datos.cast.forEach(pelicula => {
                peliculas = peliculas + `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `
            })
            document.getElementById("contenedor").innerHTML = peliculas

        } else if (respuesta.status === 401){
            console.log("mal escrito");
        } else if (respuesta.status === 404){ 
            console.log("NO encontrado");
        } else  {
            console.log("Huvo un error");
        }

    } catch(error) {
        console.log(error);
    }
}

cargarPeliculas()