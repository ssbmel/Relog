"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Supabase는 종종 에러나 토큰을 query string(?code=...) 대신 URL hash(#error=...) 형태로 전달합니다.
// 서버 라우트 핸들러(route.ts)는 브라우저 단의 hash를 읽을 수 없기 때문에
// 클라이언트 트리의 최상단에서 이를 감지하고 적절히 리다이렉트하는 우회 방안입니다.
export function SupabaseHashCatcher() {
  const router = useRouter();
  const [isCatching, setIsCatching] = useState(false);

  useEffect(() => {
    // URL에 해시가 존재하는지 확인
    if (typeof window !== "undefined" && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      
      const error = hashParams.get("error");
      const errorDescription = hashParams.get("error_description");
      // 혹시 access_token 이 해시로 넘어오는 경우 (Implicit flow)
      const accessToken = hashParams.get("access_token");
      
      if (error) {
        setIsCatching(true);
        // 에러를 발견하면 쿼리 파라미터로 변환하여 로그인 페이지로 리다이렉트
        const message = decodeURIComponent(errorDescription || error).replace(/\+/g, ' ');
        router.replace(`/login?message=${encodeURIComponent(message)}`);
        return;
      }
      
      if (accessToken) {
         // 만약 PKCE 코드가 아닌 토큰 자체가 해시로 왔을 경우엔 
         // Supabase 클라이언트가 자체적으로 세션을 세팅하도록 둬야 하므로
         // URL 해시를 깔끔하게 정리만 해줍니다 (Hydration 충돌 방지)
         window.location.hash = "";
      }
    }
  }, [router]);

  // 해시 처리 중일 때 앱의 나머지 부분이 렌더링되면서 Hydration 에러를 발생시키는 것을 미연에 방지
  if (isCatching) return null;

  return null;
}
