import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '../../utils';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent){
    const session = await getToken({ req });
    if(session){
        const url = req.nextUrl.clone()
        url.pathname = req.nextUrl.searchParams.get('page') || '/';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
  /*const { token = '' } = req.cookies;
    try {
        await jwt.isValidToken(token);
        const url = req.nextUrl.clone()
        url.pathname = req.nextUrl.searchParams.get('page') || '/';
        return NextResponse.redirect(url);
    } catch (error) {
        console.log(error);
        return NextResponse.next();
    } */
}