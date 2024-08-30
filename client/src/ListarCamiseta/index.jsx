import { useEffect, useState } from 'react';
import '../globals.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function ReadCamisetas() {
  const [camisetas, setCamisetas] = useState([]);


  useEffect(() => {
    const fetchCamisetas = async () => {
      try {
        const response = await fetch('http://localhost:5000/camisetas');
        const data = await response.json();
        setCamisetas(data);
      } catch (error) {
        console.error('Erro ao buscar as camisetas:', error);
      }
    };

    fetchCamisetas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/camisetas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {

        setCamisetas(camisetas.filter((camiseta) => camiseta._id !== id));
        alert('Camiseta excluída com sucesso!');
      } else {
        alert('Erro ao excluir camiseta.');
      }
    } catch (error) {
      console.error('Erro ao excluir camiseta:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className='bloco-principal'>
        <div className="pagename">
          <h1>Camisetas</h1>
        </div>
        <div className="bloco-produtos">
          {camisetas.map((camiseta) => (
            <div key={camiseta.id} id='produtoos'>
              <img className='fotoprodutos' src={camiseta.imagem} alt={camiseta.nome} />
              <p>{camiseta.nome}</p>
              <p className='precos'>{camiseta.preco}</p>
              <p>{camiseta.quantidade}</p>
              <button className="delete-container" onClick={() => handleDelete(camiseta._id)}>REMOVER</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
