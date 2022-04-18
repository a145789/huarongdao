const genCaocao = (top = 0, left = 60) => ({
  name: "曹操",
  width: 120,
  height: 120,
  backgroundColor: "#f0f5e5",
  top,
  left,
});
const genBing = (top: number, left: number) => ({
  name: "兵",
  width: 60,
  height: 60,
  backgroundColor: "#92b3a5",
  top,
  left,
});
const genLine = (top: number, left: number, name: string) => ({
  name,
  width: 120,
  height: 60,
  backgroundColor: "#5cb3cc",
  top,
  left,
});

const genVertical = (top: number, left: number, name: string) => ({
  name,
  width: 60,
  height: 120,
  backgroundColor: "#5dbe8a",
  top,
  left,
});

export const gameConfig: {
  name: string;
  layout: () => {
    top: number;
    left: number;
    width: number;
    height: number;
    name: string;
    backgroundColor: string;
  }[];
}[] = [
  {
    name: "横刀立马",
    layout: () => [
      genVertical(0, 0, "黄忠"),
      genCaocao(),
      genVertical(0, 180, "赵云"),
      genVertical(120, 0, "马超"),
      genLine(120, 60, "关羽"),
      genBing(180, 60),
      genBing(180, 120),
      genVertical(120, 180, "张飞"),
      genBing(240, 0),
      genBing(240, 180),
    ],
  },
  {
    name: "横竖皆将",
    layout: () => [
      genVertical(0, 0, "黄忠"),
      genCaocao(),
      genVertical(0, 180, "赵云"),
      genVertical(120, 0, "马超"),
      genLine(120, 60, "关羽"),
      genLine(180, 60, "张飞"),
      genBing(120, 180),
      genBing(180, 180),
      genBing(240, 0),
      genBing(240, 180),
    ],
  },
  {
    name: "守口如瓶",
    layout: () => [
      genVertical(0, 0, "黄忠"),
      genCaocao(),
      genVertical(0, 180, "赵云"),
      genBing(120, 0),
      genBing(180, 0),
      genVertical(120, 60, "张飞"),
      genBing(120, 180),
      genBing(180, 180),
      genLine(240, 0, "关羽"),
      genLine(240, 120, "马超"),
    ],
  },
  {
    name: "层层设防",
    layout: () => [
      genVertical(0, 0, "黄忠"),
      genCaocao(),
      genVertical(0, 180, "赵云"),
      genBing(120, 0),
      genBing(180, 0),
      genLine(120, 60, "关羽"),
      genLine(180, 60, "张飞"),
      genBing(120, 180),
      genBing(180, 180),
      genLine(240, 60, "马超"),
    ],
  },
  {
    name: "三军联防",
    layout: () => [
      genCaocao(0, 0),
      genVertical(0, 120, "黄忠"),
      genVertical(0, 180, "赵云"),
      genLine(120, 0, "关羽"),
      genLine(120, 120, "张飞"),
      genBing(180, 0),
      genBing(240, 0),
      genLine(180, 60, "马超"),
      genBing(180, 180),
      genBing(240, 180),
    ],
  },
  {
    name: "堵塞要道",
    layout: () => [
      genBing(0, 0),
      genBing(60, 0),
      genCaocao(),
      genBing(0, 180),
      genBing(60, 180),
      genVertical(120, 0, "马超"),
      genVertical(120, 60, "赵云"),
      genLine(120, 120, "关羽"),
      genLine(180, 120, "张飞"),
      genLine(240, 60, "黄忠"),
    ],
  },
  {
    name: "水泄不通",
    layout: () => [
      genVertical(0, 0, "黄忠"),
      genCaocao(),
      genBing(0, 180),
      genBing(60, 180),
      genLine(120, 0, "关羽"),
      genLine(120, 120, "张飞"),
      genLine(180, 0, "赵云"),
      genLine(180, 120, "马超"),
      genBing(240, 0),
      genBing(240, 180),
    ],
  },
  {
    name: "四路皆兵",
    layout: () => [
      genVertical(0, 0, "黄忠"),
      genCaocao(),
      genBing(120, 0),
      genBing(120, 60),
      genBing(120, 120),
      genBing(120, 180),
      genLine(180, 0, "赵云"),
      genLine(180, 120, "马超"),
      genLine(240, 0, "关羽"),
      genLine(240, 120, "张飞"),
    ],
  },
  {
    name: "五虎拦路",
    layout: () => [
      genCaocao(0, 0),
      genLine(0, 120, "黄忠"),
      genLine(60, 120, "赵云"),
      genVertical(120, 0, "马超"),
      genVertical(120, 60, "张飞"),
      genLine(120, 120, "关羽"),
      genBing(180, 120),
      genBing(180, 180),
      genBing(240, 0),
      genBing(240, 180),
    ],
  },
  {
    name: "兵将连环",
    layout: () => [
      genCaocao(0, 0),
      genBing(0, 120),
      genBing(60, 120),
      genVertical(0, 180, "赵云"),
      genLine(120, 0, "关羽"),
      genLine(120, 120, "张飞"),
      genLine(180, 0, "赵云"),
      genLine(180, 120, "马超"),
      genBing(240, 0),
      genBing(240, 180),
    ],
  },
  {
    name: "插翅难飞",
    layout: () => [
      genVertical(0, 0, "黄忠"),
      genCaocao(),
      genBing(0, 180),
      genBing(60, 180),
      genLine(120, 0, "关羽"),
      genBing(120, 120),
      genBing(120, 180),
      genVertical(180, 0, "赵云"),
      genVertical(180, 180, "张飞"),
      genLine(180, 60, "马超"),
    ],
  },
  {
    name: "齐头并进",
    layout: () => [
      genVertical(0, 0, "黄忠"),
      genCaocao(),
      genVertical(0, 180, "赵云"),
      genBing(120, 0),
      genBing(120, 60),
      genBing(120, 120),
      genBing(120, 180),
      genVertical(180, 0, "关羽"),
      genVertical(180, 180, "张飞"),
      genLine(180, 60, "马超"),
    ],
  },
  {
    name: "兵分三路",
    layout: () => [
      genBing(0, 0),
      genCaocao(),
      genBing(0, 180),
      genVertical(60, 0, "赵云"),
      genLine(120, 60, "关羽"),
      genVertical(60, 180, "张飞"),
      genVertical(180, 0, "关羽"),
      genVertical(180, 180, "张飞"),
      genBing(180, 60),
      genBing(180, 120),
    ],
  },
];
