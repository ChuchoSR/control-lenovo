const clients = JSON.parse(localStorage.getItem('clients')) || [
    { name: 'Juan Perez', phone: '123456789', address: 'Calle Falsa 123' },
    { name: 'Maria Lopez', phone: '987654321', address: 'Avenida Siempre Viva 456' },
];

const visits = JSON.parse(localStorage.getItem('visits')) || [];

function loadClientData() {
    const clientName = document.getElementById('clientName').value;
    const client = clients.find(c => c.name.toLowerCase() === clientName.toLowerCase());

    if (client) {
        document.getElementById('phone').value = client.phone;
        document.getElementById('address').value = client.address;
    } else {
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
    }
}

function addVisit() {
    const clientName = document.getElementById('clientName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const caseNumber = document.getElementById('caseNumber').value;
    const ticketResolved = document.getElementById('ticketStatus').checked;
    const visitDate = document.getElementById('visitDate').value;

    if (!clients.some(c => c.name.toLowerCase() === clientName.toLowerCase())) {
        clients.push({ name: clientName, phone, address });
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    const visit = { clientName, phone, address, caseNumber, ticketResolved, visitDate };
    visits.push(visit);
    localStorage.setItem('visits', JSON.stringify(visits));

    const table = document.getElementById('visitTable');
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);

    cell1.textContent = clientName;
    cell2.textContent = phone;
    cell3.textContent = address;
    cell4.textContent = caseNumber;
    cell5.textContent = ticketResolved ? 'Sí' : 'No';
    cell6.textContent = visitDate;

    // Limpiar campos de entrada después de agregar la visita
    document.getElementById('clientName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('caseNumber').value = '';
    document.getElementById('ticketStatus').checked = false;
    document.getElementById('visitDate').value = '';
}

function loadVisits() {
    visits.forEach(visit => {
        const table = document.getElementById('visitTable');
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);

        cell1.textContent = visit.clientName;
        cell2.textContent = visit.phone;
        cell3.textContent = visit.address;
        cell4.textContent = visit.caseNumber;
        cell5.textContent = visit.ticketResolved ? 'Sí' : 'No';
        cell6.textContent = visit.visitDate;
    });
}

document.addEventListener('DOMContentLoaded', loadVisits);
