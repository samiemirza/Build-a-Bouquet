export type BouquetOption = {
  id: string;
  name: string;
  src: string;
};

export const flowers: BouquetOption[] = [
  {
    id: "chrysanthemum-delight",
    name: "Chrysanthemum Delight",
    src: "/flowers_png/chrysanthemum%20delight.png"
  },
  { id: "chrysanthemum", name: "Chrysanthemum", src: "/flowers_png/chrysanthemum.png" },
  { id: "lilies", name: "Lilies", src: "/flowers_png/lilies.png" },
  { id: "pastel-roses", name: "Pastel Roses", src: "/flowers_png/pastel%20roses.png" },
  { id: "peonies", name: "Peonies", src: "/flowers_png/peonies.png" },
  { id: "red-roses", name: "Red Roses", src: "/flowers_png/red%20roses.png" },
  { id: "sunflowers", name: "Sunflowers", src: "/flowers_png/sunflowers.png" },
  { id: "tulips", name: "Tulips", src: "/flowers_png/tulips.png" }
];

export const wraps: BouquetOption[] = [
  { id: "classic", name: "Classic Wrap", src: "/wraps_png/wrap1.png" },
  { id: "blush", name: "Blush Wrap", src: "/wraps_png/wrap2.png" },
  { id: "mint", name: "Mint Wrap", src: "/wraps_png/wrap3.png" },
  { id: "lace", name: "Lace Wrap", src: "/wraps_png/wrap4.png" },
  { id: "dusk", name: "Dusk Wrap", src: "/wraps_png/wrap5.png" },
  { id: "cloud", name: "Cloud Wrap", src: "/wraps_png/wrap6.png" }
];
