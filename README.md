# MS Multi Services — Loja virtual

Projeto da loja virtual oficial da MS Multi Services. A base evolui por etapas até se tornar um e-commerce real.

## Identidade visual

- Preto principal: `#090909`
- Preto secundário: `#171717`
- Dourado: `#D8AE35`
- Vermelho: `#ED1027`
- Branco: `#FFFFFF`
- Cinza claro: `#F8F7F5`

O preto domina a interface. O dourado é o principal acento visual; o vermelho é usado com moderação.

Logo oficial: https://i.postimg.cc/MTnJQTSJ/MS.jpg

## Estado do projeto

A loja apresenta um catálogo ilustrativo e um carrinho em memória para demonstração. Produtos, preços e disponibilidade não são comerciais. O acesso administrativo inicial tem login e sessão assinada, mas ainda não grava nem edita dados da loja.

Banco de dados, catálogo persistente, pedidos, estoque real, pagamentos e emissão fiscal continuam pendentes. Não apresente esses recursos como funcionais antes de implementá-los e validá-los.

## Desenvolvimento local

Requisitos: Node.js LTS e npm.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Administração

Acesse `/admin/login`. Configure no ambiente local (arquivo `.env.local`, ignorado pelo Git) ou no provedor de hospedagem:

- `ADMIN_EMAIL`: e-mail único do proprietário.
- `ADMIN_PASSWORD_HASH`: hash scrypt da senha, criado com `npm run admin:hash-password`.
- `AUTH_SECRET`: segredo aleatório de pelo menos 32 bytes, usado para assinar sessões.

O comando do hash solicita a senha e imprime somente o hash gerado. Guarde-o em `.env.local` ou no gerenciador de segredos da hospedagem. Nunca o coloque em commits. A sessão expira após oito horas e usa cookie HTTP-only, SameSite Strict e Secure em produção.

O bloqueio após cinco tentativas falhas existe por instância do processo e não substitui um limitador de requisições compartilhado. Antes de publicar o acesso, configure limitação de tentativas no proxy/plataforma e use um serviço persistente para esse controle.

## Segurança

- Nunca adicione `.env`, senhas, tokens ou chaves privadas ao Git.
- Use `.env.example` apenas para documentar nomes de variáveis.
- Não habilite pagamentos reais antes de integrar e validar o provedor, callbacks/webhooks e estados de pagamento.

## Documentação

Consulte `docs/briefing.md` para objetivos, requisitos, regras de segurança e etapas do projeto.
