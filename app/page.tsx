"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { demoProducts, formatPrice, type Product } from "@/lib/products";

const categories = [
  { name: "Capas", icon: "▧", note: "Estilo e proteção" },
  { name: "Películas", icon: "◇", note: "Cuidado com a tela" },
  { name: "Carregadores", icon: "ϟ", note: "Energia para sua rotina" },
  { name: "Áudio", icon: "◖))", note: "Som em todo lugar" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => demoProducts.filter((product) => {
    const matchesSearch = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === "Todos" || product.category === category);
  }), [search, category]);

  const addToCart = (product: Product) => setCart((current) => [...current, product]);
  const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <>
      <SiteHeader cartCount={cart.length} onSearch={setSearch} />
      <main id="inicio">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span /> SUA CONEXÃO, NOSSA PAIXÃO</div>
            <h1>Seu celular.<br /><span>Do seu jeito.</span></h1>
            <p>Os acessórios certos fazem parte de cada momento. Descubra opções para proteger, conectar e expressar seu estilo.</p>
            <div className="hero-actions"><a className="button button-gold" href="#catalogo">Explorar produtos <span>↗</span></a><a className="text-link" href="#sobre">Conheça a MS <span>→</span></a></div>
            <div className="hero-proof"><div className="proof-mark">✦</div><div><strong>Detalhes que fazem a diferença</strong><span>Praticidade para acompanhar você.</span></div></div>
          </div>
          <div className="hero-visual" aria-label="Composição visual abstrata inspirada em acessórios tecnológicos">
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="hero-glass"><div className="glass-camera" /><div className="glass-shine" /><span>MS</span><small>MULTI SERVICES</small></div>
            <div className="floating-chip chip-top"><span>✦</span><div><small>SEU ESTILO</small><strong>Em cada detalhe</strong></div></div>
            <div className="floating-chip chip-bottom"><span className="chip-lightning">ϟ</span><div><small>FEITO PARA</small><strong>Sua rotina</strong></div></div>
            <div className="visual-caption">ACESSÓRIOS · CONEXÃO · ESTILO</div>
          </div>
          <div className="hero-index"><span>01</span><i /> 03</div>
        </section>

        <section className="trust-strip" aria-label="Informações da loja">
          <div><span className="trust-icon">✧</span><span><strong>Escolha com cuidado</strong><small>Detalhes que importam</small></span></div>
          <div><span className="trust-icon">◇</span><span><strong>Variedade para você</strong><small>Acessórios para sua rotina</small></span></div>
          <div><span className="trust-icon">◎</span><span><strong>Compra consciente</strong><small>Informações claras</small></span></div>
        </section>

        <section id="categorias" className="section categories-section">
          <div className="section-heading"><div><span className="eyebrow">ENCONTRE O QUE PRECISA</span><h2>Explore por <span>categoria.</span></h2></div><p>O essencial para manter você conectado, com praticidade e personalidade.</p></div>
          <div className="category-grid">
            {categories.map((item) => <button key={item.name} className={`category-tile ${category === item.name ? "category-selected" : ""}`} onClick={() => { setCategory(item.name); document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" }); }}><span className="category-icon">{item.icon}</span><span className="category-name">{item.name}</span><span className="category-note">{item.note}</span><span className="category-arrow">↗</span></button>)}
          </div>
        </section>

        <section id="catalogo" className="section catalog-section">
          <div className="section-heading catalog-heading"><div><span className="eyebrow">SELEÇÃO MS</span><h2>Peças para sua <span>rotina.</span></h2></div><p>Conheça algumas das categorias que farão parte da nossa loja.</p></div>
          <div className="catalog-toolbar"><div className="filter-pills">{["Todos", "Capas", "Películas", "Carregadores", "Cabos", "Áudio", "Acessórios"].map((item) => <button key={item} className={category === item ? "filter-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="result-count">{filteredProducts.length} produtos demonstrativos</span></div>
          {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div> : <div className="empty-state"><span>⌕</span><h3>Nenhum produto encontrado</h3><p>Tente outro termo ou escolha uma categoria diferente.</p><button className="button button-outline" onClick={() => { setSearch(""); setCategory("Todos"); }}>Limpar filtros</button></div>}
          <div className="demo-note"><span>ⓘ</span> Catálogo ilustrativo: produtos, preços e disponibilidade ainda não são dados comerciais reais.</div>
        </section>

        <section id="sobre" className="about-section">
          <div className="about-mark">MS<span>.</span></div>
          <div className="about-copy"><span className="eyebrow">SOBRE A MS MULTI SERVICES</span><h2>Mais do que acessórios.<br /><span>Seu jeito de se conectar.</span></h2><p>Estamos preparando um espaço para você encontrar acessórios que acompanham sua rotina. Uma experiência simples, com informações claras e atenção aos detalhes.</p></div>
          <div className="about-side"><span className="about-star">✳</span><span>EM CONSTRUÇÃO</span><small>Uma nova experiência de compra começa aqui.</small></div>
        </section>

        <section className="newsletter-section"><div><span className="eyebrow">FIQUE POR PERTO</span><h2>Novidades em breve.</h2><p>Estamos preparando nossa loja online. Volte em breve para acompanhar as novidades.</p></div><a className="button button-dark" href="#inicio">Voltar ao início <span>↑</span></a></section>
      </main>

      <SiteFooter />

      {cart.length > 0 && <button className="cart-floating" onClick={() => setShowCart(true)} aria-label="Ver carrinho"><span>▱</span><b>{cart.length}</b><strong>{formatPrice(cartTotal)}</strong></button>}
      {showCart && <div className="modal-backdrop" role="presentation" onClick={() => setShowCart(false)}><section className="cart-modal" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}><div className="cart-modal-head"><div><span className="eyebrow">SUA SELEÇÃO</span><h2 id="cart-title">Carrinho <span>({cart.length})</span></h2></div><button className="icon-button" onClick={() => setShowCart(false)} aria-label="Fechar carrinho">×</button></div><div className="cart-items">{cart.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><span className={`cart-item-icon tone-${product.tone}`}>{product.icon}</span><div><strong>{product.name}</strong><small>{product.category}</small></div><b>{formatPrice(product.price)}</b><button aria-label={`Remover ${product.name}`} onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}>×</button></div>)}</div><div className="cart-total"><span>Subtotal demonstrativo</span><strong>{formatPrice(cartTotal)}</strong></div><p className="cart-disclaimer">Este carrinho é apenas uma demonstração. A compra e o pagamento online ainda não estão disponíveis.</p><button className="button button-gold cart-close" onClick={() => setShowCart(false)}>Continuar explorando</button><button className="clear-cart" onClick={() => setCart([])}>Limpar carrinho</button></section></div>}
    </>
  );
}
