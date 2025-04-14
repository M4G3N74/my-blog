// `pages/_app.js`
import '../styles/global.css';
import '../styles/print.css';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
