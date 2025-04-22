import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState, ReactNode, useContext } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ThemeModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const colorMode = useMemo(() => ({toggleColorMode: () => { setMode((prevMode) => (prevMode === "light" ? "dark" : "light")); }}), []);

    const theme = useMemo(() => createTheme({ palette: { mode }}), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export function useColorMode() {
    return useContext(ColorModeContext);
}