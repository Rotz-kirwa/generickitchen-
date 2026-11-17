import React from "react";
import { Flame } from "lucide-react";
import { bhajia, githeri, kenyanPlate, pilau } from "@/data/restaurant-data";

export const GallerySection = React.memo(function GallerySection() {
  return (
    <>
      <section className="gallery-strip" aria-label="A little more from our kitchen">
        <img
          src={kenyanPlate}
          alt="A colourful Kenyan beef stew and greens plate"
          width={1200}
          height={1008}
          loading="lazy"
          decoding="async"
        />
        <img
          src={pilau}
          alt="Fragrant Kenyan beef pilau served with kachumbari"
          width={1200}
          height={896}
          loading="lazy"
          decoding="async"
        />
        <img
          src={githeri}
          alt="Slow-simmered Kenyan githeri with sliced avocado"
          width={1200}
          height={896}
          loading="lazy"
          decoding="async"
        />
        <img
          src={bhajia}
          alt="Crispy Kenyan potato bhajias with tangy ukwaju chutney"
          width={1200}
          height={896}
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="motto-band">
        <div className="motto-inner page-width">
          <Flame className="motto-icon" />
          <p>
            Authentic recipes. <span>Quality ingredients.</span> Exceptional service.
          </p>
          <span className="motto-mark">&amp;</span>
        </div>
      </section>
    </>
  );
});
