// SYNTHETIC — dane zastępcze za pull Eli (Krok 0 OST). Wygenerowane deterministycznie skryptem
// artifacts/scripts/gen_ela_pull.py. DO PODMIANY na realne dane.

export interface SellerAudience {
  sellerId: string;
  followers: number;
  monthlyOrders: number;
  repeatBuyerRate: number;
  repeatGmvShare: number;
  aov: number;
  tier: "standard" | "negotiated";
  recentFollowers: string[];
}

export const sellerAudience: Record<string, SellerAudience> = {
  "s1": {
    sellerId: "s1",
    followers: 477,
    monthlyOrders: 438,
    repeatBuyerRate: 0.26,
    repeatGmvShare: 0.41,
    aov: 557,
    tier: "negotiated",
    recentFollowers: ["Edyta", "Nina", "Bartek"],
  },
  "s2": {
    sellerId: "s2",
    followers: 362,
    monthlyOrders: 433,
    repeatBuyerRate: 0.18,
    repeatGmvShare: 0.32,
    aov: 438,
    tier: "standard",
    recentFollowers: ["Kuba", "Lena", "Damian", "Krzysztof", "Kasia"],
  },
  "s3": {
    sellerId: "s3",
    followers: 419,
    monthlyOrders: 537,
    repeatBuyerRate: 0.21,
    repeatGmvShare: 0.38,
    aov: 594,
    tier: "standard",
    recentFollowers: ["Piotr", "Olek", "Andrzej"],
  },
  "s4": {
    sellerId: "s4",
    followers: 594,
    monthlyOrders: 650,
    repeatBuyerRate: 0.29,
    repeatGmvShare: 0.49,
    aov: 232,
    tier: "negotiated",
    recentFollowers: ["Weronika", "Karolina", "Hania"],
  },
  "s5": {
    sellerId: "s5",
    followers: 236,
    monthlyOrders: 312,
    repeatBuyerRate: 0.2,
    repeatGmvShare: 0.36,
    aov: 454,
    tier: "standard",
    recentFollowers: ["Weronika", "Bartek", "Lena"],
  },
  "s6": {
    sellerId: "s6",
    followers: 210,
    monthlyOrders: 311,
    repeatBuyerRate: 0.18,
    repeatGmvShare: 0.35,
    aov: 475,
    tier: "standard",
    recentFollowers: ["Krzysztof", "Zofia", "Ola"],
  },
  "s7": {
    sellerId: "s7",
    followers: 398,
    monthlyOrders: 422,
    repeatBuyerRate: 0.21,
    repeatGmvShare: 0.35,
    aov: 299,
    tier: "standard",
    recentFollowers: ["Weronika", "Kamila", "Marta"],
  },
  "s8": {
    sellerId: "s8",
    followers: 385,
    monthlyOrders: 571,
    repeatBuyerRate: 0.19,
    repeatGmvShare: 0.34,
    aov: 523,
    tier: "standard",
    recentFollowers: ["Olek", "Edyta", "Kasia", "Zofia"],
  },
  "s9": {
    sellerId: "s9",
    followers: 371,
    monthlyOrders: 499,
    repeatBuyerRate: 0.22,
    repeatGmvShare: 0.36,
    aov: 416,
    tier: "standard",
    recentFollowers: ["Kamila", "Julia", "Olek", "Lena"],
  },
  "s10": {
    sellerId: "s10",
    followers: 532,
    monthlyOrders: 734,
    repeatBuyerRate: 0.32,
    repeatGmvShare: 0.51,
    aov: 297,
    tier: "negotiated",
    recentFollowers: ["Mateusz", "Oskar", "Kamila"],
  },
  "s11": {
    sellerId: "s11",
    followers: 93,
    monthlyOrders: 97,
    repeatBuyerRate: 0.17,
    repeatGmvShare: 0.33,
    aov: 341,
    tier: "standard",
    recentFollowers: ["Kasia", "Justyna", "Oskar"],
  },
  "s12": {
    sellerId: "s12",
    followers: 389,
    monthlyOrders: 475,
    repeatBuyerRate: 0.2,
    repeatGmvShare: 0.35,
    aov: 467,
    tier: "standard",
    recentFollowers: ["Sylwia", "Szymon", "Andrzej", "Oskar", "Iga"],
  },
};

export function getSellerAudience(sellerId: string): SellerAudience | undefined {
  return sellerAudience[sellerId];
}
