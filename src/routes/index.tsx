import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check, Copy, MessageCircle, Send, Star } from "lucide-react";
import mockup1 from "@/assets/mockup-1.jpg";
import mockup2 from "@/assets/mockup-2.jpg";
import mockup3 from "@/assets/mockup-3.jpg";
import mockup4 from "@/assets/mockup-4.jpg";
import mockup5 from "@/assets/mockup-5.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

const WHATSAPP_NUMBER = "48531589533";
const WHATSAPP_MESSAGE =
  "Jestem zainteresowany darmowym projektem strony internetowej, jestem chętny do dalszej współpracy";
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const SMS_URL = `sms:+${WHATSAPP_NUMBER}?&body=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const mockups = [mockup1, mockup2, mockup3, mockup4, mockup5];

/**
 * Organic brush-stroke underline. Renders as an SVG that scales to fill the
 * width of its parent (which must be position: relative). Animates on scroll
 * into view; text appears first, stroke draws under it.
 */
function BrushUnderline({
  delay = 0.15,
  duration = 1.1,
  color = "url(#brushGrad)",
  strokeWidth = 6,
  className = "",
}: {
  delay?: number;
  duration?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 right-0 -bottom-2 w-full h-[0.42em] ${className}`}
    >
      <defs>
        <linearGradient id="brushGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00BFFF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <motion.path
        d="M6 16 Q 150 2 294 14"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ pathLength: { duration, delay, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2, delay } }}
        style={{ filter: "drop-shadow(0 0 8px rgba(0,191,255,0.55))" }}
      />
    </svg>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-[#0A0A0A]/60 border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-electric animate-pulse-glow shadow-[0_0_12px_var(--electric)]" />
          WeScale
        </a>
        <a href="#kontakt" className="text-sm font-medium text-white/70 hover:text-electric transition-colors">
          Kontakt
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Compressed sequence — user reaches "twoją" quickly
  const line1Y = useTransform(scrollYProgress, [0, 0.15], [0, -12]);
  const line2Opacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.05, 0.18], [24, 0]);
  const line3Opacity = useTransform(scrollYProgress, [0.22, 0.34], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.22, 0.34], [24, 0]);
  const brandOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const brandY = useTransform(scrollYProgress, [0.45, 0.6], [30, 0]);

  // Once "twoją" is fully in, trigger the brush underline
  const [showTwojaUnderline, setShowTwojaUnderline] = useState(false);
  const [showWeUnderline, setShowWeUnderline] = useState(false);
  scrollYProgress.on?.("change", (v) => {
    if (v > 0.2 && !showTwojaUnderline) setShowTwojaUnderline(true);
    if (v > 0.62 && !showWeUnderline) setShowWeUnderline(true);
  });

  return (
    <section ref={ref} id="top" className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 h-96 w-96 rounded-full bg-[#00BFFF]/10 blur-3xl animate-float-slow" />
          <div
            className="absolute bottom-1/4 right-1/5 h-[500px] w-[500px] rounded-full bg-[#00D4FF]/5 blur-3xl animate-float-slow"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,191,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display font-bold leading-[1.02] tracking-tight text-white text-[clamp(2.75rem,9vw,7rem)]">
            <motion.span style={{ y: line1Y }} className="block">
              Zaprojektujemy
            </motion.span>
            <motion.span style={{ opacity: line2Opacity, y: line2Y }} className="block mt-3 md:mt-4">
              <span className="relative inline-block px-1">
                twoją
                {showTwojaUnderline && <BrushUnderline delay={0.1} />}
              </span>
            </motion.span>
            <motion.span
              style={{ opacity: line3Opacity, y: line3Y }}
              className="block mt-3 md:mt-4 text-[clamp(2rem,6.5vw,5.25rem)]"
            >
              <span className="uppercase tracking-tight bg-gradient-to-r from-white via-white to-electric bg-clip-text text-transparent">
                stronę internetową
              </span>
            </motion.span>
          </h1>

          <motion.div
            style={{ opacity: brandOpacity, y: brandY }}
            className="mt-10 font-display font-bold text-white text-[clamp(2.75rem,8vw,6.5rem)] leading-none"
          >
            <span className="relative inline-block px-1">
              We
              {showWeUnderline && <BrushUnderline delay={0.1} />}
            </span>
            <span>Scale</span>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-widest uppercase">
          Scroll ↓
        </div>
      </div>
    </section>
  );
}

function CtaBlock() {
  return (
    <section className="relative z-10 -mt-24 pb-32 px-6">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-6 text-center">
        <a
          href="#kontakt"
          className="group relative inline-flex items-center gap-2 rounded-full border-2 border-electric bg-transparent px-10 py-5 font-display text-lg font-medium text-white transition-all duration-300 hover:bg-electric hover:text-black hover:scale-105 hover:shadow-[0_0_40px_rgba(0,191,255,0.6)]"
        >
          <span>Otrzymaj darmowy projekt</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#wycena"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-white hover:border-electric hover:text-electric transition-all"
          >
            Zobacz wycenę
          </a>
          <a
            href="#opinie"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-white hover:border-electric hover:text-electric transition-all"
          >
            Opinie
            <ArrowRight className="h-4 w-4" />
          </a>
          <div className="flex -space-x-3 ml-2">
            {["from-[#00BFFF] to-[#0066cc]", "from-[#00D4FF] to-[#0099cc]", "from-[#66E0FF] to-[#00BFFF]"].map((g, i) => (
              <div
                key={i}
                className={`h-10 w-10 rounded-full bg-gradient-to-br ${g} border-2 border-[#0A0A0A] shadow-lg flex items-center justify-center text-[10px] font-semibold text-white`}
                style={{ zIndex: 3 - i }}
              >
                {["JK", "AM", "PW"][i]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Jan Kowalski",
      company: "Nova Studio",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Współpraca z WeScale przerosła nasze oczekiwania — projekt dostarczony w rekordowym czasie, a efekt wizualny robi wrażenie na każdym kliencie.",
    },
    {
      name: "Anna Majewska",
      company: "Loft & Co.",
      quote:
        "Sed do eiusmod tempor incididunt ut labore. Zespół WeScale rozumie biznes, nie tylko design. Konwersje wzrosły o 220% w pierwszym miesiącu po uruchomieniu nowej strony.",
    },
  ];

  return (
    <section id="opinie" className="relative py-32 px-6 bg-ink-2">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-electric tracking-widest uppercase mb-4">
            <Star className="h-3 w-3 fill-current" /> Opinie klientów
          </div>
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-white">
            Zaufali nam{" "}
            <span className="relative inline-block px-1">
              wizjonerzy
              <BrushUnderline delay={0.2} />
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 p-8 md:p-10 overflow-hidden hover:border-electric/40 transition-colors"
            >
              <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-gradient-to-b from-[#00BFFF] to-[#00D4FF] rounded-r shadow-[0_0_20px_rgba(0,191,255,0.6)]" />
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-electric text-electric" />
                ))}
              </div>
              <p className="text-lg text-white/80 leading-relaxed mb-8 font-normal">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#0066cc] flex items-center justify-center font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-sm text-white/50">{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const doubled = [...mockups, ...mockups];
  return (
    <section className="relative py-20 overflow-hidden bg-ink">
      <div className="mb-10 px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-white/40">Wybrane realizacje</p>
      </div>
      <div className="group relative">
        <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused] w-max">
          {doubled.map((src, i) => (
            <div
              key={i}
              className="relative w-[420px] h-[280px] rounded-2xl overflow-hidden border border-white/10 shadow-[var(--shadow-card)] shrink-0"
            >
              <img
                src={src}
                alt={`Realizacja ${(i % mockups.length) + 1}`}
                width={1200}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Landing", price: "od 2 500 zł", features: ["1 strona premium", "Design + development", "Dostawa 7 dni"] },
    { name: "Business", price: "od 5 900 zł", features: ["Do 8 podstron", "CMS + SEO", "Integracje"], featured: true },
    { name: "Custom", price: "wycena indywidualna", features: ["Aplikacje webowe", "E-commerce", "Dedykowane funkcje"] },
  ];
  return (
    <section id="wycena" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-white">
            Transparentna{" "}
            <span className="relative inline-block px-1">
              wycena
              <BrushUnderline delay={0.2} />
            </span>
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto font-normal">
            Trzy pakiety dopasowane do skali Twojego projektu. Bez ukrytych kosztów.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-8 border transition-all ${
                t.featured
                  ? "bg-gradient-to-b from-[#00BFFF]/10 to-transparent border-electric shadow-[0_0_40px_rgba(0,191,255,0.15)]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-electric text-black px-3 py-1 text-xs font-semibold tracking-wide">
                  NAJPOPULARNIEJSZY
                </div>
              )}
              <div className="text-sm uppercase tracking-widest text-white/50">{t.name}</div>
              <div className="mt-3 font-display text-3xl font-semibold text-white">{t.price}</div>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-electric" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CopyMessage() {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(WHATSAPP_MESSAGE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="mt-10 mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="text-xs uppercase tracking-widest text-electric">Gotowa wiadomość</div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-full border border-electric/40 bg-electric/10 text-electric px-3 py-1.5 text-xs font-medium hover:bg-electric hover:text-black transition-all"
          aria-label="Kopiuj wiadomość"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Skopiowano" : "Kopiuj"}
        </button>
      </div>
      <p className="text-white/80 text-sm italic select-all cursor-text whitespace-pre-wrap break-words">
        „{WHATSAPP_MESSAGE}"
      </p>
    </div>
  );
}

function Contact() {
  return (
    <section id="kontakt" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-70" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00BFFF]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/5 px-4 py-1.5 text-xs font-medium text-electric tracking-widest uppercase mb-8">
          <MessageCircle className="h-3 w-3" /> Napisz do nas
        </div>

        <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-white mb-4">
          Zacznijmy{" "}
          <span className="relative inline-block px-1">
            rozmowę
            <BrushUnderline delay={0.2} />
          </span>
        </h2>
        <p className="text-white/60 mb-12 max-w-xl mx-auto font-normal">
          Zadzwoń, napisz na WhatsApp lub wyślij SMS. Odpowiadamy w mniej niż godzinę.
        </p>

        {/* number with animated marker — enlarged */}
        <div className="relative inline-block mb-12 px-8 py-6">
          <svg
            className="absolute -inset-16 sm:-inset-20 pointer-events-none w-[calc(100%+8rem)] sm:w-[calc(100%+10rem)] h-[calc(100%+8rem)] sm:h-[calc(100%+10rem)]"
            viewBox="0 0 500 180"
            preserveAspectRatio="none"
          >
            <motion.ellipse
              cx="250"
              cy="90"
              rx="240"
              ry="80"
              fill="none"
              stroke="url(#markerGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              initial={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1] }}
              style={{ filter: "drop-shadow(0 0 10px rgba(0,191,255,0.7))" }}
            />
            <defs>
              <linearGradient id="markerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00BFFF" />
                <stop offset="100%" stopColor="#00D4FF" />
              </linearGradient>
            </defs>
          </svg>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="relative font-display font-semibold text-white text-[clamp(1.75rem,6vw,4.5rem)] tracking-tight hover:text-electric transition-colors"
          >
            +48 531 589 533
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-electric text-black px-8 py-4 font-display font-medium hover:scale-105 hover:shadow-[0_0_40px_rgba(0,191,255,0.6)] transition-all"
          >
            <MessageCircle className="h-5 w-5" />
            Napisz na WhatsApp
          </a>
          <a
            href={SMS_URL}
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur px-8 py-4 font-display font-medium text-white hover:border-electric hover:text-electric transition-all"
          >
            <Send className="h-5 w-5" />
            Wyślij SMS
          </a>
        </div>

        <CopyMessage />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink py-10 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <div className="flex items-center gap-2 font-display font-semibold text-white">
          <span className="inline-block h-2 w-2 rounded-full bg-electric" />
          WeScale
        </div>
        <nav className="flex gap-6">
          <a href="#opinie" className="hover:text-electric transition-colors">Opinie</a>
          <a href="#wycena" className="hover:text-electric transition-colors">Wycena</a>
          <a href="#kontakt" className="hover:text-electric transition-colors">Kontakt</a>
        </nav>
        <div>© {new Date().getFullYear()} WeScale. Wszystkie prawa zastrzeżone.</div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Nav />
      <Hero />
      <CtaBlock />
      <Testimonials />
      <Marquee />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
