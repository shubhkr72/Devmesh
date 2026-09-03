import { API_BASE_URL } from "@/constants";
import type { RootState } from "@/store/appStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserInfo } from "@/store/slices/userSlice";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

const isPublicRoute = (pathname: string) => PUBLIC_ROUTES.includes(pathname);

const useUserInfo = () => {
  const user = useSelector((store: RootState) => store.user.userInfo);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const redirectToLogin = () => {
      if (!isPublicRoute(pathname)) {
        navigate("/login", { replace: true });
      }
    };

    const fetchUserInfo = async () => {
      if (user) {
        setAuthChecked(true);
        return;
      }

      try {
        const response = await axios.get(API_BASE_URL + "/profile", {
          withCredentials: true,
        });

        if (response.data?.user) {
          dispatch(setUserInfo(response.data.user));
          setAuthChecked(true);
          return;
        }

        redirectToLogin();
      } catch {
        redirectToLogin();
      } finally {
        setAuthChecked(true);
      }
    };

    fetchUserInfo();
  }, [dispatch, user, navigate, pathname]);

  useEffect(() => {
    if (authChecked && !user && !isPublicRoute(pathname)) {
      navigate("/login", { replace: true });
    }
  }, [authChecked, user, pathname, navigate]);

  return { user, authChecked, isPublicRoute: isPublicRoute(pathname) };
};

export default useUserInfo;
