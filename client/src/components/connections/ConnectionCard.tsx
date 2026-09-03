import type { UserInfo } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserInitials } from "@/components/ui/user-initials";
import { getDisplayName } from "@/lib/user";
import { AtSign, Calendar, Code2, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";

const ConnectionCard = ({ connection }: { connection: UserInfo }) => {
  const { name, username, age, gender, about, skills, _id } = connection;
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

          <Button asChild className="mt-6 h-11 w-full cursor-pointer">
            <Link to={`/chat/${_id}`}>
              <MessageCircle className="h-4 w-4" />
              Start chat
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConnectionCard;
