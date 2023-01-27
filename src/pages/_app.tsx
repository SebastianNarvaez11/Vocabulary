import { CustomProvider } from '@/components/CustomProvider'
import { store } from '@/store/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}>
      <Provider store={store}>
        <CustomProvider>
          <Component {...pageProps} />
        </CustomProvider>
      </Provider>
    </SWRConfig>
  )
}
