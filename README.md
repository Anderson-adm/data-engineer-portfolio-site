# Data Portfolio

Portfólio estático de Engenharia de Dados em Astro, TypeScript e CSS. Home, três estudos de caso e página 404. Sem React, backend, serviços cloud, rastreadores ou fontes externas em tempo de execução.

## Executar

Use Node **24 LTS** (ou uma versão suportada pelo Astro, a partir de 22.23.4) e npm.

No WSL, use Node e npm instalados dentro da distribuição Linux. O npm do Windows encontrado no PATH deste ambiente não iniciou; a validação usou o Node 24.21.0 disponível no VS Code e uma cópia temporária do npm 12.2.1.

```sh
npm ci
npm run dev
```

Abra `http://localhost:4321`. Para revisar o resultado de produção:

```sh
npm run build
npm run preview
```

## Conteúdo editável

- `src/data/profile.ts`: nome, GitHub, LinkedIn, email, URL pública, currículo e SEO. Campos vazios não geram links. As URLs externas precisam usar HTTPS. O currículo só aparece se o PDF local existir em `public/`.
- `src/data/projects.ts`: conteúdo, tecnologias **previstas**, estado e links opcionais dos cases. Atualize o texto quando houver implementação e evidências reais; o estado não confirma automaticamente o uso de uma tecnologia.
- `src/data/technologies.ts`: catálogo e grupos editáveis (Linguagens, Tools, Databases e Cloud). A faixa apresenta o ecossistema solicitado, sem atribuir níveis ou histórico de experiência profissional. SVGs locais e créditos em `public/icons/`.
- `src/pages/index.astro`: competências, princípios e resumo profissional, baseados no briefing.
- `src/styles/global.css`: cores, tipografia, componentes e breakpoints.
- `src/components/SignalArt.astro`: grafismos vetoriais decorativos. Não são diagramas de arquitetura.
- `src/assets/data-workspace.png`: ilustração gerada para o hero; cena ilustrativa, sem retrato pessoal. Astro gera versões WebP responsivas no build.

Nome, perfis, email, currículo e URLs dos repositórios não foram informados e permanecem vazios. Não foram inventados empresas, cargos anteriores, métricas ou certificações. O primeiro projeto é uma reconstrução em desenvolvimento; os demais estão planejados.

## Verificar

```sh
npm run build          # Inclui validação TypeScript/Astro
npm run test:links     # Páginas, âncoras, CSS, fontes e assets do build
npx playwright install chromium
npm test              # Navegador real + axe + screenshots
```

Os testes cobrem as quatro páginas principais em 320, 390, 768 e 1440 px; overflow, WCAG A/AA automatizada (incluindo contraste), imagens, assets, metadados, navegação por teclado, foco, âncoras, estados, movimento reduzido e retorno dos cases. Também verificam os três cards completos sem rolagem em 1366 × 768 e 1440 × 900. Screenshots são gravadas em `artifacts/screenshots/`. Uma auditoria automatizada não substitui avaliação com tecnologias assistivas.

Em Linux sem bibliotecas do navegador, `npx playwright install --with-deps chromium` instala também as dependências do sistema e pode exigir privilégios administrativos. Nesta sessão as bibliotecas foram apenas extraídas em `/tmp`, sem alterar o sistema.

Também valide o caminho de um repositório:

```sh
BASE_PATH=/data-engineer-portfolio-site/ SITE_URL=https://seu-usuario.github.io npm run build
BASE_PATH=/data-engineer-portfolio-site/ npm run test:links
BASE_PATH=/data-engineer-portfolio-site/ npm test
```

O domínio acima é apenas uma instrução de configuração; não é publicado no conteúdo padrão. Canonical e URLs absolutas de Open Graph são gerados somente quando há `SITE_URL` ou `profile.publicUrl`. Para domínio próprio ou repositório `usuario.github.io`, use `BASE_PATH=/`. O SVG social é uma referência vetorial editável; para compatibilidade ampla de previews sociais, substitua por PNG e ajuste `Layout.astro`.

## Publicar no GitHub Pages

Nada foi enviado ou publicado. Este workspace não disponibilizou metadados Git utilizáveis para confirmar proprietário, remoto ou branch.

1. Preencha os dados profissionais reais em `profile.ts`, revise os cases e confirme o repositório de destino e o nome da branch principal (os workflows usam `main`).
2. Após autorizar e realizar o push, configure **Settings → Pages → Source: GitHub Actions**.
3. Em **Settings → Secrets and variables → Actions → Variables**, configure `SITE_URL` com o domínio HTTPS real, `BASE_PATH` com `/nome-do-repositorio/` (ou `/` para domínio próprio) e `PAGES_ENABLED` com `true`.
4. Execute manualmente **Publish to GitHub Pages (manual)**, marcando `confirm_publish`. Configure revisores no environment `github-pages` se desejar aprovação adicional.

O workflow de verificação não publica. A publicação exige execução manual e configuração explícita. Permissões de escrita em Pages e OIDC ficam restritas ao job de deploy; o build apenas lê o repositório. Não são necessárias credenciais AWS.

## Decisões de interface

Home compacta, fundo azul escuro e acento lavanda. Hero com resumo breve e ilustração de um ambiente de trabalho com dados; vinte ícones coloridos em tiles claros, cada um com nome embaixo, agrupados por tema e separados por linhas discretas. Três cards de igual tamanho exibem resumos curtos e o estado real dos projetos. A composição foi desenhada para mostrar os três cards na primeira tela do desktop. Sobre, abordagem e contato são blocos curtos; detalhes ficam nos estudos de caso. Manrope e IBM Plex Mono são servidas localmente. Foco visível, skip link e movimento reduzido preservados. Nenhum botão aponta para um destino fictício.

## Referências técnicas consultadas

- [Instalação e requisitos do Astro](https://docs.astro.build/en/install-and-setup/)
- [Validação de TypeScript](https://docs.astro.build/en/guides/typescript/)
- [CLI do Astro: preview e processos em segundo plano](https://docs.astro.build/en/reference/cli-reference/)
- [Astro no GitHub Pages: site e base](https://docs.astro.build/en/guides/deploy/github/)
- [Imagens responsivas no Astro](https://docs.astro.build/en/guides/images/)
- [setup-node](https://github.com/actions/setup-node), [upload-pages-artifact](https://github.com/actions/upload-pages-artifact) e [deploy-pages](https://github.com/actions/deploy-pages)

Resultados medidos e condições de execução: [relatório de validação](artifacts/validation.md). A revisão da stack passou nos 21 testes, com os três cards ainda na primeira tela. Lighthouse local: Performance 97 no mobile e 100 no desktop; Acessibilidade, Boas práticas e SEO em 100 nos dois perfis. Screenshots e relatórios HTML/JSON estão em `artifacts/`.
