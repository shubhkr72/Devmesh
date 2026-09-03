import type { RequestData } from "@/hooks/useRequests";
import type { UserInfo } from "@/store/slices/userSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserInitials } from "@/components/ui/user-initials";
import { getDisplayName } from "@/lib/user";
import { AtSign, Calendar, Check, Code2, User, X } from "lucide-react";
import { motion } from "framer-motion";

const RequestCard = ({
  request,
  onAccept,
  onReject,
}: {
  request: RequestData;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const { name, username, about, age, gender, skills } =
    request.sender as UserInfo;

  const displaySkills = skills?.filter((skill: string) => skill.trim()) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="surface-panel h-full py-0 transition-shadow hover:shadow-md">
        <CardContent className="flex h-full flex-col p-5">
          <div className="flex items-start gap-4">
            <UserInitials name={name} username={username} size="lg" />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-foreground">
                {getDisplayName({ name, username })}
              </h3>
              {username && (
                <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                  <AtSign className="h-3 w-3 shrink-0" />
                  {username}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {age && (
                  <Badge variant="age">
                    <Calendar className="h-3 w-3" />
                    {age}
                  </Badge>
                )}
                {gender && (
                  <Badge variant="gender" className="capitalize">
                    <User className="h-3 w-3" />
                    {gender}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <p className="mt-5 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
            {about || "This developer has not shared their story yet."}
          </p>

          <div className="mt-5 flex min-h-8 flex-wrap gap-2">
            {displaySkills.length > 0 ? (
              <>
                {displaySkills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="skill">
                    <Code2 className="h-3 w-3" />
                    {skill.trim()}
                  </Badge>
                ))}
                {displaySkills.length > 4 && (
                  <Badge variant="outline">+{displaySkills.length - 4}</Badge>
                )}
              </>
            ) : (
              <Badge variant="outline" className="border-dashed">
                <Code2 className="h-3 w-3" />
                Skills coming soon
              </Badge>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              className="h-11 cursor-pointer"
              onClick={() => onAccept(request._id)}
            >
              <Check className="h-4 w-4" />
              Accept
            </Button>
            <Button
              variant="outline"
              className="h-11 cursor-pointer border-destructive/25 text-destructive hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onReject(request._id)}
            >
              <X className="h-4 w-4" />
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RequestCard;
