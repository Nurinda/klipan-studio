let PX=60;const $=s=>document.querySelector(s),uid=()=>Math.random().toString(36).slice(2,8),fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
const S={clips:[],texts:[],aud:[],ovl:[],tk:{T:{},O:{},V:{},A:{}},sel:null,t:0,playing:false,ratio:[9,16]},media={},hist=[];
const cv=$('#cv'),ctx=cv.getContext('2d'),vid=document.createElement('video'),img=new Image();vid.playsInline=true;
let cur=null,curM=null,AC,node,exporting=false,rec;
const FX={none:'none',noir:'grayscale(1) contrast(1.5) brightness(.9)',dramatis:'contrast(1.4) saturate(1.3) brightness(.9)',retro:'sepia(.6) hue-rotate(-15deg) saturate(1.4)',neon:'saturate(2.2) contrast(1.2) hue-rotate(10deg)',biru:'hue-rotate(180deg) saturate(1.3)',invert:'invert(1)',glow:'brightness(1.2) blur(1px) saturate(1.4)',terang:'brightness(1.3)',bw:'grayscale(1)',sepia:'sepia(.8)',vivid:'saturate(1.6) contrast(1.1)',cool:'hue-rotate(-20deg) saturate(1.2)',warm:'sepia(.35) saturate(1.3)',blur:'blur(3px)',fade:'brightness(1.15) contrast(.85)'};
const dur=c=>c.crv&&c.crv.length>1?cinfo(c).T:(c.out-c.in)/c.speed,total=()=>S.clips.reduce((a,c)=>a+dur(c),0);
const snap=()=>{hist.push(JSON.stringify([S.clips,S.texts,S.aud,S.ovl]));hist.length>50&&hist.shift();redo.length=0};
function at(t){let a=0;for(const c of S.clips){const d=dur(c);if(t<a+d)return{c,l:src(c,t-a),e:t-a,fs:fspd(c,t-a)};a+=d}return null}
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
  if(m.type!='image'){vid.playbackRate=Math.max(.0625,Math.min(16,p.fs));vid.preservesPitch=c.pitch!='ya';
   if(S.playing){vid.paused&&vid.play().catch(()=>{});Math.abs(vid.currentTime-p.l)>.4&&(vid.currentTime=p.l)}
   else{vid.pause();Math.abs(vid.currentTime-p.l)>.05&&(vid.currentTime=p.l)}}else vid.pause();
  const el=p.e,k=c.fade>0?Math.max(0,Math.min(1,el/c.fade,(dur(c)-el)/c.fade)):1;vid.volume=S.tk.V.m?0:Math.min(1,c.vol*k);
  if(m.type!='audio'&&!S.tk.V.h){const s=m.type=='image'?img:vid,w=s.videoWidth||s.naturalWidth,h=s.videoHeight||s.naturalHeight;
   if(w){const u01=el/dur(c);let sc=(c.fit=='muat'?Math.min:Math.max)(cv.width/w,cv.height/h)*kv(c,'zoom',c.zoom||1,u01),ox=kv(c,'ox',c.ox||0,u01)*cv.width,al=k*kv(c,'op',c.op??1,u01),ro=0,bl=0;const tp=Math.min(1,el/.6);if(c.ef=='denyut')sc*=1+.06*Math.sin(S.t*6);if(c.ef=='getar')ox+=(Math.random()-.5)*10;
   if(c.tr=='fade')al*=tp;else if(c.tr=='slide')ox+=(1-tp)*cv.width;else if(c.tr=='zoom')sc*=1+(1-tp)*.4;else if(c.tr=='putar')ro=(1-tp)*3.14;else if(c.tr=='kabur')bl=(1-tp)*14;
   if(c.fit=='muat'&&c.bgb=='ya'){const q=Math.max(cv.width/w,cv.height/h);ctx.save();ctx.filter='blur(28px) brightness(.6)';ctx.drawImage(s,(cv.width-w*q)/2,(cv.height-h*q)/2,w*q,h*q);ctx.restore()}ctx.save();ctx.globalAlpha=al;ctx.filter=filt(c)+(bl?` blur(${bl}px)`:'');ctx.translate(cv.width/2+ox,cv.height/2+kv(c,'oy',c.oy||0,u01)*cv.height);ctx.rotate(ro);if(c.flip)ctx.scale(-1,1);ctx.drawImage(s,-w*sc/2,-h*sc/2,w*sc,h*sc);ctx.restore()}}
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
function render(){const T0=total();if(T0>0)S.ovl.forEach(o=>{if(o.lg&&o.full&&Math.abs(o.end-T0)>.01){o.start=0;o.end=T0}});const V=$('#trkV'),T=$('#trkT'),A=$('#trkA'),O=$('#trkO'),O2=$('#trkO2');V.innerHTML=T.innerHTML=A.innerHTML=O.innerHTML=O2.innerHTML='';let a=0;
 const blk=(id,l,w,cls,txt)=>{const e=document.createElement('div');e.className='blk '+cls+(S.sel==id?' on':'');e.style.cssText=`left:${l*PX}px;width:${Math.max(w*PX,8)}px`;e.textContent=txt;e.onclick=ev=>{ev.stopPropagation();S.sel=id;render()};e.onpointerdown=ev=>drag(ev,id,e);return e};
 S.clips.forEach(c=>{const d=dur(c);V.append(blk(c.id,a,d,media[c.m].type,media[c.m].name));a+=d});
 S.ovl.forEach(o=>(o.z?O2:O).append(blk(o.id,o.start,o.end-o.start,o.k=='vid'?'video':'image',(o.e||(o.k=='vid'?'🎬':'🖼'))+' '+(o.m?media[o.m]?.name:''))));S.aud.forEach(u=>A.append(blk(u.id,u.start,u.out-u.in,'audio','🎵 '+media[u.m].name)));S.texts.forEach(t=>T.append(blk(t.id,t.start,t.end-t.start,'txt',t.text)));
 V.style.width=T.style.width=A.style.width=O.style.width=O2.style.width=Math.max(total(),12)*PX+300+'px';props();chrome();autosave()}
function props(){const c=S.clips.find(x=>x.id==S.sel),t=S.texts.find(x=>x.id==S.sel),u=S.aud.find(x=>x.id==S.sel),ov=S.ovl.find(x=>x.id==S.sel),P=$('#props'),r=(l,k,v,min,max,st)=>`<label>${l}<input type=range min=${min} max=${max} step=${st} value=${v} data-k=${k}></label>`;
 if(c)P.innerHTML=r('Kecepatan','speed',c.speed,.25,4,.25)+r('Volume','vol',c.vol,0,1,.05)+r('Fade (dtk)','fade',c.fade,0,2,.1)+r('Opacity','op',c.op??1,0,1,.05)+r('Kecerahan','br',c.br??1,.3,2,.05)+r('Kontras','ct',c.ct??1,.3,2,.05)+r('Saturasi','sa',c.sa??1,0,3,.05)+`<label>Transisi masuk<select data-k=tr>${['tanpa','fade','slide','zoom'].map(k=>`<option ${k==c.tr?'selected':''}>${k}</option>`).join('')}</select></label><label>Cermin<select data-k=flip><option value=''>tidak</option><option value='1' ${c.flip?'selected':''}>ya</option></select></label>`+r('Zoom','zoom',c.zoom||1,1,3,.05)+r('Geser X','ox',c.ox||0,-.5,.5,.01)+r('Geser Y','oy',c.oy||0,-.5,.5,.01)+clipx(c)+
  `<label>Mulai (dtk)<input type=number step=.1 value=${c.in.toFixed(2)} data-k=in></label><label>Selesai (dtk)<input type=number step=.1 value=${c.out.toFixed(2)} data-k=out></label><label>Filter<select data-k=fx>${Object.keys(FX).map(k=>`<option ${k==c.fx?'selected':''}>${k}</option>`).join('')}</select></label>`;
 else if(ov)P.innerHTML=(ov.e?`<label>Emoji<input value="${ov.e}" data-k=e></label>`:'')+r('Ukuran','s',ov.s,.1,3,.05)+r('Posisi X','x',ov.x,0,1,.01)+r('Posisi Y','y',ov.y,0,1,.01)+r('Putar','r',ov.r,-180,180,1)+r('Opacity','op',ov.op,0,1,.05)+ovx(ov)+`<label>Mulai (dtk)<input type=number step=.1 value=${ov.start.toFixed(2)} data-k=start></label><label>Selesai (dtk)<input type=number step=.1 value=${ov.end.toFixed(2)} data-k=end></label>`;
 else if(u)P.innerHTML=r('Volume audio','vol',u.vol,0,1,.05)+r('Fade (dtk)','fade',u.fade||0,0,3,.1)+`<label>Mulai di timeline (dtk)<input type=number step=.1 value=${u.start.toFixed(2)} data-k=start></label><label>Potong awal (dtk)<input type=number step=.1 value=${u.in.toFixed(2)} data-k=in></label><label>Potong akhir (dtk)<input type=number step=.1 value=${u.out.toFixed(2)} data-k=out></label>`;
 else if(t)P.innerHTML=`<label>Teks<input value="${t.text.replace(/"/g,'&quot;')}" data-k=text></label><label>Warna<input type=color value=${t.color} data-k=color></label>`+`<label>Font<select data-k=font>${['Poppins','Impact','Georgia','Courier New','Comic Sans MS'].map(f=>`<option ${f==(t.font||'Poppins')?'selected':''}>${f}</option>`).join('')}</select></label><label>Latar teks<select data-k=bg>${['tanpa','hitam','merah','teal'].map(f=>`<option ${f==t.bg?'selected':''}>${f}</option>`).join('')}</select></label><label>Animasi<select data-k=anim>${['tanpa','pop','fade','geser'].map(f=>`<option ${f==t.anim?'selected':''}>${f}</option>`).join('')}</select></label>`+r('Ukuran','size',t.size,20,120,2)+r('Posisi vertikal','y',t.y,.1,.95,.01)+r('Posisi horizontal','x',t.x??.5,0,1,.01)+`<label>Mulai (dtk)<input type=number step=.1 value=${t.start.toFixed(2)} data-k=start></label><label>Selesai (dtk)<input type=number step=.1 value=${t.end.toFixed(2)} data-k=end></label>`;
 else P.textContent='Pilih klip atau teks di timeline.';
 curveInit(c,P);P.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(b.dataset.act));P.querySelectorAll('[data-k]').forEach(i=>i.onchange=()=>{snap();const o=c||t||u||ov;o[i.dataset.k]=['range','number'].includes(i.type)?+i.value:i.value;
  if(ov&&o===ov)postOv(o);if(c){const m=media[c.m];c.in=Math.max(0,c.in);if(m.type!='image')c.out=Math.min(c.out,m.dur);if(c.out<=c.in)c.out=c.in+.1}cur=null;render()})}
$('#addTxt').onclick=()=>{snap();const id=uid();S.texts.push({id,text:$('#txt').value||'Teks baru',start:S.t,end:S.t+3,color:'#ffffff',size:56,y:.5});S.sel=id;render()};
$('#split').onclick=split;$('#del').onclick=del;$('#dup').onclick=dup;$('#undo').onclick=()=>{const h=hist.pop();if(h){redo.push(JSON.stringify([S.clips,S.texts,S.aud,S.ovl]));[S.clips,S.texts,S.aud,S.ovl]=JSON.parse(h);S.sel=null;cur=null;render()}};
function split(){const p=at(S.t);if(!p)return;const{c,l}=p;if(c.crv)return alert('Hapus kurva kecepatan dulu sebelum split.');if(l<=c.in+.05||l>=c.out-.05)return;snap();const i=S.clips.indexOf(c);S.clips.splice(i,1,{...c,out:l},{...c,id:uid(),in:l});cur=null;render()}
function del(){snap();S.clips=S.clips.filter(c=>c.id!=S.sel);S.texts=S.texts.filter(t=>t.id!=S.sel);S.aud=S.aud.filter(t=>t.id!=S.sel);S.ovl=S.ovl.filter(t=>t.id!=S.sel);S.sel=null;cur=null;render()}
function dup(){const c=S.clips.find(x=>x.id==S.sel);if(!c)return;snap();S.clips.splice(S.clips.indexOf(c)+1,0,{...c,id:uid()});render()}
addEventListener('keydown',e=>{if(['INPUT','SELECT'].includes(e.target.tagName))return;
 if(e.code=='Space'){e.preventDefault();$('#play').click()}else if(e.key=='s'&&!e.ctrlKey&&!e.metaKey)split();else if(e.key=='Delete')del();else if(e.key=='ArrowLeft'){S.t=Math.max(0,S.t-(e.shiftKey?10:1)/30);cur=null}else if(e.key=='ArrowRight'){S.t=Math.min(total(),S.t+(e.shiftKey?10:1)/30);cur=null}else if(e.key=='z'&&(e.ctrlKey||e.metaKey)&&!e.shiftKey)$('#undo').click()});
$('#exp').onclick=()=>{if(!S.clips.length)return alert('Timeline masih kosong.');audio();const d=AC.createMediaStreamDestination();S.aud.forEach(aelem);const ns=()=>[node,...Object.values(AE).map(e=>e._n)];ns().forEach(n=>n.connect(d));
 const st=new MediaStream([...cv.captureStream(30).getTracks(),...d.stream.getTracks()]),mime=[$('#fmt').value=='webm'?'':'video/mp4;codecs=avc1','video/webm;codecs=vp9,opus','video/webm'].find(t=>t&&MediaRecorder.isTypeSupported(t)),ch=[];
 rec=new MediaRecorder(st,{mimeType:mime,videoBitsPerSecond:6e6});rec.ondataavailable=e=>ch.push(e.data);
 rec.onstop=async()=>{ns().forEach(n=>n.disconnect(d));let out=new Blob(ch,{type:mime}),ext=mime.includes('mp4')?'mp4':'webm';
 if(ext=='webm'&&$('#fmt').value=='mp4'){try{$('#exp').textContent='Konversi ke MP4...';const f=await ff();await f.writeFile('in.webm',new Uint8Array(await out.arrayBuffer()));await f.exec(['-i','in.webm','-c:v','libx264','-preset','ultrafast','-pix_fmt','yuv420p','-c:a','aac','out.mp4']);out=new Blob([(await f.readFile('out.mp4')).buffer],{type:'video/mp4'});ext='mp4'}catch(e){alert('Konversi MP4 gagal, file diunduh sebagai WebM: '+e.message)}}
 dl(out,'clipora.'+ext);$('#exp').textContent='Ekspor'};
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
 if(S.playing&&inr&&AC){const el=aelem(a);const e2=S.t-a.start,L2=a.out-a.in,fd=a.fade||0,fk=fd>0?Math.max(0,Math.min(1,e2/fd,(L2-e2)/fd)):1;el.volume=S.tk.A.m?0:Math.min(1,a.vol*fk);if(el.paused){el.currentTime=a.in+S.t-a.start;el.play().catch(()=>{})}}else if(AE[a.id]&&!AE[a.id].paused)AE[a.id].pause()}}
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
$('#save').onclick=()=>dl(new Blob([JSON.stringify({v:1,ratio:S.ratio,clips:S.clips,texts:S.texts,aud:S.aud,ovl:S.ovl,media:Object.values(media).map(m=>({id:m.id,name:m.name,type:m.type,dur:m.dur}))})],{type:'application/json'}),'proyek-clipora.json');
$('#open').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const p=JSON.parse(await f.text());snap();S.clips=p.clips||[];S.texts=p.texts||[];S.aud=p.aud||[];S.ovl=p.ovl||[];S.ratio=p.ratio||[9,16];size();$('#ratio').value=S.ratio.join(':');
 for(const m of p.media||[])if(!media[m.id]){media[m.id]={...m,url:'',file:null};pend[m.id]={name:m.name}}
 S.sel=null;cur=curM=null;bin();render();alert('Proyek dibuka. Impor ulang file media dengan nama yang sama agar tersambung.')}catch(x){alert('File proyek tidak valid')}e.target.value=''};

const filt=c=>(FX[c.fx]&&FX[c.fx]!='none'?FX[c.fx]+' ':'')+`brightness(${c.br??1}) contrast(${c.ct??1}) saturate(${c.sa??1})`;
const OI={},oimg=o=>OI[o.m]||(OI[o.m]=Object.assign(new Image(),{src:media[o.m]?.url||''}));
function drawOvl(){for(const o of[...S.ovl].sort((a,b)=>(a.z||0)-(b.z||0))){const inr=S.t>=o.start&&S.t<o.end&&!S.tk.O.h;
 if(o.k=='vid'){const v=ovid(o);if(!inr){v.paused||v.pause();continue}syncV(o,v)}if(!inr)continue;
 const u=(S.t-o.start)/Math.max(.01,o.end-o.start),sz=kv(o,'s',o.s,u);ctx.save();ctx.globalCompositeOperation=o.bm||'source-over';ctx.globalAlpha=kv(o,'op',o.op,u);ctx.translate(kv(o,'x',o.x,u)*cv.width,kv(o,'y',o.y,u)*cv.height);ctx.rotate(kv(o,'r',o.r,u)*Math.PI/180);
 if(o.e){ctx.font=`${sz*cv.height*.3}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(o.e,0,0)}
 else{const im=o.k=='vid'?ovid(o):oimg(o),iw=im.videoWidth||im.naturalWidth,ih=im.videoHeight||im.naturalHeight;if(iw){const w=sz*cv.width*.5,h=w*ih/iw;if(o.plate=='ya'){ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(-w/2-8,-h/2-8,w+16,h+16,10);ctx.fill()}maskPath(o,w,h);ctx.drawImage((o.ck||o.bg)?(fxPix(im,iw,ih,o)||im):im,-w/2,-h/2,w,h)}}ctx.restore()}}
function drawTexts(){if(S.tk.T.h)return;for(const t of S.texts)if(S.t>=t.start&&S.t<t.end){const fs=t.size*cv.height/720,pr=Math.min(1,(S.t-t.start)/.3);let al=1,dy=0,sc=1;
 if(t.anim=='fade')al=pr;else if(t.anim=='pop')sc=.7+.3*pr;else if(t.anim=='geser'){dy=(1-pr)*fs*2;al=pr}
 ctx.save();ctx.globalAlpha=al;ctx.font=`800 ${fs}px ${t.font||'Poppins'},Arial,sans-serif`;ctx.textAlign='center';ctx.lineJoin='round';ctx.translate(cv.width*(t.x??.5),cv.height*t.y+dy);ctx.scale(sc,sc);
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
const clipx=c=>curveUI(c)+selOpt('fit','Tampilan',['isi','muat'],c.fit)+selOpt('bgb','Latar blur (mode muat)',['tidak','ya'],c.bgb)+selOpt('pitch','Suara cempreng',['tidak','ya'],c.pitch)+EZ(c)+`<div class=row><button data-act=frz>Freeze frame</button><button data-act=rev>Reverse</button></div><h3>Audio AI</h3><div class=row><button data-act=nr>Bersihkan noise</button><button data-act=sil>Hapus jeda</button><button data-act=fil>Hapus kata pengisi</button></div>`;
const ovx=o=>`<label>Track<select data-k=z><option value=0>1</option><option value=1 ${o.z?'selected':''}>2</option></select></label>`+EZ(o)+selOpt('plate','Latar putih',['tidak','ya'],o.plate)+selOpt('mask','Masker',['tanpa','bulat','kotak','bintang'],o.mask)+selOpt('bm','Blend mode',['source-over','screen','multiply','overlay','lighten','difference'],o.bm)+(o.e?'':`<label>Chroma key<select data-k=ckon><option value=''>mati</option><option value=1 ${o.ck?'selected':''}>aktif</option></select></label><label>Warna kunci<input type=color value=${o.ck?.c||'#00ff00'} data-k=ckc></label><label>Toleransi<input type=range min=.05 max=.8 step=.01 value=${o.ck?.t||.35} data-k=ckt></label><button data-act=bg>${o.bg?'Matikan':'Aktifkan'} hapus latar (AI)</button><label>Balik masker<select data-k=inv><option value=''>tidak</option><option value=1 ${o.inv?'selected':''}>ya</option></select></label>`);
function postOv(o){o.z=+o.z||0;if('ckon' in o)o.ck=o.ckon?{c:o.ckc||'#00ff00',t:+o.ckt||.35}:null}
const clipStart=c=>{let a=0;for(const x of S.clips){if(x===c)return a;a+=dur(x)}return 0};
const findIt=id=>{for(const k of['clips','texts','aud','ovl']){const it=S[k].find(x=>x.id==id);if(it)return[k,it]}};
function act(a){const c=selClip(),o=S.ovl.find(x=>x.id==S.sel),it=c||o;if(!it)return alert('Pilih klip atau overlay dulu.');
 if(a=='kf'){const u=c?(S.t-clipStart(c))/dur(c):(S.t-o.start)/(o.end-o.start);if(u<0||u>1)return alert('Playhead harus berada di dalam klip.');snap();it.kf=it.kf||{};
  const P=c?{op:c.op??1,zoom:c.zoom||1,ox:c.ox||0,oy:c.oy||0}:{op:o.op,s:o.s,x:o.x,y:o.y,r:o.r};for(const k in P){const ar=(it.kf[k]||[]).filter(z=>Math.abs(z.t-u)>.01);ar.push({t:u,v:P[k]});it.kf[k]=ar}render()}
 else if(a=='kfx'){snap();delete it.kf;render()}else if(a=='crvx'){snap();delete it.crv;cur=null;render()}else if(a=='nr')denoise(c);else if(a=='sil')silence(c);else if(a=='fil')filler(c);else if(a=='bg')bgToggle(o);else if(a=='frz')freeze();else if(a=='rev')reverse(c)}
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
function drag(ev,id,el){const f=findIt(id);if(!f||ev.button)return;const[k,it]=f,sn=JSON.parse(JSON.stringify(it)),rc=el.getBoundingClientRect(),edge=ev.clientX-rc.left<7?'L':rc.right-ev.clientX<7?'R':null,x0=ev.clientX,o0=k=='clips'?0:it.start,len=k=='aud'?it.out-it.in:k=='clips'?0:it.end-it.start;let moved=false;
 const mv=e=>{const dx=e.clientX-x0;if(!moved&&Math.abs(dx)<5)return;if(!moved){moved=true;S.sel=id;if(k!='clips'||edge)snap()}if(edge){trim(k,it,sn,edge,dx/PX);render();return}
  if(k=='clips'){el.style.opacity=.5;el.style.transform=`translateX(${dx}px)`;return}
  let s=Math.max(0,o0+dx/PX);if(SNAP)for(const p of[0,S.t,...edges(it)]){if(Math.abs(p-s)*PX<8){s=p;break}if(Math.abs(p-(s+len))*PX<8){s=p-len;break}}
  it.start=s;if(k!='aud')it.end=s+len;it.full=false;render()};
 const up=e=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);if(moved&&k=='clips'&&!edge)reorder(it,(el.offsetLeft+e.clientX-x0)/PX);else if(moved)render()};
 addEventListener('pointermove',mv);addEventListener('pointerup',up)}
$('#snapb').onclick=()=>{SNAP=!SNAP;$('#snapb').classList.toggle('go',SNAP)};
addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;const k=e.key.toLowerCase(),c=e.ctrlKey||e.metaKey;
 if(c&&k=='c'){const f=findIt(S.sel);if(f)clip=[f[0],JSON.stringify(f[1])]}
 else if(c&&k=='v'&&clip){snap();const it=JSON.parse(clip[1]),kk=clip[0];it.id=uid();if(kk=='clips'){const s=selClip();S.clips.splice(s?S.clips.indexOf(s)+1:S.clips.length,0,it)}else{if(kk=='aud')it.start=S.t;else{const L=it.end-it.start;it.start=S.t;it.end=S.t+L}S[kk].push(it)}S.sel=it.id;cur=null;render()}
 else if(!c&&k=='f')freeze()});
render();

const selOpt=(k,l,a,v)=>`<label>${l}<select data-k=${k}>${a.map(x=>`<option ${x==v?'selected':''}>${x}</option>`).join('')}</select></label>`;
function maskPath(o,w,h){if(o.mask=='bulat'){ctx.beginPath();ctx.ellipse(0,0,w/2,h/2,0,0,7);ctx.clip()}else if(o.mask=='kotak'){ctx.beginPath();ctx.roundRect(-w/2,-h/2,w,h,Math.min(w,h)*.12);ctx.clip()}
 else if(o.mask=='bintang'){const R=Math.min(w,h)/2;ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?R*.4:R;ctx[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}ctx.closePath();ctx.clip()}}
function trim(k,it,s,edge,dt){const M=it.m&&media[it.m]&&media[it.m].type!='image'?media[it.m].dur:1e9;
 if(k=='clips'){const d=dt*s.speed;if(edge=='L')it.in=Math.max(0,Math.min(s.in+d,s.out-.1));else it.out=Math.min(M,Math.max(s.out+d,s.in+.1));cur=null}
 else if(k=='aud'){if(edge=='L'){const d=Math.max(-s.in,Math.min(dt,s.out-s.in-.1));it.in=s.in+d;it.start=Math.max(0,s.start+d)}else it.out=Math.min(M,Math.max(s.out+dt,s.in+.1))}
 else{const v=it.k=='vid';it.full=false;if(edge=='L'){const d=Math.min(dt,s.end-s.start-.2);it.start=Math.max(0,s.start+d);if(v)it.in=Math.max(0,s.in+d)}else{let e=Math.max(s.end+dt,s.start+.2);if(v)e=Math.min(e,s.start+M-s.in);it.end=e;if(v)it.out=s.in+(e-s.start)}}}
function idb(){return new Promise((res,rej)=>{const r=indexedDB.open('clipora',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
var svT;function autosave(){clearTimeout(svT);if(!(S.clips.length+S.texts.length+S.ovl.length+S.aud.length))return;
 svT=setTimeout(async()=>{try{const db=await idb(),ms=Object.values(media).filter(m=>m.file).map(m=>({id:m.id,name:m.name,type:m.type,dur:m.dur,file:m.file}));db.transaction('kv','readwrite').objectStore('kv').put({ratio:S.ratio,clips:S.clips,texts:S.texts,aud:S.aud,ovl:S.ovl,ms},'last')}catch(e){}},1500)}
(async()=>{try{const db=await idb(),r=await new Promise(res=>{const q=db.transaction('kv').objectStore('kv').get('last');q.onsuccess=()=>res(q.result)});
 if(!r||!(r.clips.length+r.texts.length+r.ovl.length+r.aud.length))return;if(!confirm('Ada proyek terakhir yang belum ditutup. Lanjutkan?'))return;
 for(const m of r.ms){media[m.id]={...m,url:URL.createObjectURL(m.file)};thumb(media[m.id])}
 Object.assign(S,{ratio:r.ratio,clips:r.clips,texts:r.texts,aud:r.aud,ovl:r.ovl});size();$('#ratio').value=S.ratio.join(':');bin();render()}catch(e){}})();

const TF='https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2',CI=new WeakMap(),TTSP={},FIL=new Set('eh em emm eee ee hmm hm mm mmm anu uh uhm um umm ah aa aaa eem ehm'.split(' '));let ASR=null;
const PRE={montage:[[0,1.5],[.3,1.5],[.45,.35],[.7,.35],[.85,1.5],[1,1.5]],hero:[[0,1],[.4,1],[.5,.3],[.7,.3],[.8,1.6],[1,1]],peluru:[[0,2],[.35,2],[.5,.15],[.65,.15],[.8,2],[1,2]],'cepat ke lambat':[[0,3],[1,.5]],'lambat ke cepat':[[0,.5],[1,3]]};
function fval(c,p){const a=c.crv;if(p<=a[0][0])return a[0][1];for(let i=1;i<a.length;i++)if(p<=a[i][0]){const q=(p-a[i-1][0])/((a[i][0]-a[i-1][0])||1);return a[i-1][1]+(a[i][1]-a[i-1][1])*q}return a[a.length-1][1]}
function cinfo(c){const k=JSON.stringify([c.crv,c.in,c.out,c.speed]),e=CI.get(c);if(e&&e.k==k)return e;const N=80,cum=[0];for(let i=0;i<N;i++)cum.push(cum[i]+(c.out-c.in)/N/(c.speed*Math.max(.1,fval(c,(i+.5)/N))));const o={k,cum,T:cum[N],N};CI.set(c,o);return o}
function src(c,t){if(!(c.crv&&c.crv.length>1))return t*c.speed+c.in;const{cum,N}=cinfo(c);let i=1;while(i<N&&cum[i]<t)i++;const q=(t-cum[i-1])/((cum[i]-cum[i-1])||1);return c.in+((i-1+Math.max(0,Math.min(1,q)))/N)*(c.out-c.in)}
function fspd(c,t){if(!(c.crv&&c.crv.length>1))return c.speed;return c.speed*Math.max(.1,fval(c,(src(c,t)-c.in)/((c.out-c.in)||1)))}
const curveUI=c=>`<h3>Kurva kecepatan</h3><canvas id=cvc width=250 height=90 style="width:100%;border-radius:8px"></canvas><div class=row><select id=crvp><option value=''>Preset...</option>${Object.keys(PRE).map(k=>`<option>${k}</option>`).join('')}</select><button data-act=crvx>Reset</button></div><small>Klik untuk titik baru, seret untuk atur, klik dua kali untuk hapus. Garis tengah = 1x.</small>`;
function curveInit(c,P){const k=P.querySelector('#cvc');if(!k||!c)return;const g=k.getContext('2d'),W=k.width,H=k.height,pts=()=>c.crv||[[0,1],[1,1]],X=p=>p*(W-10)+5,Y=v=>H-5-v/4*(H-10);
 const draw=()=>{g.fillStyle='#14161b';g.fillRect(0,0,W,H);g.strokeStyle='#2d313b';[1,2,3].forEach(v=>{g.beginPath();g.moveTo(0,Y(v));g.lineTo(W,Y(v));g.stroke()});g.strokeStyle='#00B2A9';g.lineWidth=2;g.beginPath();pts().forEach(([p,v],i)=>g[i?'lineTo':'moveTo'](X(p),Y(v)));g.stroke();g.fillStyle='#EF1B4B';pts().forEach(([p,v])=>{g.beginPath();g.arc(X(p),Y(v),5,0,7);g.fill()})};draw();
 const pos=e=>{const r=k.getBoundingClientRect(),sx=W/r.width,sy=H/r.height;return[Math.max(0,Math.min(1,((e.clientX-r.left)*sx-5)/(W-10))),Math.max(.1,Math.min(4,(H-5-(e.clientY-r.top)*sy)/(H-10)*4))]};
 k.onpointerdown=e=>{const[p,v]=pos(e),a=pts().map(x=>[...x]);let i=a.findIndex(q=>Math.hypot(X(q[0])-X(p),Y(q[1])-Y(v))<10);snap();if(i<0){a.push([p,v]);a.sort((x,y)=>x[0]-y[0]);i=a.findIndex(q=>q[0]==p&&q[1]==v)}c.crv=a;
  const mv=ev=>{const[p2,v2]=pos(ev);a[i]=[i==0?0:i==a.length-1?1:p2,v2];cur=null;draw()},up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);a.sort((x,y)=>x[0]-y[0]);cur=null;render()};addEventListener('pointermove',mv);addEventListener('pointerup',up)};
 k.ondblclick=e=>{const[p,v]=pos(e);if(!c.crv||c.crv.length<=2)return;let b=-1,bd=1e9;c.crv.forEach((q,i)=>{const d=Math.hypot(X(q[0])-X(p),Y(q[1])-Y(v));if(i>0&&i<c.crv.length-1&&d<bd){bd=d;b=i}});if(b>0&&bd<14){snap();c.crv.splice(b,1);cur=null;render()}};
 P.querySelector('#crvp').onchange=e=>{snap();c.crv=PRE[e.target.value]?PRE[e.target.value].map(x=>[...x]):null;cur=null;render()}}
function toWav(x,sr,name){const n=x.length,b=new DataView(new ArrayBuffer(44+n*2)),w=(o,s)=>[...s].forEach((ch,i)=>b.setUint8(o+i,ch.charCodeAt(0)));w(0,'RIFF');b.setUint32(4,36+n*2,true);w(8,'WAVEfmt ');b.setUint32(16,16,true);b.setUint16(20,1,true);b.setUint16(22,1,true);b.setUint32(24,sr,true);b.setUint32(28,sr*2,true);b.setUint16(32,2,true);b.setUint16(34,16,true);w(36,'data');b.setUint32(40,n*2,true);for(let i=0;i<n;i++)b.setInt16(44+i*2,Math.max(-1,Math.min(1,x[i]))*32767,true);return new File([b],name+'.wav',{type:'audio/wav'})}
async function addSamples(x,sr,name){const d=x.length/sr,id=await addFile(toWav(x,sr,name),d);snap();S.aud.push({id:uid(),m:id,start:S.t,in:0,out:d,vol:1});render()}
$('#ttsB').onclick=async()=>{const txt=$('#ttsT').value.trim(),st=$('#stat'),id=$('#ttsL').value;if(!txt)return alert('Tulis kalimatnya dulu.');
 try{if(!TTSP[id]){st.textContent='Mengunduh model suara...';const{pipeline}=await import(TF);TTSP[id]=await pipeline('text-to-speech',id,{dtype:'fp32',progress_callback:p=>{if(p.status=='progress')st.textContent='Unduh model '+Math.round(p.progress)+'%'}})}
  st.textContent='Membuat suara...';const o=await TTSP[id](txt);await addSamples(o.audio,o.sampling_rate,'tts-'+uid());st.textContent=''}catch(e){st.textContent='';alert('Gagal membuat suara: '+e.message)}};
async function getAsr(st){if(ASR)return ASR;const{pipeline}=await import(TF);return ASR=await pipeline('automatic-speech-recognition','Xenova/whisper-tiny',{progress_callback:p=>{if(p.status=='progress')st.textContent='Unduh model '+Math.round(p.progress)+'%'}})}
async function pcmOf(c){const ac=new AudioContext({sampleRate:16000}),d=await ac.decodeAudioData(await media[c.m].file.arrayBuffer());return d.getChannelData(0).slice(Math.floor(c.in*16000),Math.floor(c.out*16000))}
function cutRanges(c,rs){rs=rs.map(([s,e])=>[Math.max(c.in,s),Math.min(c.out,e)]).filter(([s,e])=>e-s>.03).sort((x,y)=>x[0]-y[0]);snap();const o=[];let a=c.in;for(const[s,e]of rs){if(s>a+.05)o.push({...c,id:uid(),in:a,out:s});a=Math.max(a,e)}if(c.out>a+.05)o.push({...c,id:uid(),in:a,out:c.out});S.clips.splice(S.clips.indexOf(c),1,...o);S.sel=null;cur=null;render()}
const okAud=c=>{const m=c&&media[c.m];if(!m||!m.file||m.type=='image'){alert('Pilih klip video/audio yang filenya sudah diimpor.');return false}if(c.crv){alert('Hapus kurva kecepatan dulu.');return false}return true};
async function silence(c){if(!okAud(c))return;const st=$('#stat');try{st.textContent='Mencari jeda...';const x=await pcmOf(c),W=320,r=[];for(let i=0;i+W<=x.length;i+=W){let e=0;for(let j=0;j<W;j++)e+=x[i+j]*x[i+j];r.push(Math.sqrt(e/W))}
  const th=Math.max(.004,[...r].sort((a,b)=>a-b)[Math.floor(r.length*.1)]*3),rs=[];let s=-1;r.forEach((v,i)=>{const t=i*W/16000,sil=v<th;if(sil&&s<0)s=t;if(!sil&&s>=0){if(t-s>=.45)rs.push([c.in+s+.1,c.in+t-.1]);s=-1}});if(s>=0&&r.length*W/16000-s>=.45)rs.push([c.in+s+.1,c.out]);
  st.textContent='';if(!rs.length)return alert('Tidak ada jeda panjang yang terdeteksi.');cutRanges(c,rs);alert('Jeda dihapus: '+rs.length+' bagian.')}catch(e){st.textContent='';alert('Gagal: '+e.message)}}
async function filler(c){if(!okAud(c))return;const st=$('#stat');try{st.textContent='Memuat model...';const asr=await getAsr(st);st.textContent='Mencari kata pengisi...';const x=await pcmOf(c),r=await asr(x,{return_timestamps:'word',chunk_length_s:30,stride_length_s:5,language:$('#lang').value,task:'transcribe'}),rs=[];
  for(const w of r.chunks||[]){const t=w.text.toLowerCase().replace(/[^a-z]/g,'');if(FIL.has(t)&&w.timestamp[1]!=null)rs.push([c.in+w.timestamp[0],c.in+w.timestamp[1]])}
  st.textContent='';if(!rs.length)return alert('Tidak ada kata pengisi yang terdeteksi. Model kecil sering melewatkannya; coba "Hapus jeda".');cutRanges(c,rs);alert('Kata pengisi dihapus: '+rs.length)}catch(e){st.textContent='';alert('Gagal: '+e.message)}}
async function denoise(c){if(!okAud(c))return;if(c.speed!=1)return alert('Bersihkan noise dulu sebelum mengubah kecepatan.');const m=media[c.m],st=$('#stat');
 try{const f=await ff();st.textContent='Membersihkan noise...';await f.writeFile('nr_in',new Uint8Array(await m.file.arrayBuffer()));await f.exec(['-ss',String(c.in),'-t',String(c.out-c.in),'-i','nr_in','-vn','-af','highpass=f=80,afftdn=nr=18:nf=-35','-ac','1','-ar','44100','nr.wav']);
  const id=await addFile(new File([(await f.readFile('nr.wav')).buffer],m.name.replace(/\.\w+$/,'')+'-bersih.wav',{type:'audio/wav'}),c.out-c.in);snap();c.vol=0;S.aud.push({id:uid(),m:id,start:clipStart(c),in:0,out:c.out-c.in,vol:1});st.textContent='';render()}catch(e){st.textContent='';alert('Gagal: '+e.message)}}
cv.onpointerdown=e=>{const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;let hit=null;
 for(const t of S.texts)if(!hit&&S.t>=t.start&&S.t<t.end&&Math.abs(py-t.y)<.06)hit=t;
 for(const o of[...S.ovl].sort((a,b)=>(b.z||0)-(a.z||0)))if(!hit&&S.t>=o.start&&S.t<o.end&&Math.hypot((px-o.x)*r.width,(py-o.y)*r.height)<o.s*r.width*.25+10)hit=o;
 if(!hit)return;S.sel=hit.id;snap();const dx=px-(hit.x??.5),dy=py-hit.y;render();
 const mv=ev=>{let nx=(ev.clientX-r.left)/r.width-dx,ny=(ev.clientY-r.top)/r.height-dy;if(Math.abs(nx-.5)<.02)nx=.5;if(Math.abs(ny-.5)<.02)ny=.5;hit.x=Math.max(0,Math.min(1,nx));hit.y=Math.max(0,Math.min(1,ny))},up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);render()};addEventListener('pointermove',mv);addEventListener('pointerup',up)};
$('#ruler').onpointerdown=e=>{e.stopPropagation();const tl=$('#tl'),go=ev=>{S.t=Math.max(0,Math.min(total(),(ev.clientX-tl.getBoundingClientRect().left+tl.scrollLeft)/PX));cur=null},up=()=>{removeEventListener('pointermove',go);removeEventListener('pointerup',up)};go(e);addEventListener('pointermove',go);addEventListener('pointerup',up)};

let lgFile=null;
$('#lgUp').onchange=e=>{lgFile=e.target.files[0]||null;$('#lgName').textContent=lgFile?lgFile.name:'Logo kumparan (bawaan)'};
function lgPos(wf,hf){const p=$('#lgPos').value,m=.04;return[p.includes('kiri')?m+wf/2:p.includes('kanan')?1-m-wf/2:.5,p.includes('atas')?m+hf/2:p.includes('bawah')?1-m-hf/2:.5]}
async function lgRatio(m){const im=new Image();im.src=m.url;await im.decode();return im.naturalHeight/im.naturalWidth}
$('#lgAdd').onclick=async()=>{try{let f=lgFile;if(!f){f=new File([await(await fetch('logo.webp')).blob()],'logo-kumparan.webp',{type:'image/webp'})}
 const ex=Object.values(media).find(m=>m.file&&m.name==f.name&&m.file.size==f.size),id=ex?ex.id:await addFile(f),s=+$('#lgSz').value,wf=s*.5,hf=wf*cv.width*(await lgRatio(media[id]))/cv.height,[x,y]=lgPos(wf,hf),full=$('#lgFull').checked;
 snap();const o={id:uid(),k:'img',m:id,start:0,end:full&&total()>0?total():Math.max(5,total()),x,y,s,r:0,op:+$('#lgOp').value,z:1,lg:true,full,plate:$('#lgPlate').checked?'ya':undefined};S.ovl.push(o);S.sel=o.id;render()}catch(e){alert('Gagal memasang logo: '+e.message)}};
$('#lgSet').onclick=async()=>{const o=S.ovl.find(x=>x.id==S.sel);if(!o||o.e||o.k!='img')return alert('Pilih logo atau overlay gambar di timeline dulu.');const s=+$('#lgSz').value,wf=s*.5,hf=wf*cv.width*(await lgRatio(media[o.m]))/cv.height,[x,y]=lgPos(wf,hf);
 snap();Object.assign(o,{s,x,y,op:+$('#lgOp').value,plate:$('#lgPlate').checked?'ya':undefined});if($('#lgFull').checked){o.start=0;o.end=Math.max(total(),1);o.full=true}render()};
$('#lgDel').onclick=()=>{snap();S.ovl=S.ovl.filter(o=>!o.lg);S.sel=null;render()};
