# Reservas Clínica — Demo

Sistema web de reservas para una clínica, desarrollado como proyecto de portafolio.

## Descripción

Este proyecto simula el proceso de reserva de una cita médica desde una interfaz web sencilla y responsive.

El sistema permite registrar una reserva, seleccionar servicio, médico, fecha y horario, y gestionar posteriormente las reservas registradas.

> **Proyecto ficticio de demostración. No utiliza datos reales de pacientes y no está destinado a uso médico real.**

## Funciones

- Registro de reservas.
- Selección de servicio.
- Selección de médico.
- Horarios disponibles según el servicio.
- Bloqueo de fechas anteriores.
- Validación de campos.
- Prevención de reservas duplicadas.
- Guardado de reservas mediante `localStorage`.
- Estados de reserva:
  - Pendiente
  - En curso
  - Vencida
  - Atendida
- Actualización automática del estado.
- Marcar una reserva como atendida.
- Eliminar reservas.
- Diseño responsive para dispositivos móviles.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- LocalStorage

## Estructura

```text
Reservas-Clinica/
├── index.html
├── style.css
├── script.js
└── README.md
