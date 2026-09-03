import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserInitials } from "@/components/ui/user-initials";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/appStore";
import useLogout from "@/hooks/useLogout";
import { getDisplayName } from "@/lib/user";
import { PLATFORM_NAME } from "@/lib/platform";
import {
  User,
  LogOut,
  Heart,
  Users,
  MessageSquare,
  Menu,
  CodeXml,
  Home as HomeIcon,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/discover", label: "Discover", icon: Heart },
  { to: "/connections", label: "Connections", icon: Users },
  { to: "/requests", label: "Requests", icon: MessageSquare },
];

const Header = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const user = useSelector((store: RootState) => store.user.userInfo);

  const { handleLogout } = useLogout();

  const handleLogoutClick = () => {
    handleLogout();
    setIsAlertOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-card/90 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-85"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <CodeXml className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-semibold text-foreground">
              {PLATFORM_NAME}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Developer network
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 p-2 lg:flex">
          {(user ? navItems : navItems.filter((item) => item.to === "/")).map(
            ({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
              </NavLink>
            )
          )}
        </nav>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 px-3 py-2 lg:flex">
              <div className="max-w-40 leading-tight">
                <p className="truncate text-sm font-semibold text-foreground">
                  {getDisplayName(user)}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.username}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary lg:hidden">
                  <Menu className="h-5 w-5" />
                </div>
                <div className="hidden lg:block">
                  <UserInitials
                    name={user.name}
                    username={user.username}
                    size="md"
                    className="cursor-pointer ring-2 ring-transparent transition-all duration-200 hover:ring-primary/20"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 border-border bg-card"
              >
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-foreground">
                    {getDisplayName(user)}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.username}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <div className="px-2 py-1 lg:hidden">
                  {navItems.map(({ to, label, icon: Icon }) => (
                    <DropdownMenuItem key={to} asChild>
                      <NavLink
                        to={to}
                        end={to === "/"}
                        className="w-full cursor-pointer items-center gap-2 rounded-md"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="lg:hidden" />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="w-full cursor-pointer items-center gap-2 rounded-md"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer items-center gap-2 rounded-md text-destructive focus:text-destructive"
                  onClick={() => setIsAlertOpen(true)}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/login">Sign in</Link>
          </Button>
        )}
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-foreground">
              <LogOut className="h-5 w-5 text-destructive" />
              <span>Confirm Logout</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              You will be redirected to the login page and will need to sign in
              again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer border-border bg-card text-foreground hover:bg-secondary">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-destructive text-white hover:bg-destructive/90"
              onClick={handleLogoutClick}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;
