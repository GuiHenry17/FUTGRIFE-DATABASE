import { Link } from 'react-router-dom';
import '../globals.css';

export default function Home() {
    return (
        <div className='container'>
            <h2>Estoque FutGrife</h2>
            <div className="card-container">
                <Link to="/camiseta/cadastrar" className="card">
                    <div>Registrar Camiseta</div>
                </Link>
                <Link to="/camisetas" className="card">
                    <div>Listar Camiseta</div>
                </Link>
                <Link to="/camisetas/alterar" className="card">
                    <div>Editar Camiseta</div>
                </Link>
            </div>
        </div>
    );
}
