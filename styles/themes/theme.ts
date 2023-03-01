import { extendTheme } from "@chakra-ui/react";
import { Switch } from "./switch";
import { colors } from "./colors";
import { Button } from "./button";
import { Card } from "./card";
import { Input } from "./input";
import { Container } from "./container";
import { Textarea } from "./textarea";
import { Radio } from "./radio";

const breakpoints = {
  sm: "481px",
  md: "769px",
  lg: "1025px",
  xl: "1201px",
};

const theme = extendTheme({
  components: {
    Button,
    Card,
    Container,
    Input,
    Textarea,
    Switch,
    Radio,
  },
  breakpoints,
  colors,
  fonts: {
    heading: "CabinetGrotesk Heading",
    body: "CabinetGrotesk Body",
  },
  radii: {
    10: "10px",
  },
  fontSizes: {
    xxs: "0.625rem",
  },
  global: {
    a: {
      color: "inherit",
      textDecoration: "none",
    },
    "&::-webkit-scrollbar": {
      width: "4px",
      height: "4px",
    },
    "&::-webkit-scrollbar-track": {
      width: "6px",
      background: "#c8dff5",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#1b77d2",
      borderRadius: "24px",
    },
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    small: "0.01em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
});

export default theme;
