import {
  CheckCircle2,
  Flame,
  Target,
} from "lucide-react";

const stats = [
  {
    label: "Solved",
    value: "—",
    icon: CheckCircle2,
  },
  {
    label: "Attempted",
    value: "—",
    icon: Target,
  },
  {
    label: "Current Streak",
    value: "—",
    icon: Flame,
  },
];

export default function CPStats() {
  return (
    <section className="border-b border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-6
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-50
                      text-purple-700
                    "
                  >
                    <Icon size={19} />
                  </div>

                  <span className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </span>
                </div>

                <p className="mt-4 text-3xl font-extrabold text-gray-950">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}