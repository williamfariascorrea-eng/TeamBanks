import http.server
import os
import socketserver

# Servidor local simples para visualizar o site sem Browser Sync.
PORT = int(os.environ.get("PORT", 3000))
HANDLER = http.server.SimpleHTTPRequestHandler

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("0.0.0.0", PORT), HANDLER) as httpd:
    print(f"Servidor rodando na porta {PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado pelo usuario.")
