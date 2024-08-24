import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from '../Footer/Footer';

export default function Landing() {
    return (
        <div>
            <Header/>
        <div>
            <div className='container'>
                <h2>Estoque FutGrife</h2>
                <div className="card-container">
                    <Link to="/camisetas/home" className="card">
                        <div>Gerenciar Estoque</div>
                    </Link>
                </div>
            </div>
        </div>
        <Footer/>
        </div>

    )
}