# Deploy no HostGator

Este projeto ja esta pronto para hospedagem estatica em Apache/cPanel. O fluxo abaixo evita subir arquivos desnecessarios e reduz erros comuns.

## O que subir

Suba somente estes itens para `public_html/`:

- `index.html`
- `style.css`
- `script.js`
- `.htaccess`
- `media/`

Nao suba:

- `.git/`
- `node_modules/`
- `.venv/`
- `Fotos/`
- `server.py`
- `package.json`
- `package-lock.json`
- `README.md`
- `HOSTGATOR-DEPLOY.md`

## Passo a passo no HostGator

1. Entre no cPanel.
2. Abra `File Manager`.
3. Entre em `public_html`.
4. Remova arquivos antigos do site, se houver.
5. Envie apenas os arquivos e pastas listados em "O que subir".
6. Confirme que o dominio aponta para essa hospedagem.
7. Confirme que o SSL gratuito esteja ativo.
8. Acesse `https://seu-dominio` e valide carregamento, videos e imagens.

## Ajustes de seguranca recomendados no painel

Ative estes recursos no HostGator:

- SSL gratuito.
- Hotlink Protection para imagens e videos.
- IP Blocker para IPs maliciosos recorrentes.
- Cloudflare/CDN quando disponivel no plano.
- Backup antes de cada publicacao.

## Limites reais

Algumas protecoes nao podem ser garantidas apenas dentro do codigo deste projeto:

- Ninguem copiar o site: impossivel garantir. Todo conteudo entregue ao navegador pode ser copiado por quem tiver conhecimento tecnico.
- Bloquear todo DDoS: impossivel garantir no codigo da landing page. Isso depende da infraestrutura da hospedagem, CDN/WAF e mitigacao de rede.
- Impedir qualquer ataque: impossivel. O objetivo correto e reduzir superficie de ataque e melhorar resposta e recuperacao.

## O que ja foi preparado no projeto

- `.htaccess` com redirecionamento HTTPS, bloqueio de listagem de diretorios e arquivos sensiveis.
- Headers de seguranca mais fortes.
- Politica CSP compativel com os CDNs usados hoje.
- Compressao e cache para assets.
- Links externos com `rel="noopener noreferrer"`.

## Validacao rapida depois do upload

1. Abra a pagina inicial em `https://seu-dominio`.
2. Confirme que nao existe erro 403/500.
3. Teste os dois videos.
4. Role a pagina e confirme que o video volta para a capa ao sair da tela.
5. Teste o carrossel de resultados.
6. Clique nos links do WhatsApp e Instagram.
