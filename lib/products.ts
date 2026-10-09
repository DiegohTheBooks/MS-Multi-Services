export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  icon: string;
  tone: "gold" | "red" | "silver" | "black";
};

export const demoProducts: Product[] = [
  { id: "p1", name: "Capa de proteção premium", category: "Capas", description: "Proteção diária com acabamento elegante.", price: 49.9, badge: "Destaque", icon: "▧", tone: "black" },
  { id: "p2", name: "Carregador USB-C", category: "Carregadores", description: "Acessório para sua rotina conectada.", price: 79.9, icon: "ϟ", tone: "silver" },
  { id: "p3", name: "Película de proteção", category: "Películas", description: "Proteção para a tela do seu aparelho.", price: 29.9, icon: "◇", tone: "gold" },
  { id: "p4", name: "Cabo USB-C reforçado", category: "Cabos", description: "Conexão prática para o dia a dia.", price: 24.9, icon: "⌁", tone: "red" },
  { id: "p5", name: "Fone sem fio", category: "Áudio", description: "Liberdade para ouvir seus conteúdos.", price: 119.9, badge: "Novidade", icon: "◖))", tone: "black" },
  { id: "p6", name: "Suporte para celular", category: "Acessórios", description: "Mais praticidade em casa ou no trabalho.", price: 39.9, icon: "⊞", tone: "silver" },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
