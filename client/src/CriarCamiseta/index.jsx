import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';


export default function CreateCamiseta() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaCamiseta = { nome, preco, quantidade };

    try {
      const response = await fetch('http://localhost:5000/camisetas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaCamiseta),
      });
      if (response.ok) {
        alert('Camiseta criada com sucesso!');
        setNome('');
        setPreco('');
        setQuantidade('');
        navigate("/camisetas");
      } else {
        alert('Erro ao criar camiseta.');
      }
    } catch (error) {
      console.error('Erro ao criar camiseta:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Criar Camiseta</h2>
      <input
        type="text"
        placeholder="Nome da Camiseta"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        min={0}
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <input
        type="number"
        min={0}
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        required
      />
      <button type="submit">Criar Camiseta</button>
    </form>
    </div>
  );
}
