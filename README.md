## I18Next + React Router v7 (SEO)

Mẫu ứng dụng React Router v7 bật SSR, đa ngôn ngữ với i18next (Server + Client), URL được bản địa hóa bằng key translation, và tối ưu SEO (meta/OG tags, cache dịch). Dự án dùng Vite, Tailwind v4 plugin, TypeScript.

### Tính năng chính

- **SSR React Router v7**: cấu hình tại `react-router.config.ts` (`ssr: true`).
- **i18next (SSR & CSR)**: middleware phát hiện ngôn ngữ từ `?lng=` hoặc header `Accept-Language`, khởi tạo instance server và hydrate client.
- **URL đa ngôn ngữ bằng key**: sử dụng `LinkLocalized` và hook `useLocalizedPath` để sinh đường dẫn theo bản dịch trong `app/locales/*/translation.ts`.
- **SEO meta động**: `meta()` ở từng route sử dụng dữ liệu loader và/hoặc i18n để sinh `title`, `description`, OG tags.
- **API dịch có cache**: endpoint `/api/locales/:lng/:ns` trả JSON kèm `ETag`, `Cache-Control` và `stale-while-revalidate`.
- **Tailwind + Vite**: cấu hình tại `vite.config.ts` (port 8080).

## Yêu cầu

- Node.js 18+ (khuyến nghị 20+)
- pnpm 9+ (hoặc npm/yarn tương đương)

## Cài đặt & chạy

```bash
pnpm install
pnpm dev
# Mặc định: http://localhost:8080

pnpm build
pnpm start
```

### Scripts

- `pnpm dev`: chạy dev server React Router + Vite
- `pnpm build`: build server/client
- `pnpm start`: chạy server build bằng `@react-router/serve`
- `pnpm typecheck`: sinh types route và kiểm tra TypeScript
- `pnpm lint`: ESLint fix trong `app/**/*.{js,jsx,ts,tsx}`
- `pnpm prettier` / `pnpm prettier:check`

## Cấu trúc chính

- `app/root.tsx`: đăng ký middleware i18n, `meta()`, layout, `LanguageSwitcher`
- `app/entry.server.tsx`: SSR với `I18nextProvider` + `ServerRouter`
- `app/entry.client.tsx`: hydrate với `i18next-fetch-backend` gọi API dịch
- `app/middleware/i18next.ts`: tạo instance i18n server, phát hiện ngôn ngữ
- `app/constants/index.ts`: `DEFAULT_LANGUAGE`, `SUPPORTED_LANGUAGES`, `LANGUAGE_METADATA`, `CACHE_CONFIG`, `API_CONFIG`, `DOMAIN`
- `app/locales/`: nguồn dịch `en`, `vi` và `index.ts` tập hợp `Resource`
- `app/components/link-localized.tsx`: Link sinh URL theo bản dịch
- `app/hooks/use-localized-path.ts`: hook sinh `to` theo key
- `app/routes/api.locales.$lng.$ns.tsx`: API trả dữ liệu dịch theo `lng` và `ns`
- `app/routes/`: các route demo (`/`, `/about-us`, `/:slug`)

## Cấu trúc dự án

```text
i18n-router-v7-seo
├── app/
│   ├── app.css
│   ├── assets/
│   │   ├── index.ts
│   │   └── review.jpg
│   ├── components/
│   │   ├── index.ts
│   │   ├── language-switcher.tsx
│   │   └── link-localized.tsx
│   ├── constants/
│   │   └── index.ts
│   ├── entry.client.tsx
│   ├── entry.server.tsx
│   ├── hooks/
│   │   ├── index.ts
│   │   └── use-localized-path.ts
│   ├── locales/
│   │   ├── en/
│   │   │   ├── index.ts
│   │   │   └── translation.ts
│   │   ├── index.ts
│   │   └── vi/
│   │       ├── index.ts
│   │       └── translation.ts
│   ├── middleware/
│   │   └── i18next.ts
│   ├── root.tsx
│   ├── routes/
│   │   ├── about-us/
│   │   │   ├── gioi-thieu.tsx
│   │   │   ├── index.tsx
│   │   │   └── layout.tsx
│   │   ├── api.locales.$lng.$ns.tsx
│   │   ├── index.tsx
│   │   └── slug.tsx
│   ├── routes.ts
│   └── types/
│       ├── index.ts
│       ├── language.ts
│       └── music.ts
├── Dockerfile
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── public/
│   └── favicon.ico
├── react-router.config.ts
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## Cách URL đa ngôn ngữ hoạt động

Các đường dẫn được định nghĩa bằng key trong file dịch và được map sang URL theo ngôn ngữ:

```ts
// app/locales/en/translation.ts
export default {
  "/": "/",
  "/about-us": "/about-us",
  // ...
};

// app/locales/vi/translation.ts
export default {
  "/": "/",
  "/about-us": "/gioi-thieu",
  // ...
};
```

Dùng `LinkLocalized` để sinh URL đúng theo ngôn ngữ hiện tại:

```tsx
// Ví dụ
<LinkLocalized to="/about-us" className="text-blue-500">Về chúng tôi</LinkLocalized>
```

Hoặc dùng hook `useLocalizedPath` nếu cần xử lý `to` thủ công:

```tsx
const { localizedPath } = useLocalizedPath();
const to = localizedPath("/about-us");
```

## Chuyển ngôn ngữ

- `LanguageSwitcher` gửi `GET` cùng tham số `?lng=vi|en` (submit lên `action={location.pathname}`) và gọi `i18n.changeLanguage` để đồng bộ client.
- Server đọc `?lng=` hoặc `Accept-Language` tại `getLocaleFromRequest()` trong `app/middleware/i18next.ts`.

## API dịch và cache

- Endpoint: ``/api/locales/:lng/:ns`` (ví dụ: `/api/locales/en/translation`)
- Kiểm tra `:lng` có trong `SUPPORTED_LANGUAGES` và `:ns` có trong `SUPPORTED_NAMESPACES`.
- Trả JSON kèm header `ETag`, `Cache-Control: public, max-age=..., stale-while-revalidate=...` (cấu hình tại `CACHE_CONFIG`).

## SEO

- `app/root.tsx` khai báo meta mặc định (title/og tags) và `og:url` dựa trên `DOMAIN`.
- Route `app/routes/index.tsx` và `about-us/layout.tsx` sinh meta từ i18n; `app/routes/slug.tsx` sinh meta động (title, og:image, og:url, ...).

## Tuỳ biến cấu hình i18n

- File: `app/constants/index.ts`
  - `DEFAULT_LANGUAGE`: ngôn ngữ mặc định (mặc định `vi`)
  - `SUPPORTED_LANGUAGES`: danh sách ngôn ngữ hỗ trợ (mặc định `vi`, `en`)
  - `SUPPORTED_NAMESPACES`: namespaces dịch (mặc định `translation`)
  - `LANGUAGE_METADATA`: tên, cờ, code cho từng ngôn ngữ
  - `CACHE_CONFIG`: TTL và `stale-while-revalidate` cho API dịch
  - `API_CONFIG`: base path API dịch

### Thêm ngôn ngữ mới (ví dụ: `fr`)

1. Cập nhật enum tại `app/types/language.ts`:

```ts
export enum LanguageType { VI = "vi", EN = "en", FR = "fr" }
```

2. Bổ sung vào `SUPPORTED_LANGUAGES` và `LANGUAGE_METADATA` trong `app/constants/index.ts`.
3. Tạo thư mục `app/locales/fr` gồm `translation.ts` và `index.ts` export mặc định.
4. Đảm bảo key đường dẫn (ví dụ `"/about-us"`) có bản dịch tương ứng trong `fr`.

## Lưu ý triển khai

- Bật/tắt SSR tại `react-router.config.ts` (`ssr: true|false`).
- `vite.config.ts` chạy dev ở port `8080`.
- Nếu triển khai server chạy `pnpm start`, entry server là `./build/server/index.js`.

## Giấy phép

MIT
