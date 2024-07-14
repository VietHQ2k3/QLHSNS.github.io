// Check if ID exists in the table
function idExists(idcs) {
    const table = document.getElementById('dataTable1').getElementsByTagName('tbody')[0];
    for (let row of table.rows) {
        if (row.cells[0].textContent === idcs) {
            return true;
        }
    }
    return false;
}

// Validate year and name fields
function validateInput(idcs, namecs, year) {
    const yearRegex = /^[0-9]+$/;
    const nameRegex = /^[^\d!@#$%^&*()_+={}|[\]\\';:"/?>.<,-]+$/;

    if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(year))) {
        alert('Ngày công bố phải có định dạng DD/MM/YYYY.');
        return false;
    }
    if (!nameRegex.test(namecs)) {
        alert('Tên công trình không được chứa số hoặc ký tự đặc biệt.');
        return false;
    }
    if (!yearRegex.test(idcs)) {
        alert('Mã ID phải là dạng số');
        return false;
    }
    return true;
}
// Lưu dữ liệu vào localStorage
function saveDataToLocalStorage() {
    const table = document.getElementById('dataTable1').getElementsByTagName('tbody')[0];
    const data = [];

    // Lặp qua từng hàng trong bảng và lưu các giá trị vào mảng data
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowData = {
            idcs: row.cells[0].textContent,
            namecs: row.cells[1].textContent,
            year: row.cells[2].textContent,
            journal: row.cells[3].textContent
        };
        data.push(rowData);
    }

    // Lưu mảng data vào localStorage
    localStorage.setItem('tableData1', JSON.stringify(data));
}

// Khôi phục dữ liệu từ localStorage khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    const savedData = localStorage.getItem('tableData1');
    if (savedData) {
        const tableData = JSON.parse(savedData);
        tableData.forEach(rowData => {
            addRowToTable1(rowData.idcs, rowData.namecs, rowData.year, rowData.journal, false);
        });
    }
});
// Thêm hàng mới hoặc sửa hàng đã tồn tại trong bảng
function addRowToTable1(idcs, namecs, year, journal, validate = true) {
    const table = document.getElementById('dataTable1').getElementsByTagName('tbody')[0];

    // Kiểm tra xem ID đã tồn tại trong bảng chưa
    if (validate && idExists(idcs)) {
        // Nếu ID đã tồn tại, thực hiện sửa dữ liệu
        editRowById1(idcs, namecs, year, journal);
        saveDataToLocalStorage(); // Lưu dữ liệu vào localStorage sau khi sửa
        clearForm(); // Xóa dữ liệu trong form sau khi sửa
    } else {
        // Nếu ID chưa tồn tại, thực hiện thêm mới dữ liệu
        const newRow = table.insertRow();

        newRow.insertCell(0).textContent = idcs;
        newRow.insertCell(1).textContent = namecs;
        newRow.insertCell(2).textContent = year;
        newRow.insertCell(3).textContent = journal;

        // Lưu dữ liệu vào localStorage sau khi thêm mới
        saveDataToLocalStorage();

        // Add event listener to the row for displaying data on click
        newRow.addEventListener('click', function() {
            displayRowData(idcs, namecs, year, journal);
        });
    }
}
// Điền form để chỉnh sửa dữ liệu
function fillFormForEdit1(idcs, namecs, year, journal) {
    document.getElementById('idcs').value = idcs;
    document.getElementById('namecs').value = namecs;
    document.getElementById('year').value = year;
    document.getElementById('journal').value = journal;
}

// Function to display row data in the form fields
function displayRowData(idcs, namecs, year, journal) {
    fillFormForEdit1(idcs, namecs, year, journal);
}

// Xử lý sự kiện submit của form
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn không cho form submit mặc định

    // Lấy giá trị từ các input
    const id = document.getElementById('idcs').value;
    const name = document.getElementById('namecs').value;
    const year = document.getElementById('year').value;
    const journal = document.getElementById('journal').value;

    // Thêm hàng mới vào bảng
    addRowToTable1(id, name, year, journal);

    // Xóa dữ liệu trong form sau khi thêm vào bảng
    document.getElementById('dataForm').reset();
});

function addData(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const id = document.getElementById('idcs').value;
    const name = document.getElementById('namecs').value;
    const year = document.getElementById('year').value;
    const journal = document.getElementById('journal').value;

    // Validate input
    if (!validateInput(id, name, year)) {
        return; // Validation failed, do not proceed
    }

    // Attempt to add row
    addRowToTable1(id, name, year, journal);

    // Clear form only if operation succeeded
    if (!idExists(id)) {
        clearForm();
    }
}

// Sửa dữ liệu trong bảng
function editData() {
    // Get input values
    const id = document.getElementById('idcs').value;
    const name = document.getElementById('namecs').value;
    const year = document.getElementById('year').value;
    const journal = document.getElementById('journal').value;

    // Validate input
    if (!validateInput(id, name, year)) {
        return; // Validation failed, do not proceed
    }

    // Attempt to edit row
    editRowById1(id, name, year, journal);

    // Clear form only if operation succeeded
    if (idExists(id)) {
        // Do not clear form here, let the user continue editing
    }
}

// Hàm để chỉnh sửa hàng từ bảng dựa trên ID
function deleteData() {
    // Get input value
    const id = document.getElementById('idcs').value;

    // Attempt to delete row
    deleteRowById1(id);

    // Clear form only if operation succeeded
    if (!idExists(id)) {
        clearForm();
    }
}

// Xóa dữ liệu từ bảng
function deleteData() {
    // Lấy giá trị ID từ input
    const id = document.getElementById('idcs').value;

    // Xóa hàng có ID tương ứng từ bảng
    deleteRowById1(id);

    // Xóa dữ liệu trong form sau khi xóa
    document.getElementById('dataForm').reset();
}

// Hàm để xóa hàng từ bảng dựa trên ID
function deleteRowById1(idcs) {
    const table = document.getElementById('dataTable1').getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        if (row.cells[0].textContent === idcs) {
            table.deleteRow(i);
            // Lưu dữ liệu vào localStorage sau khi xóa
            saveDataToLocalStorage();
            return;
        }
    }
    alert('ID không tồn tại trong bảng.');
}

// Hàm để chỉnh sửa hàng từ bảng dựa trên ID
function editRowById1(idcs, namecs, year, journal) {
    const table = document.getElementById('dataTable1').getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        if (row.cells[0].textContent === idcs) {
            // Sửa các giá trị của hàng
            row.cells[1].textContent = namecs;
            row.cells[2].textContent = year;
            row.cells[3].textContent = journal;
            return; // Dừng sau khi sửa dữ liệu
        }
    }
    alert('ID không tồn tại trong bảng.');
}

// Làm mới form
function refreshData() {
    // Đặt lại các giá trị của form về rỗng
    document.getElementById('dataForm').reset();
}

// Hàm để xóa dữ liệu trong form
function clearForm() {
    document.getElementById('idcs').value = '';
    document.getElementById('namecs').value = '';
    document.getElementById('year').value = '';
    document.getElementById('journal').value = '';
}


//==================== SEARCH ===========
function searchData() {
    // Get the search input value
    const searchValue = document.getElementById('searchBar').value.trim();

    // Get the table and tbody element
    const table = document.getElementById('dataTable1');
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
    const table = document.getElementById('dataTable1');
    const tbody = table.getElementsByTagName('tbody')[0];

    // Get all rows from the tbody
    const rows = tbody.getElementsByTagName('tr');

    // Loop through the rows and show all
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = "";  // Show row
        rows[i].style.backgroundColor = "";
    }
}
