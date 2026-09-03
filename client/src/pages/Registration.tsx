import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { PLATFORM_FEATURES, PLATFORM_NAME } from "@/lib/platform";
import type { RootState } from "@/store/appStore";
import { Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/discover");
    }
  }, [user, navigate]);

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="section-container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="order-2 mx-auto w-full max-w-md lg:order-1">
          <RegistrationForm />
        </section>

        <section className="order-1 hidden lg:block lg:order-2">
          <div className="ml-auto max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-accent/20 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent">
              <Sparkles className="h-4 w-4" />
              Join {PLATFORM_NAME}
            </div>
            <h1 className="text-5xl font-semibold leading-tight text-foreground">
              Create a profile that starts better conversations.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Add your stack, interests, and story so other developers on{" "}
              {PLATFORM_NAME} can find the right reason to connect.
            </p>

            <div className="mt-8 space-y-3">
              {PLATFORM_FEATURES.slice(0, 3).map(
                ({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card/85 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Registration;
