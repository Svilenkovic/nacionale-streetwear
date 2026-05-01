import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Uslovi korišćenja",
  description: "Uslovi korišćenja OBELISK portfolio demo sajta.",
};

export default function TermsPage() {
  return (
    <article className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-heading mb-4">Pravna napomena</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wider text-text-primary mb-6">
            Uslovi korišćenja
          </h1>
          <p className="text-text-secondary text-sm">
            Datum poslednjeg ažuriranja: 1. maj 2026.
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">1. Predmet</h2>
            <p>
              Ovi uslovi važe za sve posetioce sajta <code className="text-primary">obelisk.svilenkovic.rs</code> („OBELISK&rdquo;).
              Sajt je <strong className="text-primary">portfolio demonstracija</strong> web razvoja, dizajna i 3D animacije.
              Pristupom sajtu prihvatate ove uslove. Ako se ne slažete — molimo da napustite sajt.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">2. Priroda demo sadržaja</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-primary">Brand „OBELISK&rdquo; je izmišljen.</strong> Ne postoji kao registrovano poslovno lice.</li>
              <li><strong className="text-primary">Proizvodi i cene su demo prikaz.</strong> Nisu stvarni artikli i ne mogu se kupiti.</li>
              <li><strong className="text-primary">Forma za poručivanje ne šalje podatke serveru.</strong> Klikom na „Potvrdi&rdquo; nećete kreirati nikakvu narudžbinu.</li>
              <li>Slike artikala su iz Unsplash kataloga (open license, attribuciija na zahtev).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">3. Intelektualna svojina</h2>
            <p>
              Tehnička realizacija sajta (kod, 3D scene, dizajn, copy) je vlasništvo autora —
              <strong className="text-text-primary"> Dimitrija Svilenkovića</strong>, dostupnog preko
              <Link href="https://svilenkovic.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">svilenkovic.com</Link>.
              Reprodukcija delova bez pisane saglasnosti nije dozvoljena, osim u svrhe ličnog
              učenja i ne-komercijalne reference.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">4. Pravila korišćenja</h2>
            <p>Pri korišćenju sajta nije dozvoljeno:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>automatizovano scrape-ovanje, DDoS, scan-ovanje rupa, exploit pokušaji</li>
              <li>injektovanje skripti, XSS pokušaji, predstavljanje kao drugo lice</li>
              <li>korišćenje sadržaja sajta u marketinške ili komercijalne svrhe bez saglasnosti</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">5. Ograničenje odgovornosti</h2>
            <p>
              Sajt se pruža „takav kakav je&rdquo; (as-is). Autor ne preuzima odgovornost za eventualne
              tehničke smetnje, prekide servisa, gubitak podataka iz lokalnog browser storage-a,
              ili posledice koje bi mogle nastati od oslanjanja na demo sadržaj kao da je stvaran.
            </p>
            <p>
              Iznosi i opisi proizvoda su <strong className="text-primary">izmišljeni</strong> radi UI prikaza i ne predstavljaju ponudu u smislu Zakona o obligacionim odnosima.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">6. Zaštita podataka</h2>
            <p>
              Pravila o tome šta sajt prikuplja, čuva i sa kim deli ribno su opisana u
              <Link href="/privacy" className="text-primary hover:underline ml-1">Politici privatnosti</Link>.
              Ukratko: ne deli ništa, ne prati analitiku, ne čuva forme.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">7. Promene uslova</h2>
            <p>
              Uslovi mogu biti ažurirani. Materijalne promene biće obeležene novim datumom na vrhu stranice.
              Nastavak korišćenja sajta posle promene smatra se prihvatanjem novih uslova.
            </p>
          </section>

          <section>
            <h2 className="font-heading uppercase tracking-widest text-text-primary text-lg mb-4">8. Nadležnost</h2>
            <p>
              Za sva pitanja koja iz ovog odnosa nastanu mesno je nadležan stvarno nadležan sud
              u Leskovcu, Republika Srbija, uz primenu prava Republike Srbije.
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
