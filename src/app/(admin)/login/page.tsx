"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Mock de autenticación para vendedor (en etapa backend se conecta a supabase.auth.signInWithPassword)
      if (email.trim() && password.trim()) {
        setTimeout(() => {
          router.push("/admin");
        }, 500);
      } else {
        setError("Por favor ingresa usuario y contraseña.");
        setLoading(false);
      }
    } catch {
      setError("Credenciales no válidas. Revisa los datos ingresados.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-standard hover:text-dark mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la tienda</span>
        </Link>

        <div className="mx-auto w-12 h-12 rounded-full bg-cf-forest flex items-center justify-center text-white shadow-md">
          <Lock className="w-6 h-6 text-gold" />
        </div>

        <h2 className="text-2xl font-story font-bold text-dark tracking-tight">
          Acceso Vendedor
        </h2>
        <p className="text-xs font-body text-standard">
          Ingresá para gestionar catálogo, modificar precios y actualizar el stock.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-base-white py-8 px-6 shadow-md border border-silver/60 rounded-xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-cf-wine/30 rounded-md text-cf-wine text-xs font-body">
                {error}
              </div>
            )}

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="vendedor@cfyerba.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full mt-2"
            >
              {loading ? "Accediendo..." : "Iniciar Sesión"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
