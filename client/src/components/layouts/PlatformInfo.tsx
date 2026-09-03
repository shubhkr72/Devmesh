import {
  HOW_IT_WORKS,
  PLATFORM_FEATURES,
  PLATFORM_NAME,
  PLATFORM_STATS,
  PLATFORM_TAGLINE,
} from "@/lib/platform";
import { Zap } from "lucide-react";

const PlatformInfo = ({ variant = "full" }: { variant?: "full" | "compact" }) => {
  if (variant === "compact") {
    return (
      <section className="mb-8 rounded-xl border border-border/60 bg-card/60 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              About {PLATFORM_NAME}
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              {PLATFORM_TAGLINE}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PLATFORM_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-background/60 px-3 py-2"
              >
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-sm font-semibold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-10">
      <div className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/80 to-card/80 p-6 sm:p-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          <Zap className="h-3.5 w-3.5" />
          Built for developers
        </div>
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          What is {PLATFORM_NAME}?
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
          {PLATFORM_TAGLINE} Whether you are looking for a hackathon partner, an
          open-source collaborator, or someone to trade ideas with, {PLATFORM_NAME}{" "}
          keeps the flow simple: discover, request, connect, and chat.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {PLATFORM_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border/60 bg-background/50 px-4 py-3"
            >
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Platform features
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-border bg-card/70 p-4 transition-colors hover:border-primary/30 hover:bg-card"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <p className="font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">How it works</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map(({ step, title, description }) => (
            <div
              key={step}
              className="rounded-lg border border-border bg-card/70 p-4"
            >
              <span className="text-xs font-bold text-primary">{step}</span>
              <p className="mt-2 font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformInfo;
