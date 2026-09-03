import { formatChatTime } from "@/lib/time";
import { UserInitials } from "@/components/ui/user-initials";
import { CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  _id?: string;
  sender: string;
  content: string;
  createdAt?: Date;
}

interface ChatBubbleProps {
  message: Message;
  userId: string;
  targetUserName?: string;
  targetUserUsername?: string;
}

export default function ChatBubble({
  message,
  userId,
  targetUserName,
  targetUserUsername,
}: ChatBubbleProps) {
  if (!userId) return null;

  const isCurrentUser = message.sender === userId;

  return (
    <motion.div
      initial={{ opacity: 0, x: isCurrentUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[86%] items-end gap-2 sm:max-w-[70%] ${
          isCurrentUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isCurrentUser && (
          <UserInitials
            name={targetUserName}
            username={targetUserUsername}
            size="sm"
            className="mb-1"
          />
        )}

        <div className="flex min-w-0 flex-col">
          <div
            className={`relative rounded-2xl px-4 py-2.5 shadow-sm ${
              isCurrentUser
                ? "rounded-br-md bg-primary text-primary-foreground"
                : "rounded-bl-md border border-border bg-card text-foreground"
            }`}
          >
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
              {message.content}
            </p>
          </div>

          <div
            className={`mt-1 flex items-center gap-1 px-1 ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs text-muted-foreground">
              {formatChatTime(message?.createdAt as Date)}
            </span>

            {isCurrentUser && (
              <div className="text-muted-foreground">
                <CheckCheck className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
