import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserInitials } from "@/components/ui/user-initials";
import type { UserInfo } from "@/store/slices/userSlice";
import { getDisplayName } from "@/lib/user";
import { AtSign, Calendar, Code2, Heart, User, X } from "lucide-react";
import { motion } from "framer-motion";

const ProfileCard = ({
  user,
  handleSendRequest,
  handleIgnoreProfile,
  compact = false,
}: {
  user: Partial<UserInfo>;
  handleSendRequest?: (userId: string) => Promise<void>;
  handleIgnoreProfile?: (requestId: string) => Promise<void>;
  compact?: boolean;
}) => {
  if (!user) return null;

  const { name, username, age, gender, about, skills } = user;
  const displaySkills = skills?.filter((skill: string) => skill.trim()) || [];
  const hasActions = Boolean(handleSendRequest || handleIgnoreProfile);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card
        className={`surface-panel w-full overflow-hidden py-0 ${
          compact ? "max-w-sm" : "max-w-2xl"
        }`}
      >
        <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 via-transparent to-transparent p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <UserInitials
              name={name}
              username={username}
              size={compact ? "lg" : "xl"}
            />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
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
                {!age && !gender && (
                  <Badge variant="secondary">New profile</Badge>
                )}
              </div>

              <h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                {getDisplayName({ name, username })}
              </h2>

              {username && (
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <AtSign className="h-3.5 w-3.5" />
                  {username}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="space-y-6">
            <section>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold text-foreground">About</h3>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                {about ||
                  "This developer has not shared their story yet."}
              </p>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h3 className="text-sm font-semibold text-foreground">
                  Skills
                </h3>
              </div>

              {displaySkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {displaySkills
                    .slice(0, compact ? 5 : 8)
                    .map((skill, index) => (
                      <Badge key={index} variant="skill">
                        <Code2 className="h-3 w-3" />
                        {skill.trim()}
                      </Badge>
                    ))}
                  {displaySkills.length > (compact ? 5 : 8) && (
                    <Badge variant="outline">
                      +{displaySkills.length - (compact ? 5 : 8)}
                    </Badge>
                  )}
                </div>
              ) : (
                <Badge variant="outline" className="border-dashed">
                  <Code2 className="h-3 w-3" />
                  Skills coming soon
                </Badge>
              )}
            </section>
          </div>

          {hasActions && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                disabled={!handleIgnoreProfile}
                className="h-12 cursor-pointer"
                onClick={() =>
                  handleIgnoreProfile && handleIgnoreProfile(user._id || "")
                }
              >
                <X className="h-5 w-5" />
                Pass
              </Button>
              <Button
                disabled={!handleSendRequest}
                className="h-12 cursor-pointer"
                onClick={() =>
                  handleSendRequest && handleSendRequest(user._id || "")
                }
              >
                <Heart className="h-5 w-5" />
                Connect
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
