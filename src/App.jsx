import { ThemeProvider, CssBaseline } from "@mui/material";
import muiTheme from "./theme/muiTheme";
import { CartProvider } from "./context/CartContext";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "./context/WishlistContext";
const App = () => {
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <CartProvider>
                <WishlistProvider>
                    <AppRouter />
                    <Toaster position="top-center" reverseOrder={false} />
                </WishlistProvider>
            </CartProvider>
        </ThemeProvider>
    );
};

export default App;
