# Nosso Guia de Compras - Aplicativo Mobile 📱

## 📥 DOWNLOAD DO APLICATIVO

**Link para download do APK:**
[Clique aqui para baixar a versão mais recente](https://expo.dev/artifacts/eas/4x5S8SCi6AbUZ6PfT7MC1d.apk)


### Como instalar o APK:
1. Toque no link acima em seu dispositivo Android
2. Baixe o arquivo APK
3. Abra o arquivo baixado
4. Se necessário, permita a instalação de fontes desconhecidas nas configurações
5. Siga as instruções na tela para completar a instalação
6. Pronto! O aplicativo estará disponível na sua tela inicial

---

## O que é este aplicativo?

Este é um aplicativo mobile criado em React Native que funciona como um guia de compras local. Ele permite que usuários visualizem informações sobre supermercados, promoções e outros estabelecimentos comerciais em Manaus.

## Como instalar o código-fonte no seu computador 🖥️

### Passo 1: Preparar o ambiente
1. Você precisa ter o **Node.js** instalado (é como se fosse o "motor" que faz o app funcionar)
   - Baixe em: https://nodejs.org/
   - Escolha a versão LTS (mais estável)

2. Instale o **Git** (ferramenta para baixar o código)
   - Baixe em: https://git-scm.com/

### Passo 2: Baixar o código do aplicativo
1. Abra o terminal (ou Prompt de Comando no Windows)
2. Digite os comandos:
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd app-tudonosso
```

### Passo 3: Instalar as dependências
Digite no terminal:
```bash
npm install
```
Este comando instala todas as "peças" necessárias para o app funcionar.

### Passo 4: Executar o aplicativo
Digite no terminal:
```bash
npm start
```

## Como navegar pelo aplicativo 📱

### Tela 1 - Tela Inicial
Esta é a primeira tela que aparece quando você abre o app:
- **Cabeçalho vermelho**: Mostra o nome "NOSSO GUIA DE COMPRAS"
- **Setas de navegação**: 
  - Seta esquerda (←): Volta para tela anterior
  - Seta direita (→): Avança para próxima tela
- **Contador**: Mostra quantos downloads e visualizações o app tem
- **Lista de categorias**: 
  - Supermercados (verde)
  - D+ Lojas (rosa)
  - Utilidade Pública (cinza)
  - Comércio Nosso (branco)

### Tela 2 - Menu de Supermercados
Aparece quando você clica em "SUPERMERCADOS":
- **Ver Anúncios**: Lista dos supermercados disponíveis
- **Anúncios Grátis**: Vídeos e áudios promocionais
- **Quer Anunciar Grátis?**: Para novos anunciantes
- **Prêmios do Sorteio**: Informações sobre sorteios
- **Vagas de Empregos**: Oportunidades de trabalho
- E outras opções...

### Tela 3 - Lista de Supermercados
Mostra todos os supermercados cadastrados:
- **Coluna 1**: Logotipo (por enquanto só texto)
- **Coluna 2**: Nome do supermercado
- **Coluna 3**: Número de unidades (em vermelho)

### Navegação entre telas
- **Clique nos itens**: Cada item clicável leva para uma tela específica
- **Botão Home** (🏠): Sempre volta para a tela inicial
- **Cronômetro**: Mostra há quanto tempo o app está aberto

## Estrutura do projeto 📁

```
app-tudonosso/
├── src/                    # Pasta principal do código
│   ├── components/         # Partes reutilizáveis do app
│   ├── screens/           # Telas do aplicativo
│   ├── context/           # Gerenciamento de dados
│   └── utils/             # Ferramentas auxiliares
├── App.js                 # Arquivo principal
├── package.json           # Lista de dependências
└── assets/               # Imagens e ícones
```

## Principais funcionalidades ⚙️

1. **Navegação intuitiva**: Use as setas ou clique nos botões
2. **Lista de estabelecimentos**: Veja todos os supermercados da cidade
3. **Contador de acessos**: Mostra popularidade do app
4. **Cronômetro**: Tempo de uso da sessão
5. **Design responsivo**: Se adapta a diferentes tamanhos de tela

## Como fazer modificações básicas 🛠️

### Mudar cores
1. Abra o arquivo da tela desejada (ex: `App.js`)
2. Procure por `backgroundColor: '#cor'`
3. Mude o código da cor (exemplos):
   - `#ff0000` = vermelho
   - `#00ff00` = verde
   - `#0000ff` = azul

### Mudar textos
1. Procure pelo texto entre aspas simples ou duplas
2. Substitua pelo novo texto
3. Exemplo: `'SUPERMERCADOS'` → `'MERCADOS'`

### Adicionar novo supermercado
No arquivo `VerAnunciosScreen.js`:
```javascript
{ id: 16, name: 'NOVO MERCADO', units: 5, logo: 'LOGOTIPO' },
```

## Como gerar uma nova versão do APK

Se você fez alterações no código e deseja criar uma nova versão do aplicativo:

1. Certifique-se de ter o EAS CLI instalado:
   ```bash
   npm install -g eas-cli
   ```

2. Faça login na sua conta Expo:
   ```bash
   eas login
   ```

3. Execute o comando para gerar o APK:
   ```bash
   eas build -p android --profile preview
   ```

4. Ao terminar, você receberá um novo link para download

## Dicas importantes 💡

1. **Sempre salve os arquivos** após fazer mudanças
2. **Teste cada alteração** antes de fazer a próxima
3. **Faça backup** do código antes de grandes mudanças
4. Se algo der errado, use `Ctrl+Z` para desfazer

## Problemas comuns e soluções 🔧

### O app não inicia
- Verifique se instalou todas as dependências com `npm install`
- Tente reiniciar o terminal e executar `npm start` novamente

### Tela branca ou erro
- Verifique se não há erros de digitação no código
- Olhe o terminal para mensagens de erro
- Tente executar `npm install` novamente

### Mudanças não aparecem
- Salve o arquivo (Ctrl+S)
- Recarregue o app (geralmente com 'r' no terminal)

### Erro ao instalar o APK
- Verifique se seu Android permite instalação de fontes desconhecidas
- Em configurações > Segurança > Fontes desconhecidas (local pode variar dependendo da versão do Android)

## Precisa de ajuda? 🆘

1. Verifique se seguiu todos os passos deste guia
2. Procure a mensagem de erro no Google
3. Pergunte em fóruns de React Native
4. Entre em contato com o desenvolvedor

---

**Desenvolvido com ❤️ para facilitar suas compras em Manaus!**