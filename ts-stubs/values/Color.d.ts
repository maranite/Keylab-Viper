declare class Color {
    constructor(red: number, green: number, blue: number, alpha: number);
    public static fromRGBA(red: number, green: number, blue: number, alpha: number): Color;
    public static fromRGB(red: number, green: number, blue: number): Color;
    public static fromRGBA255(red: number, green: number, blue: number, alpha: number): Color;
    public static fromRGB255(red: number, green: number, blue: number): Color;
    public static fromHex(hex: string): Color;
    public static mix(c1: Color, c2: Color, blend: number): Color;
    public static nullColor(): Color;
    public static blackColor(): Color;
    public static whiteColor(): Color;
    public getRed(): number;
    public getGreen(): number;
    public getBlue(): number;
    public getAlpha(): number;
    public getRed255(): number;
    public getGreen255(): number;
    public getBlue255(): number;
    public getAlpha255(): number;
}
