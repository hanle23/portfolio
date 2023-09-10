import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

export default function Toggle() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  return (
    <Switch
      checked={isDark}
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      size="xl"
      color="warning"
      iconOff={<SunIcon filled />}
      iconOn={<MoonIcon filled />}
    />
  );
}
