$('year').textContent = new Date().getFullYear();
let allVideos=[], allCategories=[];
async function load(){
 if(!sb){$('portfolioGrid').innerHTML='<div class="empty-state">ตั้งค่า Supabase ใน js/config.js ก่อนใช้งานข้อมูลจริง</div>';return;}
 const [vr,cr]=await Promise.all([sb.from('videos').select('*, categories(name)').eq('published',true).order('sort_order',{ascending:true}),sb.from('categories').select('*').order('sort_order',{ascending:true})]);
 allVideos=vr.data||[]; allCategories=cr.data||[];
 $('filters').innerHTML='<button class="filter active" data-id="all">ทั้งหมด</button>'+allCategories.map(c=>`<button class="filter" data-id="${c.id}">${escapeHtml(c.name)}</button>`).join('');
 document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.id)})); render('all');
}
function render(id){const list=id==='all'?allVideos:allVideos.filter(v=>v.category_id===id);$('portfolioGrid').innerHTML=list.map(v=>`<a class="video-card" href="video.html?id=${v.id}"><div class="thumb">${v.thumbnail_url?`<img src="${escapeHtml(v.thumbnail_url)}" alt="">`:'<div class="thumb-placeholder">VIDEO</div>'}<span class="play">▶</span></div><div class="video-info"><span class="tag">${escapeHtml(v.categories?.name||'WORK')}</span><h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.description||'')}</p></div></a>`).join('');$('portfolioEmpty').classList.toggle('hidden',list.length>0)}
load().catch(console.error);
