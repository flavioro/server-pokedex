# server-pokedex
NodeJs, Two Authenticate, Typescript, Typeorm, mongodb,

Backend em  Node.js, Typescript, Express, Mongodb, Two Factor Authenticator (2FA)

## Recursos<a name="features"></a>

- Use Express para Framework da aplicação.
- Gerencie Sessions
- Autenticação via name, username e password.
- As senhas usam hash com [bcryptjs]
- Usando [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) e [MongoLab(mLab)](https://mlab.com/) para armazenamento e consulta aos dados.
- Implementação do google authenticator.

## Instalação<a name="installation"></a>

### Executando localmente

Assegure-se de ter [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) installed, version > 14

1.  Clone ou Download do repositório

    ```
    $ git clone https://github.com/flavioro/server-pokedex
    $ cd server-pokedex
    ```  
    
2.  Instalar dependências

    ```
    $ npm install
    ```

3.  Execute os testes

    ```
    $ npm run test
    ```
    
4. Precisa ter banco de dados mongo funcionando na porta 27017

5.  Inicie a aplicação

        ```
        $ npm run dev
        ```




