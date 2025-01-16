mappers[0]=function(a,b,c){this.name="NROM",this.version=1,this.nes=a,this.rom=b,this.h=c,this.chrRam=new Uint8Array(8192),this.prgRam=new Uint8Array(8192),this.ppuRam=new Uint8Array(2048),this.reset=function(a){if(a){for(let a=0;a<this.chrRam.length;a++)this.chrRam[a]=0;if(!this.h.battery)for(let a=0;a<this.prgRam.length;a++)this.prgRam[a]=0;for(let a=0;a<this.ppuRam.length;a++)this.ppuRam[a]=0}},this.reset(!0),this.saveVars=["name","chrRam","prgRam","ppuRam"],this.getBattery=function(){return Array.prototype.slice.call(this.prgRam)},this.setBattery=function(a){return!(8192!==a.length)&&(this.prgRam=new Uint8Array(a),!0)},this.getRomAdr=function(a){return 2===this.h.banks?32767&a:16383&a},this.getMirroringAdr=function(a){return this.h.verticalMirroring?2047&a:1023&a|(2048&a)>>1},this.getChrAdr=function(a){return a},this.peak=function(a){return this.read(a)},this.read=function(a){return 24576>a?0:32768>a?this.prgRam[8191&a]:this.rom[this.h.base+this.getRomAdr(a)]},this.write=function(a,b){24576>a||32768<=a||(this.prgRam[8191&a]=b)},this.ppuPeak=function(a){return this.ppuRead(a)},this.ppuRead=function(a){return 8192>a?0===this.h.chrBanks?this.chrRam[this.getChrAdr(a)]:this.rom[this.h.chrBase+this.getChrAdr(a)]:this.ppuRam[this.getMirroringAdr(a)]},this.ppuWrite=function(a,b){return 8192>a?0===this.h.chrBanks?void(this.chrRam[this.getChrAdr(a)]=b):void 0:this.ppuRam[this.getMirroringAdr(a)]=b}};