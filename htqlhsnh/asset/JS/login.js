
// Hàm để bật/tắt hiển thị mật khẩu
const togglePasswordVisibility = () => {
    // Lấy phần tử input mật khẩu theo ID của nó
    const passwordInput = document.getElementById('mat-khau');
    
    // Chọn tất cả các phần tử có thể đại diện cho biểu tượng mắt
    const eyeIcons = document.querySelectorAll('.fa-eye, .fa-eye-slash');
    
    // Thêm sự kiện click cho mỗi biểu tượng mắt
    eyeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Nếu mật khẩu đang bị ẩn
            if (passwordInput.type === 'password') {
                // Hiển thị mật khẩu
                passwordInput.type = 'text';
                // Đổi biểu tượng để hiển thị rằng mật khẩu đang hiện
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                // Nếu mật khẩu đang hiện, ẩn nó
                passwordInput.type = 'password';
                // Đổi biểu tượng để hiển thị rằng mật khẩu đang bị ẩn
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
  };
  
  // Gọi hàm để kích hoạt chức năng bật/tắt hiển thị mật khẩu
  togglePasswordVisibility();

const btnDangNhap = document.querySelector('.btn');
const taiKhoanInput = document.getElementById('Tai-Khoan');
const matKhauInput = document.getElementById('mat-khau');

//Đăng nhập
btnDangNhap.addEventListener('click', function() {
  const taiKhoan = taiKhoanInput.value.trim();
  const matKhau = matKhauInput.value.trim();

  if (taiKhoan === 'admin' && matKhau === 'admin') {
    alert('Đăng nhập thành công!');
    // Chuyển hướng đến trang chủ (ví dụ: window.location.href = 'home.html')
    window.location.href = '../html/trang_home.html'
  }
  if (taiKhoan === 'nhanvien' && matKhau === 'nhanvien') {
    alert('Đăng nhập thành công!');
    // Chuyển hướng đến trang chủ (ví dụ: window.location.href = 'home.html')
    window.location.href = '../html/trang_homens.html'
  }
  if (taiKhoan === 'lanhdao' && matKhau === 'lanhdao') {
    alert('Đăng nhập thành công!');
    // Chuyển hướng đến trang chủ (ví dụ: window.location.href = 'home.html')
    window.location.href = '../html/trang_homeld.html'
  }
});


