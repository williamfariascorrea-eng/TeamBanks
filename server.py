import http.server
import socketserver
import os

# O Render define automaticamente a variável de ambiente PORT
PORT = int(os.environ.get("PORT", 3000))
HANDLER = http.server.SimpleHTTPRequestHandler

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("0.0.0.0", PORT), HANDLER) as httpd:
    print(f"Servidor rodando na porta {PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado pelo usuário.")