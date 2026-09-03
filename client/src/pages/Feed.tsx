import DiscoverCard from "@/components/discover/DiscoverCard";
import PageHeader from "@/components/layouts/PageHeader";
import useFeed from "@/hooks/useFeed";
import { DISCOVER_LIMIT } from "@/lib/platform";
import {
  ArrowRight,
  Loader2,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Feed = () => {
  const {
    profiles,
    error,
    loading,
    searchQuery,
    setSearchQuery,
    clearSearch,
    handleSendRequest,
    handleIgnoreProfile,
  } = useFeed();

  const visibleProfiles = profiles.slice(0, DISCOVER_LIMIT);
  const isSearching = searchQuery.trim().length > 0;

  return (
    <main className="min-h-screen">
      <PageHeader
        showBack
        eyebrow="Discover"
        title="Meet builders worth talking to"
        description="Browse up to ten developer profiles at a time — review their stack, story, and intent, then connect when someone feels like the right collaborator."
        icon={<Sparkles className="h-5 w-5" />}
      />

      <section className="section-container py-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {isSearching ? "Search results" : "Suggested developers"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {isSearching
                ? `Matching @${searchQuery.trim()}`
                : `Showing ${visibleProfiles.length} of ${DISCOVER_LIMIT} slots`}
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-9 pr-9"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {loading && (
          <Card className="surface-panel mx-auto w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />

              <p className="font-semibold text-foreground">
                {isSearching
                  ? "Searching developers"
                  : "Finding developers for your feed"}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {isSearching
                  ? `Looking for @${searchQuery.trim()}...`
                  : "Pulling the latest profiles from codemesh."}
              </p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="surface-panel mx-auto w-full max-w-md border-destructive/25">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-destructive">
                Feed could not load
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {error}
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && visibleProfiles.length === 0 && (
          <Card className="surface-panel mx-auto w-full max-w-2xl">
            <CardContent className="p-8 text-center sm:p-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {isSearching ? (
                  <Search className="h-7 w-7" />
                ) : (
                  <Users className="h-7 w-7" />
                )}
              </div>

              <h3 className="text-2xl font-semibold text-foreground">
                {isSearching
                  ? "No developers found"
                  : "No more profiles right now"}
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                {isSearching
                  ? `No profile matches "@${searchQuery.trim()}". Try a different username or clear the search.`
                  : "You have reviewed the available developers. Check connections, update your profile, or come back when new builders join codemesh."}
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                {isSearching ? (
                  <Button className="h-11" onClick={clearSearch}>
                    Clear search
                  </Button>
                ) : (
                  <Button asChild className="h-11">
                    <Link to="/profile">
                      Update profile
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && !error && visibleProfiles.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {visibleProfiles.map((profile, index) => (
              <DiscoverCard
                key={profile._id}
                user={profile}
                index={index}
                onConnect={handleSendRequest}
                onPass={handleIgnoreProfile}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Feed;