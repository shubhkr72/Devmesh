import {
  Code2,
  MessageSquare,
  Network,
  Shield,
  Sparkles,
  UserPlus,
} from "lucide-react";

export const PLATFORM_NAME = "Codemesh";

export const PLATFORM_TAGLINE =
  "The developer network for finding collaborators, growing your circle, and chatting.";

export const PLATFORM_STATS = [
  { label: "Skill-first profiles", value: "8 skills max" },
  { label: "Connection flow", value: "Request → Accept → Chat" },
  { label: "Real-time messaging", value: "Socket.IO powered" },
] as const;

export const PLATFORM_FEATURES = [
  {
    icon: Sparkles,
    title: "Smart discovery",
    description:
      "Browse developers by stack, story, and intent. See up to four suggested profiles at a time.",
  },
  {
    icon: UserPlus,
    title: "Request-based matching",
    description:
      "Send a connection request when someone looks like a good fit. No cold DMs — mutual interest first.",
  },
  {
    icon: Network,
    title: "Developer network",
    description:
      "Accepted connections land in your circle. Keep track of who you have met and pick up conversations anytime.",
  },
  {
    icon: MessageSquare,
    title: "Live chat",
    description:
      "Message connected developers instantly with real-time delivery powered by Socket.IO.",
  },
  {
    icon: Code2,
    title: "Stack-forward profiles",
    description:
      "Profiles highlight technologies, a short developer story, and the context that makes collaboration easier.",
  },
  {
    icon: Shield,
    title: "Secure sessions",
    description:
      "JWT cookie-based auth keeps your account protected while you explore, connect, and chat.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create your profile",
    description: "Sign up, add your stack, and write a short story about what you build.",
  },
  {
    step: "02",
    title: "Discover developers",
    description: "Review suggested profiles on the feed and connect with builders who match your interests.",
  },
  {
    step: "03",
    title: "Review requests",
    description: "Accept or decline incoming interest from other developers in your requests inbox.",
  },
  {
    step: "04",
    title: "Start chatting",
    description: "Once connected, open a real-time conversation and explore collaboration.",
  },
] as const;

export const DISCOVER_LIMIT = 10;
