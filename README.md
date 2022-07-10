# **Customer API**

O objetivo é mostrar uma API utilizando TDD como metodologia de trabalho sempre seguindo os princípios do SOLID.
<br /><br />

> ## Sobre o middleware de auth
* POST para a rota do [SSO](https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token/) para gerar um novo token
* POST para a rota  [SSO Instrospect](https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token/) para conferir se o status do token é ativo e dar permissão para as demais rotas da aplicacão

OBS: para a validacao do token foi utilizada a seguinte documentacao sobre Instrospect no Keycloak [Instrospect DOC](https://github.com/keycloak/keycloak-documentation/blob/main/authorization_services/topics/service-rpt-token-introspection.adoc)

> ## Sobre o .env estar no github e não apenas o env-example
* Por motivos de facilitar os testes na API deixei o .env no github, assim é só baixar o projeto e testar, ja que o token ser gerado com emails diferentes não tem nenhum impacto.
> ## Rotas construídas no projeto
* OBS: Para todas as rotas abaixo é necessário passar um Bearer token valido gerado com o [SSO](https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token/)

1. [Listar um cliente - GET] `/customers/:id`
2. [Atualizar um cliente - PUT] `/customers/:id`
3. [Criar um cliente - POST] `/customers/`


> ## Testes
* Testes Unitários
* Testes de Integração (API Rest)
* Cobertura de Testes
* Mocks
* Stubs

> ## Node Js
* Documentação de API com Swagger
* API Rest com Express
* Segurança (Hashing, Encryption e Encoding)
* CORS
* Middlewares

> ## Typescript
* POO Avançado
* Interface
* TypeAlias
* Namespace
* Utility Types
* Configurações
* Build

> ## Redis
* Persistir dados com `set`
* Atualizar dados com `set` e `get`
* Listar dados com `get`

## **Como executar o projeto**

### **Com Docker**

```
git clone https://github.com/GustavoNoronha0/customer.git
```

```
cd customer 
```


```
docker compose up
```

#### A API sera executada em http://localhost:3000

### **Rodar os testes**
```
docker-compose run customer-api npm run test
```

### **Cobertura de testes**
```
docker-compose run customer-api npm run test:cov
```

### **Sem Docker**

```
git clone https://github.com/GustavoNoronha0/customer.git
```

```
cd customer 
```

#### É necessario executar o redis localmente, alguns links para isso 

* **[Redis no windows 10](https://redis.com/blog/redis-on-windows-10/)**

* **[Redis no Linux](https://redis.io/docs/getting-started/installation/install-redis-on-linux/)**

* **[Redis no macOs](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/)**

```
npm install
```

```
npm start run:dev
```

#### A API sera executada em http://localhost:3000

### **Rodar os testes**
```
npm run test
```

### **Cobertura de testes**
```
npm run test:cov
```

