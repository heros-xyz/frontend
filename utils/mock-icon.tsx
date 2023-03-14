import { FlagIcon } from "@/components/svg/IconAddMilestone/FlagIcon";
import { GolfIcon } from "@/components/svg/IconAddMilestone/GolfIcon";
import { CricketIcon } from "@/components/svg/IconAddMilestone/CricketIcon";
import { SoccerIcon } from "@/components/svg/IconAddMilestone/SoccerIcon";
import { TennisIcon } from "@/components/svg/IconAddMilestone/TennisIcon";
import { MedalIcon } from "@/components/svg/IconAddMilestone/MedalIcon";
import { ArchiveIconCricket } from "@/components/svg/SportIcons/ArchiveIconCricket";
import { ArchiveIconFlag } from "@/components/svg/SportIcons/ArchiveIconFlag";
import { ArchiveIconMedal } from "@/components/svg/SportIcons/ArchiveIconMedal";
import { ArchiveIconGolf } from "@/components/svg/SportIcons/ArchiveIconGolf";
import { ArchiveIconSoccer } from "@/components/svg/SportIcons/ArchiveIconSoccer";
import { ArchiveIconTennis } from "@/components/svg/SportIcons/ArchiveIconTennis";

export const SPORT_ICONS_MOCK = [
  {
    Icon: <MedalIcon />,
    IconBorder: (color: string) => <ArchiveIconMedal color={color} />,
    value: "MEDAL",
  },
  {
    Icon: <CricketIcon />,
    IconBorder: (color: string) => <ArchiveIconCricket color={color} />,
    value: "CRICKET",
  },
  {
    Icon: <FlagIcon />,
    IconBorder: (color: string) => <ArchiveIconFlag color={color} />,
    value: "FLAG",
  },
  {
    Icon: <GolfIcon />,
    IconBorder: (color: string) => <ArchiveIconGolf color={color} />,
    value: "GOLF",
  },
  {
    Icon: <TennisIcon />,
    IconBorder: (color: string) => <ArchiveIconTennis color={color} />,
    value: "TENNIS",
  },
  {
    Icon: <SoccerIcon />,
    IconBorder: (color: string) => <ArchiveIconSoccer color={color} />,
    value: "SOCCER",
  },
];

export const getSportIcon = (value: string | null, color?: string) => {
  if (!value) return;
  const icon = SPORT_ICONS_MOCK.find((item) => item.value === value);

  return icon?.IconBorder(color as string) ?? "";
};
