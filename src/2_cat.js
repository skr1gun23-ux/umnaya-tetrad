/* ===== Котята: породы (скины) ===== */
const P=(main,dark,belly,line,extra={})=>({main,dark,belly,line,...extra});
const SKINS=[
 {id:'sk_orange',name:'Рыжик',r:'common',c:P('#f4a259','#d9803a','#fde3c4','#6b3d1f'),start:true},
 {id:'sk_grey',name:'Серый',r:'common',c:P('#a7adb8','#7d8492','#e6e8ec','#3d424d')},
 {id:'sk_greywhite',name:'Серо-белый',r:'common',c:P('#959cab','#6f7684','#ffffff','#3d424d',{paw:'#ffffff'}),pat:'bicolor'},
 {id:'sk_white',name:'Белоснежка',r:'common',c:P('#f7f5f0','#d9d4ca','#ffffff','#6b6458')},
 {id:'sk_cream',name:'Кремовый',r:'common',c:P('#f3d9b1','#dcb98a','#fff3e0','#6b5134')},
 {id:'sk_choco',name:'Шоколадный',r:'common',c:P('#7b4a2e','#5a321c','#a9714c','#2e1a0e',{light:true})},
 {id:'sk_tabby',name:'Рыжий полосатик',r:'common',c:P('#f4a259','#c46a28','#fde3c4','#6b3d1f'),pat:'tabby'},
 {id:'sk_greytabby',name:'Серый полосатик',r:'common',c:P('#a7adb8','#5f6674','#e6e8ec','#3d424d'),pat:'tabby'},
 {id:'sk_blue',name:'Голубой',r:'common',c:P('#8a9bb5','#6a7b95','#c9d3e3','#2f3a4d')},
 {id:'sk_black',name:'Чёрный',r:'rare',c:P('#3a3a44','#24242c','#5b5b68','#111116',{light:true})},
 {id:'sk_siamese',name:'Сиамский',r:'rare',c:P('#efe2cc','#6b4a35','#fff7ea','#4a3122'),pat:'points',glow:null},
 {id:'sk_tuxedo',name:'Кот в смокинге',r:'rare',c:P('#2e2e36','#1c1c22','#ffffff','#0e0e12',{light:true,paw:'#ffffff'}),pat:'bicolor'},
 {id:'sk_calico',name:'Трёхцветная',r:'rare',c:P('#fbf7f0','#d9d0c2','#ffffff','#5b4a3a'),pat:'calico'},
 {id:'sk_bengal',name:'Бенгальский',r:'rare',c:P('#e8b45c','#7a4a1d','#f8e2b8','#5a3612'),pat:'spots'},
 {id:'sk_night',name:'Ночной охотник',r:'rare',c:P('#26262e','#15151a','#3a3a46','#0a0a0e',{light:true}),glow:'#7cff4f'},
 {id:'sk_mint',name:'Мятный',r:'rare',c:P('#9fe3c9','#6cc4a4','#e3fbf1','#2c6b55')},
 {id:'sk_pink',name:'Розовый',r:'rare',c:P('#f6a6c8','#e07aa8','#ffe1ee','#7a2e50')},
 {id:'sk_lilac',name:'Лавандовый',r:'rare',c:P('#c3b1e1','#9f88c9','#efe8fa','#4d3a73')},
 {id:'sk_space',name:'Космический',r:'legend',c:P('#2b2f6b','#1a1d4a','#454aa0','#0d0f2b',{light:true}),pat:'stars',glow:'#ffd166'},
 {id:'sk_rainbow',name:'Радужный',r:'legend',c:P('#ffffff','#e6e6ef','#ffffff','#5a4a7a'),pat:'rainbow'},
 {id:'sk_gold',name:'Золотой',r:'legend',c:P('#f4c542','#c99700','#ffe9a3','#7a5a00'),pat:'shine'},
 {id:'sk_ghost',name:'Призрак',r:'legend',c:P('#eef4ff','#c9d6f0','#ffffff','#7a8bb5'),pat:'ghost',glow:'#7fd8ff'},
 {id:'sk_fire',name:'Огненный',r:'legend',c:P('#ff6b35','#d1401a','#ffb38a','#6b1a05'),pat:'flame',glow:'#ffe066'},
 {id:'sk_cyber',name:'Киберкот Неон',r:'rare',c:P('#2a2f45','#1a1e2e','#3c4363','#0b0d16',{light:true,neon:'#00e5ff'}),pat:'circuit',glow:'#00e5ff'},
 {id:'sk_cyberpink',name:'Киберкошка Пинк',r:'rare',c:P('#3b2340','#25142a','#563360','#12070f',{light:true,neon:'#ff2bd6'}),pat:'circuit',glow:'#ff2bd6'},
 {id:'sk_chrome',name:'Киберкот Хром',r:'legend',c:P('#c9d1dc','#8d97a6','#eef2f7','#3d4654',{neon:'#ff3355'}),pat:'circuit',glow:'#ff3355'},
 {id:'sk_toxic',name:'Киберкот Токсик',r:'legend',c:P('#1f2a1f','#121a12','#2f3f2f','#060a06',{light:true,neon:'#39ff14'}),pat:'circuit',glow:'#39ff14'},
 {id:'px_orange',name:'Пиксельный рыжик',r:'common',st:'pixel',c:P('#f4a259','#c46a28','#fde3c4','#3a2010')},
 {id:'px_grey',name:'Пиксельный серый',r:'common',st:'pixel',c:P('#a7adb8','#6d7482','#e6e8ec','#22262e')},
 {id:'px_snow',name:'Пиксельный снежок',r:'rare',st:'pixel',c:P('#f4f6fb','#c5cde0','#ffffff','#4a5270')},
 {id:'px_ninja',name:'Пиксельный ниндзя',r:'rare',st:'pixel',c:P('#2e2e38','#1c1c24','#45454f','#0a0a0e',{light:true}),glow:'#ff3355'},
 {id:'px_emerald',name:'Пиксельный изумруд',r:'legend',st:'pixel',c:P('#3ccf8e','#1f8f5c','#a8f0cf','#0d3d26'),glow:'#eaffb0'},
 {id:'br_red',name:'Кот-кирпичик красный',r:'common',st:'brick',c:P('#d63b3b','#a32626','#f3a0a0','#5a1010')},
 {id:'br_yellow',name:'Кот-кирпичик жёлтый',r:'common',st:'brick',c:P('#f5c518','#c99a00','#fff0a8','#5a4500')},
 {id:'br_blue',name:'Кот-кирпичик синий',r:'rare',st:'brick',c:P('#2f6fdc','#1f4f99','#a9c6f5','#0d2550')},
 {id:'br_green',name:'Кот-кирпичик зелёный',r:'rare',st:'brick',c:P('#2e9e5b','#1d6b3c','#a6e3bf','#0c3a1e')},
 {id:'br_rainbow',name:'Радужный конструктор',r:'legend',st:'brick',c:P('#d63b3b','#a32626','#fff0a8','#3a1a10'),pat:'multi'}];
const SKIN_BY_ID=Object.fromEntries(SKINS.map(s=>[s.id,s]));
const STYLE_NAME={pixel:'Пиксельный',brick:'Кирпичики'};

/* ===== Одежда ===== */
const WEAR=[
 // голова
 {id:'hat_bow',slot:'hat',name:'Бантик',r:'common',svg:`<path d="M138 50 L118 38 L121 64 Z M138 50 L158 38 L155 64 Z" fill="#ff5d8f" stroke="#c2185b" stroke-width="2"/><circle cx="138" cy="51" r="6" fill="#ff8fab" stroke="#c2185b" stroke-width="2"/>`},
 {id:'hat_flower',slot:'hat',name:'Цветочек',r:'common',svg:[0,1,2,3,4].map(i=>{const a=i*1.2566;return `<circle cx="${(64+9*Math.cos(a)).toFixed(1)}" cy="${(52+9*Math.sin(a)).toFixed(1)}" r="7" fill="#ff8fab"/>`}).join('')+`<circle cx="64" cy="52" r="6" fill="#ffd166"/>`},
 {id:'hat_cap',slot:'hat',name:'Кепка',r:'common',svg:`<path d="M58 66 Q100 14 142 66 Z" fill="#3a7bd5" stroke="#1f4f99" stroke-width="3"/><ellipse cx="148" cy="66" rx="28" ry="7" fill="#2a5fb0" stroke="#1f4f99" stroke-width="2"/><circle cx="100" cy="30" r="4" fill="#1f4f99"/>`},
 {id:'hat_party',slot:'hat',name:'Колпак',r:'common',svg:`<path d="M100 2 L74 60 L126 60 Z" fill="#ffb703" stroke="#c77d00" stroke-width="3"/><path d="M88 31 L112 31 M82 46 L118 46" stroke="#e63946" stroke-width="5"/><circle cx="100" cy="2" r="7" fill="#e63946"/>`},
 {id:'hat_beanie',slot:'hat',name:'Шапка с помпоном',r:'common',svg:`<path d="M56 68 Q58 18 100 18 Q142 18 144 68 Z" fill="#2a9d8f" stroke="#1d6b62" stroke-width="3"/><rect x="52" y="58" width="96" height="14" rx="7" fill="#e9f5f3" stroke="#1d6b62" stroke-width="2"/><circle cx="100" cy="14" r="11" fill="#e9f5f3" stroke="#1d6b62" stroke-width="2"/>`},
 {id:'hat_horns',slot:'hat',name:'Рожки',r:'common',svg:`<path d="M70 58 Q58 34 72 22 Q74 40 84 52 Z M130 58 Q142 34 128 22 Q126 40 116 52 Z" fill="#e63946" stroke="#9d1b28" stroke-width="2"/>`},
 {id:'hat_cowboy',slot:'hat',name:'Ковбойская шляпа',r:'rare',svg:`<path d="M70 56 Q70 18 100 22 Q130 18 130 56 Z" fill="#a0692f" stroke="#5c3a17" stroke-width="3"/><rect x="70" y="44" width="60" height="7" fill="#5c3a17"/><ellipse cx="100" cy="58" rx="64" ry="10" fill="#8b5a2b" stroke="#5c3a17" stroke-width="3"/>`},
 {id:'hat_phones',slot:'hat',name:'Наушники',r:'rare',svg:`<path d="M50 92 Q48 28 100 28 Q152 28 150 92" fill="none" stroke="#333" stroke-width="7"/><rect x="38" y="78" width="20" height="32" rx="8" fill="#e63946" stroke="#333" stroke-width="3"/><rect x="142" y="78" width="20" height="32" rx="8" fill="#e63946" stroke="#333" stroke-width="3"/>`},
 {id:'hat_wizard',slot:'hat',name:'Шляпа волшебника',r:'rare',svg:`<path d="M100 -14 L68 58 L132 58 Z" fill="#5a3fc0" stroke="#33227a" stroke-width="3"/><ellipse cx="100" cy="58" rx="46" ry="9" fill="#4a32a8" stroke="#33227a" stroke-width="3"/>${star5(96,18,7,'#ffd166')}${star5(108,40,5,'#ffd166')}`},
 {id:'hat_crown',slot:'hat',name:'Корона',r:'legend',svg:`<path d="M66 60 L66 24 L83 42 L100 14 L117 42 L134 24 L134 60 Z" fill="#ffd166" stroke="#c99700" stroke-width="3"/><circle cx="100" cy="48" r="6" fill="#e63946"/><circle cx="80" cy="52" r="4" fill="#3a7bd5"/><circle cx="120" cy="52" r="4" fill="#2a9d8f"/>`},
 {id:'hat_halo',slot:'hat',name:'Нимб',r:'legend',glowy:true,svg:`<ellipse cx="100" cy="22" rx="34" ry="9" fill="none" stroke="#ffd166" stroke-width="7" filter="url(#FID)"/><ellipse cx="100" cy="22" rx="34" ry="9" fill="none" stroke="#fff3c4" stroke-width="3"/>`},
 {id:'hat_mohawk',slot:'hat',name:'Неоновый ирокез',r:'legend',glowy:true,svg:`<path d="M78 58 L80 30 L88 44 L92 14 L100 38 L106 8 L112 38 L118 18 L122 44 L128 28 L124 58 Z" fill="#ff2bd6" filter="url(#FID)" opacity=".8"/><path d="M78 58 L80 30 L88 44 L92 14 L100 38 L106 8 L112 38 L118 18 L122 44 L128 28 L124 58 Z" fill="#ff7ae6" stroke="#b0009a" stroke-width="2"/>`},
 // очки
 {id:'gl_round',slot:'glasses',name:'Круглые очки',r:'common',svg:`<circle cx="80" cy="96" r="15" fill="rgba(255,255,255,.18)" stroke="#333" stroke-width="3"/><circle cx="120" cy="96" r="15" fill="rgba(255,255,255,.18)" stroke="#333" stroke-width="3"/><path d="M95 95 L105 95" stroke="#333" stroke-width="3"/>`},
 {id:'gl_3d',slot:'glasses',name:'3D-очки',r:'common',svg:`<rect x="60" y="85" width="80" height="24" rx="5" fill="#fff" stroke="#333" stroke-width="3"/><rect x="65" y="89" width="30" height="16" rx="3" fill="rgba(230,57,70,.75)"/><rect x="105" y="89" width="30" height="16" rx="3" fill="rgba(58,123,213,.75)"/>`},
 {id:'gl_swim',slot:'glasses',name:'Очки для плавания',r:'common',svg:`<path d="M44 96 L156 96" stroke="#2a9d8f" stroke-width="5"/><ellipse cx="80" cy="96" rx="15" ry="12" fill="rgba(110,205,255,.55)" stroke="#1d6b62" stroke-width="3"/><ellipse cx="120" cy="96" rx="15" ry="12" fill="rgba(110,205,255,.55)" stroke="#1d6b62" stroke-width="3"/>`},
 {id:'gl_sun',slot:'glasses',name:'Тёмные очки',r:'rare',svg:`<rect x="62" y="86" width="34" height="20" rx="8" fill="#1d1d28" stroke="#000" stroke-width="2"/><rect x="104" y="86" width="34" height="20" rx="8" fill="#1d1d28" stroke="#000" stroke-width="2"/><path d="M96 92 L104 92" stroke="#000" stroke-width="3"/><path d="M68 90 L76 90" stroke="#fff" stroke-width="2" opacity=".6"/>`},
 {id:'gl_mono',slot:'glasses',name:'Монокль',r:'rare',svg:`<circle cx="120" cy="96" r="15" fill="rgba(255,255,255,.2)" stroke="#c99700" stroke-width="3"/><path d="M134 102 Q144 128 132 150" fill="none" stroke="#c99700" stroke-width="2"/>`},
 {id:'gl_aviator',slot:'glasses',name:'Авиаторы',r:'rare',svg:`<path d="M63 88 Q80 84 96 88 Q97 108 80 109 Q63 107 63 88 Z M104 88 Q120 84 137 88 Q137 107 120 109 Q103 108 104 88 Z" fill="rgba(150,95,30,.6)" stroke="#c99700" stroke-width="2.5"/><path d="M96 90 Q100 86 104 90" fill="none" stroke="#c99700" stroke-width="2.5"/>`},
 {id:'gl_pixel',slot:'glasses',name:'Пиксельные очки',r:'rare',svg:`<rect x="58" y="86" width="84" height="7" fill="#111"/><rect x="62" y="93" width="30" height="14" fill="#111"/><rect x="108" y="93" width="30" height="14" fill="#111"/><rect x="66" y="95" width="6" height="5" fill="#fff"/><rect x="112" y="95" width="6" height="5" fill="#fff"/>`},
 {id:'gl_cateye',slot:'glasses',name:'Очки «кошачий глаз»',r:'rare',svg:`<path d="M62 90 Q78 84 95 92 Q93 106 79 106 Q65 104 62 90 L56 82 Z M138 90 Q122 84 105 92 Q107 106 121 106 Q135 104 138 90 L144 82 Z" fill="rgba(255,143,171,.35)" stroke="#e0457b" stroke-width="3" stroke-linejoin="round"/>`},
 {id:'gl_star',slot:'glasses',name:'Очки-звёздочки',r:'legend',svg:star5(80,96,17,'rgba(255,209,102,.85)','#d99a00')+star5(120,96,17,'rgba(255,209,102,.85)','#d99a00')},
 {id:'gl_heart',slot:'glasses',name:'Очки-сердечки',r:'legend',svg:heart(80,98,13,'#ff4d6d')+heart(120,98,13,'#ff4d6d')+`<path d="M94 94 L106 94" stroke="#c9184a" stroke-width="3"/>`},
 {id:'gl_cyber',slot:'glasses',name:'Кибервизор',r:'legend',glowy:true,svg:`<rect x="56" y="85" width="88" height="22" rx="11" fill="rgba(0,229,255,.35)" stroke="#00e5ff" stroke-width="3" filter="url(#FID)"/><rect x="56" y="85" width="88" height="22" rx="11" fill="rgba(0,229,255,.3)" stroke="#00e5ff" stroke-width="2.5"/><path d="M64 96 L136 96" stroke="#e0ffff" stroke-width="2"/><circle cx="56" cy="96" r="5" fill="#333"/><circle cx="144" cy="96" r="5" fill="#333"/>`},
 // глаза
 {id:'ey_neon',slot:'eyes',name:'Неоновые глаза',r:'rare',eye:{kind:'glow',color:'#00e5ff'}},
 {id:'ey_fire',slot:'eyes',name:'Огненные глаза',r:'rare',eye:{kind:'glow',color:'#ff8c1a'}},
 {id:'ey_toxic',slot:'eyes',name:'Ядовито-зелёные глаза',r:'rare',eye:{kind:'glow',color:'#39ff14'}},
 {id:'ey_heart',slot:'eyes',name:'Влюблённые глаза',r:'rare',eye:{kind:'heart'}},
 {id:'ey_laser',slot:'eyes',name:'Лазерные глаза',r:'legend',eye:{kind:'glow',color:'#ff1f3d'}},
 {id:'ey_star',slot:'eyes',name:'Звёздные глаза',r:'legend',eye:{kind:'star'}},
 {id:'ey_violet',slot:'eyes',name:'Фиолетовое сияние',r:'legend',eye:{kind:'glow',color:'#c77dff'}},
 // шея
 {id:'nk_bell',slot:'neck',name:'Колокольчик',r:'common',svg:`<path d="M64 132 Q100 150 136 132" fill="none" stroke="#e63946" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="148" r="9" fill="#ffd166" stroke="#c99700" stroke-width="2"/><path d="M96 151 L104 151" stroke="#8a6500" stroke-width="2"/>`},
 {id:'nk_bowtie',slot:'neck',name:'Бабочка',r:'common',svg:`<path d="M100 140 L78 128 L78 152 Z M100 140 L122 128 L122 152 Z" fill="#e63946" stroke="#9d1b28" stroke-width="2"/><circle cx="100" cy="140" r="5" fill="#9d1b28"/>`},
 {id:'nk_scarf',slot:'neck',name:'Шарф',r:'common',svg:`<path d="M60 128 Q100 148 140 128 L140 142 Q100 160 60 142 Z" fill="#2a9d8f" stroke="#1d6b62" stroke-width="2"/><rect x="112" y="140" width="15" height="34" rx="4" fill="#2a9d8f" stroke="#1d6b62" stroke-width="2" transform="rotate(-10 120 150)"/><path d="M66 134 L66 144 M80 138 L80 148 M94 140 L94 151" stroke="#e9f5f3" stroke-width="3"/>`},
 {id:'nk_tie',slot:'neck',name:'Галстук',r:'rare',svg:`<path d="M93 134 L107 134 L105 143 L95 143 Z" fill="#1f4f99"/><path d="M95 143 L105 143 L112 182 L100 194 L88 182 Z" fill="#3a7bd5" stroke="#1f4f99" stroke-width="2"/><path d="M92 160 L108 152 M90 176 L110 166" stroke="#ffd166" stroke-width="3"/>`},
 {id:'nk_cyber',slot:'neck',name:'Неоновый ошейник',r:'rare',glowy:true,svg:`<path d="M64 134 Q100 150 136 134" fill="none" stroke="#00e5ff" stroke-width="7" stroke-linecap="round" filter="url(#FID)"/><path d="M64 134 Q100 150 136 134" fill="none" stroke="#bff8ff" stroke-width="4" stroke-linecap="round"/><rect x="92" y="138" width="16" height="12" rx="3" fill="#222" stroke="#00e5ff" stroke-width="2"/>`},
 {id:'nk_medal',slot:'neck',name:'Медаль отличника',r:'legend',svg:`<path d="M84 130 L100 160 L116 130" fill="none" stroke="#3a7bd5" stroke-width="7"/><circle cx="100" cy="164" r="13" fill="#ffd166" stroke="#c99700" stroke-width="3"/>${star5(100,164,8,'#c99700')}`},
 // одежда
 {id:'bd_tshirt',slot:'body',name:'Футболка',r:'common',clip:`<rect x="40" y="128" width="120" height="62" fill="#ffb703"/><circle cx="100" cy="160" r="9" fill="#fff" opacity=".8"/>`},
 {id:'bd_vest',slot:'body',name:'Жилетка',r:'common',clip:`<rect x="40" y="128" width="46" height="90" fill="#6d4c41"/><rect x="114" y="128" width="46" height="90" fill="#6d4c41"/><circle cx="84" cy="162" r="3" fill="#ffd166"/><circle cx="84" cy="180" r="3" fill="#ffd166"/>`},
 {id:'bd_sweater',slot:'body',name:'Свитер в полоску',r:'rare',clip:`<rect x="40" y="128" width="120" height="90" fill="#e63946"/><rect x="40" y="146" width="120" height="8" fill="#fff"/><rect x="40" y="166" width="120" height="8" fill="#fff"/><rect x="40" y="186" width="120" height="8" fill="#fff"/>`},
 {id:'bd_dress',slot:'body',name:'Платье',r:'rare',svg:`<path d="M68 140 Q100 152 132 140 L152 206 Q100 218 48 206 Z" fill="#c77dff" stroke="#7b2cbf" stroke-width="3"/><circle cx="80" cy="190" r="4" fill="#fff"/><circle cx="104" cy="172" r="4" fill="#fff"/><circle cx="124" cy="196" r="4" fill="#fff"/><circle cx="96" cy="200" r="4" fill="#fff"/>`},
 {id:'bd_jacket',slot:'body',name:'Киберкуртка',r:'rare',clip:`<rect x="40" y="128" width="120" height="90" fill="#1d2235"/><path d="M100 140 L100 214" stroke="#00e5ff" stroke-width="3"/><path d="M60 150 L80 150 L86 160 M140 176 L120 176 L114 168" fill="none" stroke="#ff2bd6" stroke-width="3"/>`},
 {id:'bd_hero',slot:'body',name:'Костюм героя',r:'legend',clip:`<rect x="40" y="128" width="120" height="90" fill="#3a7bd5"/><path d="M104 146 L88 172 L100 172 L94 196 L114 164 L102 164 L110 146 Z" fill="#ffd166" stroke="#c99700" stroke-width="2"/><rect x="40" y="192" width="120" height="8" fill="#e63946"/>`},
 {id:'bd_astro',slot:'body',name:'Скафандр',r:'legend',clip:`<rect x="40" y="128" width="120" height="90" fill="#eef1f6"/><rect x="82" y="152" width="36" height="26" rx="5" fill="#9aa6bd"/><circle cx="91" cy="160" r="3" fill="#e63946"/><circle cx="100" cy="160" r="3" fill="#2e9e5b"/><circle cx="109" cy="160" r="3" fill="#3a7bd5"/><rect x="40" y="196" width="120" height="6" fill="#f77f00"/>`},
 // спина
 {id:'bk_pack',slot:'back',name:'Рюкзак',r:'common',svg:`<rect x="126" y="138" width="34" height="50" rx="10" fill="#2a9d8f" stroke="#1d6b62" stroke-width="3"/><rect x="134" y="160" width="20" height="16" rx="4" fill="#38b2a2" stroke="#1d6b62" stroke-width="2"/>`},
 {id:'bk_cape',slot:'back',name:'Плащ',r:'rare',svg:`<path d="M66 132 Q24 196 44 224 L156 224 Q176 196 134 132 Z" fill="#e63946" stroke="#9d1b28" stroke-width="3"/>`},
 {id:'bk_jet',slot:'back',name:'Реактивный ранец',r:'rare',svg:`<rect x="34" y="140" width="22" height="50" rx="8" fill="#9aa6bd" stroke="#3d4654" stroke-width="3"/><rect x="144" y="140" width="22" height="50" rx="8" fill="#9aa6bd" stroke="#3d4654" stroke-width="3"/><path d="M38 190 L45 214 L52 190 Z M148 190 L155 214 L162 190 Z" fill="#ff8c1a"/>`},
 {id:'bk_fairy',slot:'back',name:'Крылья феи',r:'legend',svg:`<ellipse cx="50" cy="146" rx="24" ry="40" fill="rgba(160,231,255,.7)" stroke="#6cc8f0" stroke-width="3" transform="rotate(-25 50 146)"/><ellipse cx="150" cy="146" rx="24" ry="40" fill="rgba(160,231,255,.7)" stroke="#6cc8f0" stroke-width="3" transform="rotate(25 150 146)"/><ellipse cx="58" cy="192" rx="14" ry="22" fill="rgba(255,182,230,.7)" stroke="#f08cc8" stroke-width="3" transform="rotate(20 58 192)"/><ellipse cx="142" cy="192" rx="14" ry="22" fill="rgba(255,182,230,.7)" stroke="#f08cc8" stroke-width="3" transform="rotate(-20 142 192)"/>`},
 {id:'bk_dragon',slot:'back',name:'Крылья дракона',r:'legend',svg:`<path d="M72 150 L16 104 L28 138 L8 148 L34 160 L22 184 L70 172 Z" fill="#2a9d8f" stroke="#1d6b62" stroke-width="3" stroke-linejoin="round"/><path d="M128 150 L184 104 L172 138 L192 148 L166 160 L178 184 L130 172 Z" fill="#2a9d8f" stroke="#1d6b62" stroke-width="3" stroke-linejoin="round"/>`},
 {id:'bk_neon',slot:'back',name:'Неоновые крылья',r:'legend',glowy:true,svg:`<g filter="url(#FID)"><path d="M70 150 Q24 100 14 130 Q30 160 70 172 M130 150 Q176 100 186 130 Q170 160 130 172" fill="none" stroke="#ff2bd6" stroke-width="6"/></g><path d="M70 150 Q24 100 14 130 Q30 160 70 172 Z M130 150 Q176 100 186 130 Q170 160 130 172 Z" fill="rgba(255,43,214,.25)" stroke="#ffb0f2" stroke-width="3"/>`},
 // в лапках
 {id:'ty_yarn',slot:'toy',name:'Клубок',r:'common',svg:`<circle cx="152" cy="198" r="15" fill="#ff5d8f" stroke="#c2185b" stroke-width="2"/><path d="M140 190 Q152 200 162 188 M139 202 Q152 210 165 198 M146 212 Q130 222 118 214" fill="none" stroke="#c2185b" stroke-width="2"/>`},
 {id:'ty_fish',slot:'toy',name:'Рыбка',r:'common',svg:`<ellipse cx="150" cy="200" rx="17" ry="9" fill="#5fa8d3" stroke="#2c6e95" stroke-width="2"/><path d="M166 200 L178 191 L178 209 Z" fill="#5fa8d3" stroke="#2c6e95" stroke-width="2"/><circle cx="141" cy="198" r="2" fill="#1d3557"/>`},
 {id:'ty_book',slot:'toy',name:'Книжка',r:'common',svg:`<rect x="132" y="184" width="36" height="26" rx="3" fill="#3a7bd5" stroke="#1f4f99" stroke-width="2"/><path d="M150 184 L150 210" stroke="#fff" stroke-width="2"/><path d="M137 192 L146 192 M137 198 L146 198" stroke="#fff" stroke-width="2"/>`},
 {id:'ty_balloon',slot:'toy',name:'Шарик',r:'rare',svg:`<path d="M126 204 Q150 170 160 124" fill="none" stroke="#666" stroke-width="2"/><ellipse cx="162" cy="102" rx="17" ry="21" fill="#ff4d6d" stroke="#c9184a" stroke-width="2"/><ellipse cx="156" cy="94" rx="4" ry="7" fill="#fff" opacity=".5"/>`},
 {id:'ty_wand',slot:'toy',name:'Волшебная палочка',r:'rare',svg:`<path d="M128 206 L164 164" stroke="#6d4c41" stroke-width="5" stroke-linecap="round"/>${star5(166,160,13,'#ffd166','#c99700')}`},
 {id:'ty_sword',slot:'toy',name:'Световой меч',r:'legend',glowy:true,svg:`<path d="M134 206 L176 120" stroke="#39ff14" stroke-width="9" stroke-linecap="round" filter="url(#FID)"/><path d="M134 206 L176 120" stroke="#eaffd9" stroke-width="4" stroke-linecap="round"/><rect x="124" y="198" width="16" height="22" rx="3" fill="#555" transform="rotate(26 132 209)"/>`},
 {id:'ty_trophy',slot:'toy',name:'Кубок',r:'legend',svg:`<path d="M138 172 L166 172 L164 192 Q152 202 140 192 Z" fill="#ffd166" stroke="#c99700" stroke-width="2"/><rect x="148" y="198" width="8" height="8" fill="#c99700"/><rect x="140" y="206" width="24" height="6" rx="2" fill="#c99700"/>`}];
const WEAR_BY_ID=Object.fromEntries(WEAR.map(w=>[w.id,w]));
const SLOTS=[['hat','Голова'],['glasses','Очки'],['eyes','Глаза'],['neck','Шея'],['body','Одежда'],['back','Спина'],['toy','В лапках']];

/* ===== Рисуем котёнка ===== */
function eyesSVG(mood,eye,F,fid){const L=F.light?'#f2f2ff':'#2b2230';
  if(mood==='sleep')return `<path d="M70 96 Q80 104 90 96 M110 96 Q120 104 130 96" fill="none" stroke="${L}" stroke-width="4" stroke-linecap="round"/>`;
  if(eye.kind==='star'){const s=star5(80,96,11,'#ffd166','#c99700')+star5(120,96,11,'#ffd166','#c99700');return `<g filter="url(#${fid})" opacity=".8">${s}</g>${s}`}
  if(eye.kind==='heart')return heart(80,99,9,'#ff4d6d')+heart(120,99,9,'#ff4d6d');
  if(eye.kind==='glow'){const c=eye.color;
    if(mood==='happy'){const p=`<path d="M70 98 Q80 86 90 98 M110 98 Q120 86 130 98" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;return `<g filter="url(#${fid})">${p}</g>${p}`}
    const ry=mood==='sad'?7:10;const brow=mood==='sad'?`<path d="M68 84 L90 90 M132 84 L110 90" stroke="${L}" stroke-width="3.5" stroke-linecap="round"/>`:'';
    return `<ellipse cx="80" cy="97" rx="10" ry="${ry+2}" fill="#0b0b12"/><ellipse cx="120" cy="97" rx="10" ry="${ry+2}" fill="#0b0b12"/>
    <g filter="url(#${fid})"><ellipse cx="80" cy="97" rx="8" ry="${ry}" fill="${c}"/><ellipse cx="120" cy="97" rx="8" ry="${ry}" fill="${c}"/></g>
    <ellipse cx="80" cy="97" rx="6" ry="${ry-2}" fill="${c}"/><ellipse cx="120" cy="97" rx="6" ry="${ry-2}" fill="${c}"/>
    <ellipse cx="80" cy="97" rx="1.8" ry="${ry-3}" fill="#0b0b12" opacity=".7"/><ellipse cx="120" cy="97" rx="1.8" ry="${ry-3}" fill="#0b0b12" opacity=".7"/>${brow}`}
  if(mood==='happy')return `<path d="M70 98 Q80 86 90 98 M110 98 Q120 86 130 98" fill="none" stroke="${L}" stroke-width="4.5" stroke-linecap="round"/>`;
  if(mood==='sad')return `<ellipse cx="80" cy="98" rx="7" ry="8" fill="#fff" stroke="${F.line}" stroke-width="2"/><ellipse cx="120" cy="98" rx="7" ry="8" fill="#fff" stroke="${F.line}" stroke-width="2"/><circle cx="80" cy="100" r="4.5" fill="#2b2230"/><circle cx="120" cy="100" r="4.5" fill="#2b2230"/><path d="M68 84 L90 90 M132 84 L110 90" stroke="${L}" stroke-width="3.5" stroke-linecap="round"/>`;
  return `<ellipse cx="80" cy="96" rx="9" ry="11" fill="#fff" stroke="${F.line}" stroke-width="2"/><ellipse cx="120" cy="96" rx="9" ry="11" fill="#fff" stroke="${F.line}" stroke-width="2"/><ellipse cx="81" cy="98" rx="5.5" ry="7.5" fill="#2b2230"/><ellipse cx="121" cy="98" rx="5.5" ry="7.5" fill="#2b2230"/><circle cx="83" cy="94" r="2.4" fill="#fff"/><circle cx="123" cy="94" r="2.4" fill="#fff"/>`}
const mouthSVG=(mood,line)=>mood==='sad'?`<path d="M90 125 Q100 117 110 125" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round"/>`
  :`<path d="M100 116 Q94 ${mood==='happy'?125:123} 88 119 M100 116 Q106 ${mood==='happy'?125:123} 112 119" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round"/>`;
const noseSVG=line=>`<path d="M94 109 L106 109 L100 116 Z" fill="#f48fb1" stroke="${line}" stroke-width="1.5" stroke-linejoin="round"/>`;

function softCat(S,F,mood,eye,ids){const pat=S.pat;const pt=pat==='points'?F.dark:F.main;const paw=F.paw||pt;
  const tailCol=pat==='flame'?'#ffd166':pat==='rainbow'?'#c77dff':pt;
  let headPat='',bodyPat='';
  if(pat==='tabby'){headPat=`<path d="M88 58 L90 72 M100 54 L100 70 M112 58 L110 72 M46 92 L62 96 M46 104 L62 104 M154 92 L138 96 M154 104 L138 104" stroke="${F.dark}" stroke-width="5" stroke-linecap="round"/>`;
    bodyPat=`<path d="M56 152 Q66 150 72 162 M54 176 Q66 172 72 184 M146 152 Q134 150 128 162 M146 176 Q134 172 128 184" fill="none" stroke="${F.dark}" stroke-width="5" stroke-linecap="round"/>`}
  else if(pat==='bicolor'){headPat=`<path d="M100 76 Q80 96 70 124 Q100 146 130 124 Q120 96 100 76 Z" fill="#ffffff"/>`}
  else if(pat==='calico'){headPat=`<ellipse cx="68" cy="72" rx="26" ry="20" fill="#f4a259"/><ellipse cx="134" cy="80" rx="20" ry="18" fill="#3a3a44"/>`;
    bodyPat=`<ellipse cx="76" cy="160" rx="22" ry="16" fill="#3a3a44"/><ellipse cx="128" cy="184" rx="20" ry="14" fill="#f4a259"/>`}
  else if(pat==='spots'){const sp=[[66,78],[132,76],[60,112],[140,112],[100,64]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="6" ry="5" fill="none" stroke="${F.dark}" stroke-width="3"/>`).join('');
    headPat=sp;bodyPat=[[66,162],[134,160],[72,188],[128,190],[100,150]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="none" stroke="${F.dark}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="2" fill="${F.dark}"/>`).join('')}
  else if(pat==='stars'){headPat=[[70,80],[124,70],[140,110],[60,118]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#fff" opacity=".85"/>`).join('');bodyPat=[[78,160],[118,186],[132,160],[104,198],[66,186]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#fff" opacity=".85"/>`).join('')}
  else if(pat==='rainbow'){const cols=['#ff595e','#ff924c','#ffca3a','#8ac926','#1982c4','#6a4c93'];bodyPat=cols.map((c,i)=>`<rect x="40" y="${132+i*14}" width="120" height="14" fill="${c}" opacity=".8"/>`).join('');
    headPat=`<path d="M48 70 Q100 40 152 70" fill="none" stroke="#ff924c" stroke-width="6" opacity=".7"/><path d="M48 80 Q100 50 152 80" fill="none" stroke="#8ac926" stroke-width="6" opacity=".7"/><path d="M48 90 Q100 60 152 90" fill="none" stroke="#1982c4" stroke-width="6" opacity=".7"/>`}
  else if(pat==='shine'){headPat=`<ellipse cx="74" cy="70" rx="16" ry="9" fill="#fff" opacity=".45" transform="rotate(-25 74 70)"/>`;bodyPat=`<ellipse cx="72" cy="158" rx="10" ry="16" fill="#fff" opacity=".35"/>`}
  else if(pat==='flame'){headPat=`<path d="M100 54 Q88 70 96 82 Q98 72 104 70 Q112 82 106 90 Q120 80 112 64 Q108 72 104 66 Z" fill="#ffd166"/>`;bodyPat=`<path d="M70 210 Q66 184 80 172 Q80 190 90 194 Q92 176 100 164 Q108 180 112 194 Q120 186 122 172 Q136 186 130 210 Z" fill="#ffd166" opacity=".9"/>`}
  else if(pat==='circuit'){const n=F.neon;const g=`filter="url(#${ids.f})"`;
    headPat=`<g ${g}><path d="M52 84 L66 84 L72 76 M148 114 L132 114 L126 122 M88 60 L88 70 L100 70" fill="none" stroke="${n}" stroke-width="3"/></g><path d="M52 84 L66 84 L72 76 M148 114 L132 114 L126 122 M88 60 L88 70 L100 70" fill="none" stroke="${n}" stroke-width="2"/><circle cx="72" cy="76" r="3" fill="${n}"/><circle cx="126" cy="122" r="3" fill="${n}"/>`;
    bodyPat=`<path d="M60 160 L78 160 L84 170 L100 170 M140 184 L122 184 L116 194" fill="none" stroke="${n}" stroke-width="2.5"/><circle cx="100" cy="170" r="3" fill="${n}"/><circle cx="116" cy="194" r="3" fill="${n}"/>`}
  const cyberPlate=pat==='circuit'?`<rect x="104" y="80" width="32" height="32" rx="7" fill="#2a2f3a" stroke="${F.neon}" stroke-width="2"/>`:'';
  const antenna=pat==='circuit'?`<path d="M150 30 L158 6" stroke="#888" stroke-width="3"/><circle cx="158" cy="6" r="5" fill="${F.neon}" filter="url(#${ids.f})"/><circle cx="158" cy="6" r="3" fill="#fff"/>`:'';
  const ghost=pat==='ghost'?' opacity=".78"':'';
  const under=`<g${ghost}><path d="M134 196 C178 198 186 160 168 128" fill="none" stroke="${F.line}" stroke-width="17" stroke-linecap="round"/>
  <path d="M134 196 C178 198 186 160 168 128" fill="none" stroke="${tailCol}" stroke-width="11" stroke-linecap="round"/>
  <ellipse cx="100" cy="172" rx="44" ry="40" fill="${F.main}" stroke="${F.line}" stroke-width="3"/>
  <g clip-path="url(#${ids.b})">${bodyPat}<ellipse cx="100" cy="184" rx="${pat==='bicolor'?30:26}" ry="${pat==='bicolor'?28:24}" fill="${F.belly}"/></g></g>`;
  const shape=`<ellipse cx="100" cy="172" rx="44" ry="40"/>`;
  const over=`<g${ghost}><ellipse cx="100" cy="172" rx="44" ry="40" fill="none" stroke="${F.line}" stroke-width="3"/>
  <ellipse cx="78" cy="208" rx="16" ry="10" fill="${paw}" stroke="${F.line}" stroke-width="3"/><ellipse cx="122" cy="208" rx="16" ry="10" fill="${paw}" stroke="${F.line}" stroke-width="3"/></g>`;
  const head=`<g${ghost}>${antenna}<path d="M54 80 L50 28 L90 56 Z M146 80 L150 28 L110 56 Z" fill="${pt}" stroke="${F.line}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M60 68 L58 42 L80 58 Z M140 68 L142 42 L120 58 Z" fill="#ffb3c7"/>
  <ellipse cx="100" cy="98" rx="55" ry="46" fill="${F.main}"/>
  <g clip-path="url(#${ids.h})">${headPat}${pat==='points'?`<ellipse cx="100" cy="112" rx="24" ry="18" fill="${F.dark}" opacity=".55"/>`:''}</g>
  <ellipse cx="100" cy="98" rx="55" ry="46" fill="none" stroke="${F.line}" stroke-width="3"/>
  ${mood==='happy'?`<circle cx="66" cy="114" r="8" fill="#ff8fab" opacity=".5"/><circle cx="134" cy="114" r="8" fill="#ff8fab" opacity=".5"/>`:''}
  ${cyberPlate}${eyesSVG(mood,eye,F,ids.f)}${noseSVG(F.line)}${mouthSVG(mood,F.line)}
  <path d="M66 110 L34 104 M66 116 L34 120 M134 110 L166 104 M134 116 L166 120" stroke="${F.light?'#d8d8f0':F.line}" stroke-width="2" opacity=".6" stroke-linecap="round"/></g>`;
  return {under,shape,over,head}}

const PIX=["","","","","...oo..........oo...","...opo........opo...","...oppooooooooppo...","..ommmmmmmmmmmmmmo..","..ommmmmmmmmmmmmmo..",
"..ommmmeemmeemmmmo..","..ommmmeemmeemmmmo..","..ommmmmmnnmmmmmmo..","..ommmmmommommmmmo..","..ommmmmmoommmmmmo..","...ommmmmmmmmmmmo...",
"....oooooooooooo....","....ommmmmmmmmmo....","...ommmbbbbbbmmmo...","...ommmbbbbbbmmmo...","...ommmbbbbbbmmmo...","...ommmmmmmmmmmmo...","...ommmo....ommmo...","...ooooo....ooooo..."];
const PIX_TAIL=[[13,18],[14,18],[15,18],[16,18],[17,18],[18,17],[19,17]];
function pixelCat(S,F,mood,eye,ids){
  const glowCol=mood==='sleep'?null:eye.kind==='glow'?eye.color:eye.kind==='star'?'#ffd166':eye.kind==='heart'?'#ff4d6d':null;
  const col={o:F.line,m:F.main,d:F.dark,b:F.belly,n:'#f48fb1',p:'#ffb3c7',e:glowCol||'#2b2230'};
  const cell=(r,c,fill)=>`<rect x="${c*10}" y="${r*10-10}" width="10.4" height="10.4" fill="${fill}"/>`;
  let body='',head='',eyes='';
  PIX.forEach((row,r)=>{for(let c=0;c<row.length;c++){const ch=row[c];if(ch==='.')continue;
    let k=ch;if(k==='e'){if(mood==='happy'&&r===9)k='m';else if(mood!=='normal'&&r===9)k='m';else{eyes+=cell(r,c,col.e);continue}}
    const s=cell(r,c,col[k]);if(r>=16)body+=s;else head+=s}});
  if(mood==='happy'){head+=cell(11,4,'#ff8fab')+cell(11,15,'#ff8fab')}
  if(mood==='sad'){head+=cell(8,7,F.light?'#f2f2ff':F.line)+cell(8,12,F.light?'#f2f2ff':F.line)}
  if(!glowCol&&mood==='normal')eyes+=`<rect x="72" y="82" width="4" height="4" fill="#fff"/><rect x="112" y="82" width="4" height="4" fill="#fff"/>`;
  if(glowCol)eyes=`<g filter="url(#${ids.f})">${eyes}</g>`+eyes;
  const tail=PIX_TAIL.map(([r,c])=>cell(r,c,F.dark)).join('');
  return {under:tail+body,shape:`<rect x="40" y="150" width="120" height="50"/>`,over:'',head:head+eyes}}

function brickCat(S,F,mood,eye,ids){const multi=S.pat==='multi';
  const C=multi?{tail:'#f77f00',body:'#2f6fdc',legs:'#2e9e5b',ears:'#f5c518',head:'#d63b3b'}:{tail:F.main,body:F.main,legs:F.main,ears:F.main,head:F.main};
  const L=F.line;const stud=(x,y,c)=>`<rect x="${x}" y="${y}" width="16" height="9" rx="3" fill="${c}" stroke="${L}" stroke-width="2"/><rect x="${x+3}" y="${y+2}" width="4" height="4" rx="1" fill="#fff" opacity=".35"/>`;
  const under=`<rect x="136" y="126" width="18" height="62" rx="4" fill="${C.tail}" stroke="${L}" stroke-width="3" transform="rotate(25 145 157)"/>
  <rect x="58" y="140" width="84" height="64" rx="6" fill="${C.body}" stroke="${L}" stroke-width="3"/>
  <rect x="78" y="156" width="44" height="36" rx="6" fill="${F.belly}" opacity=".9"/><rect x="64" y="146" width="7" height="50" rx="3" fill="#fff" opacity=".25"/>`;
  const over=`<rect x="60" y="196" width="36" height="20" rx="4" fill="${C.legs}" stroke="${L}" stroke-width="3"/><rect x="104" y="196" width="36" height="20" rx="4" fill="${C.legs}" stroke="${L}" stroke-width="3"/>`;
  const head=`${stud(57,22,C.ears)}${stud(127,22,C.ears)}
  <rect x="50" y="30" width="30" height="30" rx="4" fill="${C.ears}" stroke="${L}" stroke-width="3"/><rect x="120" y="30" width="30" height="30" rx="4" fill="${C.ears}" stroke="${L}" stroke-width="3"/>
  <rect x="58" y="40" width="14" height="14" rx="2" fill="#ffb3c7"/><rect x="128" y="40" width="14" height="14" rx="2" fill="#ffb3c7"/>
  ${stud(62,45,C.head)}${stud(92,45,C.head)}${stud(122,45,C.head)}
  <rect x="44" y="52" width="112" height="92" rx="10" fill="${C.head}" stroke="${L}" stroke-width="3"/>
  <rect x="52" y="60" width="9" height="60" rx="4" fill="#fff" opacity=".25"/><rect x="80" y="104" width="40" height="24" rx="8" fill="${F.belly}" opacity=".9"/>
  ${mood==='happy'?`<rect x="56" y="108" width="14" height="10" rx="5" fill="#ff8fab" opacity=".6"/><rect x="130" y="108" width="14" height="10" rx="5" fill="#ff8fab" opacity=".6"/>`:''}
  ${eyesSVG(mood,eye,{...F,line:'#1a1a1a',light:false},ids.f)}${noseSVG('#1a1a1a')}${mouthSVG(mood,'#1a1a1a')}`;
  return {under,shape:`<rect x="58" y="140" width="84" height="64" rx="6"/>`,over,head}}

function catSVG(cat,mood){const S=SKIN_BY_ID[cat&&cat.skin]||SKINS[0];const F=S.c;
  const wear=(cat&&cat.wear)||{};const it=s=>{const w=WEAR_BY_ID[wear[s]];return w&&w.slot===s?w:null};
  const ids={b:uid('b'),h:uid('h'),f:uid('f')};
  const ei=it('eyes');const eye=ei?ei.eye:S.glow?{kind:'glow',color:S.glow}:{kind:'normal'};
  const parts=(S.st==='pixel'?pixelCat:S.st==='brick'?brickCat:softCat)(S,F,mood,eye,ids);
  const body=it('body'),fx=w=>w?(w.glowy?w.svg.replace(/FID/g,ids.f):w.svg):'';
  return `<svg viewBox="0 -20 200 248" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Котёнок">
  <defs><clipPath id="${ids.b}">${parts.shape}</clipPath><clipPath id="${ids.h}"><ellipse cx="100" cy="98" rx="55" ry="46"/></clipPath>
  <filter id="${ids.f}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>
  ${fx(it('back'))}${parts.under}
  ${body&&body.clip?`<g clip-path="url(#${ids.b})">${body.clip}</g>`:''}${body&&body.svg?body.svg:''}
  ${parts.over}${parts.head}${fx(it('neck'))}${mood==='sleep'?'':fx(it('glasses'))}${fx(it('hat'))}${fx(it('toy'))}${mood==='sleep'?'<text x="146" y="30" font-family="Nunito,sans-serif" font-size="22" font-weight="900" fill="#7a8bb5">z</text><text x="164" y="12" font-family="Nunito,sans-serif" font-size="30" font-weight="900" fill="#7a8bb5">Z</text>':''}</svg>`}

function wearPreview(w){return catSVG({skin:'sk_orange',wear:{[w.slot]:w.id}},'normal')}
function skinPreview(s,mood='normal'){return catSVG({skin:s.id,wear:{}},mood)}
