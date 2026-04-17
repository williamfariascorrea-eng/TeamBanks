#!/usr/bin/env python3
import os
import sys
import webbrowser
import subprocess
import time
import platform

def check_node_available():
    """Verifica se o Node.js está instalado"""
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        return result.returncode == 0
    except FileNotFoundError:
        return False

def check_browser_sync_available():
    """Verifica se o Browser-sync está instalado"""
    try:
        result = subprocess.run(['npx', 'browser-sync', '--version'], capture_output=True, text=True)
        return result.returncode == 0
    except FileNotFoundError:
        return False

def run_with_browser_sync():
    """Executa com Browser-sync (melhor opção - recarregamento automático)"""
    print("🚀 Iniciando servidor com Browser-sync...")
    print("📱 Recarregamento automático ativo!")
    try:
        # Executa o script do package.json
        subprocess.run(['npm', 'start'], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao executar Browser-sync: {e}")
        return False
    return True

def run_with_python_server():
    """Executa com servidor Python (simples)"""
    print("🐍 Iniciando servidor Python...")
    print("⚠️  Recarregamento automático desativado")
    try:
        # Executa o servidor Python existente
        subprocess.run([sys.executable, 'server.py'], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao executar servidor Python: {e}")
        return False
    return True

def open_browser(url="http://localhost:3000"):
    """Abre o navegador automaticamente"""
    try:
        print(f"🌐 Abrindo navegador em {url}")
        webbrowser.open(url)
        return True
    except Exception as e:
        print(f"⚠️  Não foi possível abrir navegador automaticamente: {e}")
        print("💡 Abra manualmente: " + url)
        return False

def main():
    print("=" * 50)
    print("🏋️  TEAMBANKS - Servidor Local")
    print("=" * 50)
    
    # Muda para o diretório do script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Verifica qual método usar
    if check_node_available() and check_browser_sync_available():
        print("✅ Node.js e Browser-sync encontrados")
        print("🎮 Usando Browser-sync (melhor experiência)")
        
        # Abre navegador antes de iniciar o servidor
        open_browser()
        
        # Executa servidor
        if not run_with_browser_sync():
            print("❌ Tentando alternativa com servidor Python...")
            run_with_python_server()
    elif check_node_available():
        print("✅ Node.js encontrado, mas Browser-sync não instalado")
        print("📦 Instalando Browser-sync...")
        try:
            subprocess.run(['npm', 'install'], check=True)
            print("✅ Browser-sync instalado com sucesso!")
            
            # Abre navegador antes de iniciar
            open_browser()
            
            # Executa servidor
            if not run_with_browser_sync():
                print("❌ Tentando alternativa com servidor Python...")
                run_with_python_server()
        except subprocess.CalledProcessError as e:
            print(f"❌ Erro ao instalar Browser-sync: {e}")
            print("🐍 Usando servidor Python como alternativa...")
            open_browser()
            run_with_python_server()
    else:
        print("⚠️  Node.js não encontrado")
        print("🐍 Usando servidor Python...")
        open_browser()
        run_with_python_server()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Servidor encerrado!")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        sys.exit(1)