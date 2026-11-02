import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartModal } from "@/components/shop/CartModal";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-base-white text-dark">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartModal />
    </div>
  );
}

