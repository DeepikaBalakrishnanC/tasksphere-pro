import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Rocket
} from "lucide-react";

import DashboardLayout
from "../layouts/DashboardLayout";

import KanbanBoard
from "../components/KanbanBoard";

const stats = [
  {
    label: "Active missions",
    value: "12",
    detail: "+3 this week",
    icon: Rocket,
    color: "text-[#15b8a6]"
  },
  {
    label: "Shipped checkpoints",
    value: "48",
    detail: "91% clear rate",
    icon: CheckCircle2,
    color: "text-[#f59e0b]"
  },
  {
    label: "Review queue",
    value: "6",
    detail: "2 high priority",
    icon: Clock3,
    color: "text-[#e85d75]"
  }
];

const Dashboard = () => {

  return (

    <DashboardLayout>

      <section className="overflow-hidden rounded-lg border border-white/10 bg-[#151922]">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase text-[#15b8a6]">
              PulseForge Command
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black text-[#f7f3e8] sm:text-5xl">
              A mission desk for teams shipping under pressure.
            </h1>
            <p className="mt-4 max-w-2xl text-[#b7afa0]">
              Track launches, surface blockers, and keep project signals visible across the crew.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#101318] p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">
                Launch pulse
              </p>
              <ArrowUpRight size={20} className="text-[#15b8a6]" />
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm text-[#b7afa0]">
                  <span>Readiness</span>
                  <span>82%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[82%] rounded-full bg-[#15b8a6]" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm text-[#b7afa0]">
                  <span>Risk burn-down</span>
                  <span>64%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[64%] rounded-full bg-[#f59e0b]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
      >

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-lg border border-white/10 bg-[#151922] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold uppercase text-[#9fb3ad]">
                    {stat.label}
                  </h2>
                  <p className="mt-3 text-4xl font-black">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-[#b7afa0]">
                    {stat.detail}
                  </p>
                </div>
                <Icon className={stat.color} size={28} />
              </div>
            </div>
          );
        })}

      </div>

      <KanbanBoard />

    </DashboardLayout>

  );

};

export default Dashboard;
