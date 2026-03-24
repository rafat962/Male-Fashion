import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import muiTheme from "./theme/muiTheme";
import { CartProvider } from "./context/CartContext";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
    return (
        <ThemeProvider>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                <CartProvider>
                    <WishlistProvider>
                        <AppRouter />
                        <Toaster position="top-center" reverseOrder={false} />
                    </WishlistProvider>
                </CartProvider>
            </MuiThemeProvider>
        </ThemeProvider>
    );
};

export default App;
