# Briefing oficial — MS Multi Services

## Objetivo
Construir um site oficial de marca e uma loja virtual própria para acessórios de celulares e produtos relacionados. O projeto deve evoluir para um e-commerce real, sem depender de plataformas prontas de loja. Não apresentar recursos como funcionais antes de estarem implementados, testados e conectados a serviços reais.

## Identidade visual
- Preto principal: #090909
- Preto secundário: #171717
- Dourado: #D8AE35
- Vermelho: #ED1027
- Branco: #FFFFFF
- Cinza claro: #F8F7F5
- Preto domina a composição; dourado é o acento principal; vermelho aparece em menor quantidade e apenas em pontos que precisem de atenção.
- Logo oficial: https://i.postimg.cc/MTnJQTSJ/MS.jpg
- Não recriar nem substituir a logo oficial por uma versão inventada.

## Páginas e experiência
- Início com cabeçalho, pesquisa, acesso ao carrinho, banner institucional sem promoções inventadas, categorias, destaques e rodapé.
- Catálogo com pesquisa, filtros, ordenação e estados vazios claros.
- Página de produto com fotos, descrição, preço, estoque, variantes, opções de entrega/retirada e relacionados quando disponíveis.
- Compatibilidade estruturada de capas e películas com modelos de aparelhos.
- Carrinho com itens, variantes, quantidades, subtotal, descontos válidos, frete quando integrado e total.
- Checkout sem obrigação de criar conta. Nome completo e CPF obrigatórios; e-mail necessário para comunicação; telefone opcional; endereço somente quando necessário para entrega.
- Links de contato e políticas no rodapé. WhatsApp opcional e configurável, sem substituir a compra pelo site.

## Regras de comércio
- Não aceitar quantidade acima do estoque; preços e disponibilidade deverão ser recalculados no servidor.
- Pedidos devem possuir identificador, estados válidos e snapshot de produtos/preços no momento da compra.
- Pagamento ainda não escolhido. Mercado Pago pode ser avaliado futuramente. Pagamentos reais permanecem desabilitados até a integração e validação.
- Confirmar pagamentos por notificações/webhooks validados, com idempotência. Nunca considerar pago apenas por retorno do navegador.
- Não armazenar dados completos de cartão.
- Estoque deverá ser compartilhado entre loja física e virtual, com SKUs/variantes, histórico de movimentações, controle concorrente e prevenção de saldo negativo. Cancelamento/reembolso deve seguir regras explícitas.
- Emissão fiscal é futura e deve ficar desativada até validação com contador.

## Administração
- Área exclusiva do proprietário, autenticação segura, senha com hash, autorização no servidor, proteção contra tentativas abusivas e sessões seguras.
- Gestão de produtos, categorias, variantes, compatibilidade, pedidos, estoque, vendas físicas e configurações.
- Transições de pedidos validadas no servidor.

## Tecnologias preferidas
- Next.js App Router, React, TypeScript e CSS/Tailwind.
- PostgreSQL e Prisma em etapa posterior.
- Validação de dados com Zod quando forem criados endpoints e formulários de servidor.
- Separação entre regras de negócio e apresentação.
- Arquivo .env.example sem segredos, instruções de instalação e manutenção.

## Modelo de dados candidato
AdminUser, Category, Product, ProductVariant, DeviceModel, VariantCompatibility, Inventory, InventoryMovement, Order, OrderItem, StockReservation, Payment, WebhookEvent e StoreSettings. Criar somente as entidades necessárias. Valores monetários em centavos ou Decimal, snapshots em pedidos, índices e restrições apropriadas.

## Segurança, privacidade e qualidade
- Aplicar princípios de minimização de dados e LGPD.
- Não versionar credenciais nem segredos.
- HTML semântico, acessibilidade por teclado, contraste, estados de carregamento/erro, layout responsivo, SEO e desempenho.
- Planejar backups e recuperação antes de produção.

## Fases
1. Base técnica, identidade visual, navegação, página inicial, catálogo demonstrativo, cartões e detalhes de produto, interface do carrinho, rodapé e responsividade.
2. Carrinho e checkout com pedidos.
3. Banco de dados, estoque e consistência transacional.
4. Painel administrativo.
5. Pagamentos e operações reais.
6. Preparação e validação de produção.

## Regras de trabalho
- Preservar as decisões documentadas e não presumir que uma função existe.
- Dados de demonstração devem ser identificados como tal.
- Não publicar segredos nem executar alterações destrutivas sem autorização.
- Manter documentação atualizada e registrar o que está implementado, pendente e validado.
