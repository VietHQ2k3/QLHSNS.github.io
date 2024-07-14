// Check if ID exists in the table
function idExists(id) {
    const table = document.getElementById('dataTable4').getElementsByTagName('tbody')[0];
    for (let row of table.rows) {
        if (row.cells[0].textContent === id) {
            return true;
        }
    }
    return false;
}

// Validate name, achievement, and evaluation fields
function validateInput(id, name, department, achievement, evaluation) {
    const nameRegex = /^[^\d!@#$%^&*()_+={}|[\]\\';:"/?>.<,-]+$/;
    const yearRegex = /^[0-9]+$/;

    if (!nameRegex.test(name)) {
        alert('Họ tên không được chứa số hoặc ký tự đặc biệt.');
        return false;
    }
    if (idExists(id)) {
        alert('ID đã tồn tại! Vui lòng nhập ID khác.');
        return false;
    }
    if (!yearRegex.test(id)) {
        alert('Mã ID phải là dạng số');
        return false;
    }
    return true;
}

// Lưu dữ liệu vào localStorage
function saveDataToLocalStorage() {
    const table = document.getElementById('dataTable4').getElementsByTagName('tbody')[0];
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
            addRowToTable(rowData.id, rowData.name, rowData.department, rowData.achievement, rowData.evaluation, false);
        });
    }
});

// Thêm hàng mới vào bảng
function addRowToTable(id, name, department, achievement, evaluation, validate = true) {
    if (validate && !validateInput(id, name, department, achievement, evaluation)) {
        return; // Không thêm dữ liệu nếu không hợp lệ
    }

    const table = document.getElementById('dataTable4').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = id;
    newRow.insertCell(1).textContent = name;
    newRow.insertCell(2).textContent = department;
    newRow.insertCell(3).textContent = achievement;
    newRow.insertCell(4).textContent = evaluation;

    addRowClickListener(newRow);

    // Lưu dữ liệu vào localStorage sau khi thêm mới
    saveDataToLocalStorage();
}

// Sửa dữ liệu trong bảng
function editRowById(id, newName, newDepartment, newAchievement, newEvaluation) {
    const table = document.getElementById('dataTable4').getElementsByTagName('tbody')[0];
    for (let row of table.rows) {
        if (row.cells[0].textContent === id) {
            row.cells[1].textContent = newName;
            row.cells[2].textContent = newDepartment;
            row.cells[3].textContent = newAchievement;
            row.cells[4].textContent = newEvaluation;
            break;
        }
    }

    // Lưu dữ liệu vào localStorage sau khi sửa
    saveDataToLocalStorage();
}

// Điền form để chỉnh sửa dữ liệu
function fillFormForEdit(id, name, department, achievement, evaluation) {
    document.getElementById('id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('department').value = department;
    document.getElementById('achievement').value = achievement;
    document.getElementById('evaluation').value = evaluation;
}

// Xóa dữ liệu từ bảng
function deleteRowById(id) {
    const table = document.getElementById('dataTable4').getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        if (row.cells[0].textContent === id) {
            table.deleteRow(i);
            break;
        }
    }

    // Lưu dữ liệu vào localStorage sau khi xóa
    saveDataToLocalStorage();
}

// Xử lý sự kiện submit của form
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn không cho form submit mặc định

    // Lấy giá trị từ các input
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const achievement = document.getElementById('achievement').value;
    const evaluation = document.getElementById('evaluation').value;

    // Thêm hàng mới vào bảng với ID tự động tăng
    addRowToTable(id, name, department, achievement, evaluation);

    // Xóa dữ liệu trong form sau khi thêm vào bảng
    document.getElementById('dataForm').reset();
});

// Function to add data
function addData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const achievement = document.getElementById('achievement').value;
    const evaluation = document.getElementById('evaluation').value;
    addRowToTable(id, name, department, achievement, evaluation);
}

// Function to edit data
function editData() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const achievement = document.getElementById('achievement').value;
    const evaluation = document.getElementById('evaluation').value;
    editRowById(id, name, department, achievement, evaluation);
}

// Function to delete data
function deleteData() {
    const id = document.getElementById('id').value;
    deleteRowById(id);
}

// Function to refresh the form
function refreshData() {
    resetForm();
}

function resetForm() {
    document.getElementById('dataForm').reset();
}

//==================== SEARCH ===========
function searchData() {
    // Get the search input value
    const searchValue = document.getElementById('searchBar').value.trim();

    // Get the table and tbody element
    const table = document.getElementById('dataTable4');
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
    const table = document.getElementById('dataTable4');
    const tbody = table.getElementsByTagName('tbody')[0];

    // Get all rows from the tbody
    const rows = tbody.getElementsByTagName('tr');

    // Loop through the rows and show all
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = "";  // Show row
        rows[i].style.backgroundColor = "";
    }
}

// Function to add click listener to a row
function addRowClickListener(row) {
    row.addEventListener('click', function() {
        const id = row.cells[0].textContent;
        const name = row.cells[1].textContent;
        const department = row.cells[2].textContent;
        const achievement = row.cells[3].textContent;
        const evaluation = row.cells[4].textContent;

        fillFormForEdit(id, name, department, achievement, evaluation);
    });
}

function quayve() {
    window.location.href = "../index.html";
}

function btnthoat() {
    window.close();
}
