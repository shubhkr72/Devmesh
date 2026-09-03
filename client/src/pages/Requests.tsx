import RequestCard from "@/components/requests/RequestCard";
import PageHeader from "@/components/layouts/PageHeader";
import useRequests from "@/hooks/useRequests";
import { AlertCircle, ArrowRight, Inbox, Loader2, Sparkles, UserCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Requests = () => {
  const { requests, loading, error, handleAcceptRequest, handleRejectRequest } =
    useRequests();

  return (
    <main className="min-h-screen">
      <PageHeader
        showBack
        eyebrow="Requests"
        title="Review incoming interest"
        description="Accept promising developers into your network or decline requests that are not the right fit."
        icon={<Inbox className="h-5 w-5" />}
        action={
          requests.length > 0 ? (
            <Badge className="bg-accent/10 px-3 py-1.5 text-accent">
              {requests.length} pending
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
                Loading connection requests
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Checking the developers waiting for your review.
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
                Requests could not load
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {error}
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && requests.length === 0 && (
          <Card className="surface-panel mx-auto w-full max-w-2xl">
            <CardContent className="p-8 text-center sm:p-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                No pending requests
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                A polished profile helps more developers understand why they
                should connect with you.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild className="h-11">
                  <Link to="/discover">
                    <Sparkles className="h-4 w-4" />
                    Browse feed
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link to="/profile">
                    <Users className="h-4 w-4" />
                    Edit profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {requests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Requests;
