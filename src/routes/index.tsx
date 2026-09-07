import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Copy, MessageCircle, Send } from "lucide-react";
import mockup1 from "@/assets/mockup-1.jpg";
import mockup2 from "@/assets/mockup-2.jpg";
import mockup3 from "@/assets/mockup-3.jpg";
import mockup4 from "@/assets/mockup-4.jpg";
import mockup5 from "@/assets/mockup-5.jpg";
import result1 from "@/assets/result-1.jpg";
import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

const WHATSAPP_NUMBER = "48531589533";
const WHATSAPP_MESSAGE =
  "Jestem zainteresowany darmowym projektem strony internetowej, jestem chętny do dalszej współpracy";
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const SMS_URL = `sms:+${WHATSAPP_NUMBER}?&body=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const UNDERLINE_DURATION = 2.4;
const mockups = [mockup1, mockup2, mockup3, mockup4, mockup5];

/**
 * Organic brush-stroke underline. Renders as an SVG that scales to fill the
 * width of its parent (which must be position: relative). Animates on scroll
 * into view; text appears first, stroke draws under it.
 */
function BrushUnderline({
  delay = 0.2,
  duration = UNDERLINE_DURATION,
  color = "url(#brushGrad)",
  strokeWidth = 8,
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
      className={`pointer-events-none absolute left-0 right-0 -bottom-3 w-full h-[0.5em] ${className}`}
    >
      <defs>
        <linearGradient id="brushGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0571D3" />
          <stop offset="50%" stopColor="#3AA6FF" />
          <stop offset="100%" stopColor="#1E90FF" />
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
        transition={{ pathLength: { duration, delay, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.4, delay } }}
        style={{ filter: "drop-shadow(0 0 14px rgba(5,113,211,0.85)) drop-shadow(0 0 28px rgba(30,144,255,0.45))" }}
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
  // Timed intro: three words appear one after another, scrolling is locked meanwhile
  const [step, setStep] = useState(0); // 0 -> 1 -> 2 -> 3 (all words visible)
  const [showTwojaUnderline, setShowTwojaUnderline] = useState(false);


  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const block = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });

    const unlock = () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
    };

    const timers = [
      window.setTimeout(() => setStep(1), 250),
      window.setTimeout(() => setStep(2), 1400),
      window.setTimeout(() => setShowTwojaUnderline(true), 2200),
      window.setTimeout(() => setStep(3), 3600),
      window.setTimeout(unlock, 4600),
    ];

    return () => {
      timers.forEach(clearTimeout);
      unlock();
    };
  }, []);

  const reveal = (visible: boolean) => ({
    initial: { opacity: 0, y: 26 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative min-h-[200vh]">

      <div className="sticky top-0 h-screen overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, rgba(5,113,211,0.35) 0%, rgba(5,113,211,0.10) 35%, rgba(0,0,0,0) 70%), radial-gradient(90% 60% at 50% 110%, rgba(5,113,211,0.18) 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg, #000000 0%, #000000 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display font-bold leading-[1.02] tracking-tight text-white text-[clamp(2.75rem,9vw,7rem)]">
            <motion.span {...reveal(step >= 1)} className="block">
              Zaprojektujemy
            </motion.span>
            <motion.span {...reveal(step >= 2)} className="block mt-3 md:mt-4">
              <span className="relative inline-block px-1">
                TWOJĄ
                {showTwojaUnderline && <BrushUnderline delay={0} />}
              </span>
            </motion.span>
            <motion.span
              {...reveal(step >= 3)}
              className="block mt-4 md:mt-6 text-white/90 text-[clamp(3.25rem,10vw,8rem)]"
            >
              Stronę
            </motion.span>
          </h1>



        </div>

      </div>
    </section>
  );
}

function CtaBlock() {
  return (
    <section className="relative z-10 -mt-12 md:-mt-16 pb-40 px-6">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-10 text-center">
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"


          className="group relative inline-flex items-center gap-2 rounded-full border-2 border-electric bg-transparent px-10 py-5 font-display text-lg font-medium text-white transition-all duration-300 hover:bg-electric hover:text-black hover:scale-105 hover:shadow-[0_0_40px_rgba(5,113,211,0.6)]"
        >
          <span>Otrzymaj darmowy projekt</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>

        <div className="flex flex-wrap items-center justify-center gap-6">
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
            {["from-[#0571D3] to-[#034a8c]", "from-[#1E90FF] to-[#0571D3]"].map((g, i) => (
              <div
                key={i}
                className={`h-10 w-10 rounded-full bg-gradient-to-br ${g} border-2 border-[#0A0A0A] shadow-lg flex items-center justify-center text-[10px] font-semibold text-white transition-transform duration-300 hover:scale-110 hover:-translate-y-0.5`}
                style={{ zIndex: 2 - i }}
              >
                {["PA", "PJ"][i]}
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
      name: "Pani Anna",
      quote:
        "Witam, przepraszam że piszę o takiej godzinie ale chciałam bardzo podziękować. Strona działa wszystko jest super, dodatkowo z pomocy byłam w stanie sama ogarnąć pozycjonowanie dziękuję bardzo jeszcze raz 🙏",
    },
    {
      name: "Patrycja J",
      quote:
        "Bardzo Ci dziękuję za zaangażowanie, jak masz jakieś dotychczasowe projekty i podeślesz mi swoje prace, to będę dawać namiary na Ciebie, jeśli ktoś by potrzebował.",
    },
  ];

  return (
    <section id="opinie" className="relative py-32 px-6 bg-ink-2">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-electric tracking-widest uppercase mb-4">
            <Star className="h-3 w-3 fill-[#FFC53D] text-[#FFC53D]" /> Opinie klientów
          </div>
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-white">
            Zaufali nam{" "}
            <span className="relative inline-block px-1">
              wizjonerzy
              <BrushUnderline delay={0.2} />
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 p-8 md:p-10 overflow-hidden hover:border-electric/40 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-gradient-to-b from-[#0571D3] to-[#1E90FF] rounded-r shadow-[0_0_20px_rgba(5,113,211,0.6)]" />
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, s) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + s * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Star className="h-4 w-4 fill-[#FFC53D] text-[#FFC53D]" />
                  </motion.span>
                ))}
              </div>
              <p className="text-lg text-white/80 leading-relaxed mb-8 font-normal">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0571D3] to-[#034a8c] flex items-center justify-center font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium text-white">{t.name}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const shots = [
    { src: result1, label: "Wyniki", alt: "Zrzut ekranu z wynikami kampanii" },
    { src: review1, label: "Opinia", alt: "Zrzut ekranu wiadomości z opinią klienta" },
    { src: review2, label: "Opinia", alt: "Zrzut ekranu wiadomości z opinią klientki" },
  ];
  return (
    <section id="dowody" className="relative py-28 px-6 bg-ink">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center mb-14"
      >
        <p className="text-sm uppercase tracking-widest text-white/40 mb-4">Opinie i wyniki</p>
        <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-white">
          Prawdziwe{" "}
          <span className="relative inline-block px-1">
            dowody
            <BrushUnderline delay={0.2} />
          </span>
        </h2>
      </motion.div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-5">
        {shots.map((s, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[var(--shadow-card)] hover:border-electric/40 hover:-translate-y-1 transition-all duration-500"
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-widest text-electric">
              {s.label}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}


function Marquee() {
  const doubled = [...mockups, ...mockups];
  return (
    <section className="relative py-24 overflow-hidden bg-ink">
      <div className="mb-12 px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-white/40 mb-3">Projekty</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-white">
          W trakcie budowy
        </h2>
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
                alt={`Projekt w trakcie budowy ${(i % mockups.length) + 1}`}
                width={1200}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <div className="rounded-full border border-electric/40 bg-electric/10 px-5 py-2 text-sm font-medium text-electric tracking-wide backdrop-blur-md">
                  W TRAKCIE BUDOWY
                </div>
              </div>
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
    {
      name: "Landing",
      price: "od 750zł",
      features: ["1 podstawowa strona", "Design + Hosting (Dodatkowo Płatny)", "Dostawa w 48h"],
      featured: true,
    },
    {
      name: "Custom",
      price: "Wycena indywidualna",
      features: ["Personalizacja pod klienta", "E-commerce", "Dedykowane funkcje"],
    },
  ];
  return (
    <section id="wycena" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-white">
            Transparentna{" "}
            <span className="relative inline-block px-1">
              wycena
              <BrushUnderline delay={0.2} />
            </span>
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto font-normal">
            Pakiety dopasowane do skali Twojego projektu.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-1 ${
                t.featured
                  ? "bg-gradient-to-b from-[#0571D3]/10 to-transparent border-electric shadow-[0_0_40px_rgba(5,113,211,0.15)]"
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
            </motion.div>
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#0571D3]/10 blur-[120px]" />

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

        {/* number with refined, smaller marker */}
        <div className="relative inline-block mb-12 px-6 py-4">
          <svg
            className="absolute -inset-6 sm:-inset-8 pointer-events-none w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] h-[calc(100%+3rem)] sm:h-[calc(100%+4rem)]"
            viewBox="0 0 400 130"
            preserveAspectRatio="none"
          >
            <motion.ellipse
              cx="200"
              cy="65"
              rx="188"
              ry="55"
              fill="none"
              stroke="url(#markerGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ pathLength: { duration: 2, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.3 } }}
              style={{ filter: "drop-shadow(0 0 8px rgba(5,113,211,0.6))" }}
            />
            <defs>
              <linearGradient id="markerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0571D3" />
                <stop offset="100%" stopColor="#1E90FF" />
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
            className="group inline-flex items-center gap-3 rounded-full bg-electric text-black px-8 py-4 font-display font-medium hover:scale-105 hover:shadow-[0_0_40px_rgba(5,113,211,0.6)] transition-all"
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
      <Proof />
      <Marquee />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
