export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand footer-logo" href="#inicio"><img src="https://i.postimg.cc/MTnJQTSJ/MS.jpg" alt="MS Multi Services" /></a>
          <p>Acessórios para acompanhar você em cada conexão.</p>
        </div>
        <div><h3>Navegue</h3><a href="#catalogo">Produtos</a><a href="#categorias">Categorias</a><a href="#sobre">Sobre nós</a></div>
        <div><h3>Atendimento</h3><span>Entre em contato para informações sobre produtos e disponibilidade.</span></div>
        <div><h3>Informações</h3><span>Políticas e condições serão publicadas antes da abertura das vendas online.</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} MS Multi Services.</span><span>Uma nova experiência está sendo construída.</span></div>
    </footer>
  );
}
