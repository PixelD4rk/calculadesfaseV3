function cerrarSesion() {
  window.location.href = "index.html"; // Redirige a la página de inicio
}

$(document).ready(function () {
  $('#fechaDVR').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    startView: 'decades',
    minViewMode: 'days',
    todayHighlight: true,
    language: 'es',
    templates: {
      leftArrow: '<i class="bi bi-chevron-left"></i>',
      rightArrow: '<i class="bi bi-chevron-right"></i>'
    }
  });

  $('#fechaOficial').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    startView: 'decades',
    minViewMode: 'days',
    todayHighlight: true,
    language: 'es',
    templates: {
      leftArrow: '<i class="bi bi-chevron-left"></i>',
      rightArrow: '<i class="bi bi-chevron-right"></i>'
    }
  });

  $('#nuevaFecha').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    startView: 'decades',
    minViewMode: 'days',
    todayHighlight: true,
    language: 'es',
    templates: {
      leftArrow: '<i class="bi bi-chevron-left"></i>',
      rightArrow: '<i class="bi bi-chevron-right"></i>'
    }
  });

  $('.timepicker').on('input', function () {
    var value = $(this).val();
    var formattedValue = formatTime(value);
    $(this).val(formattedValue);
    if (validateTime(formattedValue)) {
      $(this).removeClass('invalid');
    } else {
      $(this).addClass('invalid');
    }
  });

  $('.timepicker').on('blur', function () {
    var value = $(this).val();
    if (validateTime(value)) {
      var formattedValue = formatTime(value);
      $(this).val(formattedValue);
    } else {
      $(this).val('');
    }

    calcularDiferencia();
  });

  function validateTime(value) {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(value);
  }

  function formatTime(value) {
    // Eliminar cualquier carácter no numérico
    value = value.replace(/\D/g, '');

    // Agregar los dos puntos separadores
    if (value.length >= 4) {
      value = value.slice(0, 2) + ':' + value.slice(2, 4) + ':' + value.slice(4);
    } else if (value.length >= 2) {
      value = value.slice(0, 2) + ':' + value.slice(2);
    }

    return value;
  }
});

function calcularDiferencia() {
  var fechaDvr = document.getElementById("fechaDVR").value;
  var horaDvr = document.getElementById("horaDVR").value;
  var fechaOficial = document.getElementById("fechaOficial").value;
  var horaOficial = document.getElementById("horaOficial").value;

  // Obtener las fechas y horas en formato válido para cálculos
  var fechaHoraDvr = moment(`${fechaDvr} ${horaDvr}`, "DD/MM/YYYY HH:mm:ss");
  var fechaHoraOficial = moment(`${fechaOficial} ${horaOficial}`, "DD/MM/YYYY HH:mm:ss");

  // Calcular la diferencia de horas
  var diferenciaTotal = moment.duration(fechaHoraDvr.diff(fechaHoraOficial));

  // Calcular los componentes de la diferencia
  var anos = Math.abs(diferenciaTotal.years());
  var months = Math.abs(diferenciaTotal.months());
  var dias = Math.abs(diferenciaTotal.days());
  var horas = Math.abs(diferenciaTotal.hours());
  var minutos = Math.abs(diferenciaTotal.minutes());
  var segundos = Math.abs(diferenciaTotal.seconds());

  // Mostrar el resultado
  var resultado1 =
    "El desfase de horario es: <span class='difference'>" +
    anos +
    " años, " +
    months +
    " meses, " +
    dias +
    " días, " +
    horas +
    " horas, " +
    minutos +
    " minutos y " +
    segundos +
    " segundos.</span>";

  var mensaje = "";

  if (diferenciaTotal.asSeconds() > 0) {
    mensaje = "<span class='adelanto'>Adelanto</span> con respecto a la hora oficial.";
  } else if (diferenciaTotal.asSeconds() < 0) {
    mensaje = "<span class='retraso'>Retraso</span> con respecto a la hora oficial.";
  } else {
    mensaje = "Sin desfase de horario";
  }

  document.getElementById("resultado").innerHTML = resultado1;
  document.getElementById("mensaje").innerHTML = mensaje;
}



function mostrarIngresoHoraOficial() {
  document.getElementById("ingresoHoraOficial").style.display = "block";
}

function calcularNuevaHoraDvr() {
  var fechaDvr = document.getElementById("fechaDVR").value;
  var horaDvr = document.getElementById("horaDVR").value;
  var fechaOficial = document.getElementById("fechaOficial").value;
  var horaOficial = document.getElementById("horaOficial").value;
  var nuevaFecha = document.getElementById("nuevaFecha").value;
  var nuevaHoraOficial = document.getElementById("nuevaHoraOficial").value;

  var fechaHoraDvr = moment(`${fechaDvr} ${horaDvr}`, "DD/MM/YYYY HH:mm:ss");
  var fechaHoraOficial = moment(`${fechaOficial} ${horaOficial}`, "DD/MM/YYYY HH:mm:ss");
  var nuevaFechaHoraOficial = moment(`${nuevaFecha} ${nuevaHoraOficial}`, "DD/MM/YYYY HH:mm:ss");

  var diferenciaTotal = moment.duration(fechaHoraDvr.diff(fechaHoraOficial));
  var diferenciaTotalSegundos = Math.abs(diferenciaTotal.asSeconds());

  var nuevaFechaHoraDvr;
  if (diferenciaTotal.asSeconds() < 0) {
    nuevaFechaHoraDvr = nuevaFechaHoraOficial.clone().subtract(diferenciaTotalSegundos, 'seconds');
  } else {
    nuevaFechaHoraDvr = nuevaFechaHoraOficial.clone().add(diferenciaTotalSegundos, 'seconds');
  }

  var resultado2 =
    "La hora para buscar en DVR es: <span class='difference'>" +
    nuevaFechaHoraDvr.format("DD/MM/YYYY HH:mm:ss") +
    "</span>";

  document.getElementById("nuevoResultado").innerHTML = resultado2;
}

function mostrarCalcularHoraOficial() {
  document.getElementById("calcularHoraOficial").style.display = "block";

  // Inicializar el selector de fecha en el nuevo bloque
  $('#fechaDvrCalculo').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    startView: 'decades',
    minViewMode: 'days',
    todayHighlight: true,
    language: 'es',
    templates: {
      leftArrow: '<i class="bi bi-chevron-left"></i>',
      rightArrow: '<i class="bi bi-chevron-right"></i>'
    }
  });
}

function calcularDesfase(fechaDvr, horaDvr) {
  var fechaHoraDvr = moment(`${fechaDvr} ${horaDvr}`, "DD/MM/YYYY HH:mm:ss");
  var fechaHoraOficial = moment(); // Aquí debes proporcionar la fecha y hora oficial

  var diferenciaTotal = moment.duration(fechaHoraDvr.diff(fechaHoraOficial));
  var diferenciaTotalSegundos = Math.abs(diferenciaTotal.asSeconds());

  var resultado;
  if (diferenciaTotal.asSeconds() < 0) {
    resultado = -diferenciaTotalSegundos;
  } else {
    resultado = diferenciaTotalSegundos;
  }

  return resultado;
}

var fechaOficial = document.getElementById("fechaOficial").value;
var horaOficial = document.getElementById("horaOficial").value;

function calcularHoraOficial() {
  var fechaDvr = document.getElementById("fechaDvrCalculo").value;
  var horaDvr = document.getElementById("horaDvrCalculo").value;
  var fechaHoraDvr = moment(`${fechaDvr} ${horaDvr}`, "DD/MM/YYYY HH:mm:ss");

  var resultado = document.getElementById("resultado").textContent;
  var desfase = resultado.match(/(\d+) años, (\d+) meses, (\d+) días, (\d+) horas, (\d+) minutos y (\d+) segundos/);
  if (!desfase) {
    // Mostrar un mensaje de error o realizar alguna otra acción
    return;
  }
  var anos = parseInt(desfase[1]);
  var meses = parseInt(desfase[2]);
  var dias = parseInt(desfase[3]);
  var horas = parseInt(desfase[4]);
  var minutos = parseInt(desfase[5]);
  var segundos = parseInt(desfase[6]);

  // Almacenar la fecha y hora oficial original
  var fechaHoraOficialOriginal = moment(`${fechaOficial} ${horaOficial}`, "DD/MM/YYYY HH:mm:ss");

  // Aplicar el desfase de tiempo a la fecha y hora del DVR
  var fechaHoraOficial = fechaHoraDvr
    .clone()
    .add(anos, 'years')
    .add(meses, 'months')
    .add(dias, 'days')
    .add(horas, 'hours')
    .add(minutos, 'minutes')
    .add(segundos, 'seconds');

  var resultado2 =
    "La hora oficial es: <span class='difference'>" +
    fechaHoraOficial.format("DD/MM/YYYY HH:mm:ss") +
    "</span>";

  var horaOficialResultado = document.getElementById("horaOficialResultado");
  horaOficialResultado.innerHTML = resultado2;
}


