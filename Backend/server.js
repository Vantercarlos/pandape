// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const paymentRoutes = require('./routes/pagamentoRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
