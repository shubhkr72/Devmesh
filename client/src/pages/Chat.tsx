import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserInitials } from "@/components/ui/user-initials";
import BackButton from "@/components/ui/back-button";
import {
  ArrowLeft,
  AtSign,
  Code2,
  Heart,
  Loader2,
  MoreVertical,
  Send,
} from "lucide-react";
import ChatBubble from "@/components/chat/ChatBubble";
import useChat from "@/hooks/useChat";
import { getDisplayName, getFirstName } from "@/lib/user";
import { motion } from "framer-motion";

export default function Chat() {
  const {
    input,
    setInput,
    messages,
    handleSend,
    userId,
    targetUser,
  } = useChat();

  if (!userId || !targetUser) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="surface-panel w-full max-w-sm">
          <CardContent className="flex flex-col items-center justify-center p-10 text-center">
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
            <p className="font-semibold text-foreground">
              Loading conversation
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Preparing the chat window.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const targetFirstName = getFirstName(targetUser?.name);

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="sticky top-16 z-30 border-b border-border bg-card/95 backdrop-blur-xl">
        <div className="section-container py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                aria-label="Go back"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="hidden sm:block">
                <BackButton />
              </div>

              <UserInitials
                name={targetUser?.name}
                username={targetUser?.username}
                size="md"
              />

              <div className="min-w-0 flex-1">
                <h2 className="truncate font-semibold text-foreground">
                  {getDisplayName(targetUser)}
                </h2>
                {targetUser?.username && (
                  <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <AtSign className="h-3 w-3 shrink-0" />
                    {targetUser.username}
                  </p>
                )}
              </div>
            </div>

            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <section className="section-container min-h-[calc(100vh-13rem)] py-6">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex min-h-[calc(100vh-19rem)] max-w-2xl flex-col items-center justify-center text-center"
          >
            <UserInitials
              name={targetUser?.name}
              username={targetUser?.username}
              size="xl"
              className="mb-4 shadow-sm"
            />
            <h3 className="text-2xl font-semibold text-foreground">
              Start a conversation with {targetFirstName}
            </h3>
            {targetUser?.about && (
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                {targetUser.about}
              </p>
            )}

            {targetUser?.skills && targetUser.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {targetUser.skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} variant="skill">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="rounded-lg border border-border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
                onClick={() =>
                  setInput(
                    `Hi ${targetFirstName}! I saw your profile and would love to hear what technologies you are working with lately.`
                  )
                }
              >
                <Code2 className="mb-3 h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">
                  Ask about their stack
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start with current tools and projects.
                </p>
              </button>

              <button
                type="button"
                className="rounded-lg border border-border bg-card p-4 text-left shadow-sm transition-colors hover:border-accent/40 hover:bg-accent/5"
                onClick={() =>
                  setInput(
                    `Hey ${targetFirstName}! I am interested in connecting with fellow developers. What has your coding journey looked like so far?`
                  )
                }
              >
                <Heart className="mb-3 h-5 w-5 text-accent" />
                <p className="font-semibold text-foreground">
                  Ask about their journey
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open with experience and interests.
                </p>
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-4 pb-24">
            {messages.map((message, index) => (
              <ChatBubble
                key={message._id || index}
                message={message}
                userId={userId}
                targetUserName={targetUser?.name}
                targetUserUsername={targetUser?.username}
              />
            ))}
          </div>
        )}
      </section>

      <div className="sticky bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur-xl">
        <div className="section-container py-4">
          <div className="mx-auto flex max-w-4xl items-center gap-3">
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${targetFirstName}...`}
                className="h-12 rounded-full border-border bg-background pr-12"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                maxLength={1000}
              />

              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                size="icon"
                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {input.length > 800 && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {input.length}/1000 characters
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
