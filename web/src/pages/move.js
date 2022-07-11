import { React, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import api from '../api';
import UserContext from '../contexts/UserContext';

const Move = () => {
    const [ user ] = useContext(UserContext);

    const [values, setValues] = useState({ user: '',
                                           name: '',
                                           type: '',
                                           value: '',
                                           date: '',
                                           desc: '' });

    const navigate = useNavigate();
    const { id } = useParams();

    const [ type, setType ] = useState('');

    const insertMove = async () => {
      if (!values.name || !type || !values.value) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
      } else {
        const todayDate = new Date().toISOString().slice(0, 10);
        const move = { user: user._id,
                       name: values.name,
                       type: type,
                       value: values.value,
                       date: todayDate,
                       desc: values.desc };

        if (id) {
          await api.patch(`/move/${id}`, move)
            .then(navigate('/moveList'));
        } else {
          await api.post('/move', move)
            .then(navigate('/moveList'));
        } 
      }
    }

    const getMove = async () => {
      if (id) {
        await api.get(`move/${id}`)
          .then(({ data }) => {
            setValues({ name: data.name,
                        value: data.value,
                        desc: data.desc });
            setType(data.type)
          })
          .catch(e => console.log(e));
      }
    }

    useEffect(() => {
      getMove();
    }, []);
    
      return (
        <div className="gridMove">

          <h3>Cadastro de Movimentações</h3>

          <Grid gap={3}
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                className="gridCustomer">

              { id && <TextField id="outlined-basic" label="Id" variant="outlined" value={id} disabled /> }
              <TextField id="outlined-basic" label="Movimentação" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} required />

              <FormControl sx={{ width: 'auto' }} required>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Tipo"
                  onChange={e => setType(e.target.value)}
                >
                  <MenuItem value={'Receita'}>Receita</MenuItem>
                  <MenuItem value={'Despesa'}>Despesa</MenuItem>
                </Select>
              </FormControl>

              {/* <TextField id="outlined-basic" label="Tipo" variant="outlined" value={values.desc} onChange={e => setValues({...values, desc: e.target.value})} required /> */}
              <TextField id="outlined-basic" label="Valor" variant="outlined" value={values.value} onChange={e => setValues({...values, value: e.target.value})} required />
              <TextField id="outlined-basic" label="Descrição" variant="outlined" value={values.desc} onChange={e => setValues({...values, desc: e.target.value})} />

          </Grid>

          <Grid gap={3}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="gridButton">

            <Button onClick={() => insertMove()} variant="contained">Salvar</Button>

            <Link to={'/'}>
              <Button variant="contained">Cancelar</Button>
            </Link>
          </Grid>
        </div>
      );
};

export default Move;
