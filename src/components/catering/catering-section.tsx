import React from "react";
import { ArrowRight, CalendarDays, ChefHat, Heart, Users } from "lucide-react";
import cateringBirthdays from "@/assets/catering-birthdays.webp";
import cateringEvents from "@/assets/catering-events.webp";
import cateringMealPreps from "@/assets/catering-meal-preps.webp";

type CateringSectionProps = {
  onGoTo: (id: string) => void;
};

export const CateringSection = React.memo(function CateringSection({
  onGoTo,
}: CateringSectionProps) {
  return (
    <section id="catering" className="catering-section section-pad">
      <div className="page-width">
        <div className="catering-header-row reveal">
          <div className="catering-heading">
            <p className="eyebrow eyebrow-light">
              <span /> BRING EVERYONE TO THE TABLE
            </p>
            <h2>
              We cater for <em>unforgettable moments.</em>
            </h2>
            <p>
              From joyous birthday parties and grand banquets to convenient weekly meal preps —
              served hot, fresh, and made with love.
            </p>
          </div>
          <aside className="love-seal">
            <span>MADE FRESH</span>
            <span className="seal-accent">MADE WITH LOVE</span>
            <span>MADE FOR YOU</span>
            <Heart />
          </aside>
        </div>

        <div className="catering-cards-grid">
          <article className="catering-card reveal">
            <div className="catering-card-media">
              <img
                src={cateringBirthdays}
                alt="Festive birthday celebration catering buffet and party platter setup"
                style={{ objectPosition: "center 58%" }}
                width={720}
                height={480}
                loading="lazy"
                decoding="async"
              />
              <div className="catering-card-badge">
                <span className="catering-badge-num">01</span>
                <span className="catering-badge-tag">BIRTHDAYS &amp; PARTIES</span>
              </div>
            </div>
            <div className="catering-card-body">
              <div className="catering-title-row">
                <span className="service-icon">
                  <CalendarDays />
                </span>
                <h3>Birthdays &amp; Parties</h3>
              </div>
              <p>
                Make milestone birthdays delicious and stress-free. From sizzling nyama choma
                platters to sweet kaimati &amp; mahamri spreads, we bring true joy to the table.
              </p>
              <ul className="catering-perks">
                <li>
                  <span className="perk-bullet">✦</span> Bespoke Celebration Menus
                </li>
                <li>
                  <span className="perk-bullet">✦</span> Sizzling Nyama Choma Platters
                </li>
                <li>
                  <span className="perk-bullet">✦</span> Authentic Kenyan Sweet Bars
                </li>
              </ul>
              <a
                href="#contact"
                className="catering-card-cta"
                onClick={(e) => {
                  e.preventDefault();
                  onGoTo("contact");
                }}
              >
                Plan a celebration <ArrowRight size={14} />
              </a>
            </div>
          </article>

          <article className="catering-card reveal">
            <div className="catering-card-media">
              <img
                src={cateringEvents}
                alt="Glamorous banquet and wedding floral reception setting"
                width={720}
                height={480}
                loading="lazy"
                decoding="async"
              />
              <div className="catering-card-badge">
                <span className="catering-badge-num">02</span>
                <span className="catering-badge-tag">EVENTS &amp; WEDDINGS</span>
              </div>
            </div>
            <div className="catering-card-body">
              <div className="catering-title-row">
                <span className="service-icon">
                  <Users />
                </span>
                <h3>Events &amp; Banquets</h3>
              </div>
              <p>
                Weddings, corporate galas, family reunions, and cultural get-togethers. Flawless
                presentation, generous portions, and authentic Kenyan warmth.
              </p>
              <ul className="catering-perks">
                <li>
                  <span className="perk-bullet">✦</span> Full Banquet &amp; Buffet Service
                </li>
                <li>
                  <span className="perk-bullet">✦</span> Corporate &amp; Cultural Galas
                </li>
                <li>
                  <span className="perk-bullet">✦</span> Professional Presentation
                </li>
              </ul>
              <a
                href="#contact"
                className="catering-card-cta"
                onClick={(e) => {
                  e.preventDefault();
                  onGoTo("contact");
                }}
              >
                Tell us about your event <ArrowRight size={14} />
              </a>
            </div>
          </article>

          <article className="catering-card reveal">
            <div className="catering-card-media">
              <img
                src={cateringMealPreps}
                alt="Hot chafing dishes and steaming buffet catering line"
                width={720}
                height={480}
                loading="lazy"
                decoding="async"
              />
              <div className="catering-card-badge">
                <span className="catering-badge-num">03</span>
                <span className="catering-badge-tag">MEAL PREPS &amp; BUFFETS</span>
              </div>
            </div>
            <div className="catering-card-body">
              <div className="catering-title-row">
                <span className="service-icon">
                  <ChefHat />
                </span>
                <h3>Meal Preps &amp; Platters</h3>
              </div>
              <p>
                Wholesome, home-style meals prepared fresh for your busy week or private buffet.
                Chafing-dish ready, hot, nourishing, and always ready to serve.
              </p>
              <ul className="catering-perks">
                <li>
                  <span className="perk-bullet">✦</span> Weekly Family &amp; Individual Packs
                </li>
                <li>
                  <span className="perk-bullet">✦</span> Steaming Chafing Dishes
                </li>
                <li>
                  <span className="perk-bullet">✦</span> Made Fresh Daily to Order
                </li>
              </ul>
              <a
                href="#contact"
                className="catering-card-cta"
                onClick={(e) => {
                  e.preventDefault();
                  onGoTo("contact");
                }}
              >
                Make life easier <ArrowRight size={14} />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
});
