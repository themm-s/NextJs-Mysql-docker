import type { AppProps } from 'next/app';
import './styles.scss';
import NavBar from '@/components/NavBar/NavBar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}