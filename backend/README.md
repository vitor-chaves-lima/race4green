﻿# Backend - Race 4 Green

Este diretório contém os microsserviços do backend da plataforma **Race 4 Green**. Cada microsserviço foi desenvolvido utilizando **Python** e possui responsabilidades distintas dentro do sistema.

## Estrutura do Diretório

- **iam/**: Microsserviço responsável pelo gerenciamento de usuários, autenticação e autorização.
- **integrations/**: Microsserviço responsável por gerenciar integrações externas e dados relacionados.

## Microsserviços

### 1. IAM (Identity and Access Management)

O microsserviço **IAM** é responsável por todas as operações relacionadas à gestão de usuários, autenticação e autorização na plataforma.

#### Funcionalidades

- Cadastro de usuários
- Autenticação (login/logout)
- Gerenciamento de tokens de acesso e refresh

#### Tecnologias Utilizadas

- **FastAPI** para a criação da API
- **Pydantic** para validação de dados
- **PostgreSQL** como banco de dados (opcional, conforme configuração)

#### Como Rodar o IAM

Siga os passos abaixo para rodar o microsserviço IAM:

1. Navegue até o diretório `iam`:
	  ```bash
		cd iam
		```

2. Inicie o servidor utilizando Docker Compose:
	  ```bash
		docker-compose -f docker-compose.dev.yaml up
		```

3. O serviço estará disponível em `http://localhost:8000`.

### 2. Integrations

O microsserviço **Integrations** é responsável por lidar com as integrações externas que a plataforma realiza, além de gerenciar dados relacionados a essas integrações.

#### Funcionalidades

- Gerenciamento de integrações externas
- Comunicação com outros serviços via APIs
- Sincronização e armazenamento de dados de terceiros

#### Tecnologias Utilizadas

- **FastAPI** para a criação da API
- **Redis** e **PostgreSQL** como bancos de dados
- **Docker Compose** para orquestração de containers

#### Como Rodar o Microsserviço de Integrações

Siga os passos abaixo para rodar o microsserviço **Integrations** junto com os bancos de dados:

1. Navegue até o diretório `integrations`:
	  ```bash
		cd integrations
		```

2. Utilize o Docker Compose com o arquivo `docker-compose.dev.yaml` para subir os bancos de dados e o microsserviço:
	  ```bash
		docker-compose -f docker-compose.dev.yaml up
		```

3. O serviço estará disponível em `http://localhost:8000` e os bancos de dados estarão configurados via Docker Compose.

## Fluxograma ( Integração com TikTok )

![Fluxogram](..//docs/Fluxograma.webp)

## Integrantes do Grupo

- **Douglas dos Santos Melo** - RM: 556439
- **Gabriel Danius Fachetti Barbosa** - RM: 555747
- **Henrique Borges de Castro Sanches** - RM: 557959
- **Matheus Marcelino Dantas da Silva** - RM: 556332
- **Vitor Chaves de Lima Coelho** - RM: 557067
