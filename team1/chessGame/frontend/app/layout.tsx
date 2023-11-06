import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './rootLayout.module.css'
import Link from 'next/link'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

import { config } from "@fortawesome/fontawesome-svg-core";
import { faChessBoard, faEllipsis, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false; 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <header className={styles.header}>
            <Link href="./main" style={{textDecoration: "none"}}>
              <FontAwesomeIcon icon={faChessBoard} className={styles.logoChessGame} />
            </Link>
            <div className={styles.nav}>
                <Link className={styles.navAccounts} href="./sign-in" >Sign in</Link>
                <Link className={styles.navAccounts} href="./sign-up" >Sign up</Link>
                <FontAwesomeIcon icon={faEllipsisVertical} className={styles.navAccounts} />
            </div>
        </header>
        {children}
        <footer className={styles.footer}>
             <h1 className={styles.footerCreate}>By team 1 SET 2023</h1>
        </footer>
      </body>
    </html>
  )
}