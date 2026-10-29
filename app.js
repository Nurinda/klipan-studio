let PX=60;const $=s=>document.querySelector(s),uid=()=>Math.random().toString(36).slice(2,8),fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
const S={clips:[],texts:[],aud:[],ovl:[],tk:{T:{},O:{},V:{},A:{}},sel:null,t:0,playing:false,ratio:[9,16]},media={},hist=[];
const cv=$('#cv'),ctx=cv.getContext('2d'),vid=document.createElement('video'),img=new Image();vid.playsInline=true;
let cur=null,curM=null,AC,node,exporting=false,rec;
const FX={none:'none',noir:'grayscale(1) contrast(1.5) brightness(.9)',dramatis:'contrast(1.4) saturate(1.3) brightness(.9)',retro:'sepia(.6) hue-rotate(-15deg) saturate(1.4)',neon:'saturate(2.2) contrast(1.2) hue-rotate(10deg)',biru:'hue-rotate(180deg) saturate(1.3)',invert:'invert(1)',glow:'brightness(1.2) blur(1px) saturate(1.4)',terang:'brightness(1.3)',bw:'grayscale(1)',sepia:'sepia(.8)',vivid:'saturate(1.6) contrast(1.1)',cool:'hue-rotate(-20deg) saturate(1.2)',warm:'sepia(.35) saturate(1.3)',blur:'blur(3px)',fade:'brightness(1.15) contrast(.85)'};
const dur=c=>(c.out-c.in)/c.speed,total=()=>S.clips.reduce((a,c)=>a+dur(c),0);
const snap=()=>{hist.push(JSON.stringify([S.clips,S.texts,S.aud,S.ovl]));hist.length>50&&hist.shift();redo.length=0};
function at(t){let a=0;for(const c of S.clips){const d=dur(c);if(t<a+d)return{c,l:(t-a)*c.speed+c.in};a+=d}return null}
function size(){const[w,h]=S.ratio,H=+($('#res')?.value||720);cv.height=H;cv.width=Math.round(H*w/h);const L=$('#pvinfo');L&&(L.textContent=cv.width+' × '+cv.height+' · 30 fps')}size();$('#res').onchange=size;
$('#ratio').onchange=e=>{S.ratio=e.target.value.split(':').map(Number);size()};
$('#file').onchange=async e=>{for(const f of e.target.files){const id=uid(),url=URL.createObjectURL(f),type=f.type.split('/')[0];let d=5;
 if(type!='image')d=await new Promise(r=>{const m=document.createElement(type=='audio'?'audio':'video');m.preload='metadata';m.onloadedmetadata=()=>r(m.duration);m.src=url});
 media[id]={id,url,type,name:f.name,dur:d,file:f}}bin()};
function bin(){const B=$('#bin');B.innerHTML='';Object.values(media).filter(m=>mf=='all'||m.type==mf).forEach(m=>{const d=document.createElement('div');d.className='mi';d.innerHTML=`${m.th?`<img src="${m.th}">`:''}<span>${({video:'🎬',audio:'🎵',image:'🖼'})[m.type]} ${m.name.replace(/</g,'&lt;')} · ${fmt(m.dur)}</span><br>`;
 const add=(t,f)=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{snap();f();render()};d.append(b)};
 if(m.type=='audio')add('+ Suara',()=>{const id=uid();S.aud.push({id,m:m.id,start:S.t,in:0,out:m.dur,vol:1});S.sel=id});
 else{add('+ Utama',()=>{S.clips.push({id:uid(),m:m.id,in:0,out:m.dur,speed:1,vol:1,fx:'none',fade:0})});
  if(m.type=='image'||m.type=='video')add('+ Overlay',()=>{const id=uid(),v=m.type=='video';S.ovl.push({id,k:v?'vid':'img',m:m.id,in:0,out:m.dur,start:S.t,end:S.t+(v?m.dur:4),x:.5,y:.5,s:.6,r:0,op:1,z:0});S.sel=id})}
 B.append(d)})}
function wrap(t,w){const out=[];let l='';for(const x of t.split(' ')){const n=l?l+' '+x:x;if(ctx.measureText(n).width>w&&l){out.push(l);l=x}else l=n}out.push(l);return out}
function frame(){const p=at(S.t);ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.fillRect(0,0,cv.width,cv.height);
 if(p){const c=p.c,m=media[c.m];
  if(cur!==c.id){cur=c.id;if(curM!==m.id){curM=m.id;if(m.type=='image')img.src=m.url;else vid.src=m.url}if(m.type!='image')vid.currentTime=p.l}
  if(m.type!='image'){vid.playbackRate=c.speed;
   if(S.playing){vid.paused&&vid.play().catch(()=>{});Math.abs(vid.currentTime-p.l)>.4&&(vid.currentTime=p.l)}
   else{vid.pause();Math.abs(vid.currentTime-p.l)>.05&&(vid.currentTime=p.l)}}else vid.pause();
  const el=(p.l-c.in)/c.speed,k=c.fade>0?Math.max(0,Math.min(1,el/c.fade,(dur(c)-el)/c.fade)):1;vid.volume=S.tk.V.m?0:Math.min(1,c.vol*k);
  if(m.type!='audio'&&!S.tk.V.h){const s=m.type=='image'?img:vid,w=s.videoWidth||s.naturalWidth,h=s.videoHeight||s.naturalHeight;
   if(w){const u01=el/dur(c);let sc=Math.max(cv.width/w,cv.height/h)*kv(c,'zoom',c.zoom||1,u01),ox=kv(c,'ox',c.ox||0,u01)*cv.width,al=k*kv(c,'op',c.op??1,u01),ro=0,bl=0;const tp=Math.min(1,el/.6);if(c.ef=='denyut')sc*=1+.06*Math.sin(S.t*6);if(c.ef=='getar')ox+=(Math.random()-.5)*10;
   if(c.tr=='fade')al*=tp;else if(c.tr=='slide')ox+=(1-tp)*cv.width;else if(c.tr=='zoom')sc*=1+(1-tp)*.4;else if(c.tr=='putar')ro=(1-tp)*3.14;else if(c.tr=='kabur')bl=(1-tp)*14;
   ctx.save();ctx.globalAlpha=al;ctx.filter=filt(c)+(bl?` blur(${bl}px)`:'');ctx.translate(cv.width/2+ox,cv.height/2+kv(c,'oy',c.oy||0,u01)*cv.height);ctx.rotate(ro);if(c.flip)ctx.scale(-1,1);ctx.drawImage(s,-w*sc/2,-h*sc/2,w*sc,h*sc);ctx.restore()}}
 }else vid.pause();
 fxPost(p);drawOvl();drawTexts()}
let last=performance.now();
function loop(n){const dt=(n-last)/1000;last=n;
 if(S.playing){S.t+=dt;if(S.t>=total()){S.t=total();pause();exporting&&finish()}}
 frame();syncAud();$('#ph').style.left=S.t*PX+'px';$('#tm').textContent=tc(S.t)+' / '+tc(total());requestAnimationFrame(loop)}
requestAnimationFrame(loop);
function audio(){if(!AC){AC=new AudioContext();node=AC.createMediaElementSource(vid);node.connect(AC.destination)}AC.resume()}
function play(){audio();if(S.t>=total())S.t=0;S.playing=true;cur=null;$('#play').textContent='⏸ Jeda'}
function pause(){S.playing=false;vid.pause();$('#play').textContent='▶ Putar'}
$('#play').onclick=()=>S.playing?pause():play();
$('#tl').onclick=e=>{const r=$('#tl');S.t=Math.max(0,Math.min(total(),(e.clientX-r.getBoundingClientRect().left+r.scrollLeft)/PX));cur=null;S.sel=null;render()};
function render(){const V=$('#trkV'),T=$('#trkT'),A=$('#trkA'),O=$('#trkO'),O2=$('#trkO2');V.innerHTML=T.innerHTML=A.innerHTML=O.innerHTML=O2.innerHTML='';let a=0;
 const blk=(id,l,w,cls,txt)=>{const e=document.createElement('div');e.className='blk '+cls+(S.sel==id?' on':'');e.style.cssText=`left:${l*PX}px;width:${Math.max(w*PX,8)}px`;e.textContent=txt;e.onclick=ev=>{ev.stopPropagation();S.sel=id;render()};e.onpointerdown=ev=>drag(ev,id,e);return e};
 S.clips.forEach(c=>{const d=dur(c);V.append(blk(c.id,a,d,media[c.m].type,media[c.m].name));a+=d});
 S.ovl.forEach(o=>(o.z?O2:O).append(blk(o.id,o.start,o.end-o.start,o.k=='vid'?'video':'image',(o.e||(o.k=='vid'?'🎬':'🖼'))+' '+(o.m?media[o.m]?.name:''))));S.aud.forEach(u=>A.append(blk(u.id,u.start,u.out-u.in,'audio','🎵 '+media[u.m].name)));S.texts.forEach(t=>T.append(blk(t.id,t.start,t.end-t.start,'txt',t.text)));
 V.style.width=T.style.width=A.style.width=O.style.width=O2.style.width=Math.max(total(),12)*PX+300+'px';props();chrome()}
function props(){const c=S.clips.find(x=>x.id==S.sel),t=S.texts.find(x=>x.id==S.sel),u=S.aud.find(x=>x.id==S.sel),ov=S.ovl.find(x=>x.id==S.sel),P=$('#props'),r=(l,k,v,min,max,st)=>`<label>${l}<input type=range min=${min} max=${max} step=${st} value=${v} data-k=${k}></label>`;
 if(c)P.innerHTML=r('Kecepatan','speed',c.speed,.25,4,.25)+r('Volume','vol',c.vol,0,1,.05)+r('Fade (dtk)','fade',c.fade,0,2,.1)+r('Opacity','op',c.op??1,0,1,.05)+r('Kecerahan','br',c.br??1,.3,2,.05)+r('Kontras','ct',c.ct??1,.3,2,.05)+r('Saturasi','sa',c.sa??1,0,3,.05)+`<label>Transisi masuk<select data-k=tr>${['tanpa','fade','slide','zoom'].map(k=>`<option ${k==c.tr?'selected':''}>${k}</option>`).join('')}</select></label><label>Cermin<select data-k=flip><option value=''>tidak</option><option value='1' ${c.flip?'selected':''}>ya</option></select></label>`+r('Zoom','zoom',c.zoom||1,1,3,.05)+r('Geser X','ox',c.ox||0,-.5,.5,.01)+r('Geser Y','oy',c.oy||0,-.5,.5,.01)+clipx(c)+
  `<label>Mulai (dtk)<input type=number step=.1 value=${c.in.toFixed(2)} data-k=in></label><label>Selesai (dtk)<input type=number step=.1 value=${c.out.toFixed(2)} data-k=out></label><label>Filter<select data-k=fx>${Object.keys(FX).map(k=>`<option ${k==c.fx?'selected':''}>${k}</option>`).join('')}</select></label>`;
 else if(ov)P.innerHTML=(ov.e?`<label>Emoji<input value="${ov.e}" data-k=e></label>`:'')+r('Ukuran','s',ov.s,.1,3,.05)+r('Posisi X','x',ov.x,0,1,.01)+r('Posisi Y','y',ov.y,0,1,.01)+r('Putar','r',ov.r,-180,180,1)+r('Opacity','op',ov.op,0,1,.05)+ovx(ov)+`<label>Mulai (dtk)<input type=number step=.1 value=${ov.start.toFixed(2)} data-k=start></label><label>Selesai (dtk)<input type=number step=.1 value=${ov.end.toFixed(2)} data-k=end></label>`;
 else if(u)P.innerHTML=r('Volume audio','vol',u.vol,0,1,.05)+`<label>Mulai di timeline (dtk)<input type=number step=.1 value=${u.start.toFixed(2)} data-k=start></label><label>Potong awal (dtk)<input type=number step=.1 value=${u.in.toFixed(2)} data-k=in></label><label>Potong akhir (dtk)<input type=number step=.1 value=${u.out.toFixed(2)} data-k=out></label>`;
 else if(t)P.innerHTML=`<label>Teks<input value="${t.text.replace(/"/g,'&quot;')}" data-k=text></label><label>Warna<input type=color value=${t.color} data-k=color></label>`+`<label>Font<select data-k=font>${['Poppins','Impact','Georgia','Courier New','Comic Sans MS'].map(f=>`<option ${f==(t.font||'Poppins')?'selected':''}>${f}</option>`).join('')}</select></label><label>Latar teks<select data-k=bg>${['tanpa','hitam','merah','teal'].map(f=>`<option ${f==t.bg?'selected':''}>${f}</option>`).join('')}</select></label><label>Animasi<select data-k=anim>${['tanpa','pop','fade','geser'].map(f=>`<option ${f==t.anim?'selected':''}>${f}</option>`).join('')}</select></label>`+r('Ukuran','size',t.size,20,120,2)+r('Posisi vertikal','y',t.y,.1,.95,.01)+`<label>Mulai (dtk)<input type=number step=.1 value=${t.start.toFixed(2)} data-k=start></label><label>Selesai (dtk)<input type=number step=.1 value=${t.end.toFixed(2)} data-k=end></label>`;
 else P.textContent='Pilih klip atau teks di timeline.';
 P.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(b.dataset.act));P.querySelectorAll('[data-k]').forEach(i=>i.onchange=()=>{snap();const o=c||t||u||ov;o[i.dataset.k]=['range','number'].includes(i.type)?+i.value:i.value;
  if(ov&&o===ov)postOv(o);if(c){const m=media[c.m];c.in=Math.max(0,c.in);if(m.type!='image')c.out=Math.min(c.out,m.dur);if(c.out<=c.in)c.out=c.in+.1}cur=null;render()})}
$('#addTxt').onclick=()=>{snap();const id=uid();S.texts.push({id,text:$('#txt').value||'Teks baru',start:S.t,end:S.t+3,color:'#ffffff',size:56,y:.5});S.sel=id;render()};
$('#split').onclick=split;$('#del').onclick=del;$('#dup').onclick=dup;$('#undo').onclick=()=>{const h=hist.pop();if(h){redo.push(JSON.stringify([S.clips,S.texts,S.aud,S.ovl]));[S.clips,S.texts,S.aud,S.ovl]=JSON.parse(h);S.sel=null;cur=null;render()}};
function split(){const p=at(S.t);if(!p)return;const{c,l}=p;if(l<=c.in+.05||l>=c.out-.05)return;snap();const i=S.clips.indexOf(c);S.clips.splice(i,1,{...c,out:l},{...c,id:uid(),in:l});cur=null;render()}
function del(){snap();S.clips=S.clips.filter(c=>c.id!=S.sel);S.texts=S.texts.filter(t=>t.id!=S.sel);S.aud=S.aud.filter(t=>t.id!=S.sel);S.ovl=S.ovl.filter(t=>t.id!=S.sel);S.sel=null;cur=null;render()}
function dup(){const c=S.clips.find(x=>x.id==S.sel);if(!c)return;snap();S.clips.splice(S.clips.indexOf(c)+1,0,{...c,id:uid()});render()}
addEventListener('keydown',e=>{if(['INPUT','SELECT'].includes(e.target.tagName))return;
 if(e.code=='Space'){e.preventDefault();$('#play').click()}else if(e.key=='s'&&!e.ctrlKey&&!e.metaKey)split();else if(e.key=='Delete')del();else if(e.key=='ArrowLeft'){S.t=Math.max(0,S.t-(e.shiftKey?10:1)/30);cur=null}else if(e.key=='ArrowRight'){S.t=Math.min(total(),S.t+(e.shiftKey?10:1)/30);cur=null}else if(e.key=='z'&&(e.ctrlKey||e.metaKey)&&!e.shiftKey)$('#undo').click()});
$('#exp').onclick=()=>{if(!S.clips.length)return alert('Timeline masih kosong.');audio();const d=AC.createMediaStreamDestination();S.aud.forEach(aelem);const ns=()=>[node,...Object.values(AE).map(e=>e._n)];ns().forEach(n=>n.connect(d));
 const st=new MediaStream([...cv.captureStream(30).getTracks(),...d.stream.getTracks()]),mime=[$('#fmt').value=='webm'?'':'video/mp4;codecs=avc1','video/webm;codecs=vp9,opus','video/webm'].find(t=>t&&MediaRecorder.isTypeSupported(t)),ch=[];
 rec=new MediaRecorder(st,{mimeType:mime,videoBitsPerSecond:6e6});rec.ondataavailable=e=>ch.push(e.data);
 rec.onstop=async()=>{ns().forEach(n=>n.disconnect(d));let out=new Blob(ch,{type:mime}),ext=mime.includes('mp4')?'mp4':'webm';
 if(ext=='webm'&&$('#fmt').value=='mp4'){try{$('#exp').textContent='Konversi ke MP4...';const f=await ff();await f.writeFile('in.webm',new Uint8Array(await out.arrayBuffer()));await f.exec(['-i','in.webm','-c:v','libx264','-preset','ultrafast','-pix_fmt','yuv420p','-c:a','aac','out.mp4']);out=new Blob([(await f.readFile('out.mp4')).buffer],{type:'video/mp4'});ext='mp4'}catch(e){alert('Konversi MP4 gagal, file diunduh sebagai WebM: '+e.message)}}
 dl(out,'klipan.'+ext);$('#exp').textContent='Ekspor'};
 $('#exp').textContent='Merekam... (jangan pindah tab)';exporting=true;S.t=0;rec.start();play()};
function finish(){exporting=false;setTimeout(()=>rec.stop(),300)}
$('#cap').onclick=async()=>{const st=$('#capst'),ok=S.clips.some(c=>media[c.m].type!='image');if(!ok)return alert('Tambahkan klip video/audio dulu.');
 try{st.textContent='Memuat model...';const{pipeline}=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2');
  const asr=await pipeline('automatic-speech-recognition','Xenova/whisper-tiny',{progress_callback:p=>{if(p.status=='progress')st.textContent='Unduh model '+Math.round(p.progress)+'%'}});
  snap();let a=0;
  for(const c of S.clips){const m=media[c.m];if(m.type!='image'){st.textContent='Transkrip: '+m.name;
   const dec=await new AudioContext({sampleRate:16000}).decodeAudioData(await m.file.arrayBuffer()),pcm=dec.getChannelData(0).slice(Math.floor(c.in*16000),Math.floor(c.out*16000));
   const r=await asr(pcm,{return_timestamps:true,chunk_length_s:30,stride_length_s:5,language:$('#lang').value,task:'transcribe'});
   for(const h of r.chunks||[]){const[s,e]=h.timestamp;S.texts.push({id:uid(),text:h.text.trim(),start:a+s/c.speed,end:a+(e??s+2)/c.speed,color:'#ffffff',size:44,y:.8})}}
   a+=dur(c)}
  st.textContent='Selesai. Edit caption di timeline.';render()}catch(e){st.textContent='Gagal: '+e.message}};
render();

const AE={},pend={};
function aelem(a){if(!AE[a.id]){const el=new Audio(media[a.m].url);AE[a.id]=el;el._n=AC.createMediaElementSource(el);el._n.connect(AC.destination)}return AE[a.id]}
function syncAud(){for(const a of S.aud){const inr=S.t>=a.start&&S.t<a.start+a.out-a.in;
 if(S.playing&&inr&&AC){const el=aelem(a);el.volume=S.tk.A.m?0:Math.min(1,a.vol);if(el.paused){el.currentTime=a.in+S.t-a.start;el.play().catch(()=>{})}}else if(AE[a.id]&&!AE[a.id].paused)AE[a.id].pause()}}
async function addFile(f,kd){const pid=Object.keys(pend).find(k=>pend[k].name==f.name),id=pid||uid(),url=URL.createObjectURL(f),type=f.type.split('/')[0];let d=kd||5;
 if(!kd&&type!='image')d=await new Promise(r=>{const m=document.createElement(type=='audio'?'audio':'video');m.preload='metadata';m.onloadedmetadata=()=>r(isFinite(m.duration)?m.duration:5);m.src=url});
 if(pid){delete pend[pid];cur=curM=null;delete AE[id]}media[id]={id,url,type,name:f.name,dur:d,file:f};bin();thumb(media[id]);return id}
$('#file').onchange=async e=>{for(const f of e.target.files)await addFile(f)};
const dl=(b,n)=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click()};
let vor,scr;
$('#vo').onclick=async()=>{if(vor)return vor.stop();
 try{const s=await navigator.mediaDevices.getUserMedia({audio:true}),ch=[],t0=Date.now();vor=new MediaRecorder(s);vor.ondataavailable=e=>ch.push(e.data);
 vor.onstop=async()=>{s.getTracks().forEach(t=>t.stop());const d=(Date.now()-t0)/1000,id=await addFile(new File(ch,'voice-over-'+uid()+'.webm',{type:'audio/webm'}),d);vor=null;$('#vo').textContent='🎙 Rekam suara';snap();S.aud.push({id:uid(),m:id,start:S.t,in:0,out:d,vol:1});render()};
 vor.start();$('#vo').textContent='⏹ Stop rekam'}catch(e){alert('Mikrofon tidak tersedia: '+e.message)}};
$('#scr').onclick=async()=>{if(scr)return scr.stop();
 try{const s=await navigator.mediaDevices.getDisplayMedia({video:true,audio:true}),ch=[],t0=Date.now();scr=new MediaRecorder(s);scr.ondataavailable=e=>ch.push(e.data);
 s.getVideoTracks()[0].onended=()=>scr&&scr.state!='inactive'&&scr.stop();
 scr.onstop=async()=>{s.getTracks().forEach(t=>t.stop());const d=(Date.now()-t0)/1000,id=await addFile(new File(ch,'layar-'+uid()+'.webm',{type:'video/webm'}),d);scr=null;$('#scr').textContent='🖥 Rekam layar';snap();S.clips.push({id:uid(),m:id,in:0,out:d,speed:1,vol:1,fx:'none',fade:0});render()};
 scr.start();$('#scr').textContent='⏹ Stop layar'}catch(e){alert('Rekam layar gagal: '+e.message)}};
const ts=s=>{s=Math.max(0,s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return[h,m].map(n=>String(n).padStart(2,'0')).join(':')+':'+(s%60).toFixed(3).padStart(6,'0').replace('.',',')};
$('#srtx').onclick=()=>{if(!S.texts.length)return alert('Belum ada teks/caption.');dl(new Blob([[...S.texts].sort((a,b)=>a.start-b.start).map((t,i)=>`${i+1}\n${ts(t.start)} --> ${ts(t.end)}\n${t.text}\n`).join('\n')],{type:'text/plain'}),'caption.srt')};
$('#srti').onchange=async e=>{const f=e.target.files[0];if(!f)return;const tm=x=>{const[a,b,c]=x.trim().replace(',','.').split(':');return +a*3600+ +b*60+ +c};snap();
 (await f.text()).replace(/\r/g,'').split(/\n\n+/).forEach(b=>{const l=b.split('\n').filter(Boolean),i=l.findIndex(x=>x.includes('-->'));if(i<0)return;const[s,e2]=l[i].split('-->');S.texts.push({id:uid(),text:l.slice(i+1).join(' '),start:tm(s),end:tm(e2),color:'#ffffff',size:44,y:.8})});render();e.target.value=''};
$('#save').onclick=()=>dl(new Blob([JSON.stringify({v:1,ratio:S.ratio,clips:S.clips,texts:S.texts,aud:S.aud,ovl:S.ovl,media:Object.values(media).map(m=>({id:m.id,name:m.name,type:m.type,dur:m.dur}))})],{type:'application/json'}),'proyek-klipan.json');
$('#open').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const p=JSON.parse(await f.text());snap();S.clips=p.clips||[];S.texts=p.texts||[];S.aud=p.aud||[];S.ovl=p.ovl||[];S.ratio=p.ratio||[9,16];size();$('#ratio').value=S.ratio.join(':');
 for(const m of p.media||[])if(!media[m.id]){media[m.id]={...m,url:'',file:null};pend[m.id]={name:m.name}}
 S.sel=null;cur=curM=null;bin();render();alert('Proyek dibuka. Impor ulang file media dengan nama yang sama agar tersambung.')}catch(x){alert('File proyek tidak valid')}e.target.value=''};

const filt=c=>(FX[c.fx]&&FX[c.fx]!='none'?FX[c.fx]+' ':'')+`brightness(${c.br??1}) contrast(${c.ct??1}) saturate(${c.sa??1})`;
const OI={},oimg=o=>OI[o.m]||(OI[o.m]=Object.assign(new Image(),{src:media[o.m]?.url||''}));
function drawOvl(){for(const o of[...S.ovl].sort((a,b)=>(a.z||0)-(b.z||0))){const inr=S.t>=o.start&&S.t<o.end&&!S.tk.O.h;
 if(o.k=='vid'){const v=ovid(o);if(!inr){v.paused||v.pause();continue}syncV(o,v)}if(!inr)continue;
 const u=(S.t-o.start)/Math.max(.01,o.end-o.start),sz=kv(o,'s',o.s,u);ctx.save();ctx.globalAlpha=kv(o,'op',o.op,u);ctx.translate(kv(o,'x',o.x,u)*cv.width,kv(o,'y',o.y,u)*cv.height);ctx.rotate(kv(o,'r',o.r,u)*Math.PI/180);
 if(o.e){ctx.font=`${sz*cv.height*.3}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(o.e,0,0)}
 else{const im=o.k=='vid'?ovid(o):oimg(o),iw=im.videoWidth||im.naturalWidth,ih=im.videoHeight||im.naturalHeight;if(iw){const w=sz*cv.width*.5,h=w*ih/iw;ctx.drawImage((o.ck||o.bg)?(fxPix(im,iw,ih,o)||im):im,-w/2,-h/2,w,h)}}ctx.restore()}}
function drawTexts(){if(S.tk.T.h)return;for(const t of S.texts)if(S.t>=t.start&&S.t<t.end){const fs=t.size*cv.height/720,pr=Math.min(1,(S.t-t.start)/.3);let al=1,dy=0,sc=1;
 if(t.anim=='fade')al=pr;else if(t.anim=='pop')sc=.7+.3*pr;else if(t.anim=='geser'){dy=(1-pr)*fs*2;al=pr}
 ctx.save();ctx.globalAlpha=al;ctx.font=`800 ${fs}px ${t.font||'Poppins'},Arial,sans-serif`;ctx.textAlign='center';ctx.lineJoin='round';ctx.translate(cv.width/2,cv.height*t.y+dy);ctx.scale(sc,sc);
 const L=wrap(t.text,cv.width*.9),bgc={hitam:'#000c',merah:'#EF1B4B',teal:'#00B2A9'}[t.bg];
 L.forEach((x,i)=>{const y=i*fs*1.2;if(bgc){const w=ctx.measureText(x).width+fs*.6;ctx.fillStyle=bgc;ctx.beginPath();ctx.roundRect(-w/2,y-fs*.95,w,fs*1.2,fs*.25);ctx.fill()}else{ctx.lineWidth=fs/5;ctx.strokeStyle='#000';ctx.strokeText(x,0,y)}ctx.fillStyle=t.color;ctx.fillText(x,0,y)});ctx.restore()}}
$('#zoomTl').oninput=e=>{PX=+e.target.value;render()};
'😂 🔥 ❤️ 👍 🎉 ⭐ 😍 😎 🙌 💯 👀 ✨ 🚀 💡 📌 ✅ ❌ ➡️ ⬆️ 🛒'.split(' ').forEach(e=>{const b=document.createElement('button');b.textContent=e;b.style.padding='4px 6px';
 b.onclick=()=>{snap();const id=uid();S.ovl.push({id,e,start:S.t,end:S.t+3,x:.5,y:.4,s:1,r:0,op:1});S.sel=id;render()};$('#stk').append(b)});
function wav(d,fn,name){const sr=22050,n=Math.floor(d*sr),b=new DataView(new ArrayBuffer(44+n*2)),w=(o,s)=>[...s].forEach((c,i)=>b.setUint8(o+i,c.charCodeAt(0)));
 w(0,'RIFF');b.setUint32(4,36+n*2,true);w(8,'WAVEfmt ');b.setUint32(16,16,true);b.setUint16(20,1,true);b.setUint16(22,1,true);b.setUint32(24,sr,true);b.setUint32(28,sr*2,true);b.setUint16(32,2,true);b.setUint16(34,16,true);w(36,'data');b.setUint32(40,n*2,true);
 for(let i=0;i<n;i++)b.setInt16(44+i*2,Math.max(-1,Math.min(1,fn(i/sr)))*32000,true);return new File([b],name+'.wav',{type:'audio/wav'})}
async function addSnd(name,d,fn){const id=await addFile(wav(d,fn,name),d);snap();S.aud.push({id:uid(),m:id,start:S.t,in:0,out:d,vol:1});render()}
const sin=(f,t)=>Math.sin(2*Math.PI*f*t),SFX={Pop:[.2,t=>sin(900-3000*t,t)*Math.exp(-t*22)],Ding:[1.2,t=>(sin(1320,t)+.4*sin(2640,t))*Math.exp(-t*4)*.6],Whoosh:[.9,t=>(Math.random()*2-1)*Math.sin(Math.PI*t/.9)**2*.5],Drum:[.5,t=>sin(120-100*t,t)*Math.exp(-t*9)],Klik:[.06,t=>(Math.random()*2-1)*Math.exp(-t*90)],Alarm:[1,t=>Math.sign(sin(t%.25<.125?880:660,t))*.2],Naik:[.8,t=>sin(300+700*t,t)*Math.exp(-t*2)*.6]};
Object.entries(SFX).forEach(([n,[d,f]])=>{const b=document.createElement('button');b.textContent=n;b.style.padding='4px 8px';b.onclick=()=>addSnd('sfx-'+n,d,f);$('#sfx').append(b)});
const MUS={Santai:[[261.6,329.6,392],[220,261.6,329.6],[174.6,220,261.6],[196,246.9,293.7]],Semangat:[[329.6,415.3,493.9],[293.7,370,440],[246.9,311.1,370],[277.2,329.6,415.3]],Sendu:[[220,261.6,329.6],[174.6,220,261.6],[130.8,164.8,196],[196,246.9,293.7]]};
Object.entries(MUS).forEach(([n,ch])=>{const b=document.createElement('button');b.textContent=n;b.style.padding='4px 8px';
 b.onclick=()=>addSnd('musik-'+n,16,t=>{const c=ch[Math.floor(t/4)%4],e=t%4,env=Math.min(1,e*8)*Math.exp(-e*.5),beat=Math.exp(-(t%.5)*10);return c.reduce((s,f)=>s+sin(f,t),0)*.09*env+sin(c[0]/2,t)*.12*beat});$('#mus').append(b)});

let mf='all';const redo=[],px=document.createElement('canvas');
function tc(s){const p=n=>String(n).padStart(2,'0');return p(Math.floor(s/60))+':'+p(Math.floor(s%60))+':'+p(Math.floor((s%1)*30))}
function chrome(){const R=$('#ruler'),w=Math.max(total(),12)*PX+300,st=PX<35?10:PX<80?5:PX<140?2:1;let h='';for(let s=0;s*PX<w;s+=st)h+=`<span style="left:${s*PX}px">${fmt(s)}</span>`;R.innerHTML=h;R.style.width=w+'px';
 const H=$('#th');H.innerHTML='';[['T','Teks','#trkT'],['O','Overlay 1','#trkO'],['O','Overlay 2','#trkO2'],['V','Video','#trkV'],['A','Audio','#trkA']].forEach(([k,n,id])=>{const s=S.tk[k],d=document.createElement('div');d.className='thr';d.innerHTML=`<b>${n}</b>`;
  [['l',s.l?'🔒':'🔓','Kunci'],['h',s.h?'🙈':'👁','Sembunyikan'],['m',s.m?'🔇':'🔊','Bisukan']].forEach(([f,ic,t])=>{if(f=='m'&&k!='V'&&k!='A')return;if(f=='h'&&k=='A')return;const b=document.createElement('button');b.textContent=ic;b.title=t;b.onclick=()=>{s[f]=!s[f];render()};d.append(b)});
  H.append(d);$(id).classList.toggle('locked',!!s.l);$(id).style.opacity=s.h?.35:1})}
function fxPost(p){if(!p||S.tk.V.h)return;const e=p.c.ef,W=cv.width,H=cv.height;if(!e)return;
 if(e=='vinyet'){const g=ctx.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*.8);g.addColorStop(0,'#0000');g.addColorStop(1,'#000c');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
 else if(e=='grain'){for(let i=0;i<900;i++){ctx.fillStyle=i%2?'#fff4':'#0004';ctx.fillRect(Math.random()*W,Math.random()*H,2,2)}}
 else if(e=='glitch'){if(Math.random()<.4)for(let i=0;i<4;i++){const y=Math.random()*H,h=10+Math.random()*60;ctx.drawImage(cv,0,y,W,h,(Math.random()-.5)*60,y,W,h)}}
 else if(e=='pixel'){px.width=W/14;px.height=H/14;px.getContext('2d').drawImage(cv,0,0,px.width,px.height);ctx.imageSmoothingEnabled=false;ctx.drawImage(px,0,0,W,H);ctx.imageSmoothingEnabled=true}}
async function thumb(m){if(m.type=='image'){m.th=m.url;return bin()}if(m.type!='video')return;const v=document.createElement('video');v.muted=true;v.src=m.url;v.onloadeddata=()=>{v.currentTime=Math.min(1,m.dur/3)};
 v.onseeked=()=>{const c=document.createElement('canvas');c.width=160;c.height=90;c.getContext('2d').drawImage(v,0,0,160,90);m.th=c.toDataURL('image/jpeg',.7);v.onseeked=null;bin()}}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button,.tabc').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#tab-'+b.dataset.t).classList.add('on')});
document.querySelectorAll('.mf button').forEach(b=>b.onclick=()=>{mf=b.dataset.f;bin()});
const selClip=()=>S.clips.find(c=>c.id==S.sel),setC=(k,v)=>{const c=selClip();if(!c)return alert('Pilih klip video dulu di timeline.');snap();c[k]=v;cur=null;render()};
const tile=(box,k,fn,css)=>{const b=document.createElement('button');b.className='tile';b.innerHTML=`<i style="${css||''}"></i>${k}`;b.onclick=fn;$(box).append(b)};
['tanpa','fade','slide','zoom','putar','kabur'].forEach(k=>tile('#trg',k,()=>setC('tr',k)));
['tanpa','vinyet','grain','glitch','pixel','getar','denyut'].forEach(k=>tile('#efg',k,()=>setC('ef',k=='tanpa'?'':k)));
Object.keys(FX).forEach(k=>tile('#flg',k,()=>setC('fx',k),`filter:${FX[k]}`));
const TPL={'Judul besar':[{text:'JUDUL VIDEO',size:80,y:.45,anim:'pop',font:'Impact'}],'Lower third':[{text:'Nama Narasumber',size:40,y:.8,bg:'teal',anim:'geser'},{text:'Jabatan / keterangan',size:28,y:.88,bg:'hitam',anim:'geser'}],
'Breaking news':[{text:'BREAKING NEWS',size:46,y:.12,bg:'merah',anim:'pop'},{text:'Tulis judul berita di sini',size:36,y:.86,bg:'hitam',anim:'fade'}],'Caption TikTok':[{text:'Tulis kalimatmu',size:52,y:.75,anim:'pop'}],
'Kutipan':[{text:'“Isi kutipan di sini”',size:44,y:.45,bg:'hitam',anim:'fade',font:'Georgia'}],'Bicara Fakta':[{text:'Bicara Fakta Lewat Berita',size:36,y:.9,bg:'teal',anim:'geser'}]};
Object.entries(TPL).forEach(([n,a])=>{const b=document.createElement('button');b.textContent=n;b.onclick=()=>{snap();a.forEach(o=>S.texts.push({id:uid(),color:'#ffffff',start:S.t,end:S.t+4,...o}));render()};$('#tpg').append(b)});
$('#redo').onclick=()=>{const h=redo.pop();if(h){hist.push(JSON.stringify([S.clips,S.texts,S.aud,S.ovl]));[S.clips,S.texts,S.aud,S.ovl]=JSON.parse(h);S.sel=null;cur=null;render()}};
const trimAt=s=>{const p=at(S.t);if(!p)return;snap();if(s=='L')p.c.in=Math.min(p.l,p.c.out-.1);else p.c.out=Math.max(p.l,p.c.in+.1);cur=null;render()};
$('#dl').onclick=()=>trimAt('L');$('#dr').onclick=()=>trimAt('R');
$('#mute').onclick=()=>{const c=selClip();if(!c)return;snap();c.vol=c.vol?0:1;render()};
$('#fit').onclick=()=>{PX=Math.max(20,Math.min(200,($('#tl').clientWidth-60)/Math.max(total(),5)));$('#zoomTl').value=PX;render()};
$('#first').onclick=()=>{S.t=0;cur=null};$('#last').onclick=()=>{S.t=total();cur=null};$('#prev').onclick=()=>{S.t=Math.max(0,S.t-1/30);cur=null};$('#next').onclick=()=>{S.t=Math.min(total(),S.t+1/30);cur=null};$('#fs').onclick=()=>cv.requestFullscreen?.();
addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;const k=e.key.toLowerCase(),c=e.ctrlKey||e.metaKey;
 if(!c&&k=='q')trimAt('L');else if(!c&&k=='w')trimAt('R');else if(!c&&k=='m')$('#mute').click();else if(k=='home'){S.t=0;cur=null}else if(k=='end'){S.t=total();cur=null}
 else if(c&&k=='s'){e.preventDefault();$('#save').click()}else if(c&&k=='e'){e.preventDefault();$('#exp').click()}else if(c&&k=='i'){e.preventDefault();$('#file').click()}else if(c&&(k=='y'||(k=='z'&&e.shiftKey))){e.preventDefault();$('#redo').click()}});
render();

const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),OV={},tmp=document.createElement('canvas');let SEG=null,SNAP=true,clip=null,FF=null;
function kv(o,p,base,u){const a=o.kf?.[p];if(!a||!a.length)return base;const s=[...a].sort((x,y)=>x.t-y.t);if(u<=s[0].t)return s[0].v;const L=s[s.length-1];if(u>=L.t)return L.v;
 for(let i=1;i<s.length;i++)if(u<=s[i].t){const q=(u-s[i-1].t)/(s[i].t-s[i-1].t||1),e=o.ez=='halus'?q*q*(3-2*q):q;return s[i-1].v+(s[i].v-s[i-1].v)*e}return base}
const ovid=o=>OV[o.id]&&OV[o.id]._m==o.m?OV[o.id]:(OV[o.id]=Object.assign(document.createElement('video'),{src:media[o.m]?.url||'',muted:true,playsInline:true,_m:o.m}));
function syncV(o,v){const w=o.in+(S.t-o.start);if(S.playing){v.paused&&v.play().catch(()=>{});Math.abs(v.currentTime-w)>.4&&(v.currentTime=w)}else{v.paused||v.pause();Math.abs(v.currentTime-w)>.05&&(v.currentTime=w)}}
function fxPix(im,iw,ih,o){const s=Math.min(1,480/iw),w=Math.round(iw*s),h=Math.round(ih*s);tmp.width=w;tmp.height=h;const g=tmp.getContext('2d',{willReadFrequently:true});g.clearRect(0,0,w,h);g.drawImage(im,0,0,w,h);const d=g.getImageData(0,0,w,h),a=d.data;
 if(o.bg&&SEG){let m;SEG.segmentForVideo(tmp,performance.now(),r=>{m=r.confidenceMasks[0].getAsFloat32Array()});if(m&&m.length==w*h)for(let i=0;i<m.length;i++){const p=o.inv?1-m[i]:m[i];a[i*4+3]=Math.min(255,p*300)}}
 if(o.ck){const[cr,cg,cb]=hex(o.ck.c),t=o.ck.t*441;for(let i=0;i<a.length;i+=4){const dr=a[i]-cr,dg=a[i+1]-cg,db=a[i+2]-cb,q=Math.sqrt(dr*dr+dg*dg+db*db);if(q<t)a[i+3]=0;else if(q<t*1.3)a[i+3]*=(q-t)/(t*.3)}}
 g.putImageData(d,0,0);return tmp}
const EZ=o=>`<label>Easing keyframe<select data-k=ez>${['linear','halus'].map(x=>`<option ${x==o.ez?'selected':''}>${x}</option>`).join('')}</select></label><div class=row><button data-act=kf>◆ Keyframe</button><button data-act=kfx>Hapus</button></div><small>${o.kf?Object.values(o.kf)[0].length+' keyframe aktif':'Atur slider, geser playhead, klik Keyframe.'}</small>`;
const clipx=c=>EZ(c)+`<div class=row><button data-act=frz>Freeze frame</button><button data-act=rev>Reverse</button></div>`;
const ovx=o=>`<label>Track<select data-k=z><option value=0>1</option><option value=1 ${o.z?'selected':''}>2</option></select></label>`+EZ(o)+(o.e?'':`<label>Chroma key<select data-k=ckon><option value=''>mati</option><option value=1 ${o.ck?'selected':''}>aktif</option></select></label><label>Warna kunci<input type=color value=${o.ck?.c||'#00ff00'} data-k=ckc></label><label>Toleransi<input type=range min=.05 max=.8 step=.01 value=${o.ck?.t||.35} data-k=ckt></label><button data-act=bg>${o.bg?'Matikan':'Aktifkan'} hapus latar (AI)</button><label>Balik masker<select data-k=inv><option value=''>tidak</option><option value=1 ${o.inv?'selected':''}>ya</option></select></label>`);
function postOv(o){o.z=+o.z||0;if('ckon' in o)o.ck=o.ckon?{c:o.ckc||'#00ff00',t:+o.ckt||.35}:null}
const clipStart=c=>{let a=0;for(const x of S.clips){if(x===c)return a;a+=dur(x)}return 0};
const findIt=id=>{for(const k of['clips','texts','aud','ovl']){const it=S[k].find(x=>x.id==id);if(it)return[k,it]}};
function act(a){const c=selClip(),o=S.ovl.find(x=>x.id==S.sel),it=c||o;if(!it)return alert('Pilih klip atau overlay dulu.');
 if(a=='kf'){const u=c?(S.t-clipStart(c))/dur(c):(S.t-o.start)/(o.end-o.start);if(u<0||u>1)return alert('Playhead harus berada di dalam klip.');snap();it.kf=it.kf||{};
  const P=c?{op:c.op??1,zoom:c.zoom||1,ox:c.ox||0,oy:c.oy||0}:{op:o.op,s:o.s,x:o.x,y:o.y,r:o.r};for(const k in P){const ar=(it.kf[k]||[]).filter(z=>Math.abs(z.t-u)>.01);ar.push({t:u,v:P[k]});it.kf[k]=ar}render()}
 else if(a=='kfx'){snap();delete it.kf;render()}else if(a=='bg')bgToggle(o);else if(a=='frz')freeze();else if(a=='rev')reverse(c)}
async function loadSeg(st){if(SEG)return;st.textContent='Memuat model AI...';const V='https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14',{ImageSegmenter,FilesetResolver}=await import(V+'/vision_bundle.mjs'),fs=await FilesetResolver.forVisionTasks(V+'/wasm');
 SEG=await ImageSegmenter.createFromOptions(fs,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite'},runningMode:'VIDEO',outputConfidenceMasks:true,outputCategoryMask:false})}
async function bgToggle(o){if(!o||o.e)return alert('Pilih overlay gambar atau video.');const st=$('#stat');if(!o.bg){try{await loadSeg(st)}catch(e){st.textContent='';return alert('Model AI gagal dimuat: '+e.message)}}snap();o.bg=!o.bg;st.textContent=o.bg?'Latar dihapus. Kalau terbalik, pilih "Balik masker".':'';render()}
async function ff(){if(FF)return FF;const st=$('#stat');st.textContent='Memuat ffmpeg (±30MB)...';const{FFmpeg}=await import('./vendor/ffmpeg/index.js'),{toBlobURL}=await import('./vendor/util/index.js'),B='https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/',f=new FFmpeg();
 f.on('progress',({progress:p})=>st.textContent='Memproses '+Math.round(Math.min(1,p)*100)+'%');await f.load({coreURL:await toBlobURL(B+'ffmpeg-core.js','text/javascript'),wasmURL:await toBlobURL(B+'ffmpeg-core.wasm','application/wasm')});st.textContent='';return FF=f}
async function reverse(c){if(!c)return alert('Pilih klip video dulu.');const m=media[c.m];if(m.type!='video'||!m.file)return alert('Reverse hanya untuk klip video yang filenya sudah diimpor.');if(c.out-c.in>60)return alert('Maksimal 60 detik per reverse.');
 try{const f=await ff();await f.writeFile('in',new Uint8Array(await m.file.arrayBuffer()));await f.exec(['-ss',String(c.in),'-t',String(c.out-c.in),'-i','in','-vf','reverse','-af','areverse','-c:v','libx264','-preset','ultrafast','-pix_fmt','yuv420p','-c:a','aac','out.mp4']);
  const id=await addFile(new File([(await f.readFile('out.mp4')).buffer],m.name.replace(/\.\w+$/,'')+'-reverse.mp4',{type:'video/mp4'}));snap();c.m=id;c.in=0;c.out=media[id].dur;cur=null;$('#stat').textContent='';render()}catch(e){alert('Reverse gagal: '+e.message)}}
async function freeze(){const p=at(S.t);if(!p)return alert('Taruh playhead di atas klip video.');const m=media[p.c.m];if(m.type!='video')return alert('Freeze frame hanya untuk klip video.');
 vid.currentTime=p.l;await new Promise(r=>{vid.onseeked=r;setTimeout(r,900)});const c=document.createElement('canvas');c.width=vid.videoWidth;c.height=vid.videoHeight;c.getContext('2d').drawImage(vid,0,0);
 const b=await new Promise(r=>c.toBlob(r,'image/png')),id=await addFile(new File([b],'freeze-'+uid()+'.png',{type:'image/png'}),2);snap();
 const i=S.clips.indexOf(p.c);S.clips.splice(i,1,...[{...p.c,out:p.l},{id:uid(),m:id,in:0,out:2,speed:1,vol:1,fx:'none',fade:0},{...p.c,id:uid(),in:p.l}].filter(x=>x.out-x.in>.04));cur=null;render()}
const edges=it=>{const r=[];let a=0;for(const c of S.clips){r.push(a);a+=dur(c);r.push(a)}for(const x of[...S.texts,...S.ovl])x!==it&&r.push(x.start,x.end);for(const x of S.aud)x!==it&&r.push(x.start,x.start+x.out-x.in);return r};
function reorder(c,t){snap();const arr=S.clips.filter(x=>x!==c);let a=0,i=0;for(;i<arr.length;i++){const d=dur(arr[i]);if(t<a+d/2)break;a+=d}arr.splice(i,0,c);S.clips=arr;cur=null;render()}
function drag(ev,id,el){const f=findIt(id);if(!f||ev.button)return;const[k,it]=f,x0=ev.clientX,o0=k=='clips'?0:it.start,len=k=='aud'?it.out-it.in:k=='clips'?0:it.end-it.start;let moved=false;
 const mv=e=>{const dx=e.clientX-x0;if(!moved&&Math.abs(dx)<5)return;if(!moved){moved=true;S.sel=id;if(k!='clips')snap()}
  if(k=='clips'){el.style.opacity=.5;el.style.transform=`translateX(${dx}px)`;return}
  let s=Math.max(0,o0+dx/PX);if(SNAP)for(const p of[0,S.t,...edges(it)]){if(Math.abs(p-s)*PX<8){s=p;break}if(Math.abs(p-(s+len))*PX<8){s=p-len;break}}
  it.start=s;if(k!='aud')it.end=s+len;render()};
 const up=e=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);if(moved&&k=='clips')reorder(it,(el.offsetLeft+e.clientX-x0)/PX);else if(moved)render()};
 addEventListener('pointermove',mv);addEventListener('pointerup',up)}
$('#snapb').onclick=()=>{SNAP=!SNAP;$('#snapb').classList.toggle('go',SNAP)};
addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;const k=e.key.toLowerCase(),c=e.ctrlKey||e.metaKey;
 if(c&&k=='c'){const f=findIt(S.sel);if(f)clip=[f[0],JSON.stringify(f[1])]}
 else if(c&&k=='v'&&clip){snap();const it=JSON.parse(clip[1]),kk=clip[0];it.id=uid();if(kk=='clips'){const s=selClip();S.clips.splice(s?S.clips.indexOf(s)+1:S.clips.length,0,it)}else{if(kk=='aud')it.start=S.t;else{const L=it.end-it.start;it.start=S.t;it.end=S.t+L}S[kk].push(it)}S.sel=it.id;cur=null;render()}
 else if(!c&&k=='f')freeze()});
render();
