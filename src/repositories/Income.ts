// Interface de dados para criação de uma nova receita
export interface IncomeCreateData {
  name: string;
  value: number;
}

// Interface com data final e inicial para filtro
export interface IncomeReadData {
  start: Date;
  end: Date;
}

// Interface de dados para atualização de uma receita
export interface IncomeUpdateData {
  name: string;
  value: number;
  id: number;
}

// Interface de dados para exclusão de uma receita
export interface IncomeDeleteData {
  id: number;
}

// Repositório da entidade de receitas
export interface IncomeRepository {
  create: (data: IncomeCreateData) => Promise<any>;
  read: (data: IncomeReadData) => Promise<any>;
  update: (data: IncomeUpdateData) => Promise<any>;
  delete: (data: IncomeDeleteData) => Promise<any>;
}
