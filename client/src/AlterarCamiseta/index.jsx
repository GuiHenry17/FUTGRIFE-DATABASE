import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateCamiseta() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atualizacao = { nome, preco, quantidade };

    try {
      const response = await fetch(`http://localhost:5000/camisetas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizacao),
      });
      if (response.ok) {
        alert('Camiseta atualizada com sucesso!');
        navigate("/camisetas");
      } else {
        alert('Erro ao atualizar camiseta.');
      }
    } catch (error) {
      console.error('Erro ao atualizar camiseta:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Atualizar Camiseta</h2>
      <input
        type="text"
        placeholder="ID da Camiseta"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome da Camiseta"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="number"
        min={0}
        placeholder="Preço"
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
      <button type="submit">Atualizar Camiseta</button>
    </form>
    </div>
  );
}
