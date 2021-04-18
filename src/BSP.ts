import { BSPNode, Rect } from "./BSPNode";

export class BSP
{
    public leaves : BSPNode[];
    public all : BSPNode[];
    public root : BSPNode;
    public corridors : Rect[];

    generate()
    {
        let todo : BSPNode[] = [];
        this.leaves = [];
        this.all = [];

        function makeNode(x : number, y: number, w: number, h: number, depth: number, idx : number) : BSPNode
        {
            return { rect: { x, y, w, h }, left: null, right: null, split: "vertical", depth, idx };
        }

        function randomTodo() : BSPNode
        {
            let idx = Math.floor(Math.random() * todo.length);
            let node = todo[idx];
            todo.splice(idx,1);
            return node;
        }
        let idx : number = 0;
        this.root = makeNode(5, 5, 1190, 790, 0, 0);
        todo.push(this.root);
        this.all.push(this.root);
        
        while(todo.length)
        {
            let node = randomTodo();

            if (Math.min(node.rect.w, node.rect.h) < 250)
            {
                let w : number = (Math.random() * 0.25 + 0.5) * node.rect.w;
                let h : number = (Math.random() * 0.25 + 0.5) * node.rect.h;
                let x : number = node.rect.x + Math.random() * (node.rect.w - w);
                let y : number = node.rect.y + Math.random() * (node.rect.h - h);

                node.rect = { x, y, w, h };
                this.leaves.push(node);
                continue;
            }
            
            let f = Math.random() * 0.25 + 0.5;

            let mode : "x" | "y";

            if (node.rect.w > node.rect.h * 1.125)
                mode = "y";
            else if (node.rect.h > node.rect.w * 1.125)
                mode = "x";
            else if (Math.random() <= 0.5)
                mode = "x";
            else
                mode = "y";
            
            if (mode == "y")
            {
                node.left = makeNode(
                    node.rect.x,
                    node.rect.y,
                    node.rect.w * f,
                    node.rect.h,
                    node.depth + 1,
                    ++idx);

                node.right = makeNode(
                    node.rect.x + f * node.rect.w,
                    node.rect.y,
                    node.rect.w * (1-f),
                    node.rect.h,
                    node.depth + 1,
                    ++idx);
            }
            else
            {
                node.left = makeNode(
                    node.rect.x,
                    node.rect.y,
                    node.rect.w,
                    node.rect.h * f,
                    node.depth + 1,
                    ++idx);

                node.right = makeNode(
                    node.rect.x,
                    node.rect.y + node.rect.h * f,
                    node.rect.w,
                    node.rect.h * (1-f),
                    node.depth + 1,
                    ++idx);
            }

            todo.push(node.left);
            todo.push(node.right);
            this.all.push(node.left);
            this.all.push(node.right);
        }
        
        //todo: generate corridors
    }
}