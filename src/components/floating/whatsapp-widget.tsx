import React from "react";
import { WhatsAppMark } from "@/components/brand-wordmark";
import { getWhatsAppUrl } from "@/data/restaurant-data";

export const WhatsAppWidget = React.memo(function WhatsAppWidget() {
  return (
    <a
      href={getWhatsAppUrl("Hello Generic Kitchen Delicacies! I'd love to talk to you now.")}
      className="wa-float"
      target="_blank"
      rel="noreferrer"
      aria-label="Talk to us now on WhatsApp"
    >
      <span className="wa-float-card">
        <span className="wa-float-eyebrow">
          <span className="wa-live-dot" aria-hidden="true" />
          GENERIC DIRECT
        </span>
        <span className="wa-float-title">Talk to us now</span>
      </span>
      <span className="wa-medallion" aria-label="Official WhatsApp chat">
        <WhatsAppMark size={33} />
      </span>
    </a>
  );
});
