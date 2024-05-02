// `pages/_app.js`
import '../styles/global.css';
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
