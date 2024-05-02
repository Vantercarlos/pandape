const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Dados simulados de usuários
let users = [
  { id: '1', name: 'Usuário 1' },
  { id: '2', name: 'Usuário 2' },
  { id: '3', name: 'Usuário 3' }
];

// Rota para listar todos os usuários
router.get('/', (req, res) => {
  res.json(users);
});

// Rota para registrar um novo usuário
router.post('/', (req, res) => {
  const { name } = req.body;
  const newUser = { id: uuidv4(), name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Rota para obter um usuário pelo ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);
  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado' });
  } else {
    res.json(user);
  }
});

// Rota para atualizar um usuário pelo ID
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ error: 'Usuário não encontrado' });
  } else {
    users[userIndex].name = name;
    res.json(users[userIndex]);
  }
});

// Rota para excluir um usuário pelo ID
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ error: 'Usuário não encontrado' });
  } else {
    users.splice(userIndex, 1);
    res.status(204).send();
  }
});

module.exports = router;
