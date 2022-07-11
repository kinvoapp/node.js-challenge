import { React, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import UserContext from '../contexts/UserContext';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';

const Movelist = () => {
    const navigate = useNavigate();
    const [ user ] = useContext(UserContext);

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ month, setMonth ] = useState(new Date().getMonth());
    const [ year, setYear ] = useState(new Date().getFullYear());

    const getData = async () => {
        setLoading(true);

        await api.get('move')
          .then(({ data }) => {
            setData(data);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }

      const handleFilter = async () => {
        await api.post('statement', { user: user._id, year: year, month: month })
          .then(({ data }) => {
            setData(data);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
    
      useEffect(() => {    
        handleFilter();
      }, []);

      const deleteMove = async (id, name) => {
        if (window.confirm(`Excluir ${name}?`)) {
          await api.delete(`move/${id}`)
            .then(getData())
            .catch(e => console.log(e));
        }
      };

  return (
      <div className="tableMove">

        {/* { loading && <h3><CircularProgress /></h3> } */}
        {/* { data.length === 0 ? <h3>Nenhum registro encontrado</h3> : <> */}

        { loading ? <h3><CircularProgress /></h3> : <>

        <h3>Lista de Movimentações</h3>
        <TableContainer component={Paper}>

        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

          <Grid item xs={6} md={8}>

            <FormControl sx={{ width: 150 }}>
              <InputLabel id="demo-simple-select-label">Forma de Pagamento</InputLabel>
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

            <Button onClick={() => handleFilter()} variant="contained">Filtrar</Button>
          </Grid>
        </Grid>

        <Divider className='divider' />

      </Box>

          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell align="left">Nome</StyledTableCell>
                  <StyledTableCell align="center">Tipo</StyledTableCell>
                  <StyledTableCell align="center">Valor</StyledTableCell>
                  <StyledTableCell align="center">Data</StyledTableCell>
                  <StyledTableCell align="right" />
                  <StyledTableCell align="right" />
              </TableRow>
              </TableHead>
              <TableBody>
              {data.map((item) => (
                  <StyledTableRow key={item._id}>

                  <StyledTableCell align="left" component="th" scope="row">
                      {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.type}</StyledTableCell>
                  <StyledTableCell style={ item.type === 'Receita' ? { color: 'blue' } : { color: 'red' } } align="center">{item.value.toFixed(2)}</StyledTableCell>
                  <StyledTableCell align="center">{item.date}</StyledTableCell>
                  {/* moment(item.date).format('DD-MM-YYYY') */}
                  <StyledTableCell align="right"><button onClick={() => navigate(`/move/${item._id}`)}>Alterar</button></StyledTableCell>
                  <StyledTableCell align="right"><button onClick={() => deleteMove(item._id, item.name)}>Excluir</button></StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
          </Table>
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default Movelist;
