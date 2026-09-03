import ConnectionCard from "@/components/connections/ConnectionCard";
import PageHeader from "@/components/layouts/PageHeader";
import useConnections from "@/hooks/useConnections";
import { AlertCircle, ArrowRight, Loader2, Sparkles, UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Connections = () => {
  const { connections, loading, error } = useConnections();

  return (
    <main className="min-h-screen">
      <PageHeader
        showBack
        eyebrow="Network"
        title="Your developer circle"
        description="Keep track of the developers you have connected with and jump back into conversations when work gets interesting."
        icon={<Users className="h-5 w-5" />}
        action={
          connections.length > 0 ? (
            <Badge className="bg-primary/10 px-3 py-1.5 text-primary">
              {connections.length} connection
              {connections.length !== 1 ? "s" : ""}
            </Badge>
          ) : undefined
        }
      />

      <section className="section-container py-8 sm:py-10">
        {loading && (
          <Card className="surface-panel mx-auto w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
              <p className="font-semibold text-foreground">
                Loading your connections
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Checking who is already in your network.
              </p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="surface-panel mx-auto w-full max-w-md border-destructive/25">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-destructive">
                Connections could not load
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {error}
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && connections.length === 0 && (
          <Card className="surface-panel mx-auto w-full max-w-2xl">
            <CardContent className="p-8 text-center sm:p-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserPlus className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                No connections yet
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                Browse profiles, send a request, and accepted matches will show
                up here with a direct chat action.
              </p>
              <Button asChild className="mt-7 h-11">
                <Link to="/discover">
                  <Sparkles className="h-4 w-4" />
                  Discover developers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && !error && connections.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {connections.map((connection) => (
              <ConnectionCard key={connection._id} connection={connection} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Connections;
