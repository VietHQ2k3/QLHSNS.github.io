const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Sử dụng body-parser để xử lý dữ liệu JSON
app.use(bodyParser.json());

// Mảng giả lập dữ liệu người dùng
const users = [];

// Route GET để lấy danh sách người dùng
app.get('/users', (req, res) => {
  res.json(users);
});

// Route POST để đăng nhập
app.post('/users', (req, res) => {
    const { username, password } = req.body; // Lấy username và password từ body request
  
    // Kiểm tra xem username và password có tồn tại trong hệ thống hay không
    const user = users.find(user => users.username === username && users.password === password);
  
    if (user) {
      // Đăng nhập thành công
      res.json({ message: 'Đăng nhập thành công', user }); // Gửi thông tin đăng nhập thành công và thông tin người dùng
    } else {
      // Đăng nhập thất bại
      res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không chính xác' }); // Gửi thông báo lỗi
    }
  });

// Route POST để tạo người dùng mới
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({ message: 'Tạo người dùng thành công' });
});

// Route PUT để cập nhật thông tin người dùng
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    res.json({ message: 'Cập nhật thông tin người dùng thành công' });
  } else {
    res.status(404).json({ message: 'Người dùng không tồn tại' });
  }
});

// Route DELETE để xóa người dùng
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: 'Xóa người dùng thành công' });
  } else {
    res.status(404).json({ message: 'Người dùng không tồn tại' });
  }
});

// Khởi động server và lắng nghe kết nối trên cổng 3000
app.listen(3000, () => {
  console.log('Server đang lắng nghe trên cổng 3000');
});
