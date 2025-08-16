// ==========================
// Importações
// ==========================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ==========================
// Configuração do .env
// ==========================
dotenv.config();

// ==========================
// Inicialização do app
// ==========================
const app = express();

// ==========================
// Middlewares
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// Rotas
// ==========================
const authRoutes = require('./routes/auth'); // <-- precisa existir a pasta routes com o arquivo auth.js
app.use('/api/auth', authRoutes);

// ==========================
// Conexão com o MongoDB
// ==========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// ==========================
// Servidor
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
