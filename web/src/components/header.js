import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import UserContext from '../contexts/UserContext';

const Header = () => {
    const [ user ] = useContext(UserContext);

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link to={'/'}>
                        <div className="navbar-brand">KinvoApp</div>
                    </Link>
                </div>

                { user.name && 
                <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    <li><Link to={'/move'}>Movimentações</Link></li>
                    <li><Link to={'/movelist'}>Lista Movimentações</Link></li>
                    <li><Link to={'/statement'}>Extrato</Link></li>
                    <li><Link to={'/user'}>Usuários</Link></li>
                    <li><Link to={'/userlist'}>Lista Usuários</Link></li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li><Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span>{ user.name ? 'logout' : 'login' }</Link></li>
                </ul>
                </div>
                }

            </div>
        </nav>
    )
};

export default Header;
