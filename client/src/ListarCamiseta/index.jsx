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
    <>
      <Header id='headerprod' />
      <div className="bloco-principal">
        <div className="pagename">
          <h1>Produtos</h1>
        </div>
        <>
          <div className="bloco-produtos">
            {camisetas.map((camiseta) => (
              <div key={camiseta.id} id='produtoos'>
                <img className='fotoprodutos' src={camiseta.imagem} alt={camiseta.item} />
                <p>{camiseta.nome + ` (${camiseta.quantidade})`}</p>
                  <p>{'R$ ' + camiseta.preco.toFixed(2)}</p>
                <button className="botaoadd" onClick={() => handleDelete(camiseta._id)}>REMOVER</button>
              </div>
            ))}
          </div>
        </>
      </div>
      <Footer />
   </>
  );
}
