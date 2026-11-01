# Portfólio — Anderson Nascimento

Site estático (HTML + CSS, sem build e sem JavaScript) publicado no GitHub Pages.

**URL pública:** https://anderson-adm.github.io/data-engineer-portfolio-site/

## Estrutura

```
index.html                  página principal (hero, stack, projetos, sobre)
cases/risk-liquidity.html   case 01, com o diagrama de arquitetura em HTML/CSS
assets/                     foto, ícones, logos AWS, currículo (PDF) e og-image.png
robots.txt, sitemap.xml     indexação
.nojekyll                   publica os arquivos como estão
.github/workflows/deploy.yml  deploy automático
```

## Rodar localmente

Na raiz do repositório:

```bash
python3 -m http.server 8000
# abra http://localhost:8000/
```

(ou `npx serve .`, ou a extensão Live Server do VS Code). Todos os links são relativos,
então o site funciona igual na raiz local e na subpasta do GitHub Pages.

## Deploy

Todo push na `main` dispara o workflow **Deploy no GitHub Pages**
(`.github/workflows/deploy.yml`), que copia os arquivos do site para `_site/` e publica com
`actions/upload-pages-artifact` + `actions/deploy-pages`. Também dá para rodar manualmente em
**Actions → Deploy no GitHub Pages → Run workflow**.

Configuração única no GitHub: **Settings → Pages → Source: GitHub Actions**.

## Onde editar cada conteúdo

| Conteúdo | Onde |
|---|---|
| Nome, título do hero, subtítulo, contatos | `index.html`, seção `id="topo"` |
| Stack (ícones e grupos) | `index.html`, bloco "Stack" dentro de `id="topo"`; os ícones vêm de `assets/stack-sprite.png` (classes `.ic-*` no `<style>`) |
| Cards de projetos | `index.html`, seção `id="projetos"` (um `<article class="pcard">` por projeto) |
| Sobre, experiência e formação | `index.html`, seção `id="sobre"` |
| Case 01 (texto e diagrama) | `cases/risk-liquidity.html` |
| Cores e tema | variáveis `.theme-dark` no `<style>` de cada página (destaque: `--accent: #BFA5FF`) |
| Foto, currículo, prévia de link | `assets/foto-anderson.jpg`, `assets/curriculo-anderson-nascimento.pdf`, `assets/og-image.png` |
| Título/descrição de compartilhamento | tags `og:*` no `<head>` de `index.html` |
| Novas páginas | adicionar também em `sitemap.xml` |

## Pendências

- **Links "Código"**: o card 01 e o case 01 apontam para
  https://github.com/Anderson-adm/enterprise-risk-liquidity. Cards 02 e 03 ainda sem repositório.
- **Cards 02 e 03** (Financial Data Lake, Event-Driven Integration): exibem o selo
  "Em desenvolvimento" no lugar do resultado. Voltar o box "RESULTADO" quando houver números reais.
- **Cases 02 e 03**: páginas ainda não existem. Ao criar, reativar "Conhecer o case ↗" nos cards e o
  bloco "Próximo case" no rodapé do case 01.
- **Tema claro**: as variáveis `.theme-light` existem, mas não há seletor de tema.
- **CLS no desktop (Lighthouse 0,149)**: a troca da fonte Geist ao carregar desloca levemente a
  seção de projetos.
