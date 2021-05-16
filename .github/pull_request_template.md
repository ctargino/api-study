# Avaliação de Desenvolvedor(a)
Preencha os detalhamentos referentes à categoria do seu PR (funcionalidade ou bug) e remova a outra seção.

# Funcionalidade / Melhoria
## Descrição

Insira aqui uma breve descrição da feature, contextualizando os revisores e o profissional de ops que realizará o fechamento do PR.

# Bug / Problema / Erro
### Descrição do Problema

Insira aqui uma breve descrição do problema, contextualizando os revisores e o profissional de ops que realizará o fechamento do PR.

### Causa

Insira aqui uma breve descrição da causa do problema.

### Solução

Insira aqui uma breve descrição de como foi implementada a solução do problema - se possível, exemplificando e colocando links de referência.

---

## Questionário

**1. Houve alteração de banco de dados? Caso sim, o código foi versionado num arquivo .sql ou migration? Qual é o arquivo?**

    R:

**2. Houve alteração nos arquivos de configuração? Caso sim, qual(is) os arquivos?**

    R:

**3. É preciso realizar alguma configuração de rotina automática (por exemplo, robôs e/ou scripts)? Se sim, quais são?**

    R:

**4. É preciso realizar alguma configuração que envolva infraestrutura (por exemplo, Docker, hosts, SAML, etc)? Se sim, quais são?**

    R:

**5. Houve mudanças nas configurações de integração com outros sistemas? Se sim, quais são?**

    R:

---

## Checklist - Dev
### Preencha este item antes de colocar o PR para revisão.

- [ ] Meu PR não possui trechos de código comentados / redundantes.
- [ ] Meu PR não tem credenciais ou IDs hardcoded (utilizo constantes ou variáveis descritivas).
- [ ] Meu PR aponta para o branch developer.
- [ ] Meu PR não possui código de debug (console.logs, echos, print_r, etc).
- [ ] Meu código não possui "declarações inalcançáveis" (código depois de return, die, etc).

## Checklist - DevOps
- [ ] O PR contém as últimas atualizações do branch developer.
- [ ] O PR não possui conflitos de código.
