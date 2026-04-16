# TeamBanks

Landing page institucional e comercial da consultoria TeamBanks.

O projeto foi mantido propositalmente simples: uma base estática, rápida de publicar e fácil de editar sem depender de framework pesado. A ideia é permitir ajustes visuais, comerciais e de conteúdo com baixo atrito.

## Objetivo

O site foi estruturado para:

- apresentar a consultoria com posicionamento premium
- destacar o método, a imagem de marca e os diferenciais do serviço
- conduzir o visitante para o WhatsApp com mensagem pronta
- funcionar bem em hospedagem estática

## Stack

- HTML
- CSS
- JavaScript
- Tailwind CSS via CDN
- AOS
- Font Awesome

## Estrutura do projeto

- `index.html`
  Estrutura principal da landing page.

- `style.css`
  Estilos visuais complementares ao Tailwind, incluindo cards, vídeos, banner final e responsividade.

- `script.js`
  Comportamentos da página: menu mobile, FAQ e interações da navegação.

- `media/`
  Arquivos usados no site, como logo, vídeos, foto de perfil e banners.

- `render.yaml`
  Configuração de deploy no Render como site estático.

- `.htaccess`
  Suporte para ambientes Apache/cPanel com redirecionamento HTTPS e headers.

- `server.py`
  Servidor simples para visualização local, quando necessário.

## Rodar localmente

### Opção 1

```powershell
npm install
npm start
```

### Opção 2

```powershell
python -m http.server 3000
```

Depois abra:

```text
http://localhost:3000
```

## Deploy no Render

O projeto já está preparado para `Static Site`.

### Usando Blueprint

1. Envie o repositório para o GitHub.
2. No Render, clique em `New > Blueprint`.
3. Selecione este repositório.
4. O arquivo `render.yaml` será aplicado automaticamente.

### Configuração manual

1. No Render, clique em `New > Static Site`.
2. Conecte o repositório.
3. Deixe `Build Command` em branco.
4. Defina `Publish Directory` como `.`.

## Observações

- Os vídeos locais dependem de `media-src 'self'` na CSP.
- Como o site usa Tailwind via CDN, a política de segurança também precisa permitir `cdn.tailwindcss.com`.
- A pasta `Fotos/` é apenas área de apoio local e não faz parte da estrutura publicada.
- Se a hospedagem for Apache, mantenha o `.htaccess`.

## Manutenção recomendada

- manter mídias novas dentro de `media/`
- revisar o mobile a cada nova seção adicionada
- concentrar ajustes comerciais em `index.html`
- evitar espalhar estilos inline desnecessários
