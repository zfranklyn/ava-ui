export enum Color {
  BLUE = '#0E5A8A',
  GREEN = '#0A6640',
  ORANGE = '#A66321',
  RED = '#A82A2A',
  VERMILLION = '#9E2B0E',
  ROSE = '#A82255',
  VIOLET = '#5C255C',
  INDIGO = '#5642A6',
  COBALT = '#1F4B99',
  TURQUOISE = '#008075',
  FOREST = '#1D7324',
  LIME = '#728C23',
  GOLD = '#A67908',
  SEPIA = '#63411E',
}

export interface ITag {
  text: string;
  color: Color;
}

export class Tag {
  public text: string;
  public color: Color;

  public constructor(obj: ITag) {
    this.text = obj.text;
    this.color = obj.color;
  }

  public returnObject() {
    return {
      text: this.text,
      color: this.color,
    };
  }
}