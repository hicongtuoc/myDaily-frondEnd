import {Provider} from "react-redux";
import type { AppProps } from 'next/app'
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import '../styles/globals.scss'
import '../styles/themes/index.scss'

export default function MyApp({
 Component,
 pageProps,
 router,
}: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
