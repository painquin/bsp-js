import { BSPNode, Rect, SplitDirection } from "./BSPNode";

type ExitDir = "top" | "bottom" | "left" | "right";
type Corridor = {
    x1: number
    y1: number
    x2: number
    y2: number
}
export class BSP
{
    public leaves : BSPNode[];
    public all : BSPNode[];
    public root : BSPNode;
    public corridors : Corridor[];

    generate()
    {
        let todo : BSPNode[] = [];
        this.leaves = [];
        this.all = [];
        this.corridors = [];

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

            if (Math.min(node.rect.w, node.rect.h) < 150 || Math.random() < 0.1 * node.depth - 0.2  )
            {
                let w : number = (Math.random() * 0.2 + 0.4) * node.rect.w;
                let h : number = (Math.random() * 0.2 + 0.4) * node.rect.h;
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
                node.split = "vertical";
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
                node.split = "horizontal";
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
        
        this.link(this.root);
        
    }

    link(root : BSPNode)
    {
        if (root.left == null) return;

        this.link(root.left);
        this.link(root.right);

        if (root.split == "horizontal")
        {
            let top = this.findNode(root.left, "bottom");
            let bottom = this.findNode(root.right, "top");
            this.corridors.push({
                x1: Math.floor(top.rect.x + 0.5 * top.rect.w),
                y1: Math.floor(top.rect.y + top.rect.h),
                x2: Math.floor(bottom.rect.x + 0.5 * bottom.rect.w),
                y2: Math.floor(bottom.rect.y)
            });
        }
        else
        {
            let left = this.findNode(root.left, "right");
            let right = this.findNode(root.right, "left");
            this.corridors.push({
                x1: Math.floor(left.rect.x + left.rect.w),
                y1: Math.floor(left.rect.y + 0.5 * left.rect.h),
                x2: Math.floor(right.rect.x),
                y2: Math.floor(right.rect.y + 0.5 * right.rect.h)
            });
        }
    }

    findNode(root : BSPNode, dir : ExitDir) : BSPNode
    {
        if (root.left == null) // this is a leaf node
            return root;

        let left = this.findNode(root.left, dir);
        let right = this.findNode(root.right, dir);

        switch(dir)
        {
            case "top":
                return left.rect.y < right.rect.y ? left : right;
            case "bottom":
                return left.rect.y + left.rect.h > right.rect.y + right.rect.h ? left : right;
            case "left":
                return left.rect.x < right.rect.x ? left : right;
            case "right":
                return left.rect.x + left.rect.w > right.rect.x + right.rect.w ? left : right;
        }
    }
}