create database db_controle_jogos_bb;

#ATIVA O DATABASE
use db_controle_jogos_bb;

create table tbl_jogo (
	id               int not null primary key auto_increment,
    nome             varchar (80) not null,
    data_lancamento  date not null,
    versao           varchar (10) not null,
    tamanho          varchar(10),
    descricao        text,
    foto_capa        varchar(200),
    link             varchar(200),
    id_faixa_etaria  int not null,
    
    foreign key (id_faixa_etaria)
    references tbl_faixa_etaria(id)
);




create table tbl_plataforma_jogo(
	id int not null primary key auto_increment,
    id_plataforma int not null,
    id_jogo int not null,
    id_versao int not null,
    FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma(id),
    FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
    FOREIGN KEY (id_versao) REFERENCES tbl_versao(id)
);

INSERT INTO tbl_plataforma_jogo (
    id_plataforma,
    id_jogo,
    id_versao
) VALUES (
    1,  
    6,  
    1  
);

INSERT INTO tbl_jogo_empresa (id_jogo, id_empresa)
VALUES (12, 1);


create table tbl_genero_jogo(
	id int not null primary key auto_increment,
    id_jogo int not null,
    id_genero int not null,
    FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);

create table tbl_jogo_empresa(
	id int not null primary key auto_increment,
    id_jogo int not null,
    id_empresa int not null,
    FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
    FOREIGN KEY (id_empresa) REFERENCES tbl_empresa(id)
);


create table tbl_avaliacao(
	id               int not null primary key auto_increment,
    nome             varchar (45) not null,
    email            varchar (50) not null,
    descricao        varchar (500)not null,
    tipo_de_console  varchar (10) not null,
    id_jogo int ,
    
    foreign key (id_jogo)
    references tbl_jogo(id)
    
);




create table tbl_empresa (
	id                int not null primary key auto_increment,
    nome              varchar (45) not null,
    descricao         varchar (100) not null,
    tipo_de_empresa   varchar (45) not null,
    fundador          varchar (45) not null,
    pais_origem       varchar (45) not null,
    foto_capa_empresa varchar (200) not null
);

create table tbl_versao (
	id            int not null primary key auto_increment,
    nome_versao   varchar (100),
    numero_versao varchar (45),
    data_versao   varchar (45),
    tamanho       varchar (45)
);



create table tbl_faixa_etaria(
	id int not null primary key auto_increment,
    tipo_de_classificacao varchar (40)
);

create table tbl_plataforma (
	id   int not null primary key auto_increment,
    nome varchar (50) 
);

create table tbl_genero (
	id int not null primary key auto_increment,
    tipo_de_categoria varchar (45)
);

SELECT tbl_empresa.*
FROM tbl_jogo
INNER JOIN tbl_jogo_empresa ON tbl_jogo.id = tbl_jogo_empresa.id_jogo
INNER JOIN tbl_empresa ON tbl_empresa.id = tbl_jogo_empresa.id_empresa
WHERE tbl_jogo.id = 6;

SELECT tbl_plataforma.*
FROM tbl_jogo
INNER JOIN tbl_plataforma_jogo
  ON tbl_jogo.id = tbl_plataforma_jogo.id_jogo
INNER JOIN tbl_plataforma
  ON tbl_plataforma.id = tbl_plataforma_jogo.id_plataforma
WHERE tbl_jogo.id = 4;



select * from tbl_plataforma_jogo;
show tables;
desc tbl_faixa_etaria;
select * from tbl_avaliacao order by id desc;
desc tbl_plataforma_jogo;
select * from tbl_empresa;
delete from tbl_jogo where id=5;

select * from tbl_jogo_empresa;



