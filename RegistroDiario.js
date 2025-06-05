const registros = [];

function agregarRegistro() {
  const trabajador = document.getElementById('trabajador').value.trim();
  const fechaStr = document.getElementById('fecha').value;
  const entrada = document.getElementById('entrada').value;
  const salida = document.getElementById('salida').value;

  if (!trabajador || !fechaStr || !entrada || !salida) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  const [hEntrada, mEntrada] = entrada.split(':').map(Number);
  const [hSalida, mSalida] = salida.split(':').map(Number);
  const [year, month, day] = fechaStr.split('-').map(Number);

  const fechaEntrada = new Date(year, month - 1, day, hEntrada, mEntrada);
  const fechaSalida = new Date(year, month - 1, day, hSalida, mSalida);

  if (fechaSalida <= fechaEntrada) {
    fechaSalida.setDate(fechaSalida.getDate() + 1);
  }

  const diffMs = fechaSalida - fechaEntrada;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMin = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const registro = {
    trabajador,
    fecha: fechaStr,
    entrada,
    salida,
    horas: `${diffHrs}h ${diffMin}m`
  };

  registros.push(registro);

  mostrarHistorial();

  document.getElementById('registroForm').reset();

  document.getElementById('resultado').innerHTML = `
    <strong>Horas trabajadas:</strong> ${diffHrs} horas y ${diffMin} minutos para ${trabajador} en ${fechaStr}.
  `;
}

function mostrarHistorial() {
  const contenedor = document.getElementById('historial');
  contenedor.innerHTML = '';

  if (registros.length === 0) {
    contenedor.innerHTML = '<p>No hay registros.</p>';
    return;
  }

  registros.sort((a, b) => {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);
    if (dateA - dateB !== 0) return dateA - dateB;
    return a.trabajador.localeCompare(b.trabajador);
  });

  registros.forEach(reg => {
    const div = document.createElement('div');
    div.className = 'registro';
    div.innerHTML = `
      <strong>Trabajador:</strong> ${reg.trabajador} |
      <strong>Fecha:</strong> ${reg.fecha} |
      <strong>Entrada:</strong> ${reg.entrada} |
      <strong>Salida:</strong> ${reg.salida} |
      <strong>Horas:</strong> ${reg.horas}
    `;
    contenedor.appendChild(div);
  });
}