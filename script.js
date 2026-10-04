// =========================
// SELECTOR DE HORARIOS
// =========================

const selectorHora =
    document.querySelector("#hora");


// =========================
// HORARIOS POR SERVICIO
// =========================

const horariosPorServicio = {

    "Electroencefalograma": [
        "08:00",
        "10:00"
    ],

    "Consulta médica": [
        "09:00",
        "11:00"
    ],

    "Laboratorio": [
        "08:00",
        "09:00",
        "10:00",
        "11:00"
    ]

};


// =========================
// SELECTOR DE SERVICIO
// =========================

const selectorServicio =
    document.querySelector("#servicio");


// =========================
// SELECTOR DE FECHA
// =========================

const selectorFecha =
    document.querySelector("#fecha");


// =========================
// FECHA MÍNIMA
// =========================

const fechaActual = new Date();

const año =
    fechaActual.getFullYear();

const mes =
    String(fechaActual.getMonth() + 1)
        .padStart(2, "0");

const dia =
    String(fechaActual.getDate())
        .padStart(2, "0");

const hoy =
    `${año}-${mes}-${dia}`;

selectorFecha.min = hoy;


// =========================
// ACTUALIZAR HORARIOS
// =========================

function actualizarHorarios() {

    selectorHora.innerHTML = `
        <option value="">
            Selecciona un horario
        </option>
    `;


    const servicio =
        selectorServicio.value;


    const horarios =
        horariosPorServicio[servicio] || [];


    horarios.forEach(function(hora) {

        const opcion =
            document.createElement("option");

        opcion.value = hora;

        opcion.textContent = hora;

        selectorHora.appendChild(opcion);

    });

}


selectorServicio.addEventListener(
    "change",
    actualizarHorarios
);


// =========================
// ELEMENTOS
// =========================

const formulario =
    document.querySelector("#formReserva");

const confirmacion =
    document.querySelector("#confirmacion");

const listaReservas =
    document.querySelector("#listaReservas");


// =========================
// CARGAR RESERVAS
// =========================

let reservas =
    JSON.parse(
        localStorage.getItem("reservas")
    ) || [];


// =========================
// OBTENER ESTADO
// =========================

function obtenerEstado(reserva) {
   

    // Si ya fue atendida,
    // conservamos ese estado.

    if (reserva.estado === "Atendida") {

        return "Atendida";

    }


    const fechaHora =
        new Date(
            `${reserva.fecha}T${reserva.hora}:00`
        );


    const ahora =
        new Date();


    const unaHoraDespues =
        new Date(
            fechaHora.getTime()
            + 60 * 60 * 1000
        );


    if (ahora < fechaHora) {

        return "Pendiente";

    }


    if (
        ahora >= fechaHora &&
        ahora < unaHoraDespues
    ) {

        return "En curso";

    }


    return "Vencida";

}


// =========================
// MOSTRAR RESERVAS
// =========================

function mostrarReservas() {

    listaReservas.innerHTML = "";


    reservas.forEach(
        function(reserva, indice) {

            const estado =
                obtenerEstado(reserva);


            const claseEstado =
                estado
                    .toLowerCase()
                    .replace(" ", "-");


            const elemento =
                document.createElement("div");


            elemento.className =
                "reserva-item";


            elemento.innerHTML = `

                <div class="reserva-cabecera">

                    <strong>
                        ${reserva.servicio}
                    </strong>

                    <span class="estado estado-${claseEstado}">
                        ${estado}
                    </span>

                </div>


                <p>
                    <strong class="dato">
                        Paciente:
                    </strong>

                    ${reserva.nombre}
                </p>


                <p>
                    <strong class="dato">
                        Teléfono:
                    </strong>

                    ${reserva.telefono}
                </p>


                <p>
                    <strong class="dato">
                        Médico:
                    </strong>

                    ${reserva.medico || "No asignado"}
                </p>


                <p>
                    <strong class="dato">
                        Fecha:
                    </strong>

                    ${reserva.fecha}
                </p>


                <p>
                    <strong class="dato">
                        Hora:
                    </strong>

                    ${reserva.hora}
                </p>


                <div class="acciones">

                    ${
                        estado !== "Atendida"
                        ? `
                            <button
                                class="btn-atendida"
                                type="button"
                            >
                                Marcar atendida
                            </button>
                        `
                        : ""
                    }


                    <button
                        class="btn-eliminar"
                        type="button"
                    >
                        Eliminar
                    </button>

                </div>

            `;


            // =========================
            // BOTÓN ATENDIDA
            // =========================

            const botonAtendida =
                elemento.querySelector(
                    ".btn-atendida"
                );


            if (botonAtendida) {

                botonAtendida.addEventListener(
                    "click",
                    function() {

                        reservas[indice].estado =
                            "Atendida";


                        localStorage.setItem(
                            "reservas",
                            JSON.stringify(reservas)
                        );


                        mostrarReservas();

                    }
                );

            }


            // =========================
            // BOTÓN ELIMINAR
            // =========================

            const botonEliminar =
                elemento.querySelector(
                    ".btn-eliminar"
                );


            botonEliminar.addEventListener(
                "click",
                function() {

                    reservas.splice(
                        indice,
                        1
                    );


                    localStorage.setItem(
                        "reservas",
                        JSON.stringify(reservas)
                    );


                    mostrarReservas();

                }
            );


            listaReservas.appendChild(
                elemento
            );

        }
    );

}


// =========================
// MOSTRAR AL INICIAR
// =========================

mostrarReservas();
setInterval(mostrarReservas, 60000);


// =========================
// FORMULARIO
// =========================

formulario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        // =========================
        // OBTENER DATOS
        // =========================

        const nombre =
            document
                .querySelector("#nombre")
                .value
                .trim();


        const telefono =
            document
                .querySelector("#telefono")
                .value
                .trim();


        const servicio =
            document
                .querySelector("#servicio")
                .value;


        const medico =
            document
                .querySelector("#medico")
                .value;


        const fecha =
            document
                .querySelector("#fecha")
                .value;


        const hora =
            document
                .querySelector("#hora")
                .value;


        // =========================
        // VALIDAR
        // =========================

        if (
            nombre === "" ||
            telefono === "" ||
            servicio === "" ||
            medico === "" ||
            fecha === "" ||
            hora === ""
        ) {

            alert(
                "Por favor, completa todos los campos."
            );

            return;

        }


        // =========================
        // COMPROBAR DUPLICADO
        // =========================

        const reservaExiste =
            reservas.some(
                function(reserva) {

                    return (

                        reserva.servicio === servicio &&

                        reserva.medico === medico &&

                        reserva.fecha === fecha &&

                        reserva.hora === hora

                    );

                }
            );


        if (reservaExiste) {

            alert(
                "Ese horario ya está reservado para este médico."
            );

            return;

        }


        // =========================
        // CREAR RESERVA
        // =========================

        const nuevaReserva = {

            nombre: nombre,

            telefono: telefono,

            servicio: servicio,

            medico: medico,

            fecha: fecha,

            hora: hora,

            estado: "Pendiente"

        };


        // =========================
        // GUARDAR
        // =========================

        reservas.push(
            nuevaReserva
        );


        localStorage.setItem(
            "reservas",
            JSON.stringify(reservas)
        );


        // =========================
        // CONFIRMACIÓN
        // =========================

        confirmacion.innerHTML = `

            <div class="reserva-confirmada">

                <h2>
                    Reserva confirmada
                </h2>

                <p>
                    <strong>Paciente:</strong>
                    ${nombre}
                </p>

                <p>
                    <strong>Teléfono:</strong>
                    ${telefono}
                </p>

                <p>
                    <strong>Servicio:</strong>
                    ${servicio}
                </p>

                <p>
                    <strong>Médico:</strong>
                    ${medico}
                </p>

                <p>
                    <strong>Fecha:</strong>
                    ${fecha}
                </p>

                <p>
                    <strong>Hora:</strong>
                    ${hora}
                </p>

            </div>

        `;


        // =========================
        // ACTUALIZAR LISTA
        // =========================

        mostrarReservas();


        // =========================
        // LIMPIAR
        // =========================

        formulario.reset();


        actualizarHorarios();

    }
);