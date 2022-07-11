import { React, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const Home = () => {
    const navigate = useNavigate();
    const [ user ] = useContext(UserContext);

    useEffect(() => {
        !user.name ? navigate('/login') : navigate('/');
    }, []);

    return (    
        <div className="container text-center">    
            <h3>Olá { user.name || `Visitante` }!</h3><br />
        </div>
    )
}

export default Home;
