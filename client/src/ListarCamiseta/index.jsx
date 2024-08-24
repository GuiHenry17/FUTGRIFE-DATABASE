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
    <Header/>
    <div className='container'>
      <h2>Lista de Camisetas</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Código Camiseta</th>
            <th>Nome da Camiseta</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {camisetas.map((camiseta) => (
            <tr key={camiseta._id}>
              <td>{camiseta._id}</td>
              <td>{camiseta.nome}</td>
              <td>{camiseta.preco}</td>
              <td>{camiseta.quantidade}</td>
              <td>
                <button onClick={() => handleDelete(camiseta._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
}
