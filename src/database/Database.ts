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
}