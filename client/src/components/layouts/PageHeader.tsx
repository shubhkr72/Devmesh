import type { ReactNode } from "react";
import BackButton from "@/components/ui/back-button";

interface PageHeaderProps {
  action?: ReactNode;
  description: string;
  eyebrow: string;
  icon: ReactNode;
  showBack?: boolean;
  title: string;
}

const PageHeader = ({
  action,
  description,
  eyebrow,
  icon,
  showBack = false,
  title,
}: PageHeaderProps) => {
  return (
    <section className="border-b border-border/80 bg-card/85">
      <div className="section-container py-7 sm:py-9">
        {showBack && (
          <div className="mb-5">
            <BackButton />
          </div>
        )}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                {icon}
              </div>
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                {eyebrow}
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
          </div>

          {action && <div className="flex shrink-0 items-center">{action}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
