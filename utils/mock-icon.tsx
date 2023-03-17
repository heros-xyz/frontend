import { FlagIcon } from "@/components/svg/IconAddMilestone/FlagIcon";
import { CricketIcon } from "@/components/svg/IconAddMilestone/CricketIcon";
import { SoccerIcon } from "@/components/svg/IconAddMilestone/SoccerIcon";
import { MedalIcon } from "@/components/svg/IconAddMilestone/MedalIcon";
import { ArchiveIconCricket } from "@/components/svg/SportIcons/ArchiveIconCricket";
import { ArchiveIconFlag } from "@/components/svg/SportIcons/ArchiveIconFlag";
import { ArchiveIconMedal } from "@/components/svg/SportIcons/ArchiveIconMedal";
import { ArchiveIconSoccer } from "@/components/svg/SportIcons/ArchiveIconSoccer";

export const SPORT_ICONS_MOCK = [
  {
    Icon: <MedalIcon />,
    IconBorder: (color: string) => <ArchiveIconMedal color={color} />,
    value: "AWARD",
    name: "awards",
  },
  {
    Icon: <CricketIcon />,
    IconBorder: (color: string) => <ArchiveIconCricket color={color} />,
    value: "MATCH",
    name: "match/game/tournament",
  },
  {
    Icon: <FlagIcon />,
    IconBorder: (color: string) => <ArchiveIconFlag color={color} />,
    value: "FLAG",
    name: "win/loss/outcome",
  },
  {
    Icon: <SoccerIcon />,
    IconBorder: (color: string) => <ArchiveIconSoccer color={color} />,
    value: "FOOTBALL",
    name: "goal met",
  },
];

export const getSportIcon = (value: string | null, color?: string) => {
  if (!value) return;
  const icon = SPORT_ICONS_MOCK.find((item) => item.value === value);

  return icon?.IconBorder(color as string) ?? "";
};
