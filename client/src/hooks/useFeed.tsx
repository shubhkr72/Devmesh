import { API_BASE_URL } from "@/constants";
import { DISCOVER_LIMIT } from "@/lib/platform";
import { sanitizeUsers } from "@/lib/user";
import type { RootState } from "@/store/appStore";
import { setError, setLoading, setProfiles } from "@/store/slices/feedSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useFeed = () => {
  const feedState = useSelector((state: RootState) => state.feed);
  const profiles = feedState?.profiles ?? [];
  const error = feedState?.error ?? null;
  const loading = feedState?.loading ?? false;

  const [searchQuery, setSearchQuery] = React.useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchFeed = async () => {
      dispatch(setLoading(true));
      try {
        const params = new URLSearchParams({
          page: "1",
          limit: String(DISCOVER_LIMIT),
        });

        const trimmedSearch = searchQuery.trim();
        if (trimmedSearch) {
          params.set("username", trimmedSearch);
        }

        const response = await axios.get(
          `${API_BASE_URL}/user/feed?${params.toString()}`,
          {
            withCredentials: true,
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch feed");
        }

        const data = Array.isArray(response.data.data)
          ? sanitizeUsers(response.data.data)
          : [];

        dispatch(setError(""));
        dispatch(setProfiles(data));
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch feed";
        dispatch(setError(message));
        console.error("Error fetching feed:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    const timer = window.setTimeout(fetchFeed, searchQuery.trim() ? 350 : 0);
    return () => window.clearTimeout(timer);
  }, [dispatch, searchQuery]);

  const handleSendRequest = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID is required to send a request");
      }
      const response = await axios.post(
        API_BASE_URL + "/request/send/interested/" + userId,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to send request");
      }

      dispatch(setProfiles(profiles.filter((p) => p._id !== userId)));

      toast.success("Connection request sent!", {
        description: "Your request has been sent successfully. Good luck!",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to send request";
      dispatch(setError(message));
      toast.error("Failed to send request", {
        description: message || "Please try again later.",
      });
      console.error("Error sending request:", err);
    }
  };

  const handleIgnoreProfile = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID is required to ignore a profile");
      }
      const response = await axios.post(
        API_BASE_URL + `/request/send/ignored/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to ignore profile");
      }

      dispatch(setProfiles(profiles.filter((p) => p._id !== userId)));

      toast("Profile passed", {
        description: "Moving on to the next profile...",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to pass profile";
      dispatch(setError(message));
      toast.error("Failed to pass profile", {
        description: message || "Please try again later.",
      });
      console.error("Error ignoring profile:", err);
    }
  };

  const clearSearch = () => setSearchQuery("");

  return {
    profiles,
    error,
    loading,
    searchQuery,
    setSearchQuery,
    clearSearch,
    handleSendRequest,
    handleIgnoreProfile,
  };
};

export default useFeed;
