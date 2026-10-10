import { logoutAdmin } from "@/app/admin/actions";

const nextSteps = [
  { number: "01", title: "Produtos e categorias", detail: "Cadastro, preços, descrições e imagens", status: "Aguardando banco de dados" },
  { number: "02", title: "Estoque", detail: "Saldo e histórico de movimentações", status: "Aguardando banco de dados" },
  { number: "03", title: "Pedidos", detail: "Acompanhamento após integração do checkout", status: "Ainda não disponível" },
];

export default function AdminDashboardPage() {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-sidebar-brand" href="/">MS<span>.</span><small>MULTI SERVICES</small></a>
        <p className="admin-sidebar-label">PAINEL</p>
        <a className="admin-sidebar-link admin-sidebar-active" href="/admin">Visão geral</a>
        <div className="admin-sidebar-note">Área privada do proprietário</div>
        <form action={logoutAdmin}><button className="admin-logout" type="submit">Sair do painel</button></form>
      </aside>
      <section className="admin-content">
        <header className="admin-topbar"><div><span className="admin-kicker">MS MULTI SERVICES</span><h1>Administração</h1></div><a className="admin-store-link" href="/">Ver loja ↗</a></header>
        <div className="admin-welcome">
          <span className="admin-status-dot" />
          <div><strong>Painel inicial</strong><p>O acesso está protegido. As funções de gerenciamento serão ativadas após configurar o banco de dados.</p></div>
        </div>
        <section className="admin-section" aria-labelledby="admin-status-title">
          <div className="admin-section-heading"><div><span className="admin-kicker">ESTADO DO PROJETO</span><h2 id="admin-status-title">O que já está conectado</h2></div></div>
          <div className="admin-status-grid">
            <article className="admin-status-card"><span className="admin-status-icon">✓</span><div><strong>Acesso do proprietário</strong><p>Login e sessão protegidos pelo servidor</p><span className="admin-pill admin-pill-ready">Configurável</span></div></article>
            <article className="admin-status-card"><span className="admin-status-icon admin-status-pending">…</span><div><strong>Catálogo persistente</strong><p>Os produtos da loja ainda são ilustrativos</p><span className="admin-pill">Banco de dados necessário</span></div></article>
            <article className="admin-status-card"><span className="admin-status-icon admin-status-pending">…</span><div><strong>Pedidos e vendas</strong><p>Checkout e pagamentos não estão integrados</p><span className="admin-pill">Ainda não disponível</span></div></article>
          </div>
        </section>
        <section className="admin-section" aria-labelledby="admin-next-title">
          <div className="admin-section-heading"><div><span className="admin-kicker">PRÓXIMAS ETAPAS</span><h2 id="admin-next-title">Gerenciamento da loja</h2></div><p>Essas áreas só serão ativadas quando salvarem dados de forma confiável.</p></div>
          <div className="admin-next-list">{nextSteps.map((step) => <article className="admin-next-item" key={step.number}><span className="admin-next-number">{step.number}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div><span className="admin-next-status">{step.status}</span></article>)}</div>
        </section>
        <p className="admin-demo-notice">Este painel não altera os dados da loja. Nenhum produto, estoque, pedido ou venda real está conectado.</p>
      </section>
    </main>
  );
}
