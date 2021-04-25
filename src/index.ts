import { BSP } from "./BSP";
import { BSPNode } from "./BSPNode";


function init()
{
    let cv = document.getElementById("cv") as HTMLCanvasElement;
    let ctx = cv.getContext('2d');
    let bsp = new BSP();
    bsp.generate({x: 0, y: 0, w: 800, h: 600});

    ctx.strokeStyle = "#FFF";
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // for(var i = 0; i < bsp.all.length; ++i)
    // {
    //     let node = bsp.all[i];
    //     ctx.strokeRect(
    //         Math.floor(node.rect.x) + 2 * node.depth + 0.5, 
    //         Math.floor(node.rect.y) + 2 * node.depth + 0.5, 
    //         Math.floor(node.rect.w) - 4 * node.depth,
    //         Math.floor(node.rect.h) - 4 * node.depth
    //     );
    // }

    for(var i = 0; i < bsp.leaves.length; ++i)
    {
        let node = bsp.leaves[i];
        ctx.strokeStyle = "#FFF";
        ctx.strokeRect(
            Math.floor(node.rect.x) + 0.5,
            Math.floor(node.rect.y) + 0.5,
            Math.floor(node.rect.w) - 1,
            Math.floor(node.rect.h) - 1,
        )
        //ctx.strokeStyle = "#000";
        //ctx.strokeText(node.idx.toString(), node.rect.x + node.rect.w / 2, node.rect.y + node.rect.h / 2);
    }

    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 1;

    for(var i = 0; i < bsp.corridors.length; ++i)
    {
        let corr = bsp.corridors[i];
        ctx.beginPath();
        ctx.moveTo(corr.x1+0.5, corr.y1+0.5);

        if (corr.dir == "horizontal")
        {
            let mx = Math.floor((corr.x1 + corr.x2) / 2) + 0.5;
            ctx.lineTo(mx, corr.y1);
            ctx.lineTo(mx, corr.y2);
        }
        else
        {
            let my = Math.floor((corr.y1 + corr.y2) / 2) + 0.5;
            ctx.lineTo(corr.x1, my);
            ctx.lineTo(corr.x2, my);
        }

        ctx.lineTo(corr.x2+0.5, corr.y2+0.5);
        ctx.stroke();
    }

    
}


document.addEventListener("DOMContentLoaded", function(event) {
    init();
});