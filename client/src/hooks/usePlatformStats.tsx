import { API_BASE_URL } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";

interface PlatformStats {
  totalUsers: number;
}

const usePlatformStats = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get<PlatformStats>(
          API_BASE_URL + "/platform/stats"
        );
        setStats(response.data);
        setError(null);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load platform stats";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export default usePlatformStats;
