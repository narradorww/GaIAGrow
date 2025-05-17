<p align="center">
  <img src="./src/assets/banner.png" alt="GaIAGrow Banner" width="100%" />
</p>



# GaIAGrow: inteligência artificial para plantar com afeto

## Sobre o projeto

GaIAGrow nasceu das minhas raízes. Literalmente.

Desde pequeno, a horta sempre foi um espaço de conexão. Minha avó materna me levava para a roça da família — um lugar que era mais brincadeira do que obrigação. Era ali que eu descobria o ciclo das plantas, a importância do solo e o prazer de colher o que se planta.

Com o tempo, esse hobby virou missão. Participei de iniciativas como o *Comida da Gente*, a *Rede Ecológica do Rio de Janeiro* e grupos de CSA (Comunidades que Sustentam a Agricultura). Estudei agricultura sintrópica com base nas ideias de Ernst Götsch e, entre os amigos, ganhei o apelido de “dedo verde”.

Mas nem sempre consigo atender a todos que me pedem ajuda para montar uma horta. Por isso, decidi criar o **GaIAGrow** — um app que compartilha meu conhecimento e usa inteligência artificial para auxiliar qualquer pessoa a planejar sua horta: seja em casa, numa escola, ou em canteiros profissionais.

Este projeto é meu jeito de devolver à terra e às pessoas o que a natureza e minha avó me ensinaram.

---

## Funcionalidades principais

* **Criação de canteiros inteligentes** com grid de células ajustável
* **Catálogo de plantas** com informações de estrato, época de plantio, espaçamento e companheiras
* **Filtro por estação do ano e estrato da planta**
* **Interface educativa**, perfeita para hortas escolares e urbanas
* **Integração com Google Gemini** para perguntas e recomendações personalizadas de cultivo
* **Theming sazonal automático**: cores do app mudam conforme a estação do usuário

---

## Como rodar o projeto localmente

> Requisitos:
>
> * Node.js 18+
> * Yarn
> * Expo CLI

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/gaiagrow.git
cd gaiagrow
```

2. Instale as dependências:

```bash
yarn
```

3. Inicie o app:

```bash
yarn start
```

4. No app, vá até a **Home** e insira sua chave da API do Google Gemini (Gemini API Key) para habilitar a IA.

---

## Como obter sua chave do Google Gemini

1. Acesse: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Gere uma chave gratuita.
3. Cole no campo da Home do app.
4. Pronto! Agora é só conversar com a IA e planejar sua horta!

---

## Tecnologias e ferramentas de desenvolvimento

* **TypeScript Integration**: Provides static typing to enhance code quality and maintainability.
* **ESLint Configuration**: Enforces consistent code style and identifies potential issues.
* **Prettier Setup**: Automatically formats code to maintain a uniform style.
* **Jest Testing Framework**: Facilitates unit testing to ensure code reliability.
* **Husky Git Hooks**: Implements pre-commit hooks to run linting and formatting checks before code is committed.

### Workflow de Desenvolvimento

```bash
# Instalar dependências do projeto
$ yarn

# Rodar o app no modo de desenvolvimento com Expo
$ yarn start

# Rodar os testes com Jest
$ yarn test

# Rodar lint
$ yarn lint

# Corrigir lint automaticamente
$ yarn lint:fix

# Gerar changelog e nova versão com standard-version
$ yarn release
```

---

## Sobre a arquitetura

* **Stack principal**: React Native (Expo), TypeScript
* **Theming & contexto**: styled-components + Context API
* **IA**: Integração direta com Google Gemini via prompt dinâmico
* **Design inspirado em agricultura sintrópica**: respeita estratos, ciclos e biodiversidade

---

## Licença e agradecimentos

Este projeto é um experimento prototípico com fins educativos e pessoais, construído durante a **Imersão IA Alura + Google**.

Obrigado à minha família por plantar as primeiras sementes,
à comunidade de agricultura ecológica por nutrir esse solo,
e à tecnologia por nos ajudar a cultivar com mais consciência.

---

## Badges e status do projeto

![Expo](https://img.shields.io/badge/Expo-48%2B-blue)
![React Native](https://img.shields.io/badge/React_Native-0.76%2B-61dafb?logo=react\&logoColor=white)
![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-ff69b4)
![Lint](https://img.shields.io/badge/Lint-ESLint-yellow)
![Tests](https://img.shields.io/badge/Tests-Jest-red)
![Husky](https://img.shields.io/badge/Git%20Hooks-Husky-green)
