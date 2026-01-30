// app/data/products.js
const products = [
  {
    id: "p1",
    badge: "15% OFF",
    title: "Classic Leather Tote",
    description:
      "Premium pebbled leather tote with spacious interior, gold-tone hardware, and comfortable shoulder straps. Perfect for daily carry.",
    price: 120,
    oldPrice: 150,
    rating: 4.8,
    reviews: 124,
    category: "Handbags",
    categorySlug: "handbags",
    colors: ["#000000", "#5d4037", "#f5f5dc"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd2jg0i2Mzr6vnnSvYGoH0R-b5-pBm8oU8y0sCXyFSkARP6MrxfDddktEoRTPNoCmY13RrqB3mU3mxNT4EvBjgqIxQyAdil-hWSNFlk7t4xcCGisoEx77UONHZLFXv-OVF3extBFhuwwFqtd8PVlMRCsZY4mrH_SfkfZuxQ3s0K3v0-lQkitaN4EETcHSrjHhCpzk3xC3ljFkyg5j3hwkpwl8toW2L5Ysmna9NVfx6XR3bVNT1G14S3YywZVC35qyF_sxZUYpWg",
  },
  {
    id: "p2",
    badge: "20% OFF",
    title: "Quilted Crossbody",
    description:
      "Quilted flap crossbody with adjustable strap and secure turn-lock closure. Lightweight and elegant for day-to-night looks.",
    price: 85,
    oldPrice: 100,
    rating: 4.9,
    reviews: 88,
    category: "Handbags",
    categorySlug: "handbags",
    colors: ["#f48fb1", "#5d4037", "#000000"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCa05w_QGhIodNBboeVe1xxBe1GN7uT-6-UlOmibAnUkdmcOwTVpBJ_fsnXtcSG5agovZJL11Yb05Qn0rB3KJ--P4-pALT0ZLhHCHI6s0eRFrSd8Koz5p4315bH8TG3gH8sgoy-XkJ_ab7SaeYkDF6sV4uLzPSOdT0vtcT9ug8JCj1T8BT44pvzCJFfzvYHSvJqqYJ3pzbLT5LG202tw2HV9AaFymj58dcD2yfpUzeuDy3r6heUtE98yz7_7giNv3nd_acdi3aNvw",
  },
  {
    id: "p3",
    badge: "10% OFF",
    title: "Structured Satchel",
    description:
      "Structured satchel with top handle + detachable strap. Clean silhouette, roomy compartments, and premium stitching.",
    price: 150,
    oldPrice: 180,
    rating: 4.7,
    reviews: 210,
    category: "Handbags",
    categorySlug: "handbags",
    colors: ["#5d4037", "#000000"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6IYlUHnk4PwWMxVsoDE2ewUkg3TbCwVNroLvcK3tRsYu7m7drqAKZmNmUo-pf36bqCX-bSje5Qdr8TbFvTccSiJtR-m-vvOsWqyh0Nr3LxoVoGK7_7SUrm6L8lMm4kgkaCnvraZMf8OCamELpCCAPHOVqo5Zls2rKSkpEgZ655AwZl7E7dfg85GkTwUef8Zpv7zdPaehaoY4kjmvam3EhPDYb1OTC9BdPglu4BmkR8fghOwO6x0OzYL92ThPmlfaz37XuRDC7TQ",
  },
  {
    id: "p4",
    badge: "NEW",
    title: "Minimal Tote Bag",
    description:
      "Minimal tote with soft structure and refined finish. Perfect match for office and travel essentials.",
    price: 110,
    oldPrice: 0,
    rating: 4.6,
    reviews: 52,
    category: "Tote Bags",
    categorySlug: "tote-bags",
    colors: ["#e3dcd2", "#000000"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYw0QEaxianHBBkUWaiF2RBqhPKbzNMPNDQDNHwiu960akE00Asm4wlmVYykMIwQRJkpy-4IypptiFGTyDeE2nA8JqtTBV3-joiGYQ-EcwPj0rj_D46AoSQe7W6nKU106UyPoSoil2MBf7r2PcQyAjzzMUKrUUvp2FD7bc12XSX3cb2sBcS_lXfmgEPv1EFsd2FXu0YzyU6gpuHTvhViXWpqvWGBNMJ_7uXSeMp2vBblBuIujQIKdnX4M8eeFp34F1M08arS5LYQ",
  },
  {
    id: "p5",
    badge: "12% OFF",
    title: "Chain Strap Crossbody",
    description:
      "Compact crossbody with chain strap and polished hardware. Keeps your essentials secure with a premium look.",
    price: 95,
    oldPrice: 108,
    rating: 4.7,
    reviews: 64,
    category: "Crossbody",
    categorySlug: "crossbody",
    colors: ["#000000", "#b9813c"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIYPMsj0agBF5HXoCKv6puzoeqiRQUvBNk-m2dJZ__OdfxWVsLcUSHiZRZXFMN94EKgRS7zGG7_ZYjiMSq3ITUZk_KcMGfn2YRCyEzQtEhBzG_cClwgrVzvCFgPM7F-w2RDz8nRM9kmxVhikt9FRP-PoVzrGUb5S1xQFDZHDMjPfMkZ8enxHMZBTfrQhgFayX-XOHk_9KV76z54GrfXHlQzdHNSAZ5pNIBoYOKa0l4k7rQUITbdkinIyi6N6FxjvGMArRB5Rd33g",
  },
  {
    id: "p6",
    badge: "18% OFF",
    title: "Evening Clutch",
    description:
      "Elegant evening clutch with secure closure and refined texture. Designed for weddings and formal events.",
    price: 70,
    oldPrice: 85,
    rating: 4.8,
    reviews: 41,
    category: "Clutches",
    categorySlug: "clutches",
    colors: ["#000000", "#e3dcd2"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9HEd2r01jDL4B3Rm9zt8wavC4toI-XFaSXv1OE7PeSkXVhYm1SF7-aTT7U8grNjDQRrRyib9zAtSxiKcAW139NMHOjRl0B3t42TQlfH41tsi_0RjhTo2Wlt06nxFXD0LOd3UhYES1jQUmSCprLf_pcfhh6-QNYtJDKA6rCfl3dxieJ-vDoPOLtCKAQiviec7R9tsXH2UFV-D3XUUnO56nUuJjG1XBXNEFokgULSvpvFWiGikP_zQ6x9E0xMVat32R_IFfRi6SOQ",
  },
  {
    id: "p7",
    badge: "BEST",
    title: "Leather Card Wallet",
    description:
      "Slim leather wallet with multiple card slots. Minimal profile, maximum everyday usefulness.",
    price: 35,
    oldPrice: 0,
    rating: 4.6,
    reviews: 77,
    category: "Wallets",
    categorySlug: "wallets",
    colors: ["#5d4037", "#000000"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGKerdSvnFu0uMJ_LZjXdXNqCIeF0MCu_iSwHAjM_lqMClupOEG9WXr2gGWuf16IMgQ51QLDQAfi1MGgjPGF9RQPB-6G4FhPjnSF-RZcNFReqSRWtRuIp8ekWi79RdttLxKWh7mqbK0-PQHXSeQHMWsaOCXk7YeiSqcvgdJ-VWetjC0p3GheSStjXpRX9hKPRrfksTNgJIfijV1-59QCAhRH2RWBZZKIMtWh8pdISfEhS4L5QD4ocQ3LIr2Cg48KRxMc-y61LDVg",
  },
  {
    id: "p8",
    badge: "NEW",
    title: "Premium Silk Scarf",
    description:
      "Soft premium silk scarf with elegant drape. Perfect accessory for layering and styling.",
    price: 45,
    oldPrice: 0,
    rating: 4.7,
    reviews: 29,
    category: "Accessories",
    categorySlug: "accessories",
    colors: ["#e3dcd2", "#b9813c"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-J2EoJC_83jsrA2T8rbUMn0huMGeFQMutjKLNgtSopd4SkQF9dJAW5khoZpol6UVZb96MMmfvw2wTOZzCSaKtBO90m2gPCAq5tDTswlYRL7fnlCH63AJfwHi-v2lMyLQeOEspinvbV2BFAG8vQqJ12L2WraERCl6c_kwOKBXMnRhzrj_hezfFfm_fJ7uCxfZmWssDwP-2dCQIP48WQpJYfWCLqMe0NIPw7qOyvdAJniPtmlQVW8X2llamDq-VpavlI8bTuLucSg",
  },
];

export default products;
