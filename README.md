# Configuration Constants

File này chứa các hằng số cấu hình cho ứng dụng, giúp dễ dàng thay đổi các giá trị mặc định.

## Cách sử dụng

### Thay đổi ngôn ngữ mặc định

Để thay đổi ngôn ngữ mặc định từ Tiếng Việt sang Tiếng Anh:

```typescript
// Trong file app/config/constants.ts
export const DEFAULT_LANGUAGE = "en"; // Thay đổi từ "vi" thành "en"
```

### Thêm ngôn ngữ mới

1. Thêm mã ngôn ngữ vào `SUPPORTED_LANGUAGES`:

```typescript
export const SUPPORTED_LANGUAGES = ["vi", "en", "fr"] as const;
```

2. Thêm metadata cho ngôn ngữ mới:

```typescript
export const LANGUAGE_METADATA = {
    vi: { name: "Tiếng Việt", flag: "🇻🇳", code: "vi" },
    en: { name: "English", flag: "🇺🇸", code: "en" },
    fr: { name: "Français", flag: "🇫🇷", code: "fr" }, // Thêm dòng này
} as const;
```

3. Tạo file translation cho ngôn ngữ mới trong `app/locales/fr/translation.ts`

4. Cập nhật file `app/locales/index.ts` để export ngôn ngữ mới

### Thay đổi cấu hình cache

```typescript
export const CACHE_CONFIG = {
    MAX_AGE: 3600, // Thay đổi từ 86400 (24h) thành 3600 (1h)
    STALE_WHILE_REVALIDATE: 86400, // Thay đổi từ 604800 (7 ngày) thành 86400 (1 ngày)
} as const;
```

## Các hằng số có sẵn

- `DEFAULT_LANGUAGE`: Ngôn ngữ mặc định của ứng dụng
- `SUPPORTED_LANGUAGES`: Danh sách các ngôn ngữ được hỗ trợ
- `SUPPORTED_NAMESPACES`: Danh sách các namespace translation
- `LANGUAGE_METADATA`: Metadata cho mỗi ngôn ngữ (tên, cờ, mã)
- `CACHE_CONFIG`: Cấu hình cache cho API
- `API_CONFIG`: Cấu hình API endpoints

## Lưu ý

- Sau khi thay đổi `DEFAULT_LANGUAGE`, cần restart server để áp dụng thay đổi
- Đảm bảo tạo đầy đủ file translation cho ngôn ngữ mới
- Kiểm tra TypeScript types sau khi thêm ngôn ngữ mới
