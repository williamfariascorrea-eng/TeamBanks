# TeamBanks

Landing page estatica da consultoria TeamBanks.

## Stack

- HTML
- CSS
- JavaScript
- Tailwind CSS via CDN
- AOS
- Font Awesome

## Estrutura

- `index.html`: pagina principal
- `style.css`: estilos complementares
- `script.js`: interacoes da pagina
- `media/`: imagens e videos publicados
- `.htaccess`: regras Apache/cPanel para seguranca e cache
- `HOSTGATOR-DEPLOY.md`: guia de deploy no HostGator
- `scripts/build-hostgator-package.ps1`: gera `_hostgator_upload/` com apenas os arquivos publicaveis
- `server.py`: servidor local simples para visualizacao

## Rodar localmente

Opcao 1:

```powershell
npm install
npm start
```

Opcao 2:

```powershell
python -m http.server 3000
```

Depois abra `http://localhost:3000`.

## Deploy no Render

O projeto tambem pode ser publicado como site estatico:

1. Conecte o repositorio no Render.
2. Deixe `Build Command` em branco.
3. Use `.` como `Publish Directory`.

## Deploy no HostGator

Consulte `HOSTGATOR-DEPLOY.md`.

Para gerar uma pasta pronta para upload:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-hostgator-package.ps1
```

Isso gera `_hostgator_upload/` com:

- `index.html`
- `style.css`
- `script.js`
- `.htaccess`
- `media/`
