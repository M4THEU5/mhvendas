
O projeto foi feito em Laravel, com autenticação Token, que pensando bem não foi a melhor autenticação para uma aplicaçã web rs. E o front foi feito com JQuery e Bootstrap. O site é responsivo e dinamico.
### PRÉ-REQUISITOS
#### BACK-END
- PHP
- LARAVEL
- LARAVEL PASSPORT
#### FRONT-END
- BOOTSTRAP
- FONTAWESOME
- JQUERY
- JQUERY MASK

### RODANDO O PROJETO
- Faça o clone do repositorio. 
- Na pasta backend com o composer instalado rode o comando para instalar todas as dependências: 
```
composer install
```
- Crie um arquivo .env com as configurações do banco de dados.
- Execute o comando para fazer as migrations.
```
php artisan migrate
```
- Execute o comando para criar as chaves de criptografia necessárias para gerar tokens de acesso.
```
php artisan passport:install
```
- Para rodar o projeto local, execute o comando.
```
php artisan serve
```
Para evitar erros de CORS, utilize alguma extensão para o seu navegador.
* [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) - Google Chrome
* [CORS Everywhere](https://addons.mozilla.org/pt-BR/firefox/addon/cors-everywhere/) - Mozilla Firefox

### CONSIDERAÇÕES FINAIS
Se eu podesse voltar no tempo eu não teria usado JQuery, vlw flw~
