import { API_BASE_URL } from "@/constants";
import type { RootState } from "@/store/appStore";
import type { UserInfo } from "@/store/slices/userSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo as updateUserInfo } from "@/store/slices/userSlice";
import { toast } from "sonner";

const useProfile = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(user);
  const [updating, setUpdating] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleUpdateProfile = async (
    newUserInfo: UserInfo | null
  ) => {
    if (!newUserInfo) {
      toast.error("Profile information is missing.");
      return;
    }

    if (updating) {
      toast.error("Profile update already in progress.");
      return;
    }

    try {
      setUpdating(true);

      const processedSkills = Array.isArray(newUserInfo.skills)
        ? newUserInfo.skills
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0)
        : [];

      const payload = {
        name: newUserInfo.name?.trim() || "",
        age: newUserInfo.age,
        gender: newUserInfo.gender || "",
        about: newUserInfo.about?.trim() || "",
        skills: JSON.stringify(processedSkills),
      };

      console.log("PROFILE UPDATE PAYLOAD:", payload);

      const response = await axios.patch(
        `${API_BASE_URL}/profile/edit`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("PROFILE UPDATE RESPONSE:", response.data);

      if (response.status !== 200) {
        throw new Error("Profile update failed");
      }

      const updatedUser =
        response.data?.data ||
        response.data?.user ||
        response.data;

      if (!updatedUser) {
        throw new Error("Server did not return updated user data");
      }

      setUserInfo(updatedUser);
      dispatch(updateUserInfo(updatedUser));

      toast.success("Profile updated successfully!", {
        description: "Your changes have been saved.",
      });
    } catch (error: unknown) {
      console.error("PROFILE UPDATE ERROR:", error);

      if (axios.isAxiosError(error)) {
        console.error("STATUS:", error.response?.status);
        console.error("SERVER RESPONSE:", error.response?.data);

        const serverData = error.response?.data;

        let message = "Please check your information and try again.";

        if (typeof serverData === "string") {
          message = serverData;
        } else if (serverData?.message) {
          message = serverData.message;
        } else if (serverData?.error) {
          message = serverData.error;
        } else if (error.message) {
          message = error.message;
        }

        toast.error("Failed to update profile", {
          description: message,
        });
      } else {
        toast.error("Failed to update profile", {
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        });
      }

      throw error;
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (updating) {
      toast.error("Password change already in progress.");
      return;
    }

    try {
      setUpdating(true);

      const response = await axios.patch(
        `${API_BASE_URL}/profile/changePassword`,
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to change password");
      }

      toast.success("Password updated successfully!");
    } catch (error: unknown) {
      console.error("PASSWORD CHANGE ERROR:", error);

      if (axios.isAxiosError(error)) {
        console.error("STATUS:", error.response?.status);
        console.error("SERVER RESPONSE:", error.response?.data);

        const serverData = error.response?.data;

        let message =
          "Please check your current password and try again.";

        if (typeof serverData === "string") {
          message = serverData;
        } else if (serverData?.message) {
          message = serverData.message;
        } else if (serverData?.error) {
          message = serverData.error;
        }

        toast.error("Failed to change password", {
          description: message,
        });
      } else {
        toast.error("Failed to change password", {
          description: "Something went wrong.",
        });
      }

      throw error;
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setUserInfo(user);
  };

  return {
    userInfo,
    setUserInfo,
    handleUpdateProfile,
    handleChangePassword,
    handleCancelEdit,
    updating,
  };
};

export default useProfile;