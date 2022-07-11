import { React, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const User = () => {
    const [values, setValues] = useState({ name: '',
                                           address: '',
                                           email: '',
                                           password: '' });

    const navigate = useNavigate();
    const { id } = useParams();

    const insertUser = async () => {
      if (!values.name || !values.password || !values.email) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
      } else {
        await api.post('user/getUser', { name: values.name })
          .then(() => alert('Usuário já existe na base de dados!'))
          .catch(async () => {
            const user = { name: values.name,
                           password: values.password,
                           email: values.email };
               
            if (id) {
              await api.patch(`/user/${id}`, user)
                .then(navigate('/userlist'));
              } else {
              await api.post('/user', user)
                .then(navigate('/userlist'));
            };
          });
      };
    };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const getUser = async () => {
        if (id) {
          await api.get(`user/${id}`)
            .then(({ data }) => {
              setValues({ name: data.name,
                          password: data.password,
                          email: data.email });
            })
            .catch(e => console.log(e));
        }
      }

      useEffect(() => {
        getUser();
      }, []);
    
      return (
        <div className="gridUser">

          <h3>Cadastro de Usuário</h3>

          <Grid gap={3}
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                className="gridCustomer">

              { id && <TextField id="outlined-basic" label="Id" variant="outlined" value={id} disabled /> }
              <TextField required id="outlined-basic" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
          
              <FormControl required variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={e => setValues({...values, password: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
          </FormControl>

          <TextField required id="outlined-basic" label="E-mail" variant="outlined" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
          
          </Grid>

          <Grid gap={3}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="gridButton">

            <Button onClick={() => insertUser()} variant="contained">Salvar</Button>

            <Link to={'/'}>
              <Button variant="contained">Cancelar</Button>
            </Link>
          </Grid>
        </div>
      );
};

export default User;
