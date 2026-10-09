# MS Multi Services — Loja virtual

Projeto novo para a loja virtual oficial da MS Multi Services. Esta base será construída a partir do briefing do projeto e evoluirá por etapas até se tornar um e-commerce real.

## Identidade visual

- Preto principal: `#090909`
- Preto secundário: `#171717`
- Dourado: `#D8AE35`
- Vermelho: `#ED1027`
- Branco: `#FFFFFF`
- Cinza claro: `#F8F7F5`

O preto deve dominar a interface. O dourado é o principal acento visual; o vermelho deve ser usado com moderação para chamar atenção a elementos pontuais.

Logo oficial: https://i.postimg.cc/MTnJQTSJ/MS.jpg

## Estado do projeto

O projeto começa do zero. A primeira etapa prioriza a base técnica, identidade visual, navegação responsiva, página inicial, catálogo demonstrativo e interfaces de produto e carrinho. Dados de demonstração não representam produtos, preços ou estoque reais.

Pagamento, persistência de pedidos, estoque de servidor, autenticação administrativa e emissão fiscal não devem ser apresentados como funcionais até serem implementados e validados.

## Tecnologias planejadas

- Next.js com App Router
- React e TypeScript
- CSS organizado por tokens de design
- PostgreSQL e Prisma em uma etapa posterior
- Validação de dados no servidor e variáveis de ambiente fora do Git

As versões e dependências serão definidas no `package.json` e validadas durante a implementação.

## Desenvolvimento local

Requisitos: Node.js LTS e npm.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Segurança

- Nunca adicione `.env`, senhas, tokens ou chaves privadas ao Git.
- Use `.env.example` apenas para documentar nomes de variáveis, sem valores secretos.
- Não habilite pagamentos reais antes de integrar e validar o provedor, callbacks/webhooks e estados de pagamento.

## Documentação

Consulte `docs/briefing.md` para os objetivos, requisitos funcionais, regras de segurança e fases planejadas.