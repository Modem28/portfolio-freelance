# Dayfolio — ซอร์สโค้ดเว็บไซต์พอร์ตฟอลิโอ

ZIP นี้มีซอร์สโค้ดทั้งโปรเจกต์ ไฟล์ตั้งค่า lockfile ภาพประกอบที่ใช้จริง และคู่มือนี้ ไฟล์ภาพถูกคัดลอกไว้ใน `client/public/assets/` เพื่อให้รันนอก Manus ได้ ไม่มี `.git`, `node_modules`, `.env` หรือ build output

## เริ่มรัน

ติดตั้ง Node.js และ pnpm 10.18.0 จากนั้นรันในโฟลเดอร์โปรเจกต์:

```sh
pnpm install --frozen-lockfile
pnpm dev:static
```

เปิด `http://localhost:3000` ตรวจโค้ด/ทดสอบ/build ได้ด้วย `pnpm check`, `pnpm test` และ `pnpm build:static`

## แก้ข้อมูลและลิงก์คลิป

แก้ชื่อโปรไฟล์ รายละเอียด สถานะรับงาน ช่องทาง LINE/Facebook, ลิงก์คลิป และรหัสผ่านควบคุมการแสดงผลงานได้ใน `client/src/lib/portfolio-content.ts` วาง Google Drive share URL ใน `driveUrl` ของคลิปแต่ละใบ และกำหนดสิทธิ์ Drive เป็น “ทุกคนที่มีลิงก์ — ผู้ดู”

รหัสผ่านปัจจุบันเป็นค่าเริ่มต้นสำหรับตัวอย่าง ให้เปลี่ยน `worksTogglePassword` ในไฟล์เดียวกันก่อนใช้งานจริง

## ข้อจำกัดของปุ่มซ่อนผลงาน

ปุ่มซ่อน/แสดงเป็นแบบ browser-only: ต้องกรอกรหัสที่ตั้งไว้และสถานะจำใน `localStorage` ของโปรไฟล์เบราว์เซอร์นั้นเท่านั้น ไม่เปลี่ยนการแสดงผลในเบราว์เซอร์ของคนอื่น และไม่ใช่ระบบรักษาความปลอดภัย เพราะรหัสผ่านกับ URL ผลงานอยู่ใน client-side code จึงตรวจดูหรือเลี่ยงได้ ห้ามใช้เพื่อปกป้องผลงานที่เป็นความลับ

ภาพโปรไฟล์อยู่ที่ `client/public/assets/profile-avatar.webp` และภาพท้ายเว็บอยู่ที่ `client/public/assets/footer-character.png` เปลี่ยนไฟล์แล้วคงชื่อเดิม หรือแก้ path ใน `portfolio-content.ts`
