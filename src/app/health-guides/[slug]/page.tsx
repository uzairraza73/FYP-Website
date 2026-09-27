"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { guides } from "../page";

const fullContent: Record<string, { sections: { heading: string; body: string }[] }> = {
  "sun-protection": {
    sections: [
      { heading: "Why UV Protection Matters", body: "Ultraviolet (UV) radiation from the sun is classified as a Group 1 carcinogen by the World Health Organization. It is the primary environmental cause of skin cancer, responsible for approximately 90% of non-melanoma skin cancers and 86% of melanomas. UV radiation damages the DNA in your skin cells, and over time, this damage accumulates and can trigger uncontrolled cell growth — cancer.\n\nUVA rays penetrate deep into the skin and cause long-term damage such as premature ageing and DNA mutations. UVB rays cause the surface redness we know as sunburn and are more directly linked to skin cancer. Broad-spectrum sunscreens protect against both." },
      { heading: "Choosing the Right Sunscreen", body: "SPF (Sun Protection Factor) measures protection against UVB only. An SPF 30 sunscreen blocks 97% of UVB rays; SPF 50 blocks 98%. Choose 'broad-spectrum' to ensure UVA coverage too.\n\n• Chemical sunscreens (e.g. oxybenzone, avobenzone) absorb UV rays and convert them to heat.\n• Mineral/physical sunscreens (zinc oxide, titanium dioxide) sit on the skin and deflect UV rays — better for sensitive skin types.\n\nFor daily use, SPF 30 is adequate. For prolonged outdoor activity, use SPF 50+ and reapply every two hours, or immediately after swimming or sweating." },
      { heading: "Application Best Practices", body: "Most people apply only 25–50% of the recommended amount of sunscreen, significantly reducing its effectiveness. Apply one ounce (a shot glass full) to cover the entire body.\n\n• Apply 15–30 minutes before sun exposure to allow absorption.\n• Don't forget often-missed areas: ears, back of neck, tops of feet, and scalp (use a spray or hat).\n• Lip balm with SPF 15+ protects against lip cancer — a common and often overlooked risk.\n• Apply sunscreen even on cloudy days — up to 80% of UV rays penetrate cloud cover." },
      { heading: "Protective Clothing & Accessories", body: "Clothing is your first line of defence against UV radiation. Tightly woven, dark-coloured fabrics offer the most protection. UPF (Ultraviolet Protection Factor) clothing is specifically tested and rated for sun protection.\n\n• Wide-brimmed hats (3-inch brim) protect the face, ears, and back of neck.\n• UV-blocking sunglasses reduce the risk of cataracts and protect the delicate skin around the eyes.\n• Seek shade, especially between 10am and 4pm when UV index is highest.\n• Check the UV index daily — any UV index above 3 warrants sun protection measures." },
      { heading: "Special Considerations for Different Skin Tones", body: "A common misconception is that darker skin tones don't need sun protection. While higher melanin content does offer some natural protection (equivalent to approximately SPF 13), it does not eliminate UV damage or skin cancer risk.\n\nSkin cancer is often diagnosed later in people with darker skin tones precisely because of this misconception, leading to worse outcomes. Acral lentiginous melanoma — which affects the palms, soles, and nail beds — is the most common melanoma subtype in people with darker skin and is unrelated to UV exposure.\n\nEveryone, regardless of skin tone, should wear broad-spectrum SPF 30+ sunscreen daily." },
    ],
  },
  "self-examination": {
    sections: [
      { heading: "Why Monthly Self-Examination Is Critical", body: "Skin cancer is among the most detectable cancers precisely because it begins on the surface of the body where it can be seen. When melanoma — the most dangerous type — is caught at stage I, the 5-year survival rate exceeds 98%. At stage IV, that rate drops below 25%.\n\nMonthly self-examinations, combined with annual professional skin checks, create a powerful early detection system. You are uniquely positioned to notice changes that a dermatologist, seen once a year, might miss." },
      { heading: "The ABCDE Method — Explained", body: "Developed by dermatologists as a simple framework for identifying potentially cancerous lesions:\n\n• A — Asymmetry: One half of the mole does not match the other. Benign moles are typically symmetrical.\n• B — Border: Irregular, ragged, notched, or blurred borders are warning signs. Benign moles have smooth, well-defined borders.\n• C — Colour: Multiple shades of brown, black, red, white, or blue within a single lesion are concerning. Uniform colour is reassuring.\n• D — Diameter: Lesions larger than 6mm (the size of a pencil eraser) warrant attention — although melanomas can be smaller when first detected.\n• E — Evolving: Any change in a mole's size, shape, colour, or the development of new symptoms (itching, bleeding, crusting) should be evaluated promptly." },
      { heading: "How to Conduct Your Examination", body: "Choose a well-lit room with a full-length mirror and a hand mirror. Examine every inch of your skin systematically:\n\n1. Face, ears, scalp (use a comb or hair dryer to part hair)\n2. Neck and chest\n3. Arms — front and back, elbows, and between fingers\n4. Torso — front and back (use hand mirror for back)\n5. Lower body — buttocks, genitals\n6. Legs — front and back, between toes, soles of feet\n7. Nails — check for dark streaks which can indicate subungual melanoma\n\nTake photos of any moles you are monitoring to track changes over time. The Oncura app automates this process with AI-powered change detection." },
      { heading: "When to See a Dermatologist Immediately", body: "Do not wait for your next scheduled appointment if you notice:\n\n• A mole that is changing rapidly over weeks, not months\n• A spot that bleeds without injury\n• A sore that doesn't heal within 4 weeks\n• A new growth that looks different from your other moles (the 'ugly duckling' sign)\n• Any mole with more than two ABCDEs flagged\n\nRemember: the goal of self-examination is not to diagnose but to prompt timely professional evaluation." },
    ],
  },
  "skincare-routine": {
    sections: [
      { heading: "The Science of a Good Routine", body: "Your skin is the body's largest organ and its primary barrier against the environment. A consistent skincare routine does two things: protects this barrier and supports its repair. The skin naturally renews itself every 28 days — a well-designed routine optimises this process." },
      { heading: "Morning Routine", body: "1. Gentle Cleanser — Remove overnight sebum and sweat without stripping the skin barrier. Look for pH-balanced formulas (pH 4.5–5.5) that won't disrupt the acid mantle.\n2. Antioxidant Serum (optional) — Vitamin C serums (10–20% L-ascorbic acid) neutralise free radicals from UV and pollution before they cause DNA damage.\n3. Moisturiser — Seal in hydration. Look for humectants (hyaluronic acid), emollients (ceramides), and occlusives (shea butter) for a complete moisturiser.\n4. SPF 30+ Broad-Spectrum — Non-negotiable. Applied last as the final layer of morning protection." },
      { heading: "Evening Routine", body: "1. Double Cleanse — Oil-based cleanser first to dissolve sunscreen and makeup, followed by water-based cleanser for a thorough cleanse.\n2. Exfoliant (2–3× weekly) — Chemical exfoliants (AHA like glycolic acid, BHA like salicylic acid) resurface skin more gently than physical scrubs.\n3. Treatment (Retinoid) — Retinol or prescription retinoids are the gold-standard anti-ageing and skin-renewal ingredients. Start slowly (1–2× weekly) to build tolerance.\n4. Moisturiser — Heavier than morning. Night is when skin repairs itself — support this with ceramide-rich creams." },
      { heading: "Ingredients to Look For vs Avoid", body: "✓ Look for: Niacinamide (brightening, pore-minimising), Hyaluronic Acid (hydration), Ceramides (barrier repair), Retinoids (cell turnover), Vitamin C (antioxidant), Peptides (collagen support).\n\n✗ Approach with caution: High-concentration fragrances (can be sensitising), Alcohol denat. as a primary ingredient (can strip barrier), Physical scrubs with sharp particles (micro-tears).\n\nAlways patch-test new products on the inside of the wrist for 48 hours before applying to the face." },
    ],
  },
  "risk-factors": {
    sections: [
      { heading: "Genetic Risk Factors", body: "Genetics play a significant role in skin cancer susceptibility:\n\n• Family history: Having one first-degree relative with melanoma doubles your risk; having two or more increases it 8–12 fold.\n• CDKN2A and CDK4 gene mutations significantly increase melanoma risk.\n• MC1R gene variants (associated with red hair and fair skin) reduce the skin's ability to protect against UV damage.\n• A personal history of any skin cancer is the strongest predictor of future skin cancers." },
      { heading: "Environmental & Lifestyle Risk Factors", body: "• UV Exposure: Cumulative lifetime UV exposure is the primary modifiable risk factor. Both UVA (tanning beds, windows) and UVB (outdoor sunburn) contribute.\n• Sunburns: Experiencing five or more blistering sunburns between ages 15 and 20 increases melanoma risk by 80%.\n• Altitude & Latitude: UV intensity increases 4% for every 300 metres of elevation. UV is strongest near the equator.\n• Tanning Beds: WHO classifies indoor tanning as a Group 1 carcinogen. First use before age 35 increases melanoma risk by 59%." },
      { heading: "Skin Type & Pigmentation", body: "The Fitzpatrick Scale classifies skin types I–VI by response to UV exposure:\n\n• Type I (always burns, never tans): Highest risk\n• Type II (usually burns, rarely tans): Very high risk\n• Type III (sometimes burns, sometimes tans): Moderate risk\n• Types IV–VI (rarely/never burns): Lower relative risk, but NOT zero risk\n\nHaving more than 50 moles on the body is also an independent risk factor." },
      { heading: "Reducing Your Risk", body: "While genetic risk factors cannot be changed, lifestyle modifications can substantially reduce overall skin cancer risk:\n\n• Daily SPF 30+ sunscreen reduces melanoma risk by 50% with consistent use over 10 years (landmark Australian study).\n• Never using tanning beds.\n• Annual professional skin checks with a dermatologist.\n• Monthly self-examinations using the ABCDE method.\n• Using Oncura AI scanning as a supplementary monitoring tool between appointments." },
    ],
  },
  "nutrition-lifestyle": {
    sections: [
      { heading: "The Diet-Skin Health Connection", body: "The relationship between nutrition and skin health is well-established in clinical literature. The skin has high metabolic activity and is dependent on adequate nutrition for cell regeneration, barrier function, and immune defence. What you eat directly impacts the skin's ability to protect itself from UV damage and repair DNA." },
      { heading: "Key Nutrients for Skin Health", body: "• Vitamin C: A powerful antioxidant essential for collagen synthesis. Found in citrus fruits, bell peppers, strawberries, and broccoli.\n• Vitamin E: Protects skin cells from oxidative stress. Found in nuts, seeds, sunflower oil, and avocado.\n• Beta-Carotene (Vitamin A): Converted to retinol in the body; supports skin cell turnover. Found in carrots, sweet potatoes, and leafy greens.\n• Omega-3 Fatty Acids: Reduce skin inflammation. Found in fatty fish (salmon, mackerel), flaxseed, and walnuts.\n• Selenium: Supports antioxidant enzyme systems. Found in Brazil nuts (just 2 per day meets daily requirements), tuna, and sunflower seeds.\n• Zinc: Essential for wound healing and UV protection. Found in meat, shellfish, legumes, and pumpkin seeds." },
      { heading: "Hydration & Skin Barrier Function", body: "Adequate hydration is fundamental to skin barrier function. Dehydrated skin is less effective at blocking UV radiation and environmental pollutants, and heals more slowly.\n\n• Aim for 8 glasses (2 litres) of water daily as a baseline — more in hot climates or after exercise.\n• Reduce alcohol and caffeine intake, both of which have diuretic effects.\n• Eat high-water-content foods: cucumber, watermelon, courgette, and celery all contribute to hydration.\n• Monitor skin turgor — pinch skin on the back of your hand; it should return to normal immediately. Slow return indicates dehydration." },
      { heading: "Lifestyle Factors", body: "• Sleep: During deep sleep, the body produces growth hormone which drives skin repair. Chronic poor sleep is associated with increased skin ageing and impaired barrier function. Aim for 7–9 hours.\n• Smoking: Accelerates skin ageing by reducing blood flow, depleting Vitamin C, and generating massive quantities of free radicals. Smoking is also an independent risk factor for squamous cell carcinoma.\n• Stress Management: Chronic stress elevates cortisol, which breaks down collagen, triggers inflammation, and exacerbates conditions like psoriasis, eczema, and acne. Mindfulness, yoga, and adequate rest help manage cortisol levels.\n• Exercise: Promotes circulation, delivers oxygen and nutrients to skin cells, and supports immune function." },
    ],
  },
  "mental-wellbeing": {
    sections: [
      { heading: "Understanding Skin Health Anxiety", body: "Health anxiety related to skin — sometimes called dermatological hypochondriasis — exists on a spectrum. On one end, a healthy level of concern motivates appropriate monitoring and timely medical consultations. On the other end, excessive worry can dominate daily life, lead to avoidance behaviours, or conversely, compulsive self-checking that itself becomes distressing.\n\nThis is especially relevant in the age of AI health tools. Used wisely, technology like Oncura can provide reassurance and catch real concerns early. Used compulsively, it can fuel anxiety cycles." },
      { heading: "Building a Healthy Monitoring Routine", body: "The key is to create structure that provides information without feeding anxiety:\n\n• Monthly self-examinations on a fixed date — no more, no less. Calendar appointments reduce compulsive checking.\n• Annual dermatologist skin checks — more frequent if you are high-risk.\n• Use Oncura scans purposefully: when you notice a new or changing lesion, not as a daily ritual.\n• Maintain a digital record of moles you are tracking so changes are data-driven, not based on anxious recall." },
      { heading: "Managing Worry Between Appointments", body: "The period between noticing something concerning and seeing a specialist is often the most anxiety-provoking. Practical strategies:\n\n• Write it down: Document the lesion (photograph, location, description) and then mentally 'file' it until your appointment. This externalises the worry.\n• Engage in absorbing activities: Physical exercise, social connection, and creative work reduce the cognitive bandwidth available for anxious rumination.\n• Avoid internet symptom-searching: Dr. Google reliably surfaces worst-case scenarios. Trust your qualified clinician for interpretation.\n• Practice grounding techniques: The 5-4-3-2-1 technique (name 5 things you can see, 4 you can touch, etc.) reduces acute anxiety." },
      { heading: "When to Seek Professional Mental Health Support", body: "Skin health anxiety warrants professional support when it:\n\n• Occupies more than an hour per day of your thinking\n• Causes you to avoid activities (swimming, sun exposure) to an extent that affects quality of life\n• Leads to repeated, reassurance-seeking consultations that don't bring lasting comfort\n• Significantly affects sleep, work, or relationships\n\nCognitive Behavioural Therapy (CBT) is highly effective for health anxiety and is supported by strong clinical evidence. Speak to your GP about a referral." },
    ],
  },
};

import { use } from "react";

export default function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const guide = guides.find((g) => g.slug === unwrappedParams.slug);
  const content = fullContent[unwrappedParams.slug];

  if (!guide || !content) notFound();

  const Icon = guide.icon;

  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/health-guides" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Back to Health Guides</span>
          </Link>

          <div className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border mb-5 ${guide.bgColor}`}>
            <Icon size={12} className={guide.iconColor} />
            <span className={guide.iconColor}>{guide.category}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-black text-white mb-5 leading-snug"
          >
            {guide.title}
          </motion.h1>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FFD8C2]">
            <Clock size={11} /> {guide.readTime}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="max-w-3xl mx-auto px-6 -mt-6 mb-8 relative z-10">
        <div className="bg-white rounded-[2rem] p-7 shadow-[0_20px_50px_rgba(92,64,51,0.1)] border border-[#FFD8C2]/50">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#5C4033] mb-4">Key Takeaways</h2>
          <ul className="space-y-3">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                <CheckCircle2 size={15} className="text-[#E76F51] mt-0.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Full Content */}
      <section className="max-w-3xl mx-auto px-6 pb-20 space-y-8">
        {content.sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(92,64,51,0.06)] border border-[#FFD8C2]/50"
          >
            <h2 className="text-lg font-black text-[#3E2723] mb-4">{section.heading}</h2>
            <div className="text-sm text-slate-500 font-medium leading-relaxed whitespace-pre-line">{section.body}</div>
          </motion.div>
        ))}

        {/* CTA */}
        <Link href="/scan">
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-gradient-to-r from-[#3E2723] to-[#5C4033] rounded-[2rem] p-8 text-white flex items-center justify-between cursor-pointer shadow-[0_15px_30px_rgba(62,39,35,0.25)] transition-all"
          >
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#FFD8C2] mb-2">Ready to take action?</p>
              <h3 className="text-lg font-black">Scan your skin with Oncura AI</h3>
              <p className="text-white/70 text-xs font-medium mt-1">Get an AI-powered skin health assessment in seconds.</p>
            </div>
            <div className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center shrink-0 ml-6 hover:bg-white hover:text-[#3E2723] transition-colors">
              <ArrowRight size={18} />
            </div>
          </motion.div>
        </Link>
      </section>
    </main>
  );
}
