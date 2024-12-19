# Portal UniFi Hotspot

Sistema de gerenciamento de acesso WiFi com autenticação WPA2 Enterprise para redes UniFi.

## 📋 Pré-requisitos

- Ubuntu 24.04 LTS
- Acesso root ou sudo
- Controladora UniFi configurada e acessível
- Mínimo 2GB RAM
- 20GB espaço em disco

## 🚀 Instalação Passo a Passo

1. **Preparação do Servidor**
   ```bash
   # Atualize o sistema
   sudo apt update && sudo apt upgrade -y
   ```

2. **Transferência dos Arquivos**
   ```bash
   # Copie os arquivos para o servidor usando SCP
   scp -r ./* usuario@seu_servidor:/home/usuario/unifi-hotspot/
   
   # OU faça download direto no servidor
   wget https://github.com/seu-usuario/unifi-hotspot/archive/main.zip
   unzip main.zip
   ```

3. **Instalação**
   ```bash
   # Acesse o diretório
   cd /home/usuario/unifi-hotspot
   
   # Torne o script executável
   chmod +x install.sh
   
   # Execute a instalação
   ./install.sh
   ```

4. **Durante a Instalação**
   - O script solicitará as seguintes informações:
     - Senha para o banco de dados PostgreSQL
     - Chave secreta para tokens JWT
     - URL da controladora UniFi (ex: https://192.168.1.1:8443)
     - Usuário e senha da controladora UniFi

## 🔐 Primeiro Acesso

1. Acesse o portal pelo navegador:
   ```
   http://IP_DO_SERVIDOR
   ```

2. Use as credenciais padrão do administrador:
   - Email: admin@exemplo.com
   - Senha: admin123

3. **IMPORTANTE**: Altere a senha no primeiro acesso!

## 🛠️ Manutenção

### Comandos Úteis

```bash
# Ver logs do sistema
sudo docker compose logs

# Ver logs de um serviço específico
sudo docker compose logs frontend
sudo docker compose logs backend
sudo docker compose logs db

# Reiniciar todos os serviços
sudo docker compose restart

# Reiniciar um serviço específico
sudo docker compose restart frontend

# Verificar status dos serviços
sudo docker compose ps
```

### Backup do Banco de Dados

```bash
# Backup manual
sudo docker compose exec db pg_dump -U hotspotuser hotspotdb > backup.sql

# Restaurar backup
sudo docker compose exec -T db psql -U hotspotuser hotspotdb < backup.sql
```

## 🔧 Solução de Problemas

### Docker não instala ou não inicia

1. Verifique se o sistema está atualizado:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. Reinstale o Docker:
   ```bash
   sudo apt remove docker docker-engine docker.io containerd runc
   ./install.sh
   ```

3. Verifique o status do Docker:
   ```bash
   sudo systemctl status docker
   ```

### Problemas de Conexão com UniFi Controller

1. Verifique se a URL está correta:
   ```bash
   ping seu-controller.local
   ```

2. Teste a conexão HTTPS:
   ```bash
   curl -k https://seu-controller:8443
   ```

3. Verifique as credenciais no arquivo .env

### Outros Problemas

1. Verifique os logs:
   ```bash
   sudo docker compose logs
   ```

2. Reinicie os serviços:
   ```bash
   sudo docker compose down
   sudo docker compose up -d
   ```

3. Verifique o espaço em disco:
   ```bash
   df -h
   ```

## 📞 Suporte

- Abra uma issue no GitHub
- Email: suporte@exemplo.com
- Documentação completa: https://docs.exemplo.com