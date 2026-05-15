import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  RadioTower,
  ShieldCheck,
  Zap
} from "lucide-react";

import {
  Link
} from "react-router-dom";

const features = [
  {
    icon: RadioTower,
    title: "Mission control",
    text: "Track project signals, owners, and release readiness from one focused command room."
  },
  {
    icon: Cloud,
    title: "Offline ready",
    text: "A PWA shell keeps the workspace fast and available for repeat visits."
  },
  {
    icon: ShieldCheck,
    title: "Typed GraphQL",
    text: "Frontend and backend run on TypeScript with GraphQL-powered mission data."
  }
];

const Welcome = () => {
  return (
    <main className="min-h-screen bg-[#101318] text-[#f7f3e8]">
      <section className="forge-grid min-h-screen px-4 py-6 sm:px-6 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#f59e0b] text-[#211407]">
              <RadioTower size={24} />
            </div>
            <div>
              <p className="text-2xl font-black">
                PulseForge
              </p>
              <p className="text-xs uppercase text-[#9fb3ad]">
                Launch Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#f7f3e8] hover:border-[#15b8a6]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden rounded-lg bg-[#15b8a6] px-4 py-2 text-sm font-bold text-[#071211] hover:bg-[#48d4c8] sm:inline-block"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#151922] px-4 py-2 text-sm font-semibold text-[#15b8a6]">
              <Zap size={16} />
              Advanced TypeScript productivity PWA
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Turn scattered project work into a clear launch signal.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9d3c3]">
              PulseForge is a specialized mission dashboard for teams that need GraphQL data, offline access, and a practical workflow board in one original product experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#15b8a6] px-5 py-3 font-bold text-[#071211] hover:bg-[#48d4c8]"
              >
                Create Workspace
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-semibold hover:border-[#f59e0b]"
              >
                I already have access
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#151922]/95 p-5 shadow-2xl">
            <div className="rounded-lg bg-[#101318] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase text-[#9fb3ad]">
                    Launch readiness
                  </p>
                  <p className="mt-1 text-3xl font-black">
                    82%
                  </p>
                </div>
                <CheckCircle2 className="text-[#15b8a6]" size={34} />
              </div>

              <div className="mt-6 space-y-4">
                {[
                  ["GraphQL API", "Ready", "bg-[#15b8a6]"],
                  ["PWA offline shell", "Cached", "bg-[#f59e0b]"],
                  ["Mission workflow", "Active", "bg-[#e85d75]"]
                ].map(([label, status, color]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-[#151922] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${color}`} />
                      <span className="font-semibold">
                        {label}
                      </span>
                    </div>
                    <span className="text-sm text-[#b7afa0]">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-4 pb-10 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-lg border border-white/10 bg-[#151922] p-5"
              >
                <Icon className="text-[#f59e0b]" size={26} />
                <h2 className="mt-4 text-xl font-black">
                  {feature.title}
                </h2>
                <p className="mt-2 text-[#b7afa0]">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Welcome;
