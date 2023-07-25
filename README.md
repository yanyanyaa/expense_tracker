### Expense Tracker 記帳工具
這是一個記帳工具，使用者透過註冊會員來建立個人的記帳本，可記錄每筆支出的日期、類別與金額，並且顯示已支出的總金額。

---
### 功能列表（Features）
- 可註冊帳號密碼，或使用 Facebook 登入
- 首頁可看到支出紀錄與累計總金額
- 可在類別選單選擇想要顯示的支出類別
- 可自行新增、修改、刪除紀錄，建立個人記帳簿

---
### 安裝（Installation）
1. 請先確認本地已安裝 node.js 與 npm

2. 打開終端機，clone 此專案至本地
```
git clone https://github.com/yanyanyaa/restaurant_list.git
```

3. 進入此專案資料夾，安裝相關開發軟體
```
npm install
```

4. 安裝 nodemon
```
npm install -g nodemon
```

5. 參考 .env.example 設定環境變數

6. 在終端機輸入指令來執行本專案
```
npm run seed
npm run dev
```

7. 當終端機出現以下字樣，表示伺服器已成功啟動
```
Express is listening on localhost:3000
```

8. 可透過預設帳號登入網站
   
|Email            |Password|
|-----------------|--------|
|user1@example.com|12345678|
|user2@example.com|12345678|


---
### 開發工具

- Node.js 14.16.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- mongoose 5.9.7
- dotenv 16.0.3
- Bootstrap 5.1.3
- Font-awesome 6
- bcryptjs": 2.4.3,
- body-parser": 1.20.2,
- connect-flash": 0.1.1,
- express-session: 1.17.1
- method-override: 3.0.0
- passport: 0.4.1
- passport-facebook": 3.0.0
- passport-local": 1.0.0