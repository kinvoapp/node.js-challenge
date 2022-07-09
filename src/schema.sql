DROP table IF Exists usuarios;
create table usuarios(
	  id 			serial primary key,
  	nome 		varchar(50) not null,
  	email 		varchar(50) unique not null,
  	senha		text not null  	
);

DROP TABLE IF EXISTS movimentacoes;
create table movimentacoes(
	id serial primary key,
      descricao text not null,
  	tipo varchar (20) not null,
      valor integer not null,
      data timestamptz not null,
      usuario_id integer not null,
      foreign key (usuario_id) references usuarios (id)     
);