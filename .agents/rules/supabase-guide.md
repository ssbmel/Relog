---
trigger: always_on
---

# Supabase Users 테이블 생성 및 Auth 연동 작업

## 요구 사항 
Next.js 프로젝트의 src/mocks 폴더에 있는 mock 데이터를 참고하여 
Supabase에 users 테이블을 생성하고 Auth와 안전하게 연동합니다.

## 작업 단계

### 1단계: Mock 데이터 분석
- src/mocks 폴더의 users 관련 파일을 먼저 확인
- 현재 사용 중인 필드와 데이터 타입을 파악
- 확인된 필드 목록을 나에게 보여주고 확인 요청

### 2단계: 테이블 스키마 설계
- 필수 컬럼:
  - id: UUID (Primary Key, Foreign Key to auth.users)
  - created_at: timestamp with time zone
  - updated_at: timestamp with time zone
- Mock 데이터에서 파악한 컬럼들 추가
- 컬럼에 index 추가 시 필요한 이유에 대해 미리 설명하기. 
- **중요**: 새로운 컬럼 추가가 필요한 경우 반드시 나에게 동의 구하기

### 3단계: Foreign Key 및 Soft Delete 설정

#### 3-1. Foreign Key 연결
- users.id → auth.users.id 연결
- ON DELETE 정책: **RESTRICT** (Auth 삭제 전 users 처리 필요)

#### 3-2. Soft Delete 컬럼 추가
다음 두 컬럼을 추가합니다:

1. **is_deleted**: BOOLEAN
   - 기본값: false
   - 용도: 삭제 여부 빠른 확인

2. **deleted_at**: TIMESTAMP WITH TIME ZONE
   - 기본값: NULL
   - 용도: 삭제 시점 기록
   - 삭제 시 자동으로 현재 시각 설정

#### 3-3. 삭제 처리 로직
- is_deleted = true로 변경
- deleted_at = NOW() 자동 설정
- 실제 데이터는 DB에 유지
- 필요시 나중에 개인정보 익명화 추가 가능

### 4단계: RLS(Row Level Security) 정책 설계
작업 전 다음 사항을 설명:
1. 적용할 RLS 정책의 목적과 범위
2. 각 정책이 허용/차단하는 작업
3. 정책의 예상 동작 시나리오 (최소 2-3개 예시)

RLS 정책 작성 시:
- 각 SQL 로직에 상세한 주석 추가
- 정책의 의도와 동작 원리 설명
- 보안 고려사항 명시

### 5단계: 테이블 생성 실행
- SQL 스크립트 실행
- 생성 결과 확인 및 보고

### 6단계: 검증
- 테이블 구조 확인
- Foreign Key 제약 조건 확인
- RLS 정책 동작 테스트 예시 제공

## 제약 사항
❌ 동의 없이 새로운 컬럼 추가 금지
❌ RLS 정책 설명 없이 바로 적용 금지
❌ 주석 없는 SQL 작성 금지

## 출력 형식
각 단계마다:
1. 작업 내용 설명
2. 실행할 SQL 또는 작업
3. 예상 결과
4. 내 확인 대기 (필요 시)


## 요구사항

전달된 id를 가지는 유저 정보 조회 supabase 로직을 작성할 것.

## 구체적인 방법

### 1. 쿼리 빌더 생성

1. `src/features/users/query-builder` 폴더 내에 `get-user-by-id.builder.ts` 파일을 생성하기 (이미 있다면 생성 X)
2. 함수 이름: `getUserByIdQueryBuilder`
3. **파라미터**:
   - `supabaseClient`: SupabaseClient<Database>
   - `id`: string (유저 id)
   - (선택) 추가로 필요한 파라미터가 있다면 제안하기
4. 반환: Supabase 쿼리 객체
5. **주의사항**:
   - `.single()`을 사용하여 단일 레코드 반환
   - 필요한 필드만 select하기

**예시**:

```typescript
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUserByIdQueryBuilder = (
  supabaseClient: SupabaseClient<Database>,
  id: string,
) => {
  const query = supabaseClient
    .from("users")
    .select("*, is_admin")
    .eq("id", id)
    .single();

  return query;
};
```

### 2. 서비스 생성

1. `src/features/users/services` 폴더 내에 `get-user-by-id.ts` 파일 생성
2. **파라미터**:
   - `supabaseClient`: SupabaseClient<Database>
   - `id`: string
3. **구현 요구사항**:
   - 에러 발생 시 구체적인 메시지와 함께 throw
   - 성공 시 data 반환
4. query-builder 함수를 import하여 사용

**예시**:

```typescript
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { getUserByIdQueryBuilder } from "../query-builder/get-user-by-id.builder";

export const getUserById = async (
  supabaseClient: SupabaseClient<Database>,
  id: string,
): => {
  const { data, error } = await getUserByIdQueryBuilder(supabaseClient, id);

  if (error) {
    throw new Error(`User를 불러오는데 실패했습니다: ${error.message}`);
  }

  return data;
};
```

