// Lưu dữ liệu vào localStorage
function saveDataToLocalStorage() {
    const table = document.getElementById('dataTable3').getElementsByTagName('tbody')[0];
    const data = [];

    // Lặp qua từng hàng trong bảng và lưu các giá trị vào mảng data
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowData = {
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            department: row.cells[2].textContent,
            achievement: row.cells[3].textContent,
            evaluation: row.cells[4].textContent
        };
        data.push(rowData);
    }

    // Lưu mảng data vào localStorage
    localStorage.setItem('tableData', JSON.stringify(data));
}

// Khôi phục dữ liệu từ localStorage khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
        const tableData = JSON.parse(savedData);
        tableData.forEach(rowData => {
            addRowToTable(rowData.id, rowData.name, rowData.department, rowData.achievement, rowData.evaluation);
        });
    }
});

// Thêm hàng mới vào bảng
function addRowToTable(id, name, department, achievement, evaluation) {
    const table = document.getElementById('dataTable3').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = id;
    newRow.insertCell(1).textContent = name;
    newRow.insertCell(2).textContent = department;
    newRow.insertCell(3).textContent = achievement;
    newRow.insertCell(4).textContent = evaluation;

    const actionCell = newRow.insertCell(5);
    const deleteCheckbox = document.createElement('div');
    deleteCheckbox.classList.add('delete-checkbox');
    deleteCheckbox.addEventListener('click', function() {
        toggleDeleteCheckbox(deleteCheckbox, id);
    });
    actionCell.appendChild(deleteCheckbox);

    deleteCheckbox.style.marginLeft = '60px';

    // Lưu dữ liệu vào localStorage sau khi thêm mới
    saveDataToLocalStorage();
}

function toggleDeleteCheckbox(checkbox, id) {
    if (checkbox.textContent === '') {
        checkbox.textContent = '✔';
    } else if (checkbox.textContent === '✔') {
        checkbox.textContent = '✖';
        deleteRowById(id);
    } else {
        checkbox.textContent = '';
    }
}

//==================== SEARCH ===========
function searchData() {
    // Get the search input value
    const searchValue = document.getElementById('searchBar').value.trim();
    
    // Get the table and tbody element
    const table = document.getElementById('dataTable3');
    const tbody = table.getElementsByTagName('tbody')[0];
    
    // Get all rows from the tbody
    const rows = tbody.getElementsByTagName('tr');

    let found = false;  // Flag to check if any match is found

    // Loop through the rows and hide those that don't match the search query
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const idCell = cells[0];  // Assuming the ID is in the first column

        if (idCell) {
            const idValue = idCell.textContent || idCell.innerText;

            if (idValue.indexOf(searchValue) > -1) {
                rows[i].style.display = "";  // Show row
                rows[i].style.backgroundColor = "#FFFF99";  // Change background color
                found = true;  // Set flag to true if match is found
            } else {
                rows[i].style.backgroundColor = "";  // Reset background color
            }
        }
    }

    // If no match is found, show an alert
    if (!found) {
        alert("ID không tồn tại !!");
    }
}

/////////////////////////////ShowAll
function showAllData() {
    // Get the table and tbody element
    const table = document.getElementById('dataTable3');
    const tbody = table.getElementsByTagName('tbody')[0];
    
    // Get all rows from the tbody
    const rows = tbody.getElementsByTagName('tr');

    // Loop through the rows and show all
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = "";  // Show row
        rows[i].style.backgroundColor = "";
    }
}
