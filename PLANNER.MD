# SextoAndar — Planejamento

Projeto fullstack de escopo controlado com processo profissional completo: TDD, Git flow
com PRs, CI/CD, Docker e documentação. Objetivo: praticar todas as camadas exigidas em
uma vaga fullstack web.

Domínio: plataforma de aluguel de imóveis, recortada para um MVP viável.

---

## 1. Visão

Anunciantes cadastram imóveis para aluguel. Buscadores procuram com filtros, favoritam
e agendam visitas. O anunciante confirma ou recusa as visitas recebidas.

**MVP (V1) — nada além disso:**

1. Cadastro de usuário
2. Login (JWT)
3. CRUD de imóveis (com regra de dono)
4. Busca de imóveis com filtros, paginação e ordenação
5. Favoritos
6. Agendamento de visitas (criar, confirmar, recusar, cancelar)
7. Frontend React consumindo a API

**Explicitamente fora do V1** (vira issue com label `v2`):

- Upload de fotos (storage, resize, validação de arquivo) — no V1 o imóvel tem apenas
  um campo opcional `photoUrls` de texto
- Mapa e geolocalização
- Chat entre usuários
- Avaliações e notas
- Contrato e pagamento
- Recuperação de senha / e-mail de confirmação
- Painel de admin

---

## 2. Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React + Vite + TypeScript |
| Estilo | Tailwind CSS |
| Roteamento | React Router |
| Testes (front) | Vitest + Testing Library |
| HTTP client | Axios |
| Backend | NestJS + TypeScript (strict) |
| ORM | Prisma |
| Banco | PostgreSQL (Docker) |
| Testes (back) | Jest + Supertest |
| Validação | class-validator + class-transformer |
| Docs da API | @nestjs/swagger |
| Containers | Docker + Docker Compose |
| CI | GitHub Actions |
| Deploy | Railway ou Render |

---

## 3. Papéis

Um usuário pode atuar como:

- **ANNOUNCER** — cadastra e gerencia imóveis, confirma/recusa visitas recebidas
- **SEEKER** — busca, favorita, agenda e cancela visitas

Um mesmo usuário pode acumular os dois papéis. Isso obriga autorização real: além de
"está autenticado?", checar "este recurso é seu?" e "seu papel permite esta ação?".

---

## 4. Modelo de domínio

| Entidade | Campos | Relacionamento |
|---|---|---|
| **User** | id, name, email, passwordHash, roles (ANNOUNCER \| SEEKER) | tem muitos Property, Visit e Favorite |
| **Property** | id, title, description, type (APARTMENT, HOUSE, STUDIO), street, city, state, zipCode, bedrooms, bathrooms, areaM2, rentPrice, condoFee, iptu, status (AVAILABLE, RENTED, PAUSED), photoUrls (opcional) | pertence a um User (owner) |
| **Visit** | id, scheduledAt, durationMin, status (PENDING, CONFIRMED, CANCELLED, REJECTED, DONE) | pertence a um Property e a um User (seeker) |
| **Favorite** | id, createdAt | pertence a um Property e a um User (seeker); par único |

**Campo derivado:** `totalCost` = rentPrice + condoFee + iptu. Calculado no service,
retornado pela API, **nunca salvo no banco**.

---

## 5. Regras de negócio (casos de teste do TDD)

**Imóveis**
1. Apenas o dono pode editar, pausar ou remover o próprio imóvel
2. Imóvel com status RENTED ou PAUSED não aparece na busca pública
3. Preço, área, quartos e banheiros devem ser maiores que zero
4. Custo total (aluguel + condomínio + IPTU) é calculado e retornado; nunca persistido

**Busca**
5. Busca pública retorna apenas imóveis AVAILABLE
6. Filtros combináveis: cidade, tipo, preço min/max, quartos mínimos
7. Resultado sempre paginado (limite máximo por página) e ordenável (preço, data)

**Favoritos**
8. Um usuário não pode favoritar o mesmo imóvel duas vezes
9. Usuário só enxerga e remove os próprios favoritos

**Visitas**
10. Imóvel RENTED ou PAUSED não aceita agendamento
11. Visita não pode colidir com outra visita CONFIRMED no mesmo imóvel (sobreposição de
    intervalo de tempo)
12. Agendamento exige antecedência mínima de 24h
13. Agendamento só dentro da janela permitida (08:00–20:00)
14. Um seeker não pode ter duas visitas no mesmo horário, mesmo em imóveis diferentes
15. Dono não pode agendar visita no próprio imóvel
16. Apenas o dono do imóvel confirma ou recusa uma visita
17. Apenas o seeker cancela a própria visita, e só até 12h antes do horário marcado

---

## 6. Contrato da API

**Auth**

| Método | Rota | Descrição |
|---|---|---|
| POST | /auth/register | Cadastro |
| POST | /auth/login | Retorna JWT |
| GET | /auth/me | Dados do usuário logado |

**Imóveis**

| Método | Rota | Descrição |
|---|---|---|
| POST | /properties | Cria imóvel (autenticado) |
| GET | /properties?city=&type=&minPrice=&maxPrice=&bedrooms=&sort=&page=&limit= | Busca pública (só AVAILABLE) |
| GET | /properties/:id | Detalhe público |
| GET | /properties/mine | Imóveis do usuário logado (todos os status) |
| PATCH | /properties/:id | Edita (só dono) |
| PATCH | /properties/:id/status | Muda status (só dono) |
| DELETE | /properties/:id | Remove (só dono) |

**Favoritos**

| Método | Rota | Descrição |
|---|---|---|
| POST | /favorites | Favorita um imóvel |
| GET | /favorites | Lista favoritos do usuário |
| DELETE | /favorites/:propertyId | Desfavorita |

**Visitas**

| Método | Rota | Descrição |
|---|---|---|
| POST | /visits | Agenda visita (seeker) |
| GET | /visits/mine | Visitas que o usuário agendou |
| GET | /visits/received | Visitas nos imóveis do usuário (anunciante) |
| PATCH | /visits/:id/confirm | Confirma (só dono do imóvel) |
| PATCH | /visits/:id/reject | Recusa (só dono do imóvel) |
| PATCH | /visits/:id/cancel | Cancela (só o seeker) |

**Códigos:** 201 criação, 400 validação, 401 sem token, 403 sem permissão sobre o
recurso, 404 não encontrado, 409 conflito (horário ocupado, favorito duplicado).

---

## 7. Arquitetura de frontend

**Convenção de pastas:**
- `src/pages/<nome>/index.tsx` — uma pasta por página
- `src/components/<nome>/index.tsx` — um componente reutilizável por pasta
- Nome de pasta em camelCase quando composto (ex: `floatingForm`), componente
  exportado em PascalCase (ex: `FloatingForm`)

**Páginas necessárias pro V1:**

| Página | Rota | Consome |
|---|---|---|
| Home | `/` | — |
| Resultados de busca | `/search` | `GET /properties` |
| Detalhe do imóvel | `/properties/:id` | `GET /properties/:id` |
| Login | `/login` | `POST /auth/login` |
| Cadastro | `/register` | `POST /auth/register` |
| Meus imóveis | `/properties/mine` | `GET /properties/mine` |
| Criar/editar imóvel | `/properties/new`, `/properties/:id/edit` | `POST/PATCH /properties` |
| Favoritos | `/favorites` | `GET /favorites` |
| Minhas visitas | `/visits/mine` | `GET /visits/mine` |
| Visitas recebidas | `/visits/received` | `GET /visits/received` |

**Estratégia de dado enquanto o backend não existe:** construir as páginas contra um
mock que espelha o contrato da seção 6 (ex.: Mock Service Worker, ou um módulo
`src/api/mock/` com os mesmos formatos de request/response), pra quando o backend
entrar em cena, só trocar a implementação do client HTTP, sem mexer em componente
nenhum.

---

## 8. Roadmap (cada linha = issue + branch + PR)

| # | Issue | Branch | Pratica |
|---|---|---|---|
| 0 | Setup: Vite + React + TS + Router + Tailwind + Vitest | chore/project-setup | scaffold |
| 1 | Fluxo de Git/GitHub: branch protection, templates, CI de lint+test do front | chore/github-workflow | Git flow, CI |
| 2 | Home: Header, Banner, FloatingForm (busca) | feat/home-page | componentização |
| 3 | Página de resultados de busca (com mock de dados) | feat/search-results-page | listagem, mock de API |
| 4 | Página de detalhe do imóvel (mock) | feat/property-detail-page | roteamento dinâmico |
| 5 | Login e cadastro (UI) | feat/auth-pages | formulários, validação |
| 6 | CRUD de imóveis (UI: listar meus, criar, editar) | feat/property-crud-pages | formulários complexos |
| 7 | Favoritos (UI) | feat/favorites-page | estado global/local |
| 8 | Visitas: agendar e gerenciar (UI) | feat/visits-pages | estado, formulários |
| 9 | Setup backend: Nest + Docker Compose + Prisma + CI verde | chore/backend-setup | Docker, Nest, Prisma |
| 10 | Backend: auth (JWT) real, ligar no front | feat/auth-api | bcrypt, JWT, guards |
| 11 | Backend: CRUD de imóveis + regra de dono, ligar no front | feat/properties-crud-api | TDD, autorização |
| 12 | Backend: busca com filtros/paginação, ligar no front | feat/properties-search-api | TDD, queries |
| 13 | Backend: favoritos, ligar no front | feat/favorites-api | TDD, constraint única |
| 14 | Backend: visitas (agendar/gerenciar), ligar no front | feat/visits-api | TDD, máquina de estados |
| 15 | Swagger + README + ADRs | docs/api-documentation | Documentação |
| 16 | Testes e2e | test/e2e-coverage | Supertest |
| 17 | Deploy | chore/deploy | CD |

---

## 9. Fluxo de trabalho por feature

1. Abrir issue com descrição e critérios de aceite
2. Criar branch a partir da main (`feat/`, `fix/`, `chore/`, `test/`, `docs/`)
3. Escrever o teste da regra de negócio (falha)
4. Implementar até passar
5. Refatorar
6. Abrir PR linkando a issue (`Closes #N`), descrever o que mudou
7. CI verde, revisar o próprio diff, **squash and merge**

Commits seguem Conventional Commits: `feat:`, `fix:`, `chore:`, `test:`, `docs:`,
`refactor:`.

---

## 10. Definição de pronto (por feature)

- [ ] Testes das regras de negócio passando
- [ ] Lint sem erros
- [ ] CI verde no PR
- [ ] PR revisado (self-review no diff) e linkado à issue
- [ ] Swagger atualizado (quando houver rota nova)