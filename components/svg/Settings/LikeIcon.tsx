import { Icon, IconProps } from "@chakra-ui/react";

export const LikeIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_9139_73939)">
        <path
          d="M3.70457 6.04688H1.38976C1.00623 6.04688 0.695312 6.36365 0.695312 6.75442V14.594C0.695312 14.9848 1.00623 15.3016 1.38976 15.3016H3.70457C4.0881 15.3016 4.39902 14.9848 4.39902 14.594V6.75442C4.39902 6.36365 4.0881 6.04688 3.70457 6.04688Z"
          stroke="#1E16C1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.28877 6.04665V2.24477C9.28877 1.39571 8.61285 0.707031 7.77951 0.707031H6.65914C6.2147 0.707031 5.84433 1.07496 5.84433 1.53722V4.7825C5.84433 5.48062 5.28877 6.04665 4.60359 6.04665H4.39062V15.3014H12.5666C13.3814 15.3014 14.0851 14.7165 14.2332 13.8957L15.2517 8.49005C15.4925 7.2259 14.5388 6.04665 13.2703 6.04665H9.261H9.28877Z"
          stroke="#1E16C1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9139_73939">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};
