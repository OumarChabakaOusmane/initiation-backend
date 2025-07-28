require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour le JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB :', err));

// Définition du schéma
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stockStatus: {
    type: String,
    required: true,
    enum: ['en stock', 'petite stock', 'pas en stock']
  }
}, { timestamps: true });

// Modèle
const Product = mongoose.model('Product', productSchema);

// Route : récupérer tous les produits
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route : récupérer un produit par ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route : ajouter un produit
app.post('/products', async (req, res) => {
  const { productName, price, stockStatus } = req.body;

  try {
    const newProduct = new Product({ productName, price, stockStatus });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout', error: err.message });
  }
});

// Route : modifier un produit (hors stockStatus)
app.patch('/products/:id', async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };
  delete updates.stockStatus;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const updated = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de mise à jour', error: err.message });
  }
});

// Route : mettre à jour uniquement le stockStatus
app.patch('/products/:id/:status', async (req, res) => {
  const { id, status } = req.params;
  const allowed = ['en stock', 'petite stock', 'pas en stock'];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: 'Statut invalide' });
  }

  try {
    const updated = await Product.findByIdAndUpdate(id, { stockStatus: status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route : supprimer un produit
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
