import Head from 'next/head'
import { FC } from 'react'
import { Navbar, SideMenu } from '../ui'

interface Props {
    title: string;
    pageDescription: string;
    imgFullURL?: string;
}

export const ShopLayout: FC<Props> = ({children,title,pageDescription,imgFullURL}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name='description' content={pageDescription}/>
            <meta name='og:title' content={title}/>
            <meta name='og:description' content={pageDescription}/>
            {
                imgFullURL &&
                <meta name='og:image' content={imgFullURL}/>
            }
        </Head>
        <Navbar />
        <SideMenu />
        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0 30px'
        }}>
            {children}
        </main>
    </>
  )
}