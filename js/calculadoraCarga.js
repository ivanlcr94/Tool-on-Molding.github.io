//array de maquinas

const maquinas = [{
        "id": 1,
        "nombre": "Dakumar 600-HH",
        "diametroHusillo": 72,
        "maxCargacm3": 1282
    },

    {
        "id": 2,
        "nombre": "Haitian HTF 530X",
        "diametroHusillo": 90,
        "maxCargacm3": 2799
    },

    {
        "id": 3,
        "nombre": "Dakumar 650-SV",
        "diametroHusillo": 95,
        "maxCargacm3": 3046
    },

    {
        "id": 4,
        "nombre": "Haitian HTF 530X",
        "diametroHusillo": 90,
        "maxCargacm3": 2799
    },

    {
        "id": 5,
        "nombre": "Haitian 470W",
        "diametroHusillo": 84,
        "maxCargacm3": 2050
    }
]


document.querySelector("#formulario").addEventListener("submit", calcular)

function calcular(e) {

    e.preventDefault();

    //constantes de formulario

    const pesoCavidad = document.querySelector(".pesoCavidad").value;
    const cantidadCavidad = document.querySelector(".cavidades").value;
    const pesoColada = document.querySelector(".pesoColada").value;
    const seleccionarMaquina = document.querySelector(".seleccionarMaquina").value;
    const seleccionarMp = document.querySelector(".seleccionarMp").value;
    const ciclo = document.querySelector(".ciclo").value;

    //Filtro array para seleccionar maquina

    let selectorDeMaquina = maquinas.filter(elemento => elemento.id == seleccionarMaquina).find(object => object);

    //calcular

    let pesoDePrensada = pesoCavidad * cantidadCavidad + parseFloat(pesoColada);

    //! VOLUMEN DE DOSIFICACIÓN
    let volumenDosificacion = pesoDePrensada / seleccionarMp;

    //! ÁREA DE HUSILLO
    let areaDeHusillo = Math.PI * (selectorDeMaquina.diametroHusillo / 10 * selectorDeMaquina.diametroHusillo / 10) / 4;

    //! RECORRIDO DE DOSIFICACIÓN
    let recorridoDosificacion = (volumenDosificacion / areaDeHusillo) * 10;
    
    //! % UTILIZACION UNIDAD INYECCIÓN
    let utilizacionUnidadInyección = (volumenDosificacion / selectorDeMaquina.maxCargacm3) * 100;

    let cojin;

    if (utilizacionUnidadInyección < 20) {
        cojin = 0.20;
    } else {
        cojin = 0.10;
    }

    let recorridoCojin = selectorDeMaquina.diametroHusillo * cojin;

    let volumenCojin = recorridoCojin / 10 * areaDeHusillo;
    
    let puntoConmutacion = ((volumenDosificacion * 0.05) + volumenCojin) / areaDeHusillo * 10;
    

    let recorridoTotalInyeccion = recorridoDosificacion + recorridoCojin;
    let volumenTotalDosificacion = volumenDosificacion+volumenCojin;
    let utilizacionTotalUnidadInyección = (volumenTotalDosificacion / selectorDeMaquina.maxCargacm3) * 100;
    let tiempoResidencia = 2* (selectorDeMaquina.maxCargacm3/volumenDosificacion) * (parseFloat(ciclo)/60);
    let volumenConmutacion = puntoConmutacion / 10 * areaDeHusillo;

    // Resultado al html
    contenedorResultado.innerHTML = "";
    let div = document.createElement("div");
    div.classList.add('cuadroResultado', 'shadow');

    div.innerHTML = `<h2>Resultado</h2>
        <p>Dosificación: ${recorridoTotalInyeccion.toFixed(1)}  mm (${volumenTotalDosificacion.toFixed(1)} cm3)</p>
        <p>Conmutacción: ${puntoConmutacion.toFixed(1)} mm (${volumenConmutacion.toFixed(1)}cm3)</p>
        <p>Cojín: ${recorridoCojin.toFixed(1)} mm (${volumenCojin.toFixed(1)} cm3)</p>
        <P>Tiempo de residencia: ${tiempoResidencia.toFixed(1)} min</P>
        <p>Porcentaje utilización de unidad inyección</p>
        <div class="col-12 progress" style="height: 25px;">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${utilizacionTotalUnidadInyección.toFixed(1)}%;" aria-valuenow="${utilizacionTotalUnidadInyección.toFixed(1)}%" aria-valuemin="0" aria-valuemax="100">${utilizacionTotalUnidadInyección.toFixed(1)}%</div>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                    </div>
        `
    contenedorResultado.appendChild(div);


}