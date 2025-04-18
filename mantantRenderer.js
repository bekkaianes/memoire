document.addEventListener('DOMContentLoaded', async () => {
    // await refreshTable();
    
    document.getElementById('btnAddMantans').addEventListener('click', async () => {

        const value_m = document.getElementById('addMantants').value;
        
        if (value_m) {
            await window.api.addMantants(value_m);
            document.getElementById('addMantants').value = '';
            await refreshTable();
        } else {
            alert('Please enter Mantants');
        }
    });
    
    
});



