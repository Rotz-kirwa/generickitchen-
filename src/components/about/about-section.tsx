import React from "react";
import { ArrowRight, ChefHat, Flame, Heart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PotMark } from "@/components/brand-wordmark";
import { kenyanPlate } from "@/data/restaurant-data";

type AboutSectionProps = {
  onGoTo: (id: string) => void;
};

export const AboutSection = React.memo(function AboutSection({ onGoTo }: AboutSectionProps) {
  return (
    <section className="about-section section-pad" id="about">
      <div className="page-width about-grid">
        <div className="about-visual reveal">
          <img
            src={kenyanPlate}
            alt="A lovingly prepared plate of authentic Kenyan beef stew, sautéed greens, and layered chapati"
            width={1200}
            height={1008}
            loading="lazy"
            decoding="async"
          />
          <div className="about-photo-stamp">
            <PotMark small />
            <span>
              OUR TABLE
              <br />
              IS YOURS
            </span>
          </div>
          <span className="about-photo-count">FRESH DAILY · HERITAGE RECIPES</span>

          <div className="about-visual-highlights">
            <div className="about-stat-item">
              <strong>100%</strong>
              <span>Scratch Cooked</span>
            </div>
            <div className="about-stat-divider" aria-hidden="true" />
            <div className="about-stat-item">
              <strong>Fresh</strong>
              <span>Farm-Direct Greens</span>
            </div>
            <div className="about-stat-divider" aria-hidden="true" />
            <div className="about-stat-item">
              <strong>Whole</strong>
              <span>Toasted Spices</span>
            </div>
          </div>
        </div>

        <div className="about-copy reveal">
          <p className="eyebrow">
            <span /> OUR KITCHEN &amp; HERITAGE
          </p>
          <h2>
            Authentic flavours, <em>wholesome goodness.</em>
          </h2>
          <div className="about-story">
            <p>
              At Generic Kitchen Delicacies, we celebrate the true culinary soul of Kenya. Every
              dish is rooted in timeless heritage and rich family traditions — from smoky
              charcoal-grilled <strong>Nyama Choma</strong> and fragrant Swahili{" "}
              <strong>Pilau</strong>, to slow-simmered{" "}
              <strong>Beef, Goat, and Matumbo stews</strong>, steaming fluffy <strong>Ugali</strong>
              , velvety <strong>Mukimo</strong>, and coastal street favourites like golden{" "}
              <strong>Samosas</strong>, crispy <strong>Bhajias</strong>, and sweet{" "}
              <strong>Mahamri</strong>.
            </p>
            <p>
              The foundation of our goodness is simple: uncompromising care and zero shortcuts. We
              source crisp greens daily from local Kenyan growers, use only prime grass-fed cuts,
              and toast our whole spices from scratch. Every meal is simmered low and slow with
              heartfelt hospitality (<em>pendo la nyumbani</em>), filling every plate with
              nourishing warmth and generous portions.
            </p>
          </div>

          <div className="values-list">
            <div className="value-item">
              <span className="value-icon">
                <Flame />
              </span>
              <div>
                <h3>Iconic Kenyan Delicacies</h3>
                <p>
                  Sizzling nyama choma, aromatic pilau, hearty stews, and coastal bites prepared to
                  time-tested recipes.
                </p>
              </div>
            </div>

            <div className="value-item">
              <span className="value-icon">
                <Leaf />
              </span>
              <div>
                <h3>Farm-Fresh &amp; Wholesome</h3>
                <p>
                  Daily handpicked greens (Sukuma Wiki &amp; Matoke), prime meats, and natural
                  spices with zero artificial shortcuts.
                </p>
              </div>
            </div>

            <div className="value-item">
              <span className="value-icon">
                <Heart />
              </span>
              <div>
                <h3>Generous Kenyan Hospitality</h3>
                <p>
                  Abundant, soul-satisfying portions served with genuine warmth (<em>Ukarimu</em>)
                  made to bring people together.
                </p>
              </div>
            </div>

            <div className="value-item">
              <span className="value-icon">
                <ChefHat />
              </span>
              <div>
                <h3>Catering &amp; Weekly Meal Preps</h3>
                <p>
                  From full-service chafing-dish banquet spreads for weddings and birthdays to
                  steaming weekly home meal packs.
                </p>
              </div>
            </div>
          </div>

          <div className="about-cta-row">
            <Button className="button-primary" onClick={() => onGoTo("menu")}>
              Explore Our Menu <ArrowRight size={14} />
            </Button>
            <Button
              variant="outline"
              className="button-secondary"
              onClick={() => onGoTo("catering")}
            >
              Catering &amp; Events
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});
