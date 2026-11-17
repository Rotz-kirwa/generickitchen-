import React, { useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowRight, Check, Clock3, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppMark } from "@/components/brand-wordmark";
import { PHONE_DISPLAY, PHONE_TEL, getWhatsAppUrl } from "@/data/restaurant-data";

const subscribeNoop = () => () => {};

const EXTENSION_IGNORE_ATTRS = {
  "data-lpignore": "true",
  "data-1p-ignore": "true",
  "data-bwignore": "true",
  "data-form-type": "other",
};

export const ContactSection = React.memo(function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const formHydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hello Generic Kitchen Delicacies! I'd love to make an enquiry.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Event date: ${data.get("date")}`,
      `Message: ${data.get("message")}`,
    ].join("\n");
    setSubmitted(true);
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    form.reset();
  }

  return (
    <section id="contact" className="contact-section section-pad">
      <div className="page-width contact-grid">
        <div className="contact-copy reveal">
          <p className="eyebrow eyebrow-light">
            <span /> COME ON IN
          </p>
          <h2>
            Let’s make something <em>delicious.</em>
          </h2>
          <p>
            Planning a gathering, a meal for the week, or just feeling hungry? We’d love to hear
            from you.
          </p>
          <div className="contact-phone">
            <span>PLACE YOUR ORDER</span>
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            <a className="phone-action" href={PHONE_TEL}>
              <Phone size={16} /> Call our kitchen ({PHONE_DISPLAY})
            </a>
          </div>
          <div className="contact-details">
            <div>
              <MapPin />
              <p>
                <strong>Catering &amp; Orders</strong>
                <span>Birthdays · Events · Parties · Meal Preps</span>
              </p>
            </div>
            <div>
              <Clock3 />
              <p>
                <strong>Fresh &amp; Made with Love</strong>
                <span>All meals served hot &amp; made fresh daily</span>
              </p>
            </div>
          </div>
          <Button variant="secondary" size="lg" asChild>
            <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
              <WhatsAppMark size={17} /> Chat with us on WhatsApp
            </a>
          </Button>
        </div>
        <form className="contact-form reveal" onSubmit={submitInquiry} {...EXTENSION_IGNORE_ATTRS}>
          <div className="form-heading">
            <span>WE’RE ALL EARS</span>
            <h3>Send us a little note.</h3>
            <p>We’ll take it from here.</p>
          </div>
          {submitted && (
            <div className="form-success" role="status">
              <Check size={18} /> Your message is ready in WhatsApp. Talk soon!
            </div>
          )}
          <label>
            Your name
            {formHydrated ? (
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="What should we call you?"
                {...EXTENSION_IGNORE_ATTRS}
                required
              />
            ) : (
              <span className="contact-field-placeholder" aria-hidden="true" />
            )}
          </label>
          <div className="form-two">
            <label>
              Phone number
              {formHydrated ? (
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. 0712 345 678"
                  {...EXTENSION_IGNORE_ATTRS}
                  required
                />
              ) : (
                <span className="contact-field-placeholder" aria-hidden="true" />
              )}
            </label>
            <label>
              Event date
              {formHydrated ? (
                <input name="date" type="date" {...EXTENSION_IGNORE_ATTRS} required />
              ) : (
                <span className="contact-field-placeholder" aria-hidden="true" />
              )}
            </label>
          </div>
          <label>
            Your message
            {formHydrated ? (
              <textarea
                name="message"
                rows={3}
                placeholder="Tell us what you have in mind…"
                {...EXTENSION_IGNORE_ATTRS}
                required
              />
            ) : (
              <span
                className="contact-field-placeholder contact-field-placeholder-area"
                aria-hidden="true"
              />
            )}
          </label>
          <Button type="submit" variant="default" size="lg">
            Send via WhatsApp <ArrowRight size={17} />
          </Button>
          <span className="form-note">Your message opens in WhatsApp to send.</span>
        </form>
      </div>
    </section>
  );
});
