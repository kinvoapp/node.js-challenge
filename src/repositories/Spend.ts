// Interface de dados para criação de uma nova despesa
export interface SpendCreateData {
  name: string;
  value: number;
}

// Interface com data final e inicial para filtro
export interface SpendReadData {
  start: Date;
  end: Date;
}

// Interface de dados para atualização de uma despesa
export interface SpendUpdateData {
  id: number;
  name: string;
  value: number;
}

// Interface de dados para exclusão de uma despesa
export interface SpendDeleteData {
  id: number;
}

// Repositório da entidade de despesas
export interface SpendRepository {
  create: (data: SpendCreateData) => Promise<any>;
  read: (data: SpendReadData) => Promise<any>;
  update: (data: SpendUpdateData) => Promise<any>;
  delete: (data: SpendDeleteData) => Promise<any>;
}
