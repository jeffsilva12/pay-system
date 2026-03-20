import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Providers from "./providers";
import Script from "next/script";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Pay System",
  description: "CMS"
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}