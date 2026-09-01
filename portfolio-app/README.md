# Blueframe Portfolio App

เว็บ Portfolio สำหรับงานตัดคลิป พร้อมหน้าเว็บและหลังบ้านที่เชื่อม Supabase

## เริ่มใช้งาน
1. สร้างโปรเจกต์ใน Supabase
2. เปิด SQL Editor แล้วรัน `sql/schema.sql`
3. ไปที่ Authentication > Users > เพิ่มผู้ใช้สำหรับแอดมิน
4. เปิด `js/config.js` แล้วใส่ Project URL และ anon/publishable key
5. เปิด `index.html` ผ่าน Live Server ใน VS Code (แนะนำ) หรือ deploy ขึ้นโฮสต์ static เช่น GitHub Pages / Netlify / Vercel
6. เข้าหลังบ้านที่ `/admin/login.html`

## รูป/วิดีโอ
โค้ดเวอร์ชันนี้ใช้ URL โดยตรงเพื่อให้เริ่มง่ายและทดสอบเร็ว เช่น URL จาก CDN, Cloudinary หรือ Supabase Storage ได้

## ความปลอดภัย
- ใช้ Supabase anon/publishable key ใน frontend ได้
- ห้ามเอา `service_role` key ใส่ใน frontend
- RLS ใน `schema.sql` เปิดให้ public อ่านเฉพาะ videos ที่ `published = true`
- ผู้ใช้ที่ล็อกอินแล้วมีสิทธิ์จัดการข้อมูลตาม policy ในตัวอย่าง

## จุดที่แก้เองบ่อย
- สี/หน้าตา: `css/style.css`, `css/admin.css`
- ข้อมูล Supabase: `js/config.js`
- หน้าเว็บ: `index.html`, `portfolio.html`, `video.html`
- หลังบ้าน: `admin/*.html`
- Logic: `js/*.js`


## โปรไฟล์: รูปภาพ / คลิปแนะนำตัว
รัน SQL ใน `sql/schema.sql` เพื่อสร้างตาราง `profile_media` แล้วเข้า `admin/profile.html` จะมีฟอร์มเพิ่มรูปภาพหรือวิดีโอด้วย URL พร้อมหัวข้อ คำอธิบาย ลำดับ และสถานะแสดง/ซ่อน

สื่อที่ตั้งเป็น `published = true` จะไปแสดงอัตโนมัติในหน้าหลักส่วน **มุมที่อยากให้คุณเห็น**
