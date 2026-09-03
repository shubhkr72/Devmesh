import { LoginForm } from "@/components/login/LoginForm";
import { PLATFORM_NAME, PLATFORM_TAGLINE } from "@/lib/platform";
import type { RootState } from "@/store/appStore";
import { Code2, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/discover");
    }
  }, [user, navigate]);

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="section-container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
              <Code2 className="h-4 w-4" />
              Welcome to {PLATFORM_NAME}
            </div>
            <h1 className="text-5xl font-semibold leading-tight text-foreground">
              Find developers who fit how you build.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {PLATFORM_TAGLINE}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card/80 p-4">
                <Users className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Curated feed
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ten suggested profiles at a time
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card/80 p-4">
                <MessageCircle className="mb-3 h-5 w-5 text-blue-400" />
                <p className="text-sm font-semibold text-foreground">
                  Live chat
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Real-time messaging after connecting
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card/80 p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-accent" />
                <p className="text-sm font-semibold text-foreground">
                  Secure login
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  JWT cookie-based sessions
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <LoginForm />
        </section>
      </div>
    </main>
  );
};

export default Login;
