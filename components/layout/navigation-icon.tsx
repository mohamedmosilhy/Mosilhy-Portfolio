import {
  Blocks,
  BriefcaseBusiness,
  Circle,
  Send,
  UserRound,
} from "lucide-react";

export interface NavigationIconProps {
  readonly itemId: string;
}

export function NavigationIcon({ itemId }: NavigationIconProps) {
  const Icon =
    {
      about: UserRound,
      contact: Send,
      projects: BriefcaseBusiness,
      skills: Blocks,
    }[itemId] ?? Circle;

  return <Icon aria-hidden="true" data-navigation-icon />;
}
