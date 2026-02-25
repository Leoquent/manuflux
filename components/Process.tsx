"use client";

import { CircularProcess } from "@/components/ui/circular-process";

export default function Process() {
  const steps = [
    {
      title: "Analyse & Strategie",
      description: "Wir verstehen Ihren Betrieb und identifizieren die größten Hebel für Ihre Digitalisierung. In diesem entscheidenden ersten Schritt tauchen wir tief in Ihre Arbeitsprozesse ein, analysieren bestehende Systeme und finden Ablauffehler."
    },
    {
      title: "Konzept & Design",
      description: "Wir entwickeln ein individuelles Design und die technische Architektur Ihrer Lösung. Dabei legen wir größten Wert auf eine intuitive Nutzerführung und eine ansprechende, moderne Optik, die Ihre Marke perfekt repräsentiert."
    },
    {
      title: "Umsetzung",
      description: "Unsere Experten bauen Ihre Website und implementieren die gewünschten Automatisierungen nach den modernsten Standards. Ob Anbindung von APIs, Datenbanken oder Gestaltung der Frontends – wir sorgen dafür, dass alles reibungslos zusammenarbeitet."
    },
    {
      title: "Launch & Optimierung",
      description: "Nach dem erfolgreichen Go-Live lassen wir Sie nicht allein. Wir begleiten Sie durch die kritische Anfangsphase, überwachen die Systemstabilität und optimieren Ihre Prozesse laufend für maximale Effizienz."
    },
  ];

  return (
    <section id="process" className="bg-black w-full relative z-10">
      <CircularProcess steps={steps} />
    </section>
  );
}
