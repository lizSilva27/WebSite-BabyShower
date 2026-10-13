document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');

  if(!form) return;

  // Configuración
  const WHATSAPP_NUMBER = '5215637038545';

  // Elementos del formulario
  const guestName = document.getElementById('guest-name');
  const guestCount = document.getElementById('guest-count');
  const attendanceOptions = form.querySelectorAll('input[name="attendance"]');

  // Contenedor del número de asistentes
  const guestCountField = guestCount.closest('.rsvp__field');

  // Actualizar interfaz según la asistencia
  const updateAttendance = () => {
    const selected = form.querySelector('input[name="attendance"]:checked');

    const willAttend = selected?.value === 'yes';

    guestCountField.hidden = !willAttend;
    guestCount.disabled = !willAttend;
    guestCount.required = willAttend;

    if (!willAttend) {
      guestCount.value = '';
    }
  };

  // Detectar cambios en la asistencia
  attendanceOptions.forEach((option) => {
    option.addEventListener('change', updateAttendance);
  });

  // Estado inicial
  updateAttendance();

  // Enviar confirmación
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const name = guestName.value.trim();

    const selectedAttendance = form.querySelector('input[name="attendance"]:checked');

    const willAttend = selectedAttendance.value === 'yes';

    if (!name) {
      guestName.setCustomValidity('Ingresa tu nombre completo.');
      guestName.reportValidity();
      return;
    }

    guestName.setCustomValidity('');

    let message = '';

    if (willAttend) {
      const total = Number(guestCount.value);

      if (!Number.isInteger(total) || total < 1) {
        guestCount.setCustomValidity('Selecciona el total de asistentes.');
        guestCount.reportValidity();
        return;
      }

      guestCount.setCustomValidity('');

      const emoji = {
        teddy: '\u{1F9F8}',
        blueHeart: '\u{1F499}',
        person: '\u{1F464}',
        people: '\u{1F465}',
        balloon: '\u{1F388}',
        celebration: '\u{1F389}'
      };

      message = [
        `${emoji.teddy}${emoji.blueHeart} *CONFIRMACIÓN DE BABY SHOWER*`,
        '',
        '¡Hola! Quiero confirmar mi asistencia.',
        '',
        `${emoji.person} *Nombre:* ${name}`,
        `${emoji.blueHeart} *Asistencia:* Sí, asistiré.`,
        `${emoji.people} *Total de personas:* ${total}`,
        `${emoji.balloon} *Acompañantes:* ${total - 1}`,
        '',
        `¡Nos vemos pronto! ${emoji.celebration}`
      ].join('\n');

    } else {
      message = [
        '🧸💙 *CONFIRMACIÓN DE BABY SHOWER*',
        '',
        '¡Hola! Gracias por la invitación.',
        '',
        `👤 *Nombre:* ${name}`,
        '💙 *Asistencia:* No podré asistir.',
        '',
        'Les deseo un hermoso Baby Shower. 🎈'
      ].join('\n');
    }

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappURL;
  });

  // Limpiar errores personalizados al escribir
  guestName.addEventListener('input', () => {
    guestName.setCustomValidity('');
  });

  guestCount.addEventListener('change', () => {
    guestCount.setCustomValidity('');
  });
});