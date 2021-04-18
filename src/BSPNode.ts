export type SplitDirection = "vertical" | "horizontal";

export type Rect = {
    x : number
    y : number
    w : number
    h : number
}

export type BSPNode = {
    rect : Rect
    left : BSPNode
    right : BSPNode
    split : SplitDirection
    depth : number
    idx : number
}
