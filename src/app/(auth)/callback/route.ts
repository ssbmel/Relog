import { createClient } from '@/src/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // 비밀번호 찾기의 경우 url에 error가 넘어올 수 있음
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      if (next) {
        return NextResponse.redirect(`${origin}${next}`)
      }
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // 코드가 없거나 에러 발생 시 (e.g. 만료된 링크)
  // 로그인 페이지로 에러 파라미터와 함께 전송
  return NextResponse.redirect(`${origin}/login?message=만료되었거나 유효하지 않은 링크입니다.`)
}
