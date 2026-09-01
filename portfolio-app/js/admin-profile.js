(async()=>{
await protect();
if(!sb)return;
const form=document.getElementById('profileForm');
const msg=document.getElementById('profileMsg');
const fields=['shop_name','logo_url','profile_image','bio','description'];
const mediaList=document.getElementById('mediaList');
let mediaCache=[];

const {data,error}=await sb.from('profiles').select('*').limit(1).maybeSingle();
if(error){console.error(error);msg.textContent=error.message;msg.className='form-msg error';}
if(data){fields.forEach(k=>document.getElementById(k).value=data[k]||'');}

form.addEventListener('submit',async e=>{e.preventDefault();
 const payload={shop_name:document.getElementById('shop_name').value.trim(),logo_url:document.getElementById('logo_url').value.trim()||null,profile_image:document.getElementById('profile_image').value.trim()||null,bio:document.getElementById('bio').value.trim(),description:document.getElementById('description').value.trim(),updated_at:new Date().toISOString()};
 const r=await sb.from('profiles').upsert(payload,{onConflict:'id'});
 msg.textContent=r.error?r.error.message:'บันทึกโปรไฟล์แล้ว';msg.className='form-msg '+(r.error?'error':'success');
});

async function loadMedia(){
 const {data,error}=await sb.from('profile_media').select('*').order('sort_order',{ascending:true}).order('created_at',{ascending:false});
 if(error){mediaList.innerHTML=`<div class="note">โหลดสื่อไม่สำเร็จ: ${escapeHtml(error.message)}</div>`;return;}
 mediaCache=data||[];
 if(!mediaCache.length){mediaList.innerHTML='<div class="empty-state">ยังไม่มีรูปหรือคลิปแนะนำตัว เพิ่มจากแบบฟอร์มด้านบนได้เลย</div>';return;}
 mediaList.innerHTML=mediaCache.map(m=>`<div class="media-admin-item">
   <div class="media-admin-preview">${m.media_type==='video'?`<video src="${escapeHtml(m.media_url)}" controls preload="metadata"></video>`:`<img src="${escapeHtml(m.media_url)}" alt="">`}</div>
   <div class="media-admin-info"><div><span class="tag">${m.media_type==='video'?'VIDEO':'IMAGE'}</span> ${m.published?'<span class="media-status on">แสดง</span>':'<span class="media-status off">ซ่อน</span>'}</div><h3>${escapeHtml(m.title||'ไม่มีหัวข้อ')}</h3><p>${escapeHtml(m.caption||'')}</p><small>ลำดับ ${m.sort_order}</small></div>
   <div class="media-admin-actions"><button class="mini-btn" data-edit="${m.id}">แก้ไข</button><button class="mini-btn danger" data-delete="${m.id}">ลบ</button></div>
 </div>`).join('');
}

function resetMedia(){['media_id','media_url','media_title','media_caption'].forEach(id=>document.getElementById(id).value='');document.getElementById('media_type').value='image';document.getElementById('media_sort').value=0;document.getElementById('media_published').checked=true;document.getElementById('mediaSubmit').textContent='เพิ่มสื่อ';document.getElementById('mediaCancel').classList.add('hidden');}

const mediaForm=document.getElementById('mediaForm');
mediaForm.addEventListener('submit',async e=>{e.preventDefault();
 const id=document.getElementById('media_id').value;
 const payload={media_type:document.getElementById('media_type').value,media_url:document.getElementById('media_url').value.trim(),title:document.getElementById('media_title').value.trim()||null,caption:document.getElementById('media_caption').value.trim()||null,sort_order:Number(document.getElementById('media_sort').value)||0,published:document.getElementById('media_published').checked};
 if(!payload.media_url)return;
 const r=id?await sb.from('profile_media').update(payload).eq('id',id):await sb.from('profile_media').insert(payload);
 const mm=document.getElementById('mediaMsg');mm.textContent=r.error?r.error.message:(id?'แก้ไขสื่อแล้ว':'เพิ่มสื่อแล้ว');mm.className='form-msg '+(r.error?'error':'success');
 if(!r.error){resetMedia();loadMedia();}
});

mediaList.addEventListener('click',async e=>{const edit=e.target.closest('[data-edit]');const del=e.target.closest('[data-delete]');if(edit){const m=mediaCache.find(x=>x.id===edit.dataset.edit);if(!m)return;document.getElementById('media_id').value=m.id;document.getElementById('media_type').value=m.media_type;document.getElementById('media_url').value=m.media_url;document.getElementById('media_title').value=m.title||'';document.getElementById('media_caption').value=m.caption||'';document.getElementById('media_sort').value=m.sort_order||0;document.getElementById('media_published').checked=m.published;document.getElementById('mediaSubmit').textContent='บันทึกการแก้ไข';document.getElementById('mediaCancel').classList.remove('hidden');window.scrollTo({top:document.getElementById('mediaForm').offsetTop-30,behavior:'smooth'});}if(del){if(!confirm('ลบสื่อนี้ใช่ไหม?'))return;const r=await sb.from('profile_media').delete().eq('id',del.dataset.delete);if(r.error)alert(r.error.message);else loadMedia();}});
document.getElementById('mediaCancel').addEventListener('click',resetMedia);
loadMedia();
})();