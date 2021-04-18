import { BSP } from "./BSP";
import { BSPNode } from "./BSPNode";


function init()
{
    let cv = document.getElementById("cv") as HTMLCanvasElement;
    let ctx = cv.getContext('2d');
    let bsp = new BSP();
    bsp.generate();

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
        ctx.fillRect(
            Math.floor(node.rect.x) + 15.5,
            Math.floor(node.rect.y) + 15.5,
            Math.floor(node.rect.w) - 30,
            Math.floor(node.rect.h) - 30,
        )
        ctx.strokeStyle = "#000";
        ctx.strokeText(node.idx.toString(), node.rect.x + node.rect.w / 2, node.rect.y + node.rect.h / 2);
    }

    ctx.strokeStyle = "#FFF";
    for(var i = 0; i < bsp.corridors.length; ++i)
    {
        let rect = bsp.corridors[i];
        ctx.fillRect(
            Math.floor(rect.x) + 0.5,
            Math.floor(rect.y) + 0.5,
            Math.floor(rect.w),
            Math.floor(rect.h),
        )
    }

    
}


document.addEventListener("DOMContentLoaded", function(event) {
    init();
});