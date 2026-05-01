import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Politika privatnosti za OBELISK portfolio demo sajt — kako se podaci tretiraju u demo režimu.",
};

export default function PrivacyPage() {
  return (
    <article className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-heading mb-4">Pravna napomena</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wider text-text-primary mb-6">
            Politika privatnosti
          </h1>
          <p className="text-text-secondary text-sm">
            Datum poslednjeg ažuriranja: 1. maj 2026.
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">1. Šta je OBELISK</h2>
            <p>
              OBELISK je <strong className="text-primary">portfolio demonstracija</strong> imersivnog 3D web pristupa, hostovana
              na <code className="text-primary">obelisk.svilenkovic.rs</code>. Sajt nije aktivna prodavnica;
              svi proizvodi, cene i forma za poručivanje postoje isključivo radi vizuelnog prikaza tehnike i dizajna.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">2. Rukovalac podacima</h2>
            <p>
              Rukovalac sajta i ovih demo prikaza je:
              <br />
              <strong className="text-text-primary">D. Svilenković</strong> · Leskovac, Srbija
              <br />
              Web: <Link href="https://svilenkovic.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">svilenkovic.com</Link>
              <br />
              Email kontakt: putem kontakt forme na svilenkovic.com
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">3. Koji podaci se prikupljaju</h2>
            <p>OBELISK ne sadrži aktivnu analitiku, marketing pixel-e niti remarketing alate. Konkretno:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-primary">Demo korpa</strong> čuva izabrane stavke u <em>localStorage</em> vašeg pretraživača. Podaci ne napuštaju vaš uređaj.</li>
              <li><strong className="text-primary">Forma za poručivanje</strong> u demo režimu <em>ne šalje</em> podatke serveru. Polja koja popunite postoje samo dok je stranica otvorena.</li>
              <li><strong className="text-primary">Server log-ovi</strong> standardno beleže IP adresu, vreme zahteva i tip browser-a (rotacija ~30 dana). Ovo je deo redovne nginx infrastrukture i ne koristi se za profilisanje.</li>
              <li><strong className="text-primary">Saglasnost za kolačiće</strong> se beleži kao mali zapis u <em>localStorage</em> da banner ne bismo prikazivali svaki put.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">4. Pravni osnov</h2>
            <p>
              Tretman podataka koji ovde postoji vodi se po načelima Zakona o zaštiti podataka o ličnosti
              Republike Srbije („ZZPL&rdquo;, Sl. glasnik 87/2018) i, u meri u kojoj je primenjivo, GDPR-a:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Legitimni interes</strong> — bezbedno serviranje sajta (server log-ovi)</li>
              <li><strong>Saglasnost</strong> — eventualni opcioni kolačići (trenutno nema)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">5. Kome se podaci prosleđuju</h2>
            <p>Niko. Sajt je samostalan portfolio. Server log-ovi se ne prosleđuju trećim stranama; rotiraju se i automatski brišu.</p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">6. Vaša prava</h2>
            <p>U skladu sa ZZPL i GDPR-om imate pravo na:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>uvid u podatke koje pratimo o vama</li>
              <li>ispravku ili brisanje istih</li>
              <li>ograničavanje obrade i prigovor</li>
              <li>prenos podataka (data portability)</li>
              <li>žalbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti</li>
            </ul>
            <p className="mt-4">Zahtev možete uputiti preko kontakta navedenog u tački 2.</p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">7. Bezbednost</h2>
            <p>
              Saobraćaj između vašeg uređaja i sajta uvek je TLS-šifrovan (HTTPS). Server je iza fail2ban-a i firewall-a;
              cache-ovani odgovori imaju pun set security header-a (HSTS, CSP, X-Frame-Options, Referrer-Policy).
              Više o serverskoj infrastrukturi možete saznati na svilenkovic.com.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">8. Promene</h2>
            <p>
              Ova politika može biti ažurirana kada se priroda demo sadržaja menja. Datum poslednjeg ažuriranja stoji
              na vrhu stranice. Materijalne promene biće dodatno obeležene na početnoj.
            </p>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <Link href="/" className="text-sm font-heading uppercase tracking-widest text-primary hover:text-primary-hover transition-colors">
            ← Povratak na početnu
          </Link>
        </footer>
      </div>
    </article>
  );
}
