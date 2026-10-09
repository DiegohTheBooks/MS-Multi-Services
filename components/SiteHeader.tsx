"use client";

import { useState } from "react";

type SiteHeaderProps = { cartCount: number; onSearch: (value: string) => void };

export default function SiteHeader({ cartCount, onSearch }: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="announcement"><span className="announcement-dot" /> SUA ROTINA, SEUS ACESSÓRIOS, SEU ESTILO</div>
      <header className="site-header">
        <a className="brand" href="/" aria-label="MS Multi Services — início">
          {/* Mantemos a logo oficial fornecida pelo proprietário. */}
          <img src="https://i.postimg.cc/MTnJQTSJ/MS.jpg" alt="MS Multi Services" />
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a className="nav-active" href="#inicio">Início</a>
          <a href="#catalogo">Produtos</a>
          <a href="#categorias">Categorias</a>
          <a href="#sobre">Sobre nós</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-toggle" aria-label="Abrir pesquisa" onClick={() => setSearchOpen(!searchOpen)}>⌕</button>
          <a className="cart-link" href="#carrinho" aria-label={`Carrinho com ${cartCount} itens`}>
            <span className="cart-icon">▱</span><span className="cart-label">Carrinho</span><span className="cart-count">{cartCount}</span>
          </a>
        </div>
      </header>
      {searchOpen && <div className="search-strip"><label htmlFor="site-search">Buscar produtos</label><input id="site-search" type="search" placeholder="O que você está procurando?" onChange={(event) => onSearch(event.target.value)} autoFocus /></div>}
    </>
  );
}
