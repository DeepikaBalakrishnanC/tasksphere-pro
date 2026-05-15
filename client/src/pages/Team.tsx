import DashboardLayout
from "../layouts/DashboardLayout";

const members = [
  {
    name: "Deepika Balakrishnan",
    role: "Mission Director",
    signal: "Launch ready",
    color: "bg-[#15b8a6]"
  },
  {
    name: "Aarav Menon",
    role: "Interface Engineer",
    signal: "Design pass",
    color: "bg-[#f59e0b]"
  },
  {
    name: "Maya Iyer",
    role: "GraphQL Systems",
    signal: "API watch",
    color: "bg-[#e85d75]"
  }
];

const Team = () => {
  return (
    <DashboardLayout>
      <div>
        <p className="text-sm font-semibold uppercase text-[#15b8a6]">
          Crew manifest
        </p>
        <h1 className="mt-1 text-4xl font-black">
          Crew
        </h1>
        <p className="mt-2 text-[#b7afa0]">
          See who owns each signal before the next release window.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <article
            key={member.name}
            className="rounded-lg border border-white/10 bg-[#151922] p-5"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${member.color} font-black text-[#101318]`}>
              {member.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <h2 className="mt-4 text-xl font-black">
              {member.name}
            </h2>
            <p className="mt-1 text-[#b7afa0]">
              {member.role}
            </p>
            <span className="mt-4 inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-[#d9d3c3]">
              {member.signal}
            </span>
          </article>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Team;
