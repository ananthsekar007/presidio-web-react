import { useMediaQuery, useTheme } from "@mui/material";

export function useIsDesktop() {
  const theme = useTheme();
  const isComputer = useMediaQuery(theme.breakpoints.up("sm"));

  return isComputer;
}
