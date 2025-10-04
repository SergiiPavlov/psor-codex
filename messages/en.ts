const en = {
  common: {
    brand: 'Psoriatinin',
    domainPlaceholder: '{domain}',
    currency: 'UAH',
    tagline: 'Dermatologist-tested care to comfort skin prone to psoriasis.',
    description: 'Psoriatinin is a cosmetic care line that helps soften, support barrier function and ease visible flaking.',
    disclaimer: 'Information on the site does not replace a consultation with a doctor. Individual results vary.',
    nonMedical: 'Psoriatinin is a cosmetic product, not a medicine.',
    cta: {
      buy: 'Buy now',
      order: 'Place an order',
      explore: 'Discover more',
      contact: 'Contact us',
      readMore: 'Read more',
      seeAll: 'See all products',
      leaveReview: 'Leave a review'
    },
    badges: {
      fragranceFree: 'Fragrance-free',
      dermatologistTested: 'Dermatologist tested',
      cooling: 'Refreshing comfort',
      labTested: 'Laboratory verified',
      ukraineMade: 'Made in Ukraine',
      crueltyFree: 'Cruelty-free testing'
    },
    logistics: {
      delivery: 'Delivery across Ukraine within 2–3 days via Nova Poshta or Ukrposhta.',
      payment: 'Payment upon receipt (cash on delivery). No prepayment is required.',
      returns: 'Formal returns are not provided. If the product does not suit you, we will refund 100% within 14 days after review.',
      guarantee: 'To request a refund, fill in the guarantee form with order number, photos and comments.'
    },
    logisticsLabels: {
      delivery: 'Delivery',
      payment: 'Payment',
      guarantee: 'Guarantee'
    },
    contact: {
      phone: '+380 XX XXX XX XX',
      email: '{order_endpoints}',
      telegram: '{order_endpoints}',
      office: 'Kharkiv, Ukraine',
      hours: 'Monday–Friday 10:00–18:00 (UTC+2)'
    },
    placeholders: {
      sizesAndPrices: '{sizes_and_prices}',
      inci: '{inci_and_actives}',
      assets: '{assets_links}',
      legalInfo: '{legal_info}',
      gaId: '{ga_id}'
    }
  },
  nav: {
    home: 'Home',    catalog: 'Catalog',    how_it_works: 'How it works',    ingredients: 'Ingredients',    results: 'Results',    about: 'About',    how_to_use: 'How to use',    care_notes: 'Care notes',    forum: 'Forum',    order_now: 'Order now',
    primary: [
      {href: '/', label: 'Home'},
      {href: '/catalog', label: 'Catalog'},
      {href: '/how-it-works', label: 'How it works'},
      {href: '/ingredients', label: 'Ingredients'},
      {href: '/results', label: 'Results'},
      {href: '/brand', label: 'About the brand'},
      {href: '/use-safely', label: 'How to use'},
      {href: '/blog', label: 'Care notes'},
      {href: '/order', label: 'Order'},
      {href: 'https://forum.psoriatinin.com', label: 'Forum', external: true}
    ],
    secondary: [
      {href: '/contacts', label: 'Contacts'},
      {href: '/legal/privacy', label: 'Privacy policy'},
      {href: '/legal/terms', label: 'Terms of use'},
      {href: '/legal/cookies', label: 'Cookies'},
      {href: '/legal/delivery', label: 'Payment & delivery'},
      {href: '/legal/returns', label: 'Returns & guarantee'}
    ]
  },
  footer: {
    about: 'Psoriatinin is a supportive care line created together with dermatologists. Our formulas focus on softening, reducing visible flaking and protecting the skin barrier without promising medical outcomes.',
    rights: '© Psoriatinin. All rights reserved.',
    registration: 'Legal details: {legal_info}',
    socialTitle: 'Stay connected',
    menuTitle: 'Quick links',
    disclaimer: 'Experience shared by users is not a medical recommendation.'
  },
  cookieBanner: {
    title: 'We use cookies',
    description: 'We use cookies to personalize content, analyze traffic and remember your language preferences. You can update your consent anytime in the Cookies policy.',
    accept: 'Accept all',
    decline: 'Decline optional'
  },
  analytics: {
    placeholder: 'Google Analytics 4 placeholder. Insert GA ID in environment variable {ga_id}.'
  },
  home: {
    hero: {
      eyebrow: 'Cosmetic care for sensitive, flaky skin',
      title: 'Comfort-focused formulas for skin that deserves gentle support',
      subtitle: 'Psoriatinin helps soften visible plaques, reduce feelings of tightness and support the skin barrier between dermatologist visits.',
      primaryCta: 'Order with cash on delivery',
      secondaryCta: 'Explore the catalog',
      checklist: [
        'Clinically tested at the Kharkiv Institute of Dermatology and Neurology',
        'Keratolytic + emollient complex for daily maintenance',
        'Cooling option for instant comfort during flare-ups'
      ]
    },
    benefits: {
      title: 'Key benefits',
      items: [
        {title: 'Supports the barrier', description: 'Ceramide-like lipids and emollients help reinforce the moisture barrier and reduce discomfort.'},
        {title: 'Softens visible scaling', description: 'Gentle keratolytics assist with the removal of surface flakes without aggressive peeling.'},
        {title: 'Maintains moisture', description: 'Humectants provide lasting hydration to ease the feeling of tightness throughout the day.'},
        {title: 'Calms the senses', description: 'Fragrance-free textures reduce risk of irritation and support everyday routines.'}
      ]
    },
    howItWorks: {
      title: 'How Psoriatinin works',
      subtitle: 'Three complementary actions for comprehensive comfort',
      steps: [
        {title: 'Keratolytic renewal', description: 'Lactic acid derivatives gently loosen dry build-up so active emollients can reach the surface.'},
        {title: 'Intensive softening', description: 'Shea butter, panthenol and oils help soften rough patches and improve skin suppleness.'},
        {title: 'Barrier support', description: 'Niacinamide and lipids strengthen the skin’s natural shield against external stressors.'}
      ]
    },
    ingredients: {
      title: 'Highlighted ingredients',
      subtitle: 'Balanced to comfort the skin without over-promising',
      items: [
        {name: 'Urea complex', description: 'Helps retain moisture while gently exfoliating surface flakes for smoother feel.'},
        {name: 'Panthenol', description: 'Supports skin resilience and soothes sensations of dryness.'},
        {name: 'Niacinamide', description: 'Helps reduce visible redness and reinforces the skin barrier.'},
        {name: 'Menthol derivative', description: 'Delivers a mild cooling touch in the Cool version for extra comfort.'}
      ]
    },
    application: {
      title: 'How to apply',
      disclaimer: 'Always perform a patch test before full application. Consult your dermatologist about combining with prescribed therapy.',
      steps: [
        {title: 'Prepare the skin', description: 'Cleanse the area gently and pat dry. Do not scrub or remove plaques forcefully.'},
        {title: 'Apply a thin layer', description: 'Use 1–2 pumps on the needed area. Massage with light motions until absorbed.'},
        {title: 'Repeat regularly', description: 'Use twice daily or as recommended by your specialist to maintain results.'}
      ],
      cautions: [
        'Avoid contact with eyes and mucous membranes.',
        'Do not apply to open wounds or actively bleeding areas.',
        'Stop use if persistent irritation occurs and consult a doctor.'
      ]
    },
    beforeAfter: {
      title: 'Real routine snapshots',
      subtitle: 'Photos provided by users with consent. Lighting and skin type may influence the visual outcome.',
      items: [
        {id: 'case-1', label: 'Before care', description: 'Dry plaques with visible scaling on elbows before 14 days of use.'},
        {id: 'case-2', label: 'After 14 days', description: 'Smoother appearance and reduced flaking after twice-daily application.'}
      ],
      disclaimer: 'Visual materials are illustrative. Individual progress can differ.'
    },
    reviews: {
      title: 'Voices from the community',
      subtitle: 'Testimonials are moderated to comply with cosmetic regulations.',
      items: [
        {name: 'Olena, 34', location: 'Kharkiv', text: 'I like that the cream absorbs quickly and does not stain clothes. Tightness feels reduced after the first days.'},
        {name: 'Ivan, 41', location: 'Dnipro', text: 'Use it between doctor visits. Helps keep elbows softer and more comfortable.'},
        {name: 'Maria, 29', location: 'Kyiv', text: 'The Cool version is great during hot weather. It calms the skin without a sticky finish.'}
      ],
      invitation: 'Share your experience — it helps others build realistic expectations.'
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {question: 'Is Psoriatinin a medicine?', answer: 'No. Psoriatinin products are cosmetic. They are designed to support comfort of skin prone to psoriasis but do not treat or cure diseases.'},
        {question: 'When can I expect to see results?', answer: 'Softening and less noticeable flaking can be felt within the first weeks of consistent use. The pace depends on skin condition and routine.'},
        {question: 'Can I combine the cream with prescribed therapy?', answer: 'Yes, but consult your dermatologist. Psoriatinin is formulated to complement medical treatment plans, not replace them.'},
        {question: 'Is there fragrance or coloring?', answer: 'The formulas are fragrance-free and without artificial dyes to minimize potential irritation.'},
        {question: 'How is the product tested?', answer: 'Each batch passes laboratory quality control and dermatological testing at the Kharkiv Institute of Dermatology and Neurology.'}
      ]
    },
    ctaStrip: {
      title: 'Ready to add Psoriatinin to your routine?',
      subtitle: 'Order now with cash on delivery and receive guidance on how to make the most of your ritual.',
      primaryCta: 'Go to order form'
    }
  },
  catalog: {
    title: 'Catalog',
    subtitle: 'Choose the texture that best matches your comfort needs.',
    products: [
      {
        slug: 'psoriatinin-cream',
        name: 'Psoriatinin Cream',
        description: 'Classic emollient care with keratolytic complex to soften and protect.',
        highlights: ['Daily maintenance', 'Rich yet fast-absorbing texture', 'Tested by dermatologists'],
        price: '{sizes_and_prices}'
      },
      {
        slug: 'psoriatinin-cool',
        name: 'Psoriatinin Cream Cool',
        description: 'All the care benefits plus a refreshing sensation for moments of heat or discomfort.',
        highlights: ['Instant comfort', 'Lightweight texture', 'Menthol derivative for cooling'],
        price: '{sizes_and_prices}'
      }
    ]
  },
  products: {
    'psoriatinin-cream': {
      name: 'Psoriatinin Cream',
      hero: {
        label: 'Classic formula',
        description: 'A rich, fragrance-free cream that combines keratolytics and emollients to keep skin supple between dermatologist appointments.',
        badges: ['Fragrance-free', 'Dermatologist tested', 'Daily comfort']
      },
      summary: {
        title: 'Why choose the classic cream',
        points: [
          'Softens rough, flaky areas with a balanced urea complex.',
          'Reduces the feeling of tightness and dryness after cleansing.',
          'Creates an invisible protective layer against external irritants.'
        ]
      },
      gallery: [
        {id: 'front', label: 'Product placeholder', description: 'Front of pack — replace with final render.', url: '{assets_links}'},
        {id: 'texture', label: 'Texture placeholder', description: 'Cream texture macro shot — replace later.', url: '{assets_links}'},
        {id: 'lifestyle', label: 'Routine placeholder', description: 'Lifestyle usage photo to be added.', url: '{assets_links}'}
      ],
      variantsTitle: 'Available formats',
      variants: [
        {id: 'classic-1', label: 'Tube — {sizes_and_prices}', price: '{sizes_and_prices}'},
        {id: 'classic-2', label: 'Family size — {sizes_and_prices}', price: '{sizes_and_prices}'}
      ],
      highlights: {
        title: 'Key advantages',
        items: [
          {title: 'Targeted softening', description: 'Urea and lactic acid derivatives encourage gentle exfoliation without aggressive peeling.'},
          {title: 'Barrier support complex', description: 'Ceramide-like lipids and niacinamide help maintain the integrity of the skin barrier.'},
          {title: 'Comfort texture', description: 'Rich but non-greasy base absorbs quickly and allows dressing shortly after application.'}
        ]
      },
      howItWorks: {
        title: 'How the classic cream works',
        items: [
          {title: 'Softens build-up', description: 'Keratolytics loosen dead cells for smoother texture.'},
          {title: 'Nourishes deeply', description: 'Emollients such as shea butter wrap the skin in lasting comfort.'},
          {title: 'Shields the barrier', description: 'Occlusive agents minimize moisture loss and protect from friction.'}
        ]
      },
      application: {
        title: 'Application ritual',
        steps: [
          {title: 'Patch test', description: 'Apply a small amount on the inner forearm for 24 hours before first use.'},
          {title: 'Daily use', description: 'Spread a thin layer over affected areas twice a day or as recommended.'},
          {title: 'Night care boost', description: 'For intense dryness, apply a thicker layer at night and cover with cotton clothing.'}
        ],
        warnings: [
          'Do not use on broken skin or open lesions.',
          'Keep out of reach of children.',
          'Store at room temperature away from direct sunlight.'
        ]
      },
      composition: {
        title: 'Composition',
        inci: '{inci_and_actives}',
        description: 'Dermatologist-reviewed formula focusing on keratolytics, emollients and barrier-supportive ingredients.',
        keyIngredients: [
          {name: 'Urea (10%)', description: 'Attracts water and loosens the outermost layer for smoother appearance.'},
          {name: 'Lactic acid derivative', description: 'Provides mild keratolytic action suitable for daily use.'},
          {name: 'Shea butter', description: 'Intensively nourishes and prevents moisture loss.'},
          {name: 'Niacinamide', description: 'Helps support skin tone uniformity and reinforce the barrier.'}
        ]
      },
      faq: [
        {question: 'Can I use Psoriatinin Cream on the face?', answer: 'Yes, apply carefully avoiding the eye area. Start with a small amount and consult your dermatologist for personal recommendations.'},
        {question: 'Is it safe during pregnancy or breastfeeding?', answer: 'There are no specific contraindications, but we advise consulting your healthcare provider before use.'},
        {question: 'Does it stain clothing?', answer: 'The cream absorbs quickly and does not leave greasy traces when used as directed.'}
      ],
      reviews: [
        {name: 'Kateryna', text: 'The texture is rich yet absorbs fast. Works well for nightly maintenance routines.'},
        {name: 'Serhii', text: 'I use it on knees and elbows. Helps maintain softness between doctor-prescribed treatments.'}
      ],
      logistics: {
        title: 'Payment & delivery',
        delivery: 'Nova Poshta or Ukrposhta, 2–3 business days across Ukraine.',
        payment: 'Cash on delivery. Check the parcel before paying.',
        guarantee: 'If the product does not meet expectations, request a refund within 14 days by filling in the guarantee form.'
      },
      jsonLd: {
        sku: 'PSO-CLASSIC',
        gtin13: '0000000000000'
      }
    },
    'psoriatinin-cool': {
      name: 'Psoriatinin Cream Cool',
      hero: {
        label: 'Cooling comfort',
        description: 'All the benefits of the classic cream with an added mild cooling sensation for moments when skin feels overheated.',
        badges: ['Cooling touch', 'Fragrance-free', 'Dermatologist tested']
      },
      summary: {
        title: 'When to choose the Cool version',
        points: [
          'Provides instant refreshing feel thanks to menthyl derivative.',
          'Lightweight texture ideal for daytime or warmer climates.',
          'Maintains the same barrier-supportive complex as the classic formula.'
        ]
      },
      gallery: [
        {id: 'front', label: 'Product placeholder', description: 'Front of pack — add final render later.', url: '{assets_links}'},
        {id: 'texture', label: 'Texture placeholder', description: 'Lightweight gel-cream texture preview.', url: '{assets_links}'},
        {id: 'lifestyle', label: 'Routine placeholder', description: 'Cooling ritual image to be added.', url: '{assets_links}'}
      ],
      variantsTitle: 'Available formats',
      variants: [
        {id: 'cool-1', label: 'Tube — {sizes_and_prices}', price: '{sizes_and_prices}'},
        {id: 'cool-2', label: 'Family size — {sizes_and_prices}', price: '{sizes_and_prices}'}
      ],
      highlights: {
        title: 'Key advantages',
        items: [
          {title: 'Cooling relief', description: 'Menthyl derivative adds a delicate cooling feel without overwhelming fragrance.'},
          {title: 'Featherlight finish', description: 'Absorbs quickly and layers well under clothing or sunscreen.'},
          {title: 'Daily resilience', description: 'Keratolytic and emollient blend keeps skin smoother over time.'}
        ]
      },
      howItWorks: {
        title: 'How the Cool cream works',
        items: [
          {title: 'Refreshes', description: 'Cooling complex gives immediate comfort when skin feels warm.'},
          {title: 'Softens', description: 'Urea and lactic acid derivatives support gradual exfoliation.'},
          {title: 'Protects', description: 'Niacinamide and lipids maintain barrier strength to reduce discomfort triggers.'}
        ]
      },
      application: {
        title: 'Application ritual',
        steps: [
          {title: 'Patch test', description: 'Test on a small area 24 hours before first full use.'},
          {title: 'Daytime relief', description: 'Apply in the morning or whenever skin feels overheated.'},
          {title: 'Layer smart', description: 'Can be used with the classic cream at night for an intensive routine.'}
        ],
        warnings: [
          'Cooling sensation is mild; discontinue if you feel burning.',
          'Avoid contact with eyes and mucous membranes.',
          'Store tightly closed to keep menthol stability.'
        ]
      },
      composition: {
        title: 'Composition',
        inci: '{inci_and_actives}',
        description: 'A balanced formula combining keratolytics, emollients and menthyl derivatives for refreshing comfort.',
        keyIngredients: [
          {name: 'Menthyl PCA', description: 'Provides mild cooling while supporting hydration.'},
          {name: 'Urea complex', description: 'Helps with softening and moisture retention.'},
          {name: 'Panthenol', description: 'Supports skin comfort and resilience.'},
          {name: 'Niacinamide', description: 'Reinforces barrier and reduces visible redness.'}
        ]
      },
      faq: [
        {question: 'How strong is the cooling effect?', answer: 'It is a subtle, refreshing sensation designed for sensitive skin. There is no strong menthol scent.'},
        {question: 'Can I use it in winter?', answer: 'Yes. The cooling feel is delicate and can be used year-round.'},
        {question: 'Is it suitable for the scalp?', answer: 'We recommend using on body areas. For scalp use consult your dermatologist.'}
      ],
      reviews: [
        {name: 'Andrii', text: 'Helps during workouts when skin feels hot. Cooling effect lasts around 20 minutes.'},
        {name: 'Svitlana', text: 'Feels light and comfortable. I combine it with the classic cream at night.'}
      ],
      logistics: {
        title: 'Payment & delivery',
        delivery: 'Delivery within Ukraine 2–3 days with Nova Poshta or Ukrposhta.',
        payment: 'Cash on delivery — pay after checking the parcel.',
        guarantee: 'Money-back guarantee within 14 days if you submit a request with evidence.'
      },
      jsonLd: {
        sku: 'PSO-COOL',
        gtin13: '0000000000001'
      }
    }
  },
  howItWorks: {
    hero: {
      title: 'The cosmetic logic behind Psoriatinin',
      subtitle: 'We combine keratolytic, emollient and barrier-support actions to support skin prone to psoriasis discomfort without making medical claims.'
    },
    sections: [
      {
        title: 'Step 1 — Gentle keratolytic action',
        body: 'Urea and lactic acid derivatives dissolve surface build-up, helping remove flakes during cleansing. This allows emollients to penetrate better without aggressive peeling.'
      },
      {
        title: 'Step 2 — Emollient cushioning',
        body: 'Butters and oils restore flexibility, while humectants keep water where it is needed. The skin feels softer and more comfortable throughout the day.'
      },
      {
        title: 'Step 3 — Barrier reinforcement',
        body: 'Niacinamide and lipids support the natural barrier to reduce external triggers such as friction, dry air or detergents.'
      },
      {
        title: 'Laboratory validation',
        body: 'Formulas are tested in independent laboratories and pass dermatological evaluation at the Kharkiv Institute of Dermatology and Neurology.'
      }
    ],
    timeline: {
      title: 'Suggested routine timeline',
      items: [
        {title: 'Days 1–3', description: 'Patch test and start once-daily application on smaller areas.'},
        {title: 'Days 4–14', description: 'Increase to twice daily. Monitor softness and comfort levels.'},
        {title: 'After 14 days', description: 'Maintain results with daily care and consult your dermatologist for adjustments.'}
      ]
    },
    faqCta: {
      title: 'Still have questions?',
      description: 'Browse the FAQ or contact our care team for more details about the cosmetic action.',
      cta: 'Go to FAQ'
    }
  },
  ingredientsPage: {
    hero: {
      title: 'Ingredient library',
      subtitle: 'Explore the key ingredients behind Psoriatinin. Final INCI percentages will be added after regulatory approval.'
    },
    cards: [
      {name: 'Urea', short: 'Humectant & keratolytic', description: 'Binds water to the skin and helps loosen surface build-up for smoother touch.', note: 'Final percentage: {inci_and_actives}'},
      {name: 'Lactic Acid Derivative', short: 'Soft exfoliation', description: 'Helps detach flakes gently without irritation.', note: 'Final percentage: {inci_and_actives}'},
      {name: 'Panthenol', short: 'Pro-vitamin B5', description: 'Supports comfort and resilience of the skin.', note: 'Final percentage: {inci_and_actives}'},
      {name: 'Niacinamide', short: 'Barrier support', description: 'Strengthens protective functions and evens tone appearance.', note: 'Final percentage: {inci_and_actives}'},
      {name: 'Menthyl PCA', short: 'Cooling agent', description: 'Delivers mild freshness in the Cool version.', note: 'Final percentage: {inci_and_actives}'},
      {name: 'Shea Butter', short: 'Emollient', description: 'Rich in fatty acids to nourish and reduce moisture loss.', note: 'Final percentage: {inci_and_actives}'}
    ],
    note: 'Full INCI lists with concentrations will be uploaded soon. Placeholders are marked with TODO.'
  },
  results: {
    hero: {
      title: 'Results & stories',
      subtitle: 'Realistic expectations and moderated community feedback.'
    },
    beforeAfter: {
      title: 'Before & after gallery',
      description: 'Uploaded with user consent. Lighting, routine adherence and additional treatments influence outcomes.',
      items: [
        {id: 'ba1', title: 'Elbows — 2 weeks', description: 'Reduced flaking and smoother texture.'},
        {id: 'ba2', title: 'Knees — 1 month', description: 'Less visible dryness and improved flexibility.'}
      ]
    },
    reviews: {
      title: 'Community reviews',
      disclaimer: 'All reviews are pre-moderated. Experiences do not guarantee similar results.',
      form: {
        title: 'Submit your review',
        description: 'Share balanced feedback to help others build their care routine.'
      }
    },
    guarantee: {
      title: 'Guarantee program',
      description: 'If Psoriatinin does not meet your expectations, we will refund 100% of the product cost. Submit a request within 14 days, attach order number and photos, and our support will respond within 48 hours.'
    }
  },
  brand: {
    hero: {
      title: 'About Psoriatinin',
      subtitle: 'A Ukrainian brand created in partnership with dermatologists and cosmetologists to support people living with psoriasis.'
    },
    mission: {
      title: 'Mission & values',
      body: 'We focus on pragmatic, science-backed care. No miraculous promises — only transparent formulas, rigorous testing and empathetic communication.'
    },
    production: {
      title: 'Production',
      body: 'Manufactured in certified facilities in Kharkiv region. Each batch undergoes laboratory control for microbiology, stability and packaging safety.'
    },
    certifications: {
      title: 'Certificates & studies',
      description: 'Access protocol scans from the Kharkiv Institute of Dermatology and Neurology and other lab reports. Placeholder files will be replaced with originals soon.',
      items: [
        {title: 'Dermatological testing report', description: 'Summary of tolerance study on volunteers with psoriasis-prone skin.', file: '{assets_links}'},
        {title: 'Microbiological safety certificate', description: 'Laboratory confirmation of safety standards.', file: '{assets_links}'},
        {title: 'Stability testing protocol', description: 'Demonstrates product stability across temperature ranges.', file: '{assets_links}'}
      ]
    },
    promise: {
      title: 'Our promise',
      body: 'We respect your routine, your doctor and your time. Psoriatinin will always stay in the cosmetic field, supporting — not replacing — professional treatment.'
    }
  },
  useSafely: {
    hero: {
      title: 'Use Psoriatinin safely',
      subtitle: 'Follow these tips to integrate the products into your daily care routine.'
    },
    steps: [
      {title: 'Start with a patch test', description: 'Apply to a small area for 24 hours. If there is no adverse reaction, proceed with broader application.'},
      {title: 'Layer with prescribed care', description: 'Leave a 15-minute gap between Psoriatinin and medical treatments unless otherwise directed.'},
      {title: 'Monitor the skin', description: 'Track comfort levels and visible changes in a diary to discuss with your dermatologist.'}
    ],
    precautions: [
      'Do not use on irritated or infected skin without medical supervision.',
      'Discontinue use if burning or redness persists for more than 30 minutes.',
      'Keep packaging closed to maintain ingredient stability.'
    ],
    patchTest: {
      title: 'Patch test guide',
      body: 'Apply a small amount to the inner elbow. Cover with a breathable bandage. Check after 24 hours for redness, itching or burning. If all is clear, start normal use.'
    }
  },
  order: {
    hero: {
      title: 'Order Psoriatinin with cash on delivery',
      subtitle: 'Fill in the form below. We will confirm details via phone or messenger before shipping.'
    },
    form: {
      title: 'Order form',
      description: 'Required fields are marked with *.',
      fields: {
        name: 'Full name*',
        phone: 'Phone number*',
        city: 'City*',
        warehouse: 'Nova Poshta branch or address*',
        product: 'Select product*',
        volume: 'Preferred volume',
        quantity: 'Quantity',
        comment: 'Comment for the manager',
        consent: 'I agree with the privacy policy and terms of use',
        guarantee: 'I confirm I have read the guarantee conditions'
      },
      quantityOptions: ['1', '2', '3', '4+'],
      success: {
        title: 'Order request sent',
        description: 'Thank you! We will reach out soon to confirm the details.'
      },
      error: {
        title: 'Unable to submit the form',
        description: 'Please check the fields or try again later.'
      },
      submit: 'Submit order'
    },
    guarantee: {
      title: 'Money-back guarantee',
      items: [
        'Valid for 14 days after receiving the parcel.',
        'Provide clear photos before and after, plus description of routine.',
        'Refund issued after reviewing the request within 5 business days.'
      ]
    },
    logistics: {
      delivery: 'Delivery 2–3 days across Ukraine.',
      payment: 'Payment upon receipt. Courier service fee according to carrier rates.'
    }
  },
  contacts: {
    hero: {
      title: 'Contacts & support',
      subtitle: 'We are here to answer questions about the cosmetic routine.'
    },
    channels: [
      {type: 'phone', label: 'Hotline', value: '+380 XX XXX XX XX'},
      {type: 'email', label: 'Email', value: '{order_endpoints}'},
      {type: 'telegram', label: 'Telegram', value: '{order_endpoints}'},
      {type: 'address', label: 'Office', value: 'Kharkiv, Ukraine'}
    ],
    schedule: 'Support hours: Monday–Friday 10:00–18:00 (UTC+2).',
    note: 'For urgent medical questions, contact your healthcare provider.'
  },
  legal: {
    privacy: {
      title: 'Privacy policy',
      intro: 'This policy explains how Psoriatinin processes personal data received via order forms, contacts and cookies. The document is compliant with Ukrainian law and GDPR principles.',
      sections: [
        {title: 'Data we collect', body: 'Name, phone, delivery address, comments, cookie identifiers and analytics data.'},
        {title: 'How we use data', body: 'To process orders, provide support, improve the site and comply with legal obligations.'},
        {title: 'Data retention', body: 'Order information is stored for up to 24 months. You can request deletion via {order_endpoints}.'},
        {title: 'Your rights', body: 'You can request access, correction or deletion of your data at any time.'}
      ]
    },
    terms: {
      title: 'Terms of use',
      intro: 'By using {domain} you agree to follow these terms. Psoriatinin provides cosmetic products and informational materials.',
      sections: [
        {title: 'Content', body: 'Information on the site is for educational purposes and does not replace professional medical advice.'},
        {title: 'User responsibilities', body: 'Provide accurate data when submitting forms and respect intellectual property.'},
        {title: 'Limitation of liability', body: 'We are not liable for misuse of the products or failure to follow instructions.'}
      ]
    },
    cookies: {
      title: 'Cookies policy',
      intro: 'We use cookies to personalize language settings and analyze anonymized traffic.',
      sections: [
        {title: 'Types of cookies', body: 'Essential (required for site functionality) and analytics (GA4 placeholder).'},
        {title: 'Managing cookies', body: 'You can change preferences in your browser or contact us for assistance.'}
      ]
    },
    delivery: {
      title: 'Payment & delivery',
      intro: 'Orders are shipped across Ukraine within 2–3 business days after confirmation.',
      sections: [
        {title: 'Delivery services', body: 'Nova Poshta or Ukrposhta. Tracking number is provided after shipment.'},
        {title: 'Payment', body: 'Cash on delivery only. Carrier fees apply according to service rates.'},
        {title: 'Order confirmation', body: 'Our manager contacts you via phone or messenger to confirm data before shipment.'}
      ]
    },
    returns: {
      title: 'Returns & guarantee',
      intro: 'Formal returns are not provided. Instead we offer a transparent money-back guarantee if the product does not meet expectations.',
      sections: [
        {title: 'Guarantee conditions', body: 'Submit a request within 14 days with order number, photos before/after and explanation.'},
        {title: 'Review process', body: 'Our team reviews the case within 5 business days and contacts you for resolution.'},
        {title: 'Refund method', body: 'Approved refunds are issued to the bank card provided during confirmation.'}
      ]
    }
  },
  blog: {
    hero: {
      title: 'Care notes',
      subtitle: 'Short reads to help you navigate everyday skincare with psoriasis.'
    },
    posts: [
      {
        slug: 'build-a-gentle-routine',
        title: 'How to build a gentle daily routine',
        description: 'Step-by-step guide to cleansing, moisturizing and protecting skin without overloading it.',
        date: '2024-04-12',
        readingTime: '6 min',
        content: [
          'Start with a mild cleanser and lukewarm water. Pat dry without rubbing.',
          'Layer humectants and emollients to maintain hydration.',
          'Protect skin from friction with soft clothing and avoid harsh scrubs.'
        ]
      },
      {
        slug: 'prepare-for-doctor-visit',
        title: 'Preparing for your next dermatologist visit',
        description: 'Simple checklist to document progress and questions for your doctor.',
        date: '2024-05-02',
        readingTime: '4 min',
        content: [
          'Track product usage and sensations in a diary.',
          'Take photos in consistent lighting once a week.',
          'List medications and cosmetic products you currently use.'
        ]
      }
    ]
  }
} as const

export default en
