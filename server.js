const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Cấu hình thư mục tĩnh để phục vụ file HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// Route cho trang home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});