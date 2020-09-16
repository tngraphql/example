# API GraphQL

# Install

```bash
npm install
ts-node ace generate:key
```

generate key xác thực để tạo mã jwt khi login

```bash
ts-node ace auth:keys
```

Hãy chỉnh các thông số kết nối db mysql trong file `.env`

sau đó chạy lện sau để migrate.

```bash
ts-node ace migration:run
```

sau cùng chạy lệnh

```bash
npm run dev
```