import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

type Mode = "light" | "dark";

interface ThemeModeContextType {
  mode: Mode;
  toggleColorMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

export function useColorMode() {
  return useContext(ThemeModeContext);
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("light");

  function toggleColorMode() {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => createTheme({ palette: { mode: mode }}), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
