# Briefing oficial — MS Multi Services

## Objetivo
Construir um site oficial de marca e uma loja virtual própria para acessórios de celulares e produtos relacionados. O projeto evolui por fases, sem apresentar como reais recursos ainda não implementados e validados.

## Identidade visual
- Preto principal: #090909
- Preto secundário: #171717
- Dourado: #D8AE35
- Vermelho: #ED1027
- Branco: #FFFFFF
- Cinza claro: #F8F7F5
- Preto domina a composição; dourado é o acento principal; vermelho aparece com moderação.
- Logo oficial: https://i.postimg.cc/MTnJQTSJ/MS.jpg
- Não recriar nem substituir a logo oficial por uma versão inventada.

## Páginas e experiência
- Início com navegação responsiva, identidade visual, categorias, catálogo demonstrativo e rodapé.
- Catálogo futuro com pesquisa, filtros, ordenação e estados vazios.
- Página de produto futura com fotos, descrição, preço, estoque, variantes, compatibilidade e opções de entrega/retirada.
- Carrinho demonstrativo apenas em memória; checkout futuro sem obrigação de criar conta.
- Links de contato e políticas deverão ser configuráveis, sem inventar dados da empresa.

## Regras de comércio
- Recalcular preço e disponibilidade no servidor; nunca aceitar quantidade acima do estoque.
- Pedidos devem ter identificador, estados válidos e snapshot dos produtos e preços no momento da compra.
- Pagamento ainda não escolhido. Pagamentos reais permanecem desabilitados até integração e validação.
- Confirmar pagamentos por webhooks validados e idempotentes. Não considerar pago apenas pelo retorno do navegador.
- Não armazenar dados completos de cartão.
- Estoque deve ser compartilhado entre loja física e virtual, com SKUs/variantes, histórico de movimentações, controle concorrente e prevenção de saldo negativo.
- Emissão fiscal é futura e deve ficar desativada até validação com contador.

## Administração
- A rota `/admin` exige sessão assinada verificada no servidor. O login inicial usa hash scrypt e cookie HTTP-only, SameSite Strict e Secure em produção.
- Credenciais ficam em variáveis de ambiente; não versionar valores secretos.
- O bloqueio de tentativas do processo é local a cada instância e não basta como controle de produção. Configurar limitação compartilhada no proxy/plataforma antes de exposição pública.
- O painel inicial é somente informativo. Não salva nem altera produtos, estoque, pedidos ou configurações.
- Gestão real requer banco persistente e validação de todas as mutações no servidor.

## Tecnologias e arquitetura
- Next.js App Router, React e TypeScript.
- PostgreSQL e Prisma seguem candidatos para persistência, pendentes de escolha/configuração.
- Adotar validação de entrada no servidor para endpoints e ações mutáveis.
- Separar regras de negócio da apresentação.

## Modelo de dados candidato
AdminUser, Category, Product, ProductVariant, DeviceModel, VariantCompatibility, Inventory, InventoryMovement, Order, OrderItem, StockReservation, Payment, WebhookEvent e StoreSettings. Criar somente entidades necessárias. Valores monetários em centavos ou Decimal, snapshots em pedidos, índices e restrições apropriadas.

## Segurança, privacidade e qualidade
- Aplicar minimização de dados e LGPD.
- Não versionar credenciais nem segredos.
- Garantir HTML semântico, acessibilidade por teclado, contraste, estados de carregamento/erro, layout responsivo, SEO e desempenho.
- Planejar backups e recuperação antes de produção.

## Fases
1. Base técnica, identidade visual, navegação, página inicial, catálogo demonstrativo, interface do carrinho e responsividade.
2. Painel administrativo inicial com autenticação e sessão assinada; incluído nesta fase. Persistência e gerenciamento seguem pendentes.
3. Banco de dados, catálogo e estoque persistentes, com validação das alterações no servidor.
4. Carrinho e checkout com pedidos.
5. Pagamentos e operações reais.
6. Preparação e validação de produção.

## Regras de trabalho
- Preservar as decisões documentadas e não presumir que uma função existe.
- Dados de demonstração devem ser identificados.
- Não versionar segredos.
- Manter documentação do que está implementado, pendente e validado.
