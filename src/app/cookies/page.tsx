import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politika kolačića",
  description: "Lista kolačića i lokalnog storage-a koji se koriste na OBELISK portfolio demo sajtu.",
};

export default function CookiesPage() {
  return (
    <article className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-heading mb-4">Pravna napomena</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wider text-text-primary mb-6">
            Kolačići
          </h1>
          <p className="text-text-secondary text-sm">
            Datum poslednjeg ažuriranja: 1. maj 2026.
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">Šta su kolačići i lokalni storage</h2>
            <p>
              Kolačići (cookies) su mali zapisi koje sajt smešta u vaš pretraživač. Lokalni storage
              (localStorage, sessionStorage) je sličan mehanizam, ali se podaci čuvaju duže i ne šalju se serveru sa svakim zahtevom.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">Šta OBELISK koristi</h2>
            <p>
              OBELISK je portfolio demo. Ne koristi tracking ni analitiku.
              Postoje samo neophodni mehanizmi za rad UI-ja:
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 font-heading uppercase tracking-widest text-xs text-text-primary">Naziv</th>
                    <th className="text-left py-3 pr-4 font-heading uppercase tracking-widest text-xs text-text-primary">Vrsta</th>
                    <th className="text-left py-3 pr-4 font-heading uppercase tracking-widest text-xs text-text-primary">Svrha</th>
                    <th className="text-left py-3 font-heading uppercase tracking-widest text-xs text-text-primary">Trajanje</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs text-primary">obelisk_cart_v1</td>
                    <td className="py-3 pr-4">localStorage</td>
                    <td className="py-3 pr-4">Pamti stavke u demo korpi između stranica.</td>
                    <td className="py-3">Dok ručno ne obrišete</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs text-primary">obelisk_cookie_consent_v1</td>
                    <td className="py-3 pr-4">localStorage</td>
                    <td className="py-3 pr-4">Pamti vaš odabir u banneru za kolačiće.</td>
                    <td className="py-3">Dok ručno ne obrišete</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs text-primary">obelisk_portfolio_badge_dismissed_v1</td>
                    <td className="py-3 pr-4">sessionStorage</td>
                    <td className="py-3 pr-4">Pamti da ste sakrili gornji portfolio badge.</td>
                    <td className="py-3">Do zatvaranja taba</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">Šta OBELISK NE koristi</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Google Analytics, Search Console tag-ovi</li>
              <li>Meta (Facebook) Pixel</li>
              <li>TikTok / X / LinkedIn pixels</li>
              <li>Hotjar, FullStory, ClickTale ili druge session replay alate</li>
              <li>Marketing kolačiće, retargeting</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">Kako da obrišete podatke</h2>
            <p>
              U pretraživaču otvorite Developer Tools → Application/Storage → Local/Session Storage,
              i obrišite ulaze koji počinju sa <code className="text-primary">obelisk_</code>.
              Alternativno, „Clear browsing data&rdquo; opcija u podešavanjima pretraživača briše sve odjednom.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">Promene</h2>
            <p>
              Ako u budućnosti dodam analitiku ili treće strane, ova lista i banner za saglasnost biće
              ažurirani pre nego što takvi kolačići budu postavljeni.
            </p>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10 text-center space-y-2">
          <Link href="/privacy" className="text-sm font-heading uppercase tracking-widest text-text-secondary hover:text-primary transition-colors block">
            Politika privatnosti
          </Link>
          <Link href="/terms" className="text-sm font-heading uppercase tracking-widest text-text-secondary hover:text-primary transition-colors block">
            Uslovi korišćenja
          </Link>
          <Link href="/" className="text-sm font-heading uppercase tracking-widest text-primary hover:text-primary-hover transition-colors block mt-4">
            ← Povratak na početnu
          </Link>
        </footer>
      </div>
    </article>
  );
}
