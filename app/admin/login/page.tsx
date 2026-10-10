"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAdmin } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAdmin, {});

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <Link className="admin-login-brand" href="/" aria-label="Voltar para a loja">MS<span>.</span></Link>
        <p className="admin-kicker">ÁREA DO PROPRIETÁRIO</p>
        <h1 id="admin-login-title">Acesso administrativo</h1>
        <p className="admin-login-description">Entre com as credenciais configuradas no servidor da loja.</p>
        <form action={action} className="admin-login-form">
          <label htmlFor="admin-email">E-mail</label>
          <input id="admin-email" name="email" type="email" autoComplete="username" maxLength={254} required />
          <label htmlFor="admin-password">Senha</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" maxLength={128} required />
          {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
          <button className="admin-primary-button" type="submit" disabled={pending}>{pending ? "Verificando..." : "Entrar"}</button>
        </form>
        <Link className="admin-back-link" href="/">← Voltar para a loja</Link>
      </section>
    </main>
  );
}
