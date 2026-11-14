import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown, ArrowRight, ArrowUp, CalendarDays, Check, ChefHat, Clock3,
  Flame, Heart, Leaf, MapPin, Menu as MenuIcon, MessageCircle, Phone,
  Sparkles, Users, UtensilsCrossed, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import nyamaChoma from "@/assets/twala-nyama-choma.jpg";
import chapatiSamosa from "@/assets/twala-chapati-samosa.jpg";
import mahamri from "@/assets/twala-mahamri.jpg";
import kenyanPlate from "@/assets/twala-kenyan-plate.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Twala Kitchen — Taste of Home, Made with Love" },
      { name: "description", content: "Discover the warm, authentic flavours of Kenya at Twala Kitchen. Explore our menu, plan your event, and get in touch." },
      { property: "og:title", content: "Twala Kitchen — Taste of Home, Made with Love" },
      { property: "og:description", content: "Kenyan street food and traditional meals, prepared fresh and made with love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TwalaHome,
});

const navItems = ["Home", "Menu", "Catering", "About", "Contact"];
const products = [
  { name: "Chapati", category: "Street food", image: chapatiSamosa, description: "Soft, flaky, and perfect every time.", price: "KSh [price]" },
  { name: "Nyama Choma", category: "Mains", image: nyamaChoma, description: "Tender, juicy, and full of smoky flavour.", price: "KSh [price]" },
  { name: "Samosa", category: "Street food", image: chapatiSamosa, description: "Crispy outside, tasty inside.", price: "KSh [price]" },
  { name: "Mahamri", category: "Snacks", image: mahamri, description: "Soft, fluffy, and mildly sweet.", price: "KSh [price]" },
  { name: "Mandazi", category: "Snacks", image: mahamri, description: "Sweet, warm, and simply irresistible.", price: "KSh [price]" },
  { name: "All Kenyan Foods", category: "Mains", image: kenyanPlate, description: "A little of everything we call home.", price: "KSh [price]" },
];
const categories = ["All", "Street food", "Mains", "Snacks"];

function PotMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`pot-mark${small ? " pot-mark-small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 56 48" fill="none"><path d="M18 5c3-4 7-1 10-4 2 4-1 8-5 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"/><path d="M24 18 9 10l-5 6 13 10m15-8 13-8 5 6-14 11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 23c0 12 7 19 19 19s19-7 19-19H9Z" fill="currentColor"/><path d="M7 22h42m-2 22H11" stroke="currentColor" strokeWidth="3.3" strokeLinecap="round"/><path d="m20 26 8 8m0-8-8 8" stroke="var(--background)" strokeWidth="2.4" strokeLinecap="round"/></svg>
    </span>
  );
}

function TwalaHome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [category, setCategory] = useState("All");
  const [showTop, setShowTop] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const visibleProducts = useMemo(() => category === "All" ? products : products.filter((item) => item.category === category), [category]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
    const revealObserver = new IntersectionObserver((entries, current) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    const onScroll = () => setShowTop(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { observer.disconnect(); revealObserver.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hello Twala Kitchen! I'd love to make an enquiry.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Event date: ${data.get("date")}`,
      `Message: ${data.get("message")}`,
    ].join("\n");
    setSubmitted(true);
    window.open(`https://wa.me/254000000000?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    form.reset();
  }

  const goTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="twala-site">
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="wordmark" onClick={() => setMobileOpen(false)} aria-label="Twala Kitchen home">
            <PotMark /><span className="wordmark-type">Twala<span className="wordmark-dot">.</span><small>KITCHEN &amp; DELICACY</small></span>
          </a>
          <nav className={`main-nav${mobileOpen ? " nav-open" : ""}`} aria-label="Main navigation">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              return <a key={id} href={`#${id}`} className={active === id ? "nav-active" : ""} onClick={(event) => { event.preventDefault(); goTo(id); }}>{item}</a>;
            })}
            <Button variant="default" className="header-cta" asChild><a href="https://wa.me/254000000000" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Let’s talk</a></Button>
          </nav>
          <Button variant="ghost" size="icon" className="mobile-toggle" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <MenuIcon />}</Button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <div className="eyebrow"><span /> A LITTLE TASTE OF KENYA</div>
              <h1>Twala<span className="hero-title-green"> Kitchen</span></h1>
              <p className="hero-script">&amp; delicacy</p>
              <p className="hero-tagline">TASTE OF HOME. MADE WITH LOVE. <Heart className="inline-heart" size={17} /></p>
              <p className="hero-description">From the first fold of a chapati to the last bite of nyama choma, we bring the generous, feel-good flavours of Kenya to your table.</p>
              <div className="hero-actions">
                <Button variant="default" size="lg" onClick={() => goTo("menu")}>Explore the menu <ArrowRight size={17} /></Button>
                <Button variant="secondary" size="lg" asChild><a href="https://wa.me/254000000000" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Order on WhatsApp</a></Button>
              </div>
              <div className="hero-note"><span className="note-line" /><span>Cooked fresh, shared with joy.</span><Heart size={15} /></div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo-wrap"><img className="hero-photo" src={nyamaChoma} alt="Freshly grilled nyama choma with kachumbari" width={1440} height={1200} fetchPriority="high" /></div>
              <div className="flavour-seal"><span className="seal-small">Real</span><span>Kenyan</span><span className="seal-small">Flavors</span><Heart size={21} /></div>
              <div className="hero-photo-caption"><span>01 /</span> The long-table feeling</div>
            </div>
            <a className="scroll-cue" href="#menu" aria-label="Scroll to the menu"><ArrowDown size={16} /></a>
          </div>
          <div className="hero-bottom-rule" />
        </section>

        <section id="menu" className="menu-section section-pad">
          <div className="page-width">
            <div className="section-heading reveal"><div><p className="eyebrow"><span /> FROM OUR KITCHEN</p><h2>Good things, <em>cooking.</em></h2><p className="section-intro">Street-side favourites and the comfort of a proper home-cooked meal.</p></div><span className="section-index">01 <i>—</i> THE MENU</span></div>
            <div className="menu-toolbar reveal"><span className="menu-count">Made fresh, every day <Heart size={14} /></span><div className="filter-row" role="group" aria-label="Filter menu by category">{categories.map((item) => <Button key={item} type="button" variant={category === item ? "default" : "ghost"} size="sm" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Button>)}</div></div>
            <div className="menu-grid">{visibleProducts.map((item, index) => <article className="menu-card reveal" key={item.name} style={{ animationDelay: `${index * 65}ms` }}><div className="menu-image-wrap"><img src={item.image} alt={item.name} style={{ objectPosition: item.position }} width={1200} height={1000} loading="lazy" /><span className="menu-pill">{item.category}</span><span className="menu-number">0{products.indexOf(item) + 1}</span></div><div className="menu-card-copy"><div className="menu-title-row"><h3>{item.name}</h3><span className="menu-price">{item.price}</span></div><p>{item.description}</p><a className="menu-order" href="https://wa.me/254000000000" target="_blank" rel="noreferrer">Ask us about this <ArrowRight size={14} /></a></div></article>)}</div>
          </div>
        </section>

        <section id="catering" className="catering-section section-pad">
          <div className="page-width">
            <div className="catering-heading reveal"><p className="eyebrow eyebrow-light"><span /> BRING EVERYONE TO THE TABLE</p><h2>We cater for <em>moments.</em></h2><p>Big days, busy weeks, and everything worth sharing.</p></div>
            <div className="catering-grid">
              <article className="catering-item reveal"><span className="service-icon"><CalendarDays /></span><span className="service-number">01</span><h3>Birthdays</h3><p>Make your special day a little more delicious. We’ll take care of the good food.</p><a href="#contact" onClick={(e) => { e.preventDefault(); goTo("contact"); }}>Plan a celebration <ArrowRight size={14} /></a></article>
              <article className="catering-item reveal"><span className="service-icon"><Users /></span><span className="service-number">02</span><h3>Events</h3><p>Weddings, parties, work gatherings, and family get-togethers. Let’s make it memorable.</p><a href="#contact" onClick={(e) => { e.preventDefault(); goTo("contact"); }}>Tell us about it <ArrowRight size={14} /></a></article>
              <article className="catering-item reveal"><span className="service-icon"><ChefHat /></span><span className="service-number">03</span><h3>Meal preps</h3><p>Fresh, thoughtful meals prepared for your week, so good food is always close by.</p><a href="#contact" onClick={(e) => { e.preventDefault(); goTo("contact"); }}>Make life easier <ArrowRight size={14} /></a></article>
              <aside className="love-seal"><span>MADE FRESH</span><span className="seal-accent">MADE WITH LOVE</span><span>MADE FOR YOU</span><Heart /></aside>
            </div>
          </div>
        </section>

        <section className="gallery-strip" aria-label="A little more from our kitchen"><img src={kenyanPlate} alt="A colourful Kenyan beef stew and greens plate" width={1200} height={1000} loading="lazy" /><img src={chapatiSamosa} alt="Fresh chapati served with crisp samosas" width={1200} height={1000} loading="lazy" /><img src={mahamri} alt="Golden, freshly made mahamri" width={1200} height={1000} loading="lazy" /><img src={nyamaChoma} alt="Smoky grilled nyama choma with fresh kachumbari" width={1440} height={1200} loading="lazy" /></section>

        <section className="motto-band"><div className="motto-inner page-width"><Flame className="motto-icon" /><p>Authentic recipes. <span>Quality ingredients.</span> Exceptional service.</p><span className="motto-mark">&amp;</span></div></section>

        <section className="about-section section-pad" id="about">
          <div className="page-width about-grid"><div className="about-visual reveal"><img src={kenyanPlate} alt="A lovingly prepared plate of Kenyan comfort food" width={1200} height={1000} loading="lazy" /><div className="about-photo-stamp"><PotMark small /><span>OUR TABLE<br />IS YOURS</span></div><span className="about-photo-count">MADE TO BE SHARED · 2026</span></div><div className="about-copy reveal"><p className="eyebrow"><span /> A STORY WITH HEART</p><h2>A little bit of <em>home.</em></h2><p className="about-story">[Add the founder’s story here: where the love of Kenyan food began, the memories behind the recipes, and the people Twala brings to the table.]</p><div className="values-list"><div className="value-item"><span className="value-icon"><Leaf /></span><div><h3>Fresh, always</h3><p>Good ingredients. Thoughtfully prepared.</p></div></div><div className="value-item"><span className="value-icon"><Heart /></span><div><h3>Made with love</h3><p>Because the little things are the big things.</p></div></div><div className="value-item"><span className="value-icon"><Sparkles /></span><div><h3>Made for you</h3><p>Generous flavours, served just how they should be.</p></div></div></div></div></div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="page-width contact-grid"><div className="contact-copy reveal"><p className="eyebrow eyebrow-light"><span /> COME ON IN</p><h2>Let’s make something <em>delicious.</em></h2><p>Planning a gathering, a meal for the week, or just feeling hungry? We’d love to hear from you.</p><div className="contact-phone"><span>GIVE US A RING</span><a href="tel:+254000000000">+254 000 000 000</a><a className="phone-action" href="tel:+254000000000"><Phone size={16} /> Call Twala</a></div><div className="contact-details"><div><MapPin /><p><strong>Find our kitchen</strong><span>[Add your address here]</span></p></div><div><Clock3 /><p><strong>Kitchen hours</strong><span>[Add opening days and hours]</span></p></div></div><Button variant="secondary" size="lg" asChild><a href="https://wa.me/254000000000" target="_blank" rel="noreferrer"><MessageCircle /> Chat with us on WhatsApp</a></Button></div>
            <form className="contact-form reveal" onSubmit={submitInquiry}><div className="form-heading"><span>WE’RE ALL EARS</span><h3>Send us a little note.</h3><p>We’ll take it from here.</p></div>{submitted && <div className="form-success" role="status"><Check size={18} /> Your message is ready in WhatsApp. Talk soon!</div>}<label>Your name<input name="name" type="text" autoComplete="name" placeholder="What should we call you?" required /></label><div className="form-two"><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="e.g. 0712 345 678" required /></label><label>Event date<input name="date" type="date" required /></label></div><label>Your message<textarea name="message" rows={3} placeholder="Tell us what you have in mind…" required /></label><Button type="submit" variant="default" size="lg">Send via WhatsApp <ArrowRight size={17} /></Button><span className="form-note">Your message opens in WhatsApp to send.</span></form>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="kente-strip" aria-hidden="true"><span /></div><div className="footer-main page-width"><div className="footer-brand"><a href="#home" className="wordmark footer-wordmark"><PotMark /><span className="wordmark-type">Twala<span className="wordmark-dot">.</span><small>KITCHEN &amp; DELICACY</small></span></a><p>Taste of home.<br />Made with love. <Heart size={14} /></p></div><div className="footer-links"><span className="footer-label">FIND YOUR WAY</span>{navItems.map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div><div className="footer-contact"><span className="footer-label">SAY HELLO</span><a href="tel:+254000000000">+254 000 000 000</a><a href="mailto:hello@twala.example">hello@twala.example</a><a href="https://wa.me/254000000000" target="_blank" rel="noreferrer">WhatsApp <ArrowRight size={13} /></a></div><p className="footer-signoff">Good food.<br /><em>Great moments.</em><br />Lasting memories.<Heart size={17} /></p></div><div className="footer-bottom page-width"><span>© {new Date().getFullYear()} Twala Kitchen. Made with care.</span><span>Kenyan at heart <Heart size={12} /> Made to be shared</span></div></footer>
      <Button variant="default" size="icon" className={`back-to-top${showTop ? " back-to-top-visible" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></Button>
    </div>
  );
}