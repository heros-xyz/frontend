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
    value: "medal",
  },
  {
    Icon: <CricketIcon />,
    IconBorder: (color: string) => <ArchiveIconCricket color={color} />,
    value: "cricket",
  },
  {
    Icon: <FlagIcon />,
    IconBorder: (color: string) => <ArchiveIconFlag color={color} />,
    value: "flag",
  },
  {
    Icon: <GolfIcon />,
    IconBorder: (color: string) => <ArchiveIconGolf color={color} />,
    value: "golf",
  },
  {
    Icon: <TennisIcon />,
    IconBorder: (color: string) => <ArchiveIconTennis color={color} />,
    value: "tennis",
  },
  {
    Icon: <SoccerIcon />,
    IconBorder: (color: string) => <ArchiveIconSoccer color={color} />,
    value: "soccer",
  },
];

export const getSportIcon = (value: string | undefined, color?: string) => {
  if (!value) return;
  const icon = SPORT_ICONS_MOCK.find((item) => item.value === value);

  return icon?.IconBorder(color as string) ?? "";
};
