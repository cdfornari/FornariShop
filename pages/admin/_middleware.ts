import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent){
    const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    if(!session){
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login';
        url.search = `page=${req.page.name}`;
        return NextResponse.redirect(url);
    }
    if(session.user.role !== 'admin'){
        const url = req.nextUrl.clone()
        url.pathname = '/';
        url.search = '';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}