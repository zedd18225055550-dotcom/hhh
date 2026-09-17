import type { Place } from "./types";

/**
 * Sample place entries (2026). Newest first.
 * Edit this file (or append via webhook later) to add check-ins.
 */
export const places: Place[] = [
  {
    id: "2026-09-12-suzhou-creek",
    date: "2026-09-12",
    title: { zh: "苏州河步道", en: "Suzhou Creek Walk" },
    companions: [
      { zh: "小林", en: "Lin" },
      { zh: "阿哲", en: "Zhe" },
    ],
    image: "/places/place-01.svg",
  },
  {
    id: "2026-08-28-west-lake",
    date: "2026-08-28",
    title: { zh: "西湖边的傍晚", en: "Evening by West Lake" },
    companions: [{ zh: "小雨", en: "Yu" }],
    image: "/places/place-02.svg",
  },
  {
    id: "2026-08-03-moganshan",
    date: "2026-08-03",
    title: { zh: "莫干山小屋", en: "Moganshan Cabin" },
    companions: [
      { zh: "阿宁", en: "Ning" },
      { zh: "小周", en: "Zhou" },
      { zh: "豆豆", en: "Dou" },
    ],
    image: "/places/place-03.svg",
  },
  {
    id: "2026-07-15-nanjing-road",
    date: "2026-07-15",
    title: { zh: "南京路夜逛", en: "Nanjing Road Night Stroll" },
    companions: [{ zh: "独自", en: "solo" }],
    image: "/places/place-04.svg",
    nightImage: "/places/place-04.svg",
  },
  {
    id: "2026-06-22-lujiazui",
    date: "2026-06-22",
    title: { zh: "陆家嘴天际线", en: "Lujiazui Skyline" },
    companions: [
      { zh: "老陈", en: "Chen" },
      { zh: "阿苗", en: "Miao" },
    ],
    image: "/places/place-05.svg",
  },
  {
    id: "2026-05-09-anfu-road",
    date: "2026-05-09",
    title: { zh: "安福路咖啡", en: "Coffee on Anfu Road" },
    companions: [{ zh: "小满", en: "Man" }],
    image: "/places/place-06.svg",
  },
  {
    id: "2026-04-18-putuo",
    date: "2026-04-18",
    title: { zh: "普陀山清晨", en: "Dawn at Putuo" },
    companions: [
      { zh: "阿禾爸", en: "Dad" },
      { zh: "阿禾妈", en: "Mom" },
    ],
    image: "/places/place-07.svg",
  },
  {
    id: "2026-03-26-fuxing-park",
    date: "2026-03-26",
    title: { zh: "复兴公园野餐", en: "Picnic at Fuxing Park" },
    companions: [
      { zh: "团团", en: "Tuan" },
      { zh: "圆圆", en: "Yuan" },
      { zh: "小李", en: "Li" },
    ],
    image: "/places/place-08.svg",
  },
  {
    id: "2026-02-14-the-bund",
    date: "2026-02-14",
    title: { zh: "外滩散步", en: "Walk along the Bund" },
    companions: [{ zh: "小鱼", en: "Fish" }],
    image: "/places/place-09.svg",
  },
  {
    id: "2026-01-08-yu-garden",
    date: "2026-01-08",
    title: { zh: "豫园茶馆", en: "Tea at Yu Garden" },
    companions: [
      { zh: "阿青", en: "Qing" },
      { zh: "老王", en: "Wang" },
    ],
    image: "/places/place-10.svg",
  },
];

/** Newest place (assumes places sorted newest-first) */
export function getNewestPlace(): Place | undefined {
  return places[0];
}
