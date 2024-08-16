import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request)

  let tryingToLogin:boolean=
  request.nextUrl.pathname.startsWith("/signin") || request.nextUrl.pathname.startsWith("/signup");
  if (user && tryingToLogin) {
    let url=request.nextUrl.clone();
    url.pathname="/dashboard";
    return NextResponse.redirect(url)
  }
  if(!user && request.nextUrl.pathname.startsWith("/dashboard")){
    let url=request.nextUrl.clone();
    url.pathname="/signin";
    return NextResponse.redirect(url)
  }
  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}