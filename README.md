# Admiral Starter Kit

node -v # v20.3.0

## ⌨️ Production

```bash
$ npm install
$ npm run build
$ npm run serve -- --port 3000
```

## ⌨️ Development

```bash
$ npm install
$ npm run dev
```

решить настройку с CORS

Аутентификация через токен.
Токен лежит в localStorage в ключе "admiral_global_admin_session_token"
при отправке любого запроса берётся этот токен и вставляется в хедер Authorisation: "Bearer #{token}"

когда нету или не валидный токен идёт перенаправление на страницу /login

после заполнения формы аутентификации,
на сервер идут 3 запроса

---

    post '/admin/auth/login' do
    status 200
    { token: 'some_token' }.to_json
    end

---

    get '/admin/auth/check-auth' do
    { auth: false }.to_json
    end

---

    get '/admin/auth/get-identity' do
    user_data = { email: 'admin@dev.family',
    id: 1,
    name: 'Dev Family',
    password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    role: 'admin' }
    { user: { \*\*user_data } }.to_json
    end

---
