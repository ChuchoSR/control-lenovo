const clients = JSON.parse(localStorage.getItem('clients')) || [
    { name: 'Juan Perez', phone: '123456789', address: 'Calle Falsa 123' },
    { name: 'Maria Lopez', phone: '987654321', address: 'Avenida Siempre Viva 456' },
];

const visits = JSON.parse(localStorage.getItem('visits')) || [];
let editingIndex = -1; // Variable para rastrear el índice de la visita en edición

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

    const visit = { clientName, phone, address, caseNumber, ticketResolved, visitDate };

    if (editingIndex >= 0) {
        // Editar visita existente
        visits[editingIndex] = visit;
        editingIndex = -1;
    } else {
        // Añadir nueva visita
        if (!clients.some(c => c.name.toLowerCase() === clientName.toLowerCase())) {
            clients.push({ name: clientName, phone, address });
            localStorage.setItem('clients', JSON.stringify(clients));
        }
        visits.push(visit);
    }

    localStorage.setItem('visits', JSON.stringify(visits));
    renderVisits();

    // Limpiar campos de entrada después de agregar o editar la visita
    document.getElementById('clientName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('caseNumber').value = '';
    document.getElementById('ticketStatus').checked = false;
    document.getElementById('visitDate').value = '';
}

function renderVisits() {
    const table = document.getElementById('visitTable');
    table.innerHTML = '';
    
    visits.forEach((visit, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = visit.clientName;
        row.insertCell(1).textContent = visit.phone;
        row.insertCell(2).textContent = visit.address;
        row.insertCell(3).textContent = visit.caseNumber;
        row.insertCell(4).textContent = visit.ticketResolved ? 'Sí' : 'No';
        row.insertCell(5).textContent = visit.visitDate;

        const actionsCell = row.insertCell(6);
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editVisit(index);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteVisit(index);
        actionsCell.appendChild(deleteButton);
    });

    updateTotalCases(); // Actualizar el contador de casos
}

function editVisit(index) {
    const visit = visits[index];
    document.getElementById('clientName').value = visit.clientName;
    document.getElementById('phone').value = visit.phone;
    document.getElementById('address').value = visit.address;
    document.getElementById('caseNumber').value = visit.caseNumber;
    document.getElementById('ticketStatus').checked = visit.ticketResolved;
    document.getElementById('visitDate').value = visit.visitDate;

    editingIndex = index; // Actualizar índice de edición
}

function deleteVisit(index) {
    visits.splice(index, 1);
    localStorage.setItem('visits', JSON.stringify(visits));
    renderVisits();
}

function updateTotalCases() {
    const totalCases = visits.length;
    document.getElementById('totalCases').textContent = totalCases;
}

document.addEventListener('DOMContentLoaded', () => {
    renderVisits();
    updateTotalCases();
});
