const express = require('express');
const router = express.Router();
const stripe = require('stripe')('');

// Rota para processar uma transação de pagamento
router.post('/process', async (req, res) => {
  const { amount, token } = req.body;

  try {
    // Criar uma cobrança com o token e o valor fornecidos
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'USD',
      source: token,
      description: 'Descrição da cobrança' // Adicione uma descrição adequada para a cobrança
    });

    // A cobrança foi criada com sucesso
    res.status(200).json({ message: 'Pagamento processado com sucesso.', charge: charge });
  } catch (error) {
    // Ocorreu um erro ao criar a cobrança
    console.error('Erro ao processar o pagamento:', error);
    res.status(500).json({ error: 'Erro ao processar o pagamento.' });
  }
});

module.exports = router;
