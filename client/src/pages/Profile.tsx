import EditProfileForm from "@/components/Profile/EditProfileForm";
import ProfileCard from "@/components/Profile/ProfileCard";
import PageHeader from "@/components/layouts/PageHeader";
import useProfile from "@/hooks/useProfile";
import type { UserInfo } from "@/store/slices/userSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Loader2, User } from "lucide-react";

const Profile = () => {
  const {
    userInfo,
    setUserInfo,
    handleUpdateProfile,
    handleChangePassword,
    handleCancelEdit,
    updating,
  } = useProfile();

  if (!userInfo) {
    return (
      <main className="min-h-screen">
        <PageHeader
          showBack
          eyebrow="Profile"
          title="Your developer profile"
          description="Shape the details that help other builders understand your work, interests, and collaboration style."
          icon={<User className="h-5 w-5" />}
        />

        <section className="section-container py-8 sm:py-10">
          <Card className="surface-panel mx-auto w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
              <p className="font-semibold text-foreground">
                Loading your profile
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Fetching your latest profile details.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        showBack
        eyebrow="Profile"
        title="Tune your developer signal"
        description="Keep your profile sharp so people can quickly see what you build, what you know, and why they should connect."
        icon={<User className="h-5 w-5" />}
      />

      <section className="section-container grid gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_390px]">
        <EditProfileForm
          user={userInfo}
          setUserInfo={setUserInfo}
          onUpdate={handleUpdateProfile}
          onChangePassword={handleChangePassword}
          onCancel={handleCancelEdit}
          updating={updating}
        />

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Eye className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Live preview</h2>
              <p className="text-sm text-muted-foreground">
                How other developers see you
              </p>
            </div>
          </div>
          <ProfileCard user={userInfo as Partial<UserInfo>} compact />
        </aside>
      </section>
    </main>
  );
};

export default Profile;
