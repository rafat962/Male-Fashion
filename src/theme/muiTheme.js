import { createTheme } from "@mui/material/styles";

// ─── MaleFashion Color Tokens ─────────────────────────────
const colors = {
    primary: "#e53637",
    primaryDark: "#c0292a",
    primaryLight: "#fdecea",
    dark: "#1c1c1c",
    darkSoft: "#333333",
    subText: "#6b6b6b",
    border: "#e0e0e0",
    bgGray: "#f5f5f5",
    bgLight: "#fafafa",
    white: "#ffffff",
};

const muiTheme = createTheme({
    // ─── Palette ─────────────────────────────────────────────
    palette: {
        primary: {
            main: colors.primary,
            dark: colors.primaryDark,
            light: colors.primaryLight,
            contrastText: colors.white,
        },
        secondary: {
            main: colors.dark,
            contrastText: colors.white,
        },
        text: {
            primary: colors.dark,
            secondary: colors.subText,
            disabled: colors.border,
        },
        background: {
            default: colors.white,
            paper: colors.white,
        },
        divider: colors.border,
        grey: {
            100: colors.bgLight,
            200: colors.bgGray,
            400: colors.border,
            600: colors.subText,
            900: colors.dark,
        },
    },

    // ─── Typography ───────────────────────────────────────────
    typography: {
        fontFamily: "'Lato', sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,

        h1: {
            fontSize: "3rem",
            fontWeight: 700,
            color: colors.dark,
            letterSpacing: "-0.5px",
        },
        h2: { fontSize: "2.25rem", fontWeight: 700, color: colors.dark },
        h3: { fontSize: "1.875rem", fontWeight: 700, color: colors.dark },
        h4: { fontSize: "1.5rem", fontWeight: 600, color: colors.dark },
        h5: { fontSize: "1.25rem", fontWeight: 600, color: colors.dark },
        h6: { fontSize: "1rem", fontWeight: 600, color: colors.dark },
        subtitle1: {
            fontSize: "0.875rem",
            color: colors.subText,
            letterSpacing: "0.5px",
        },
        subtitle2: {
            fontSize: "0.75rem",
            color: colors.subText,
            textTransform: "uppercase",
            letterSpacing: "1px",
        },
        body1: { fontSize: "1rem", color: colors.darkSoft, lineHeight: 1.7 },
        body2: { fontSize: "0.875rem", color: colors.subText, lineHeight: 1.6 },
        button: {
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontSize: "0.8rem",
        },
    },

    // ─── Shape ───────────────────────────────────────────────
    shape: {
        borderRadius: 4,
    },

    // ─── Component Overrides ─────────────────────────────────
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    padding: "12px 30px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    transition: "all 0.3s ease",
                },
                containedPrimary: {
                    backgroundColor: colors.primary,
                    "&:hover": {
                        backgroundColor: colors.primaryDark,
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(229,54,55,0.35)",
                    },
                },
                outlinedPrimary: {
                    borderColor: colors.primary,
                    color: colors.primary,
                    "&:hover": { backgroundColor: colors.primaryLight },
                },
                containedSecondary: {
                    backgroundColor: colors.dark,
                    "&:hover": { backgroundColor: "#000" },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "none",
                    border: `1px solid ${colors.border}`,
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        transform: "translateY(-4px)",
                    },
                },
            },
        },

        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: colors.primary,
                    color: colors.white,
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    minWidth: "18px",
                    height: "18px",
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                        borderWidth: "1px",
                    },
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white,
                    color: colors.dark,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "1px",
                    height: "22px",
                },
                colorPrimary: {
                    backgroundColor: colors.primary,
                    color: colors.white,
                },
            },
        },

        MuiTab: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    letterSpacing: "1px",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    color: colors.subText,
                    "&.Mui-selected": { color: colors.primary },
                },
            },
        },

        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: colors.primary,
                    height: "2px",
                },
            },
        },

        MuiDivider: {
            styleOverrides: {
                root: { borderColor: colors.border },
            },
        },
    },
});

export default muiTheme;
