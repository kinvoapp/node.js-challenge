import mongoose from 'mongoose';
import { constants } from '../utils/constants';

export class Database {
  public static connect() {
    const databaseUrl = constants.database.url;
    
    mongoose.connect(databaseUrl || '').then(() => {
      console.log('Conexão com o Banco de Dados estabelecida com sucesso!');
    }).catch((err) => {
      console.log(`Erro ao tentar se conectar com o Banco de Dados: ${err}`);
    });
  }

  public static disconnect() {
    mongoose.disconnect().then(() => {
      console.log('Conexão com o Banco de Dados encerrada com sucesso!');
    }).catch((err) => {
      console.log(`Erro ao tentar encerrar conexão com o Banco de Dados: ${err}`);
    })
  }
}