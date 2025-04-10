<h1 align="center">Pokédex - Desafio Estágio Frontend | Mainô</h1>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/gpimenta07/poke-maino?style=flat-square" />
  <img src="https://img.shields.io/github/last-commit/gpimenta07/poke-maino?style=flat-square" />
  <img src="https://img.shields.io/badge/vue.js-3.x-brightgreen?style=flat-square&logo=vue.js" />
  <img src="https://img.shields.io/badge/deploy-vercel-blueviolet?style=flat-square&logo=vercel" />
</p>

---

## 🧾 Sobre o Projeto

Olá! 👋 Sou **Gabriel Pimenta** e este é o projeto desenvolvido para o desafio técnico do processo seletivo de **Estágio em Desenvolvimento Frontend** da [Mainô](https://maino.com.br).

O desafio consistiu em desenvolver uma aplicação web que funcionasse como uma **Pokédex**, utilizando **Vue.js** e dados da **PokéAPI**.

---

## 🚀 Deploy

A aplicação está publicada e disponível para testes:

🔗 [Clique aqui para acessar a Pokédex](https://pokedex-dusky-eight-64.vercel.app)

---

## 📁 Repositório

Todo o código-fonte está disponível no GitHub:

📂 [https://github.com/gpimenta07/poke-maino](https://github.com/gpimenta07/poke-maino)

---

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3**
- **Vue Router**
- **Axios**
- **Tailwind CSS** (estilização e responsividade)
- **Vue I18n** (internacionalização)
- **Vitest** (testes unitários)
- **PokéAPI** (dados dos Pokémon)
- **Vercel** (deploy)

---

## 📋 Funcionalidades Implementadas

### ✅ Funcionalidades obrigatórias

- Listagem dos Pokémon com **scroll infinito**
- Filtros por **nome**, **ID**, **tipo** e **espécie**
- Página de detalhes com:
  - Todos os **sprites**
  - Lista de **movimentos de ataque**
  - **Evoluções** (quando aplicável)
  - Jogos em que aparece (`game_indices`)

### 🌟 Funcionalidades diferenciais

- ✅ **Testes automatizados** com Vitest
- ✅ **Internacionalização** com suporte a **🇧🇷 PT-BR**, **🇺🇸 EN** e **🇪🇸 ES**
- ✅ Layout totalmente **responsivo** (mobile/desktop)

### 🧠 Considerações Técnicas
Durante o desenvolvimento, considerei a implementação de um gerenciador de estado global como Pinia (ou Vuex). No entanto, devido à escala do projeto e à forma como os dados foram estruturados e reutilizados, optei por um gerenciamento de estado local e componentizado, mantendo a aplicação simples, eficiente e de fácil manutenção.

Essa decisão foi tomada com base em boas práticas de engenharia de software, priorizando clareza e organização do código, sem adicionar complexidade desnecessária ao projeto.


---

## 🔧 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/gpimenta07/poke-maino.git

# Acesse a pasta
cd poke-maino

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Acesse em http://localhost:5173
