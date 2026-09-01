const $ = id => document.getElementById(id);
$('year').textContent = new Date().getFullYear();
async function loadHome(){
  if(!sb){ $('homeGrid').innerHTML='<div class="empty-state">ตั้งค่า Supabase ใน js/config.js ก่อนใช้งานข้อมูลจริง</div>'; return; }
  const [profileRes,videosRes,mediaRes] = await Promise.all([
    sb.from('profiles').select('*').limit(1).maybeSingle(),
    sb.from('videos').select('*, categories(name)').eq('published', true).order('featured',{ascending:false}).order('sort_order',{ascending:true}).limit(6),
    sb.from('profile_media').select('*').eq('published', true).order('sort_order',{ascending:true}).order('created_at',{ascending:false})
  ]);
  const p=profileRes.data; const v=videosRes.data; const media=mediaRes.data;
  if(p){ $('shopName').textContent=p.shop_name||'Blueframe Studio'; $('footerName').textContent=p.shop_name||''; $('heroBio').textContent=p.bio||''; $('aboutBio').textContent=p.bio||''; $('shopDescription').textContent=p.description||''; if(p.logo_url){$('navLogo').src=p.logo_url;$('navLogo').classList.remove('hidden');$('navLogoFallback').classList.add('hidden')} if(p.profile_image){$('profileImage').src=p.profile_image;$('profileImage').classList.remove('hidden');$('profileFallback').classList.add('hidden')} }
  const grid=$('homeGrid');
  if(!v?.length){$('homeEmpty').classList.remove('hidden');} else {
    const featured=v.find(x=>x.featured)||v[0];
    $('featuredTitle').textContent=featured.title; $('featuredDesc').textContent=featured.description||featured.categories?.name||''; $('featuredLink').href=`video.html?id=${featured.id}`;
    grid.innerHTML=v.map(card).join('');
  }
  renderProfileMedia(media||[]);
}
function renderProfileMedia(items){
  const grid=$('profileMediaGrid'), empty=$('profileMediaEmpty');
  if(!items.length){empty.classList.remove('hidden');return;}
  grid.innerHTML=items.map(m=>{const safe=escapeHtml(m.media_url);const body=m.media_type==='video'?`<video src="${safe}" controls preload="metadata"></video>`:`<img src="${safe}" alt="${escapeHtml(m.title||'Profile media')}">`;return `<article class="profile-media-card"><div class="profile-media-visual">${body}</div><div class="profile-media-copy"><span class="tag">${m.media_type==='video'?'VIDEO':'IMAGE'}</span>${m.title?`<h3>${escapeHtml(m.title)}</h3>`:''}${m.caption?`<p>${escapeHtml(m.caption)}</p>`:''}</div></article>`;}).join('');
}
function card(v){ return `<a class="video-card" href="video.html?id=${v.id}"><div class="thumb">${v.thumbnail_url?`<img src="${escapeHtml(v.thumbnail_url)}" alt="">`:'<div class="thumb-placeholder">VIDEO</div>'}<span class="play">▶</span></div><div class="video-info"><span class="tag">${escapeHtml(v.categories?.name||'WORK')}</span><h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.description||'')}</p></div></a>`; }
loadHome().catch(e=>console.error(e));
