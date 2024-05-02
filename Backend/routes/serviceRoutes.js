const express = require('express');
const router = express.Router();

let services = [
  { id: 1, title: 'Serviço 1', description: 'Descrição do Serviço 1', price: 100 },
  { id: 2, title: 'Serviço 2', description: 'Descrição do Serviço 2', price: 150 },
  { id: 3, title: 'Serviço 3', description: 'Descrição do Serviço 3', price: 200 }
];

// Rota para listar todos os serviços
router.get('/', (req, res) => {
  res.json(services);
});

// Rota para obter um serviço pelo ID
router.get('/:id', (req, res) => {
  const serviceId = parseInt(req.params.id);
  const service = services.find(service => service.id === serviceId);
  if (!service) {
    res.status(404).send('Serviço não encontrado.');
  } else {
    res.json(service);
  }
});

// Rota para criar um novo serviço
router.post('/', (req, res) => {
  const { title, description, price } = req.body;
  const newService = { id: services.length + 1, title, description, price };
  services.push(newService);
  res.status(201).json(newService);
});

// Rota para atualizar um serviço pelo ID
router.put('/:id', (req, res) => {
  const serviceId = parseInt(req.params.id);
  const { title, description, price } = req.body;
  const serviceIndex = services.findIndex(service => service.id === serviceId);
  if (serviceIndex === -1) {
    res.status(404).send('Serviço não encontrado.');
  } else {
    services[serviceIndex] = { id: serviceId, title, description, price };
    res.json(services[serviceIndex]);
  }
});

// Rota para excluir um serviço pelo ID
router.delete('/:id', (req, res) => {
  const serviceId = parseInt(req.params.id);
  const serviceIndex = services.findIndex(service => service.id === serviceId);
  if (serviceIndex === -1) {
    res.status(404).send('Serviço não encontrado.');
  } else {
    services.splice(serviceIndex, 1);
    res.status(204).send();
  }
});

module.exports = router;
