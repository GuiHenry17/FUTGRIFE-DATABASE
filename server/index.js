const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('camisetas');
    collection = db.collection('camiseta');

  } catch (err) { 
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();

app.use(express.json()); 


app.post('/camisetas', async (req, res) => {
  try {
    const novaCamiseta = req.body;
    novaCamiseta.preco = parseFloat(novaCamiseta.preco)
    novaCamiseta.quantidade = parseFloat(novaCamiseta.quantidade)
    result = await collection.insertOne(novaCamiseta)

    
    res.status(201).json({ message: 'Camiseta criada com sucesso', camisetaId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar camiseta', error: err });
  }
});

app.get('/camisetas', async (req, res) => {
  try {  
    const camisetas = await collection.find().toArray();
    

    res.status(200).json(camisetas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar camisetas', error: err });
  }
});

const { ObjectId } = require('mongodb');

app.get('/camisetas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const camiseta = await collection.findOne({ _id: newId });

    if (!camiseta) {
      res.status(404).json({ message: 'Camiseta não encontrada' });
    } else {
      res.status(200).json(camiseta);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar camiseta', error: err });
  }
});

app.put('/camisetas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const atualizacao = req.body;

    const result = await collection.updateOne( { _id: newId }, { $set: atualizacao });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Camiseta não encontrada' });
    } else {
      res.status(200).json({ message: 'Camiseta atualizada com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar camiseta', error: err });
  }
});

app.delete('/camisetas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const result = await collection.deleteOne({ _id: newId });
    
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Camiseta não encontrada' });
    } else {
      res.status(200).json({ message: 'Camiseta excluída com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir camiseta', error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
