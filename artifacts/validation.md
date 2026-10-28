# Validação — stack por grupos

Atualização de 24 de outubro de 2026. A capa, suas dimensões e o conteúdo dos projetos foram preservados. A faixa agora apresenta 20 tecnologias em Linguagens, Tools, Databases e Cloud, com divisórias discretas. CI/CD usa o símbolo do GitHub Actions.

## Resultados desta revisão

| Verificação | Resultado |
| --- | --- |
| `npm run build` | 17 arquivos verificados; zero erros, avisos ou hints; 5 páginas estáticas |
| `npm run test:links` | 133 referências internas e assets válidos, incluindo `srcset` |
| `npm test` | **21/21 passaram** em `/`, rodada de 34,6 s |
| Primeira tela | Três cards completos em 1366 × 768 e 1440 × 900 |
| Capa em 1366 × 768 | Altura preservada: **284 px** |
| Faixa de tecnologias no desktop | **108,8 px**, praticamente a mesma altura da faixa anterior |
| Limite inferior dos cards no desktop | Aproximadamente **741 px**, dentro da janela de 768 px |
| Responsividade | Sem overflow em 320, 390, 768 e 1440 px |
| Acessibilidade | Nenhuma violação WCAG A/AA e 2.1 AA detectada pelo axe nas quatro páginas e quatro larguras |
| Imagens e navegação | Ícones, imagens, teclado, foco, âncoras, retorno dos cases e página 404 verificados |

Em telas menores os grupos se organizam em duas colunas, com quebra dos ícones dentro de cada grupo. A capa não foi editada. O catálogo e a associação aos grupos ficam em `src/data/technologies.ts`; os grupos descrevem o ecossistema solicitado, sem atribuir níveis ou histórico de experiência profissional.

A configuração de subdiretório foi validada na revisão anterior. Nesta alteração os testes de navegador foram executados em `/`; o workflow continua preparado para verificar também o subdiretório do repositório.

## Lighthouse atualizado

Uma execução final por perfil, sem testes de navegador concorrentes, em `http://127.0.0.1:4322/`, com build estático e Lighthouse 13.5.0. Valores locais e simulados, não dados de usuários reais ou do GitHub Pages.

| Categoria / métrica | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | **97** | **100** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |
| FCP | 0.9 s | 0.3 s |
| LCP | 2.6 s | 0.5 s |
| TBT | 0 ms | 0 ms |
| CLS | 0 | 0 |

Mobile: 412 × 823, DPR 1,75, rede simulada a 1.638,4 Kbps e RTT 150 ms, CPU 4×. Desktop: 1350 × 940, DPR 1, rede simulada a 10.240 Kbps e RTT 40 ms, CPU 1×. Chrome for Testing 156.0.8078.4. CLS zero nos dois perfis.

Relatórios: [mobile HTML](lighthouse-mobile.report.html), [mobile JSON](lighthouse-mobile.report.json), [desktop HTML](lighthouse-desktop.report.html), [desktop JSON](lighthouse-desktop.report.json).

## Screenshots

- [Desktop completo com os grupos](screenshots/stack-groups-desktop.png).
- [Primeira tela em 1366 × 768](screenshots/redesign-1366.png).
- [Primeira tela em 1440 × 900](screenshots/home-desktop-top.png).
- [Mobile completo em 390 px](screenshots/stack-groups-mobile.png).
- [Mobile completo em 320 px](screenshots/stack-groups-320.png).
- [Primeira tela mobile](screenshots/home-mobile-top.png).

## Ambiente e limites

Ubuntu 26.04 / WSL2, Node 24.21.0, npm 12.2.1, Astro 7.4.2, Playwright 1.64.1 e axe 4.14.0. Ícones e fontes são locais; os créditos e licenças ficam em `public/icons/`. Não foram adicionadas dependências nem JavaScript de cliente.

Testes de navegador executados em Chromium. Não houve verificação com leitor de tela, Safari, Firefox ou hospedagem pública. Não houve push, deploy ou acesso a recursos AWS. Dados profissionais e configuração de publicação continuam pendentes conforme o README.
