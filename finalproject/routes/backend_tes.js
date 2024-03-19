const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});

// Регистрация пользователя
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText = 'INSERT INTO Users (username, password, role) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, hashedPassword, role];
    const result = await pool.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

// Авторизация пользователя
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const queryText = 'SELECT * FROM Users WHERE username = $1';
    const result = await pool.query(queryText, [username]);
    if (result.rowCount === 0) {
      return res.status(401).send('Invalid username or password');
    }
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid username or password');
    }
    const token = jwt.sign({ username: user.username, role: user.role }, 'your_secret_key');
    res.json({ token });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

// Middleware для проверки аутентификации пользователя
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token', error);
    res.status(401).send('Unauthorized');
  }
};

// Middleware для проверки роли пользователя
const checkUserRole = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res.status(403).send('Forbidden');
  }
  next();
};

// Добавление решенного тикета
app.put('/tickets/:id', authenticateUser, checkUserRole('admin'), async (req, res) => {
  try {
    const ticketId = req.params.id;
    // Дополнительная логика для добавления решенного тикета в базу данных
    res.json({ message: 'Ticket marked as solved' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

// Обработчик маршрута для отправки email
app.post('/send-email', authenticateUser, async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;
    // Дополнительная логика для отправки email
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});