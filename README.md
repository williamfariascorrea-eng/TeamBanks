# TeamBanks - Consultoria Fitness Premium

Este repositorio contem o codigo-fonte da landing page oficial do **TeamBanks**.

## Tecnologias

- HTML5 e CSS3
- Tailwind CSS via CDN
- JavaScript
- AOS
- Font Awesome

## Deploy no Render

O projeto esta configurado para **Render Static Site** com o arquivo [render.yaml](/C:/Users/ubr1/Documents/Banks/render.yaml:1).

### Blueprint

1. Publique este repositorio no GitHub.
2. No Render, clique em **New > Blueprint**.
3. Selecione o repositorio.
4. O Render vai aplicar o `render.yaml` automaticamente.

### Configuracao manual

Se preferir criar manualmente um Static Site no Render:

1. Clique em **New > Static Site**.
2. Conecte o repositorio GitHub.
3. Use `Build Command` vazio.
4. Use `Publish Directory` igual a `.`

## Observacoes

- O deploy na Render nao precisa do `server.py`.
- O `server.py` pode continuar no projeto apenas para uso local.
- **Seguran&ccedil;a (SSL/HTTPS):** O Render configura automaticamente certificados SSL e redireciona todo o tr&aacute;fego HTTP para HTTPS por padr&atilde;o.
