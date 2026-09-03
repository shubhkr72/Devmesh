import type { UserInfo } from "@/store/slices/userSlice";

export function getUserInitials(
  name?: string,
  username?: string
): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return name.slice(0, 2).toUpperCase();
  }

  return username?.slice(0, 2).toUpperCase() || "U";
}

export function getDisplayName(user: {
  name?: string;
  username?: string;
}): string {
  return user.name?.trim() || user.username || "Developer";
}

export function getFirstName(name?: string): string {
  return name?.trim().split(/\s+/)[0] || "there";
}

export function sanitizeUser<T extends Record<string, unknown>>(
  user: T
): UserInfo {
  const {
    imageUrl,
    profileImage,
    photoUrl,
    ...safe
  } = user;

  void imageUrl;
  void profileImage;
  void photoUrl;

  return safe as unknown as UserInfo;
}

export function sanitizeUsers(
  users: Record<string, unknown>[]
): UserInfo[] {
  return users.map((user) => sanitizeUser(user));
}