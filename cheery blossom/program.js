"use strct";

//何フレーム毎に新しく桜の花のインスタンスを作るか(カスタマイズ要素)
let newblossomtime = 5;

let context = document.getElementById("main");
let ctx = context.getContext("2d");
let dirmax = 210;
let dirmin = 180;
let stepdata = 3;
let frame = 1;
let cheeryblossomlist = [];
let make = 0;
let cheerynum = 1;
const cheerydataset = [[210,180,3],[180,120,4],[180,140,2],[140,220,3],[210,190,4]]

class cheeryblossom {
    constructor(x,raddir,step){
        this.x = x;
        this.y = -40;
        this.step = step;
        this.raddir = raddir;
        this.renderraddir = (Math.random() * Math.PI * 2);
        this.image = new Image();
        this.image.src = "./cheery.png"
    }
    process(){
        this.x += Math.sin(this.raddir) * this.step;
        this.y -= Math.cos(this.raddir) * this.step;
        this.renderraddir += 0.02;
        //回転して描画
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.renderraddir);
        ctx.drawImage(this.image,-(this.image.width / 2),-(this.image.height / 2));
        ctx.restore();
    }
}

function animation(){
    if(frame > 1000){
        dirmax = cheerydataset[cheerynum][0];
        dirmin = cheerydataset[cheerynum][1];
        stepdata = cheerydataset[cheerynum][2];
        if(cheerynum > 3){
            cheerynum = 0;
        }
        else{
            cheerynum++;
        }
        frame = 0;
    }
    ctx.clearRect(0,0,1920,1080);
    if(make == 0){
        //1920*1080
        let a = (Math.random() * (dirmax - dirmin) + dirmin) * Math.PI / 180;
        let x = Math.random() * 2500 - 250;
        cheeryblossomlist.push(new cheeryblossom(x,a,stepdata));
        make++;
    }
    else if(make == 5){
        make = 0;
    }
    else{
        make++;
    }
    let i = 0;
    while(i < cheeryblossomlist.length){
        cheeryblossomlist[i].process();
        if(cheeryblossomlist[i].y > 1080 || cheeryblossomlist[i].x > 2100 || cheeryblossomlist[i].x < -250){
            cheeryblossomlist.splice(i,1);
        }
        i++;
    }
    frame++;
    requestAnimationFrame(animation);
}

window.requestAnimationFrame(animation);
