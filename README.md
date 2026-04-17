# 🏋️ TeamBanks - Servidor Local

## 📋 Sobre
Este projeto fornece um servidor local para visualizar o site TeamBanks com as melhores opções de desenvolvimento.

## 🚀 Como Executar

### Opção 1: Execução Rápida (Windows)
```bash
# Simplesmente execute:
start.bat
```

### Opção 2: Execução Manual
```bash
# Com Python (recomendado):
python main.py

# Ou diretamente com o servidor Python:
python server.py

# Ou com Node.js/Browser-sync:
npm start
```

## 🎮 Funcionalidades

### ✅ Browser-sync (Melhor Opção)
- 🔄 Recarregamento automático do navegador
- 📱 Suporte para dispositivos móveis
- 🔧 Hot-reload para HTML, CSS e JS
- 🌐 Abre automaticamente o navegador

### ✅ Servidor Python (Alternativa)
- 🐍 Requer apenas Python
- ⚡ Leve e rápido
- 🔒 Execução local segura

## 📋 Requisitos

### Para Browser-sync (Recomendado):
- Node.js instalado
- npm (vem com Node.js)

### Para Servidor Python (Alternativa):
- Python 3.x instalado
- Módulo embutido http.server

## 🔧 Configuração

### Porta Padrão: 3000
O servidor rodará em: http://localhost:3000

### Alterar Porta
No arquivo `main.py`, altere a linha:
```python
PORT = 3000  # ou outra porta disponível
```

## 🌐 Acesso Após Execução

O servidor irá:
1. 🖥️ Abrir automaticamente o navegador
2. 📱 Mostrar o site TeamBanks
3. 🔄 Recarregar automaticamente (se usar Browser-sync)
4. 🛑 Parar com Ctrl+C

## 🐛 Solução de Problemas

### "Python não encontrado"
- Instale o Python 3.x: https://python.org
- Adicione ao PATH durante a instalação

### "Node.js não encontrado"
- Instale o Node.js: https://nodejs.org
- Ou use apenas o servidor Python

### "Porta 3000 em uso"
- Altere a porta no código
- ou mate o processo na porta: `netstat -ano | findstr :3000`

## 📁 Estrutura de Arquivos
```
Banks/
├── index.html      # Site principal
├── style.css       # Estilos
├── script.js       # JavaScript
├── main.py        # Servidor inteligente
├── start.bat      # Execução Windows
├── server.py      # Servidor Python
├── package.json   # Configuração Node.js
└── README.md      # Este arquivo
```

## 🎯 Dicas
- Use `start.bat` para execução fácil no Windows
- O Browser-sync é a melhor opção para desenvolvimento
- O servidor Python funciona como alternativa rápida
- Altere a porta se necessário no código