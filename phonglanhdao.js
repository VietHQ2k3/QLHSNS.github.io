// Function to fill form fields when row is clicked from table
function fillFormFromTable(event) {
    // Lấy ra dòng tr (row) mà người dùng click
    const selectedRow = event.target.parentElement;

    // Lấy ra các cell (td) của dòng đó
    const cells = selectedRow.getElementsByTagName('td');

    // Lấy dữ liệu từ các cell và điền vào form
    idInput.value = cells[0].innerText; // ID
    nameInput.value = cells[1].innerText; // Họ Tên
    dobInput.value = cells[2].innerText; // Ngày Sinh
    const genderText = cells[3].innerText; // Giới Tính
    genderMaleInput.checked = genderText === 'Nam'; // Giới Tính Nam
    genderFemaleInput.checked = genderText === 'Nữ'; // Giới Tính Nữ
    cccdInput.value = cells[4].innerText; // Số CCCD
    addressInput.value = cells[5].innerText; // Địa Chỉ
    phoneInput.value = cells[6].innerText; // Số Điện Thoại
    emailInput.value = cells[7].innerText; // Email
    jobInput.value = cells[8].innerText; // Vị Trí Công Việc
    workingUnitInput.value = cells[9].innerText; // Đơn Vị Làm Việc
    salaryInput.value = cells[10].innerText; // Mức Lương
    dateStartInput.value = cells[11].innerText; // Ngày Bắt Đầu
    noteInput.value = cells[12].innerText; // Ghi chú
    usernameInput.value = cells[13].innerText; // Tài khoản
    roleInput.value = cells[14].innerText; // Vai trò
    passwordInput.value = cells[15].innerText; // Mật khẩu
}



// Lấy ra các phần tử trên form HTML
const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const dobInput = document.getElementById('date_of_birth');
const genderMaleInput = document.getElementById('male');
const genderFemaleInput = document.getElementById('female');
const cccdInput = document.getElementById('citizen_identification_card');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone_number');
const emailInput = document.getElementById('email');
const jobInput = document.getElementById('job_position');
const workingUnitInput = document.getElementById('working_unit');
const salaryInput = document.getElementById('salary_level');
const dateStartInput = document.getElementById('date_start_work');
const noteInput = document.getElementById('note');
const usernameInput = document.getElementById('username');
const roleInput = document.getElementById('role');
const passwordInput = document.getElementById('password');

const tableBody = document.getElementById('table-body');

// Function to fetch data from JSON Server
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to render table with fetched data
async function renderTable() {
    const users = await fetchData();
    tableBody.innerHTML = ''; // Clear existing table rows
    users.forEach((user) => {
        const { id, name, date_of_birth, gender, citizen_identification_card, address, phone_number, email, job_position, working_unit, salary_level, date_start_work, note, username, role, password } = user;
        const genderText = gender === 1 ? 'Nam' : 'Nữ';
        const row = `
            <tr onclick="fillFormFromTable(event)">
                <td>${id}</td>
                <td>${name}</td>
                <td>${date_of_birth}</td>
                <td>${genderText}</td>
                <td>${citizen_identification_card}</td>
                <td>${address}</td>
                <td>${phone_number}</td>
                <td>${email}</td>
                <td>${job_position}</td>
                <td>${working_unit}</td>
                <td>${salary_level}</td>
                <td>${date_start_work}</td>
                <td>${note}</td>
                <td>${username}</td>
                <td>${role}</td>
                <td>${password}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to add new user
async function addData() {
    const newUser = {
        id: idInput.value,
        name: nameInput.value,
        date_of_birth: dobInput.value,
        gender: genderMaleInput.checked ? 1 : 0,
        citizen_identification_card: cccdInput.value,
        address: addressInput.value,
        phone_number: phoneInput.value,
        email: emailInput.value,
        job_position: jobInput.value,
        working_unit: workingUnitInput.value,
        salary_level: salaryInput.value,
        date_start_work: dateStartInput.value,
        note: noteInput.value,
        username: usernameInput.value,
        role: roleInput.value,
        password: passwordInput.value
    };

    // Validation checks
    if (!validateInputs(newUser)) {
        return; // Exit function if validation fails
    }

    // Check for duplicate ID
    const users = await fetchData();
    const duplicateUser = users.find(user => user.id === newUser.id);
    if (duplicateUser) {
        alert('ID đã tồn tại. Vui lòng sử dụng ID khác.');
        return; // Stop the function execution
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await renderTable();
        clearInputs();
        
        // Save to localStorage
        saveToLocalStorage(newUser);

        alert('Thêm mới thành công');
    } catch (error) {
        console.error('Error adding data:', error);
        alert('Thêm mới không thành công');
    }
}


// Function to update an existing user
async function editData() {
    const userId = idInput.value;
    const updatedUser = {
        name: nameInput.value,
        date_of_birth: dobInput.value,
        gender: genderMaleInput.checked ? 1 : 0,
        citizen_identification_card: cccdInput.value,
        address: addressInput.value,
        phone_number: phoneInput.value,
        email: emailInput.value,
        job_position: jobInput.value,
        working_unit: workingUnitInput.value,
        salary_level: salaryInput.value,
        date_start_work: dateStartInput.value,
        note: noteInput.value,
        username: usernameInput.value,
        role: roleInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await renderTable();
        clearInputs();

        // Update localStorage
        updateLocalStorage(updatedUser);

        alert('Cập nhật thành công');
    } catch (error) {
        console.error('Error updating data:', error);
        alert('Cập nhật không thành công');
    }
}

// Function to validate inputs
function validateInputs(newUser) {
    const nameRegex = /^[^\d!@#$%^&*()_+={}|[\]\\';:"/?>.<,-]+$/; // Regex for name validation
    const nonNumericRegex = /^[^\d]+$/; // Regex for non-numeric fields
    const yearRegex = /^[0-9]+$/;


    if (!yearRegex.test(newUser.id)) {
        alert('Mã ID phải là dạng số');
        return false;
    }
    if (!nameRegex.test(newUser.name)) {
        alert('Họ tên không được chứa số hoặc ký tự đặc biệt.');
        return false;
    }
    if (!nonNumericRegex.test(newUser.job_position)) {
        alert('Vị trí công việc không được chứa số hoặc ký tự đặc biệt.');
        return false;
    }
    if (!nonNumericRegex.test(newUser.working_unit)) {
        alert('Đơn vị làm việc không được chứa số hoặc ký tự đặc biệt.');
        return false;
    }
    if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(newUser.date_of_birth))) {
        alert('Ngày sinh phải có định dạng DD/MM/YYYY.');
        return false;
    }
    if (!(/^\d{12}$/.test(newUser.citizen_identification_card))) {
        alert('Số CCCD phải là 12 chữ số.');
        return false;
    }
    if (!(/^\d{10}$/.test(newUser.phone_number))) {
        alert('Số điện thoại phải là 10 chữ số.');
        return false;
    }
    if (!(/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(newUser.email))) {
        alert('Email phải chứa chuỗi "@gmail.com".');
        return false;
    }

    if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(newUser.date_start_work))) {
        alert('Ngày làm việc phải có định dạng DD/MM/YYYY.');
        return false;
    }

    return true; // All validations passed
}

// Function to delete an existing user
async function deleteData() {
    const userId = idInput.value;

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await renderTable();
        clearInputs();

        // Remove from localStorage
        removeFromLocalStorage();

        alert('Xóa thành công');
    } catch (error) {
        console.error('Error deleting data:', error);
        alert('Xóa không thành công');
    }
}

// Function to refresh table data and clear inputs
async function refreshData() {
    clearInputs();
    await renderTable();
}

// Function to clear input fields
function clearInputs() {
    idInput.value = '';
    nameInput.value = '';
    dobInput.value = '';
    genderMaleInput.checked = '';
    cccdInput.value = '';
    addressInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
    jobInput.value = '';
    workingUnitInput.value = '';
    salaryInput.value = '';
    dateStartInput.value = '';
    noteInput.value = '';
    usernameInput.value = '';
    roleInput.value = '';
    passwordInput.value = '';
}


// Function to save user to localStorage
function saveToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem('usersData')) || { users: [] };
    users.users.push(user);
    localStorage.setItem('usersData', JSON.stringify(users));
}

// Function to update user in localStorage
function updateLocalStorage(updatedUser) {
    let users = JSON.parse(localStorage.getItem('usersData')) || { users: [] };
    users.users = users.users.map(user => {
        if (user.id === updatedUser.id) {
            return updatedUser;
        }
        return user;
    });
    localStorage.setItem('usersData', JSON.stringify(users));
}

// Function to remove user from localStorage
function removeFromLocalStorage(userId) {
    let users = JSON.parse(localStorage.getItem('usersData')) || { users: [] };
    users.users = users.users.filter(user => user.id !== userId);
    localStorage.setItem('usersData', JSON.stringify(users));
}

// Function to fetch data from localStorage and update form inputs
function updateFormFromLocalStorage() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        usernameInput.value = userData.username;
        passwordInput.value = userData.password;
        roleInput.value = userData.role;
    }
}

// Initial render of table data and update form from localStorage
renderTable();
updateFormFromLocalStorage();


//==================== SEARCH ===========
function searchData() {
    // Get the search input value
    const searchValue = document.getElementById('searchBar').value.trim();
    
    // Get the table and tbody element
    const table = document.getElementById('dataTable2');
    const tbody = table.getElementsByTagName('tbody')[0];
    
    // Get all rows from the tbody
    const rows = tbody.getElementsByTagName('tr');

    // Loop through the rows and hide those that don't match the search query
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const idCell = cells[0];  // Assuming the ID is in the first column

        if (idCell) {
            const idValue = idCell.textContent || idCell.innerText;

            if (idValue.indexOf(searchValue) > -1) {
                rows[i].style.display = "";  // Show row
                rows[i].style.backgroundColor = "#FFFF99";  // Change background color
            } else {
                rows[i].style.backgroundColor = "";  // Reset background color
            }
        }
    }
}

/////////////////////////////ShowAll
function showAllData() {
    // Get the table and tbody element
    const table = document.getElementById('dataTable2');
    const tbody = table.getElementsByTagName('tbody')[0];
    
    // Get all rows from the tbody
    const rows = tbody.getElementsByTagName('tr');

    // Loop through the rows and show all
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = "";  // Show row
        rows[i].style.backgroundColor = "";
    }
}
