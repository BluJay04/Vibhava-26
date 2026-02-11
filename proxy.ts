import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { distance } from 'fastest-levenshtein'

const VALID_ROUTES = [
  'bookings',
  'itinerary',
  'event'
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore standard Next.js paths, static files, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') || // likely a file extension
    pathname.startsWith('/api') ||
    pathname === '/'
  ) {
    return NextResponse.next()
  }

  // Get the first segment of the path
  const firstSegment = pathname.split('/')[1]

  // If the segment is already valid, continue
  if (VALID_ROUTES.includes(firstSegment)) {
    return NextResponse.next()
  }

  // Find the closest matching route
  let closestMatch = ''
  let minDistance = Infinity

  for (const route of VALID_ROUTES) {
    const d = distance(firstSegment, route)
    if (d < minDistance) {
      minDistance = d
      closestMatch = route
    }
  }

  // Threshold for redirection (allow 1 or 2 typos depending on length)
  const threshold = closestMatch.length > 4 ? 2 : 1

  if (minDistance <= threshold && minDistance > 0) {
    // Construct new URL
    const newPath = pathname.replace(`/${firstSegment}`, `/${closestMatch}`)
    const url = request.nextUrl.clone()
    url.pathname = newPath
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
