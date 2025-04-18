document.addEventListener('DOMContentLoaded', async () => {
    await refreshTable();
    

    
});

window.updateEtatPrice = async function(button,etatNum) {
    // Get the current row
    const row = button.closest('tr');
    const currentPrice = row.cells[2].textContent;
    
    // Create a modal for price input
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>تحديث السعر</h3>
            <input type="number" id="newPriceInput" value="${currentPrice}" placeholder="السعر الجديد">
            <div>
                <button id="confirmUpdate">تأكيد</button>
                <button id="cancelUpdate">إلغاء</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Focus on the input field
    const input = modal.querySelector('#newPriceInput');
    input.focus();
    
    // Handle confirm button
    modal.querySelector('#confirmUpdate').addEventListener('click', async () => {
        const newPrice = input.value;
        if (newPrice && !isNaN(newPrice)) {
            const success = await window.api.updateEtatPrice(etatNum, newPrice);
            if (success) {
                await refreshTable();
            }
            modal.remove();
        } else {
            alert('الرجاء إدخال سعر صحيح');
        }
    });
    
    // Handle cancel button
    modal.querySelector('#cancelUpdate').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
};


async function refreshTable() {

    // Fetch the names from your Electron API
    let names = await window.api.getNames();

    // Get the container div
    let divNames = document.getElementById("names");

    // Start building the HTML for the table
    let tableHTML = `
        <thead>
            <tr>
                <th>الرقم</th>
                <th>الحالة</th>
                <th>السعر</th>
                <th>تحديث السعر</th>
                <th>حذف الحالة</th>
            </tr>
        </thead>
        <tbody>`;

    // Loop through the data and create table rows
    names.forEach((elem,indexEtat) => {
        tableHTML +=`
            <tr>
                <td>${indexEtat + 1} </td>
                <td>${elem.etatName}</td>
                <td>${elem.etatPrice}</td>
                <td><button onclick="updateEtatPrice(this, ${elem.etatNum})"><i class="fa-regular fa-pen-to-square"></i></button></td>
                <td><button onclick="removeEtat(${elem.etatNum})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
    });

    tableHTML += `</tbody>`;

    // Set the inner HTML of the div
    divNames.innerHTML = tableHTML;
}
