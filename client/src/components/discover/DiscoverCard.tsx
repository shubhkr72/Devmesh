import type { UserInfo } from "@/store/slices/userSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserInitials } from "@/components/ui/user-initials";
import { getDisplayName } from "@/lib/user";
import { AtSign, Calendar, Code2, Heart, User, X } from "lucide-react";
import { motion } from "framer-motion";

interface DiscoverCardProps {
  user: Partial<UserInfo>;
  onConnect: (userId: string) => void;
  onPass: (userId: string) => void;
  index?: number;
}

const DiscoverCard = ({
  user,
  onConnect,
  onPass,
  index = 0,
}: DiscoverCardProps) => {
  const { name, username, age, gender, about, skills, _id } = user;
  const displaySkills = skills?.filter((skill) => skill.trim()) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
    >
      <Card className="surface-panel flex h-full flex-col overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 to-transparent p-5">
          <div className="flex items-start gap-3">
            <UserInitials name={name} username={username} size="md" />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold text-foreground">
                {getDisplayName({ name, username })}
              </h3>
              {username && (
                <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                  <AtSign className="h-3 w-3 shrink-0" />
                  {username}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {age && (
                  <Badge variant="age" className="text-[10px]">
                    <Calendar className="h-2.5 w-2.5" />
                    {age}
                  </Badge>
                )}
                {gender && (
                  <Badge variant="gender" className="capitalize text-[10px]">
                    <User className="h-2.5 w-2.5" />
                    {gender}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-5">
          <p className="line-clamp-3 min-h-[3.75rem] text-sm leading-6 text-muted-foreground">
            {about || "This developer has not shared their story yet."}
          </p>

          <div className="mt-4 flex min-h-7 flex-wrap gap-1.5">
            {displaySkills.length > 0 ? (
              <>
                {displaySkills.slice(0, 3).map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="skill" className="text-[10px]">
                    <Code2 className="h-2.5 w-2.5" />
                    {skill.trim()}
                  </Badge>
                ))}
                {displaySkills.length > 3 && (
                  <Badge variant="outline" className="text-[10px]">
                    +{displaySkills.length - 3}
                  </Badge>
                )}
              </>
            ) : (
              <Badge variant="outline" className="border-dashed text-[10px]">
                Skills coming soon
              </Badge>
            )}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
            <Button
              variant="outline"
              size="sm"
              className="h-10 cursor-pointer"
              onClick={() => _id && onPass(_id)}
            >
              <X className="h-4 w-4" />
              Pass
            </Button>
            <Button
              size="sm"
              className="h-10 cursor-pointer"
              onClick={() => _id && onConnect(_id)}
            >
              <Heart className="h-4 w-4" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiscoverCard;
