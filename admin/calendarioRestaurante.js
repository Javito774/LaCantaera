const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

class CalendarioRestaurante {
    constructor(selectedDate) {
        this.startDate = this.calculateStartOfWeek(selectedDate);
        this.reservations = {};
    }

    calculateStartOfWeek(date) {
        const selectedDate = new Date(date);
        const dayOfWeek = selectedDate.getDay();
        const diff = selectedDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Ajustar para que la semana inicie en lunes
        const startOfWeek = new Date(selectedDate.setDate(diff));
        return startOfWeek.toISOString().split('T')[0];
    }

    addReservation(startDateTime, endDateTime, tableNumber, name) {
        const reservation = { tableNumber, name, startDateTime, endDateTime };
        const startDate = startDateTime.split(' ')[0];
        if (!this.reservations[startDate]) {
            this.reservations[startDate] = [];
        }
        this.reservations[startDate].push(reservation);
    }

    removeReservation(startDateTime, tableNumber) {
        const startDate = startDateTime.split(' ')[0];
        if (this.reservations[startDate]) {
            this.reservations[startDate] = this.reservations[startDate].filter(
                reservation => reservation.tableNumber !== tableNumber
            );
        }
    }

    getReservations(date) {
        return this.reservations[date] || [];
    }

    displayWeeklyView() {
        const daysInWeek = 7;
        const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

        console.log(`Vista Semanal de Reservas - Semana del ${this.startDate}`);
        console.log(dayNames.join(' '));

        const today = (new Date()).getDate();

        for (let i = 0; i < daysInWeek; i++) {
            const currentDate = new Date(this.startDate);
            currentDate.setDate(currentDate.getDate() + i);
            const dateString = currentDate.toISOString().split('T')[0];
            const day = currentDate.getDate();

            document.getElementById(`dayNumber${i}`).innerText = day;

            if (today == day) {
                document.getElementById(`dayNumber${i}`).parentNode.parentNode.classList.add('today')
            }

            const reservations = this.getReservations(dateString);
            let cellContent = `${day < 10 ? ` ${day}` : day}`;

            reservations.forEach(reservation => {
                const { startDateTime, endDateTime } = reservation;
                const startTime = startDateTime.split(' ')[1];
                const endTime = endDateTime.split(' ')[1];
                cellContent += `\n${startTime}-${endTime}: ${reservation.name}`;
            });

            console.log(cellContent);
        }
    }

}

// Ejemplo de uso
const selectedDate = new Date(); // Cualquier día de la semana
const miCalendarioRestaurante = new CalendarioRestaurante(selectedDate);

miCalendarioRestaurante.addReservation('2023-08-14 18:00', '2023-08-14 20:00', 1, 'Juan Pérez');
miCalendarioRestaurante.addReservation('2023-08-14 19:30', '2023-08-14 21:30', 2, 'María Gómez');
miCalendarioRestaurante.addReservation('2023-08-15 20:00', '2023-08-15 22:00', 3, 'Carlos Rodríguez');
miCalendarioRestaurante.addReservation('2023-08-16 18:30', '2023-08-16 20:30', 1, 'Laura Torres');

miCalendarioRestaurante.displayWeeklyView();