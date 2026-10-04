# Executar o site localmente

Requisito: Node.js 22 ou superior e acesso à internet para consultar o TSE.

1. Abra um terminal na pasta apura-eleicoes-2026.
2. Execute `npm ci`.
3. Execute `npm run build`.
4. Execute `node scripts/serve.mjs`.
5. Abra http://localhost:8787.

O servidor serve a interface e a API oficial normalizada. Para editar com atualização instantânea, mantenha esse servidor ativo e, em outro terminal, execute `npm run dev`; use a URL exibida pelo Vite. Ao alterar o backend, execute o build e reinicie o servidor.

Este ZIP inclui o código-fonte e uma compilação pronta em dist. Não inclui node_modules, credenciais ou o histórico Git. Os resultados são consultados no TSE, não armazenados como números fixos.

---

# Apura • Eleições 2026

Portal independente em Vue 3 + TypeScript + Vue Router + Tailwind CSS 4. A solicitação foi atualizada para dados oficiais: não há fallback para mocks em produção.

## Desenvolvimento

`npm install` e `npm run build`. O build gera `dist/client` e um Worker ESM em `dist/server/index.js`, com os assets incorporados. O Worker serve o frontend e a API REST normalizada. `npm run dev` inicia o Vite; configure o Worker local na porta 8787 para usar o proxy de desenvolvimento, ou defina `VITE_API_BASE_URL` para sua API (com CORS autorizado).

## Fonte oficial

- Configuração: https://resultados.tse.jus.br/oficial/comum/config/ele-c.json
- Documentação: https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados
- Leiautes: EA11, EA12, EA14/15 e EA20, edição 2026.

Ciclo, identificadores e diretórios são obtidos da configuração oficial. O adaptador seleciona o pleito de 04/10/2026, turno 1, e descobre a eleição pelo cargo. Não troca silenciosamente para outro ano ou simulação. O campo `f` precisa ser `o`; os votos só são exibidos quando `dv` permite divulgação. Os códigos de município são os do TSE, com cinco dígitos, obtidos em EA12, nunca códigos IBGE substituídos.

## API da aplicação (não são endpoints TSE)

- GET /api/elections/2026/president
- GET /api/elections/2026/locations
- GET /api/elections/2026/states
- GET /api/elections/2026/states/PR?office=1
- GET /api/elections/2026/states/PR/cities?office=1
- GET /api/elections/2026/states/PR/cities/maringa?office=1
- GET /api/elections/2026/states/PR/candidates

Cargos: 1 presidente, 3 governador, 5 senador, 6 deputado federal, 7 estadual e 8 distrital. A aplicação não soma votos de senador como comparecimento: cada campo vem diretamente do documento oficial. O status de eleito vem do TSE, nunca da ordenação. Votos válidos computados usam `v.vvc`; nulos totais usam `v.tvn`, incluindo nulos técnicos. Percentuais não são recalculados. Histórico inclui somente snapshots observados na sessão. Ranking municipal é explicitamente derivado e informa cobertura e consultas que falharam.

## Atualizações e resiliência

Polling REST a cada 30 segundos para resultados, mapa e comparação; municípios a cada 60 segundos. O serviço `services/live.ts` também implementa transporte SSE/WebSocket por eventos de invalidação, pronto para receber uma URL do backend. O portal publicado usa polling; não há serviço SSE/WebSocket ativo.

Cache upstream de 20 segundos em memória/CDN e configuração por 1 hora. Última leitura válida é preservada em falha, com sinalização de defasagem. Requisições usam timeout e concorrência limitada. Os horários de apuração/geração são preservados, convertidos do fuso de Brasília, sem usar o horário da consulta como se fosse o horário do resultado.

A busca indexa todas as localidades e candidatos já consultados imediatamente. A opção 'Buscar candidatos em todas as UFs' constrói o índice de candidatos estaduais sob demanda, informando o andamento e a cobertura. O ranking consulta todos os municípios da UF sob demanda com concorrência 3, cancelamento e indicador de cobertura; ele não é anunciado como completo enquanto houver consultas faltantes.

## Arquitetura

`src/components/{election,candidates,location,map,charts,statistics,comparison,cities}`, `src/pages`, `src/composables`, `src/services`, `src/repositories`, `src/types`, `src/utils`, `src/assets`, `server` e `scripts`.

Mapa baseado em geometrias de https://github.com/codeforamerica/click_that_hood/blob/master/public/data/brazil-states.geojson, simplificadas no build inicial. Fotos são as fornecidas pelo TSE, com ícone neutro se indisponíveis. Modos claro/escuro e preferência local. Sem imagens de candidatos fictícios.
