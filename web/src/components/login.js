import { React, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import UserContext from '../contexts/UserContext';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [ values, setValues ] = useState({ name: '', pass: '' });
    const [ user, setUser ] = useContext(UserContext);
    const navigate = useNavigate();

    const getUser = async () => {
        await api.post('user/login', { name: values.name, password: values.pass })
          .then(({ data }) => {
            if (data.length > 0) {
              console.log('ok');
              setUser(data[0]);
              navigate('/');
            } else {
              setUser([]);
              alert('Usuário não encontrado!');
            }
          })
          .catch(e => console.log(e));
    }

    useEffect(() => {
      if (user.name) setUser([]); 
    }, [])
    
      return (
        <div className="gridLogin">

          <h3>Login</h3>

          <Grid gap={3}
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                className="gridCustomer">

              <TextField id="outlined-basic" label="Usuário" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
              <TextField id="outlined-basic" label="Senha" variant="outlined" type="password" value={values.pass} onChange={e => setValues({...values, pass: e.target.value})} />
          
          </Grid>

          <Grid gap={3}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="gridButton">

              <Button onClick={() => getUser()} variant="contained">Continuar</Button>
          </Grid>
  
        </div>
      );
};

export default Login;
