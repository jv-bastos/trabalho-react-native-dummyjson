# Trabalho React Native — DummyJSON

Aplicativo desenvolvido com **React Native, Expo e JavaScript**, utilizando a [DummyJSON](https://dummyjson.com/) para autenticação e consulta de produtos.

## 1. Como executar o projeto

### Pré-requisitos

* [Node.js](https://nodejs.org/) instalado.
* npm, instalado junto com o Node.js.
* [Expo Go](https://expo.dev/go) instalado no celular, caso queira executar o aplicativo em um dispositivo físico.

### Passos para execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/jv-bastos/trabalho-react-native-fakestoreapi.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd trabalho-react-native-fakestoreapi
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o Expo:

   ```bash
   npx expo start
   ```

5. Execute o aplicativo:

   * **Celular:** escaneie o QR Code com o Expo Go.
   * **Emulador Android:** pressione `a` no terminal, com o emulador configurado.

Se necessário, utilize `npx expo start --tunnel` para tentar estabelecer a conexão com o celular por meio de um túnel.

## 2. Como verificar os usuários disponíveis para login

O aplicativo utiliza a [DummyJSON](https://dummyjson.com/) para consultar usuários e realizar a autenticação.

Para visualizar os usuários disponíveis, acesse o seguinte endereço no navegador:

https://dummyjson.com/users

A resposta será exibida em formato JSON, contendo os dados dos usuários disponibilizados pela API.

Para consultar as credenciais de teste, acesse a documentação oficial:

https://dummyjson.com/docs/auth

O login é realizado por meio do endpoint:

`POST https://dummyjson.com/auth/login`

O corpo da requisição deve conter o nome de usuário e a senha de um usuário válido, conforme os dados aceitos pela API.

**Observação:** a DummyJSON fornece dados fictícios para testes. Não é necessário cadastrar usuários próprios para experimentar a autenticação.

## 3. Integrantes do grupo

| Nome completo              | RA             |
| -------------------------- | -------------- |
| João Vitor Bastos          | 1136345        |
| Leonardo Ross Dapper       | 1136153        |
| Eduardo Cardoso Debona     | 1121865        |
| Roan Pablo Bortolini       | 1139707        |
| Vinicius Gehring Capellari | 1138972        |

## Tecnologias utilizadas

* React Native
* Expo
* JavaScript
* React Navigation
* Axios
* DummyJSON
