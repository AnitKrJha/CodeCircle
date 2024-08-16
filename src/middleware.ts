import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  console.log({ middleware: "called" });
  const { user, supabaseResponse } = await updateSession(request)
  console.log({ email: user?.email });

  let tryingToLogin:boolean=
  request.nextUrl.pathname.startsWith("/signin") || request.nextUrl.pathname.startsWith("/signup");
  console.log({user})
  if (user && tryingToLogin) {
    console.log("dsfdsf");
    let url=request.nextUrl.clone();
    url.pathname="/dashboard";
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