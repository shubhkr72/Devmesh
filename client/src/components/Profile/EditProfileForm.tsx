import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserInfo } from "@/store/slices/userSlice";
import { AlertCircle, AtSign, Save, X } from "lucide-react";

export default function EditProfileForm({
  user,
  setUserInfo,
  onUpdate,
  onChangePassword,
  onCancel,
  updating = false,
}: {
  user: UserInfo | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
  onUpdate: (newUserInfo: UserInfo | null) => Promise<void>;
  onChangePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  onCancel: () => void;
  updating?: boolean;
}) {
  if (!user) return null;
  const { name, username, age, gender, skills, about } = user;
  const skillCount = skills ? skills.filter((s) => s !== "").length : 0;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      alert("Please fill in both password fields");
      return;
    }
    try {
      await onChangePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      // Error handled by hook's toast
    }
  };

  return (
    <Card className="surface-panel w-full py-0">
      <CardHeader className="border-b border-border p-6">
        <CardTitle className="text-2xl font-semibold text-foreground">
          Edit profile
        </CardTitle>
        <CardDescription className="text-sm leading-6 text-muted-foreground">
          Update the details that drive discovery, requests, and better chats.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <form className="space-y-8">
          <section className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Basic details</h3>
              <p className="text-sm text-muted-foreground">
                Keep this clear and easy to scan.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) =>
                    setUserInfo((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    )
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    disabled
                    className="pl-9 opacity-70"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Username cannot be changed.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  min="18"
                  max="100"
                  value={age || ""}
                  onChange={(e) =>
                    setUserInfo((prev) =>
                      prev
                        ? {
                            ...prev,
                            age: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          }
                        : prev
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  defaultValue={gender || undefined}
                  onValueChange={(value) =>
                    setUserInfo((prev) =>
                      prev ? { ...prev, gender: value } : prev
                    )
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">
                Skills and story
              </h3>
              <p className="text-sm text-muted-foreground">
                These details make your profile easier to match with.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills and technologies</Label>
              <Input
                id="skills"
                type="text"
                value={skills?.join(", ") || ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const skillsArray = inputValue
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s !== "");

                  if (skillsArray.length > 8) {
                    return;
                  }

                  setUserInfo((prev) =>
                    prev
                      ? {
                          ...prev,
                          skills: inputValue.split(",").map((s) => s.trim()),
                        }
                      : prev
                  );
                }}
                placeholder="JavaScript, React, Node.js, Python"
              />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Separate each skill with a comma.
                </span>
                <span
                  className={
                    skillCount > 8 ? "text-destructive" : "text-muted-foreground"
                  }
                >
                  {skillCount}/8
                </span>
              </div>

              {skillCount > 8 && (
                <div className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  <span>Maximum of 8 skills allowed.</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">Developer story</Label>
              <Textarea
                id="about"
                value={about || ""}
                onChange={(e) =>
                  setUserInfo((prev) =>
                    prev ? { ...prev, about: e.target.value } : prev
                  )
                }
                placeholder="Share what you build, what you enjoy, and what kind of developers you want to meet."
                maxLength={250}
                className="min-h-[120px] resize-none"
              />

              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Short, specific profiles perform better.
                </span>
                <span
                  className={
                    (about?.length || 0) > 225
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  {about?.length || 0}/250
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Security</h3>
              <p className="text-sm text-muted-foreground">
                Update your password to keep your account secure.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <Button
              onClick={handlePasswordChange}
              disabled={updating}
              className="h-10 w-full px-4 sm:w-auto"
            >
              {updating ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-b-transparent" />
                  Updating
                </>
              ) : (
                "Change password"
              )}
            </Button>
          </section>
        </form>
      </CardContent>

      <CardFooter className="grid gap-3 border-t border-border p-6 sm:grid-cols-2">
        <Button
          type="submit"
          disabled={updating}
          className="h-11 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => onUpdate(user)}
        >
          {updating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-b-transparent" />
              Updating
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save changes
            </>
          )}
        </Button>
        <Button
          variant="outline"
          disabled={updating}
          className="h-11 cursor-pointer disabled:cursor-not-allowed"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
