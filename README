# Pokémon Autocomplete

Busca de Pokémon usando a [PokéAPI](https://pokeapi.co/), com funcionalidade de autocomplete e exibição de detalhes do Pokémon selecionado.

Desafio Intermediário – Autocomplete com PokéAPI // Por: Khan

---

## 🚀 Funcionalidades

Busca Instantânea:** Autocomplete para nomes de Pokémon à medida que o usuário digita.
Detalhes do Pokémon:** Exibe o número, tipos e a imagem do Pokémon selecionado.
Proteção de Requisições:** Limite de 5 requisições a cada 10 minutos por IP para evitar sobrecarga.
Feedback ao Usuário:** Mensagem amigável é exibida no frontend quando o limite de requisições é atingido.
Segurança:** Implementação de `Helmet` e uma Política de Conteúdo Segura (CSP) para maior proteção.
Design Responsivo:** Frontend estilizado com Tailwind CSS, adaptável a diferentes tamanhos de tela.

---

## 🛠️ Tecnologias Utilizadas

Backend:** Node.js + Express
Requisições HTTP:** Axios
Limite de Requisições:** `express-rate-limit`
Segurança HTTP:** `Helmet`
Frontend:** Tailwind CSS

---

## ⚙️ Como Usar

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a aplicação:**
    ```bash
    npm start
    ```

4.  **Acesse no seu navegador:**
    [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura de Arquivos

* `./views/index.html`: Página principal que contém a interface de busca.
* `./public/script.js`: Código JavaScript do frontend para a lógica de autocomplete e exibição dos detalhes.
* `server.js` (ou `app.js`): Servidor backend Express que gerencia as rotas `/search` e `/pokemon/:name`.

---

## ⚠️ Limite de Requisições

Para prevenir abusos e sobrecarga da API, o servidor implementa um limite de **50 requisições**. Se este limite for ultrapassado, o frontend exibirá a seguinte mensagem ao usuário:

> Muitas requisições. Tente novamente mais tarde.

---

## 🔒 Segurança

Helmet com CSP:** Configurado para permitir apenas as fontes e conexões estritamente necessárias para o funcionamento da aplicação.
Referrer Policy:** Definida como `no-referrer` para não enviar informações de referência.
Limite de Dados:** Limitação no tamanho das requisições JSON e do corpo da URL.

---

## 🎨 Personalização

* **Ajustar Limite de Requisições:** Você pode modificar o limite no backend, alterando as configurações do middleware `express-rate-limit`.
* **Alterar Estilos:** A aparência pode ser customizada diretamente no arquivo HTML, utilizando as classes do Tailwind CSS.
