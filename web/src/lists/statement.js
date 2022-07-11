import { React, useContext, useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import UserContext from '../contexts/UserContext';

const Statement = () => {
    const [ user ] = useContext(UserContext);
    const [ loading, setLoading ] = useState(false);
    const [ month, setMonth ] = useState(new Date().getMonth());
    const [ year, setYear ] = useState(new Date().getFullYear());

    const [ receita, setReceita ] = useState(0);
    const [ despesa, setDespesa ] = useState(0);
    const [ saldo, setSaldo ] = useState(0);

      const handlePerMonth = async () => {
        await api.post('statement/permonth', { user: user._id, year: year, month: month })
          .then(({ data }) => {
            console.log(data)
            setLoading(false);
            setReceita(data[0].total.toFixed(2));
            setDespesa(data[1].total.toFixed(2));
            setSaldo(data[2].total.toFixed(2))
          })
          .catch(e => console.log(e));
      }

      const handleTotal = async () => {
        await api.post('statement/geral', { user: user._id })
          .then(({ data }) => {
            setLoading(false);
            setReceita(data[0].total.toFixed(2));
            setDespesa(data[1].total.toFixed(2));
            setSaldo(data[2].total.toFixed(2))
          })
          .catch(e => console.log(e));
      }
    
      useEffect(() => {    
        handlePerMonth();
      }, []);

  return (
      <div>

        {/* { loading && <h3><CircularProgress /></h3> } */}
        {/* { data.length === 0 ? <h3>Nenhum registro encontrado</h3> : <> */}

        { loading ? <h3><CircularProgress /></h3> : <>

        <h3>Extrato</h3>
        <TableContainer component={Paper}>


        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

          <Grid item xs={6} md={8}>

            <FormControl sx={{ width: 150 }}>
              <InputLabel id="demo-simple-select-label">Mês</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Selecione o mês"
                onChange={e => setMonth(e.target.value)}
              >
                <MenuItem value={0}>Janeiro</MenuItem>
                <MenuItem value={1}>Fevereiro</MenuItem>
                <MenuItem value={2}>Março</MenuItem>
                <MenuItem value={3}>Abril</MenuItem>
                <MenuItem value={4}>Maio</MenuItem>
                <MenuItem value={5}>Junho</MenuItem>
                <MenuItem value={6}>Julho</MenuItem>
                <MenuItem value={7}>Agosto</MenuItem>
                <MenuItem value={8}>Setembro</MenuItem>
                <MenuItem value={9}>Outubro</MenuItem>
                <MenuItem value={10}>Novembro</MenuItem>
                <MenuItem value={11}>Dezembro</MenuItem>
              </Select>
            </FormControl>

            <TextField required id="outlined-basic" label="Ano" variant="outlined" value={year} onChange={e => setYear(e.target.value)} />

            <Button onClick={() => handlePerMonth()} variant="contained">Filtrar</Button>
          
            <h2>Receita: {receita}</h2>
            <h2>Despesa: {despesa}</h2>
            <h2><b>Saldo: {saldo}</b></h2>

            <Button onClick={() => handleTotal()} variant="contained">Extrato Geral</Button>

          </Grid>
          {/* </>} */}

        </Grid>

        {/* <Divider className='divider' /> */}

      </Box>

          
        </TableContainer>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Link to={'/'}>
            <Button variant="contained">Voltar</Button>
          </Link>
        </Grid>

        : </> }
    </div>
  );
}

export default Statement;
