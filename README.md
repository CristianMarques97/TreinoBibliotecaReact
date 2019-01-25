# TreinoBibliotecaReact
Treino com React e Spring Framework utilizando uma montagem de uma biblioteca como exemplo


Procedimentos para instalção em ambiente DEV:

1- instalação do postgres e eclipse com o plugin do STS (para execução do spring boot) e npm

2- executar um restore no postgres utilizando arquivo de backup

3- utilizando o eclipe selecionar import -> existing maven projects -> seleciona o projeto da pasta back-end

4- atualize o projeto e execute maven install

5 - Atualize o arquivo properties em src/main/resources e atualize as informações do banco para o jdbc(nome do banco e usuário de login) 

6 - selecione no projeto "run as" -> "spring boot app"

7 - pelo prompt de comando ou pelo bash navege até a pasta front-end e execute npm install para instalar dependencias e execute npm start para iniciar o front-end
