function Ppu(a){this.nes=a,this.paletteRam=new Uint8Array(32),this.oamRam=new Uint8Array(256),this.secondaryOam=new Uint8Array(32),this.spriteTiles=new Uint8Array(16),this.pixelOutput=new Uint16Array(61440),this.reset=function(){for(let a=0;a<this.paletteRam.length;a++)this.paletteRam[a]=0;for(let a=0;a<this.oamRam.length;a++)this.oamRam[a]=0;for(let a=0;a<this.secondaryOam.length;a++)this.secondaryOam[a]=0;for(let a=0;a<this.spriteTiles.length;a++)this.spriteTiles[a]=0;for(let a=0;a<this.pixelOutput.length;a++)this.pixelOutput[a]=0;this.t=0,this.v=0,this.w=0,this.x=0,this.line=0,this.dot=0,this.evenFrame=!0,this.oamAddress=0,this.readBuffer=0,this.spriteZero=!1,this.spriteOverflow=!1,this.inVblank=!1,this.vramIncrement=1,this.spritePatternBase=0,this.bgPatternBase=0,this.spriteHeight=8,this.slave=!1,this.generateNmi=!1,this.greyScale=!1,this.bgInLeft=!1,this.sprInLeft=!1,this.bgRendering=!1,this.sprRendering=!1,this.emphasis=0,this.atl=0,this.atr=0,this.tl=0,this.th=0,this.spriteZeroIn=!1,this.spriteCount=0},this.reset(),this.saveVars=["paletteRam","oamRam","secondaryOam","spriteTiles","t","v","w","x","line","dot","evenFrame","oamAddress","readBuffer","spriteZero","spriteOverflow","inVblank","vramIncrement","spritePatternBase","bgPatternBase","spriteHeight","slave","generateNmi","greyScale","bgInLeft","sprInLeft","bgRendering","sprRendering","emphasis","atl","atr","tl","th","spriteZeroIn","spriteCount"],this.cycle=function(){if(240>this.line)256>this.dot?(this.generateDot(),0==(7&this.dot+1)&&(this.bgRendering||this.sprRendering)&&(this.readTileBuffers(),this.incrementVx())):256===this.dot?(this.bgRendering||this.sprRendering)&&this.incrementVy():257===this.dot?(this.bgRendering||this.sprRendering)&&(this.v&=31712,this.v|=1055&this.t):270===this.dot?(this.spriteZeroIn=!1,this.spriteCount=0,(this.bgRendering||this.sprRendering)&&this.evaluateSprites()):(321===this.dot||329===this.dot)&&(this.bgRendering||this.sprRendering)&&(this.readTileBuffers(),this.incrementVx());else if(241===this.line)1===this.dot&&(this.inVblank=!0,this.generateNmi&&(this.nes.cpu.nmiWanted=!0),this.evenFrame=!(this.bgRendering||this.sprRendering)||!this.evenFrame);else if(261===this.line)if(1===this.dot)this.inVblank=!1,this.spriteZero=!1,this.spriteOverflow=!1;else if(257===this.dot)(this.bgRendering||this.sprRendering)&&(this.v&=31712,this.v|=1055&this.t);else if(270!==this.dot)280===this.dot?(this.bgRendering||this.sprRendering)&&(this.v&=1055,this.v|=31712&this.t):(321===this.dot||329===this.dot)&&(this.bgRendering||this.sprRendering)&&(this.readTileBuffers(),this.incrementVx());else if(this.spriteZeroIn=!1,this.spriteCount=0,this.bgRendering||this.sprRendering){let a=16===this.spriteHeight?4096:this.spritePatternBase;this.readInternal(a+4095)}this.dot++,341!==this.dot&&(340!==this.dot||261!==this.line||this.evenFrame)||(this.dot=0,this.line++,262===this.line&&(this.line=0))},this.evaluateSprites=function(){for(let a=0;256>a;a+=4){let b=this.oamRam[a],c=this.line-b;if(0<=c&&c<this.spriteHeight)if(8===this.spriteCount){this.spriteOverflow=!0;break}else{0===a&&(this.spriteZeroIn=!0),this.secondaryOam[4*this.spriteCount]=this.oamRam[a],this.secondaryOam[4*this.spriteCount+1]=this.oamRam[a+1],this.secondaryOam[4*this.spriteCount+2]=this.oamRam[a+2],this.secondaryOam[4*this.spriteCount+3]=this.oamRam[a+3],0<(128&this.oamRam[a+2])&&(c=this.spriteHeight-1-c);let b=this.spritePatternBase,d=this.oamRam[a+1];16===this.spriteHeight&&(b=4096*(1&d),d&=254,d+=(8&c)>>3,c&=7),this.spriteTiles[this.spriteCount]=this.readInternal(b+16*d+c),this.spriteTiles[this.spriteCount+8]=this.readInternal(b+16*d+c+8),this.spriteCount++}}if(8>this.spriteCount){let a=16===this.spriteHeight?4096:this.spritePatternBase;this.readInternal(a+4095)}},this.readTileBuffers=function(){let a=this.readInternal(8192+(4095&this.v));this.atl=this.atr;let b=9152;b|=(28&this.v)>>2,b|=(896&this.v)>>4,b|=3072&this.v,this.atr=this.readInternal(b),0<(64&this.v)&&(this.atr>>=4),this.atr&=15,0<(2&this.v)&&(this.atr>>=2),this.atr&=3;let c=(28672&this.v)>>12;this.tl&=255,this.tl<<=8,this.tl|=this.readInternal(this.bgPatternBase+16*a+c),this.th&=255,this.th<<=8,this.th|=this.readInternal(this.bgPatternBase+16*a+c+8)},this.generateDot=function(){let a,b=7&this.dot,c=0,d=0,e=-1,f=0;if(this.sprRendering&&(7<this.dot||this.sprInLeft))for(let a=0;a<this.spriteCount;a++){let b=this.secondaryOam[4*a+3],c=this.dot-b;if(0<=c&&8>c){0<(64&this.secondaryOam[4*a+2])&&(c=7-c);let b=7-c,g=1&this.spriteTiles[a]>>b;if(g|=(1&this.spriteTiles[a+8]>>b)<<1,0<g){d=g|(3&this.secondaryOam[4*a+2])<<2,f=(32&this.secondaryOam[4*a+2])>>5,e=a;break}}}if(this.bgRendering&&(7<this.dot||this.bgInLeft)){let a=15-b-this.x;c=1&this.tl>>a,c|=(1&this.th>>a)<<1;let d;d=7<this.x+b?4*this.atr:4*this.atl,0<c&&(c+=d)}this.bgRendering||this.sprRendering?0===c?0<d?a=this.readPalette(d+16):a=this.readPalette(0):(0<d&&0===e&&this.spriteZeroIn&&255!==this.dot&&(this.spriteZero=!0),a=0<d&&0===f?this.readPalette(d+16):this.readPalette(c)):16128<=(16383&this.v)?a=this.readPalette(31&this.v):a=this.readPalette(0),this.pixelOutput[256*this.line+this.dot]=this.emphasis<<6|63&a},this.setFrame=function(a){for(let c=0;c<this.pixelOutput.length;c++){let d=this.pixelOutput[c],e=this.nesPal[63&d][0],f=this.nesPal[63&d][1],g=this.nesPal[63&d][2];0<(64&d)&&(e*=1.1,f*=.9,g*=.9),0<(128&d)&&(e*=.9,f*=1.1,g*=.9),0<(256&d)&&(e*=.9,f*=.9,g*=1.1),e=255&(255<e?255:e),f=255&(255<f?255:f),g=255&(255<g?255:g),a[4*c]=e,a[4*c+1]=f,a[4*c+2]=g,a[4*c+3]=255}},this.incrementVx=function(){31==(31&this.v)?(this.v&=32736,this.v^=1024):this.v++},this.incrementVy=function(){if(28672!=(28672&this.v))this.v+=4096;else{this.v&=4095;let a=(992&this.v)>>5;29==a?(a=0,this.v^=2048):31===a?a=0:a++,this.v&=31775,this.v|=a<<5}},this.readInternal=function(a){return a&=16383,this.nes.mapper.ppuRead(a)},this.writeInternal=function(a,b){a&=16383,this.nes.mapper.ppuWrite(a,b)},this.readPalette=function(a){let b=31&a;16<=b&&0==(3&b)&&(b-=16);let c=this.paletteRam[b];return this.greyScale&&(c&=48),c},this.writePalette=function(a,b){let c=31&a;16<=c&&0==(3&c)&&(c-=16),this.paletteRam[c]=b},this.peak=function(a){switch(a){case 0:case 1:return 0;case 2:{let a=0;return this.inVblank&&(a|=128),a|=this.spriteZero?64:0,a|=this.spriteOverflow?32:0,a}case 3:return 0;case 4:return this.oamRam[this.oamAddress];case 5:case 6:return 0;case 7:{let a=16383&this.v,b=this.readBuffer;return 16128<=a&&(b=this.readPalette(a)),b}}},this.read=function(a){switch(a){case 0:return 0;case 1:return 0;case 2:{this.w=0;let a=0;return this.inVblank&&(a|=128,this.inVblank=!1),a|=this.spriteZero?64:0,a|=this.spriteOverflow?32:0,a}case 3:return 0;case 4:return this.oamRam[this.oamAddress];case 5:return 0;case 6:return 0;case 7:{let a=16383&this.v;(this.bgRendering||this.sprRendering)&&(240>this.line||261===this.line)?(this.incrementVy(),this.incrementVx()):(this.v+=this.vramIncrement,this.v&=32767);let b=this.readBuffer;return 16128<=a&&(b=this.readPalette(a)),this.readBuffer=this.readInternal(a),b}}},this.write=function(a,b){switch(a){case 0:{this.t&=29695,this.t|=(3&b)<<10,this.vramIncrement=0<(4&b)?32:1,this.spritePatternBase=0<(8&b)?4096:0,this.bgPatternBase=0<(16&b)?4096:0,this.spriteHeight=0<(32&b)?16:8;let a=this.generateNmi;return this.slave=0<(64&b),this.generateNmi=0<(128&b),void(this.generateNmi&&!a&&this.inVblank&&(this.nes.cpu.nmiWanted=!0))}case 1:return this.greyScale=0<(1&b),this.bgInLeft=0<(2&b),this.sprInLeft=0<(4&b),this.bgRendering=0<(8&b),this.sprRendering=0<(16&b),void(this.emphasis=(224&b)>>5);case 2:return;case 3:return void(this.oamAddress=b);case 4:return this.oamRam[this.oamAddress++]=b,void(this.oamAddress&=255);case 5:return void(0===this.w?(this.t&=32736,this.t|=(248&b)>>3,this.x=7&b,this.w=1):(this.t&=3103,this.t|=(7&b)<<12,this.t|=(248&b)<<2,this.w=0));case 6:return void(0===this.w?(this.t&=255,this.t|=(63&b)<<8,this.w=1):(this.t&=32512,this.t|=b,this.v=this.t,this.w=0));case 7:{let a=16383&this.v;if((this.bgRendering||this.sprRendering)&&(240>this.line||261===this.line)?(this.incrementVy(),this.incrementVx()):(this.v+=this.vramIncrement,this.v&=32767),16128<=a)return void this.writePalette(a,b);return void this.writeInternal(a,b)}}},this.nesPal=[[101,101,101],[0,45,105],[19,31,127],[60,19,124],[96,11,98],[115,10,55],[113,15,7],[90,26,0],[52,40,0],[11,52,0],[0,60,0],[0,61,16],[0,56,64],[0,0,0],[0,0,0],[0,0,0],[174,174,174],[15,99,179],[64,81,208],[120,65,204],[167,54,169],[192,52,112],[189,60,48],[159,74,0],[109,92,0],[54,109,0],[7,119,4],[0,121,61],[0,114,125],[0,0,0],[0,0,0],[0,0,0],[254,254,255],[93,179,255],[143,161,255],[200,144,255],[247,133,250],[255,131,192],[255,139,127],[239,154,73],[189,172,44],[133,188,47],[85,199,83],[60,201,140],[62,194,205],[78,78,78],[0,0,0],[0,0,0],[254,254,255],[188,223,255],[209,216,255],[232,209,255],[251,205,253],[255,204,229],[255,207,202],[248,213,180],[228,220,168],[204,227,169],[185,232,184],[174,232,208],[175,229,234],[182,182,182],[0,0,0],[0,0,0]]}