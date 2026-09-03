import usePlatformStats from "@/hooks/usePlatformStats";
import {
  PLATFORM_NAME,
  PLATFORM_TAGLINE,
} from "@/lib/platform";
import type { RootState } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Code2,
  Loader2,
  MessageSquare,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const { stats, loading: statsLoading } = usePlatformStats();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        <div className="section-container relative py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-7 py-3.5 text-sm font-semibold text-primary">
              <Sparkles className="h-6 w-6" />
              Developer network · Discover · Connect · Chat
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
              Welcome to{" "}
              <span className="text-primary">{PLATFORM_NAME}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {PLATFORM_TAGLINE}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {user ? (
                <Button asChild size="lg" className="h-12 px-10 text-xl">
                  <Link to="/discover">
                    Start discovering
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="h-12 px-8">
                    <Link to="/register">
                      Get started free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8">
                    <Link to="/login">Sign in</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>

          {/* Live stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3"
          >
            <Card className="surface-panel py-0 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                {statsLoading ? (
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {stats?.totalUsers ?? "—"}
                  </p>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  Developers on {PLATFORM_NAME}
                </p>
              </CardContent>
            </Card>

            <Card className="surface-panel py-0 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold text-foreground">10</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Profiles per discover session
                </p>
              </CardContent>
            </Card>

            <Card className="surface-panel py-0 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold text-foreground">Live</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real-time chat after connecting
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What we do */}
      <section className="section-container py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            What does {PLATFORM_NAME} do?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            {PLATFORM_NAME} is a focused developer networking platform. Instead of
            noisy social feeds, it helps you find people by skills and story,
            send connection requests, build a circle of collaborators, and chat
            in real time once you are both interested.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card/70 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-10 w-10" />
            </div>
            <h3 className="font-semibold text-foreground">Discover</h3>
          </div>

          <div className="rounded-xl border border-border bg-card/70 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <UserPlus className="h-10 w-10" />
            </div>
            <h3 className="font-semibold text-foreground">Connect</h3>
          </div>

          <div className="rounded-xl border border-border bg-card/70 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Code2 className="h-10 w-10" />
            </div>
            <h3 className="font-semibold text-foreground">Collaborate</h3>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="border-t border-border/60 bg-gradient-to-br from-primary/5 to-transparent py-16">
        <div className="section-container text-center">
          <h2 className="text-3xl font-semibold text-foreground">
            Ready to grow your developer network?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Join {stats?.totalUsers ?? "other"} developers on {PLATFORM_NAME} and
            start finding your next collaborator today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {user ? (
              <Button asChild size="lg" className="h-14 px-9">
                <Link to="/discover">
                  Go to Discover
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="h-12 px-8">
                  <Link to="/register">
                    Create free account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link to="/login">Sign in</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
