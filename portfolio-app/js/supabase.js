const { createClient } = window.supabase;
const { url, anonKey } = window.SUPABASE_CONFIG;
const isConfigured = url && anonKey && !url.includes('YOUR_') && !anonKey.includes('YOUR_');
const sb = isConfigured ? createClient(url, anonKey) : null;
window.sb = sb;
window.requireSupabase = function () {
  if (!sb) throw new Error('ยังไม่ได้ตั้งค่า Supabase ใน js/config.js');
  return sb;
};
window.escapeHtml = function (value='') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
};
