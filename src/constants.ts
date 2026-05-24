import { StockData, CisLunarTier } from './types';

export const STOCKS: StockData[] = [

  // ══════════════════════════════════════════════
  // AI HYPERSCALERS
  // ══════════════════════════════════════════════
  {
    symbol: 'NVDA',
    fullName: 'NVIDIA Corporation',
    category: 'ai-hyperscalers',
    tags: ['GPU', 'AI accelerator', 'data center', 'CUDA'],
    mainBusiness: 'NVIDIA designs and supplies AI accelerators (H100/H200/B200/GB200 GPUs) that power virtually every large language model training run and inference deployment globally. Its CUDA software ecosystem creates a near-unbreakable moat — switching costs are measured in years of retraining engineers. Data center segment is now ~87% of revenue, and HBM3e adoption in Blackwell architecture is driving ASP expansion. NVIDIA is not just a chipmaker; it is the AI compute platform.',
    thesisExplainer: 'NVIDIA controls the AI compute stack from silicon to software. Every major hyperscaler (MSFT, GOOGL, META, AMZN) depends on its GPUs. The CUDA ecosystem lock-in means AMD and Intel custom silicon face a 3-5 year catch-up. As long as AI model scaling continues, demand for H/B/GB-series GPUs structurally exceeds supply.',
    financials: {
      revenue: '$39.3B (Q4 FY2026)',
      netProfit: '$22.1B net income',
      cashFlow: 'FCF ~$19B TTM',
      period: 'Q4 FY2026'
    },
    indicators: {
      roic: '118%',
      roe: '134%',
      cashFlow: 'Exceptional FCF generation, buybacks accelerating',
      debt: '$8.5B long-term debt',
      currentRatio: '4.2',
      margin: 'Gross margin 74.6%',
    },
    latestDevelopments: [
      'GB200 NVL72 rack system in mass production, $3M+ per rack ASP',
      'Blackwell Ultra (B300) sampling to hyperscalers',
      'China export restrictions partially offset by H20 chip variant',
    ],
    currentPrice: '$892.00',
  },
  {
    symbol: 'MSFT',
    fullName: 'Microsoft Corporation',
    category: 'ai-hyperscalers',
    tags: ['Azure', 'OpenAI', 'Copilot', 'cloud'],
    mainBusiness: 'Microsoft is the largest enterprise AI platform through Azure OpenAI Service, which exclusively hosts GPT-4o/o1/o3 models for enterprise customers. Copilot integration across Office 365, GitHub, Dynamics, and Teams creates a $30/seat/month AI upsell on its ~400M commercial seats. Azure cloud grew 33% YoY in the most recent quarter, driven entirely by AI workloads. Microsoft has a structural advantage: it owns both the AI model (OpenAI) and the enterprise distribution (365/Teams/Azure).',
    thesisExplainer: 'The OpenAI exclusivity deal means every enterprise wanting production GPT access must go through Azure. Azure AI revenue run rate exceeded $10B annually in early 2026. Copilot at $30/user/month on 400M seats is a $144B/year TAM expansion from a standing start.',
    financials: {
      revenue: '$70.1B (Q2 FY2026)',
      netProfit: '$24.1B',
      cashFlow: 'FCF $25.2B (Q2)',
      period: 'Q2 FY2026'
    },
    indicators: {
      roic: '32%',
      roe: '38%',
      cashFlow: 'Industry-leading FCF margin ~36%',
      debt: '$47B long-term debt, $80B cash',
      currentRatio: '1.8',
      margin: 'Operating margin 45%',
    },
    latestDevelopments: [
      'Azure AI grew 33% YoY, capacity constraint easing with new data centers',
      'Copilot + Microsoft 365 seat attach rate accelerating in enterprise',
      'MAI-1 custom AI chip reducing NVIDIA GPU dependence',
    ],
    currentPrice: '$415.00',
  },
  {
    symbol: 'GOOGL',
    fullName: 'Alphabet Inc.',
    category: 'ai-hyperscalers',
    tags: ['Google Cloud', 'Gemini', 'TPU', 'search AI'],
    mainBusiness: 'Alphabet operates the world\'s largest AI research lab (DeepMind/Google Brain) and owns the dominant search surface for AI-powered discovery. Google Cloud grew 28% YoY driven by Vertex AI workloads. Its TPU v5 custom chips reduce NVIDIA GPU dependency for internal training. Gemini 2.0 Ultra is competitive with GPT-4o at fraction of inference cost due to in-house silicon. Search remains ~57% of revenue but AI Overviews in search is expanding monetization per query.',
    thesisExplainer: 'GOOGL is the only hyperscaler building its own AI chips (TPUs) at scale, giving it structural cost advantages in inference. Search + YouTube together reach 4B+ users daily — the largest AI-powered distribution surface on the planet. At ~20x forward earnings, valuation is compressed vs. AI peers.',
    financials: {
      revenue: '$96.5B (Q4 2025)',
      netProfit: '$26.5B',
      cashFlow: 'FCF $24.1B Q4',
      period: 'Q4 2025'
    },
    indicators: {
      roic: '28%',
      roe: '32%',
      cashFlow: 'FCF yield ~5% on enterprise value',
      debt: 'Net cash $94B',
      currentRatio: '2.1',
      margin: 'Operating margin 27.7%',
    },
    latestDevelopments: [
      'Google Cloud TPU v5p deployed at 8,960-chip scale',
      'Gemini 2.5 Pro released, competitive with Claude 3.7 Sonnet on coding',
      'Waymo robotaxi now operating in 5 US cities',
    ],
    currentPrice: '$168.00',
  },
  {
    symbol: 'META',
    fullName: 'Meta Platforms Inc.',
    category: 'ai-hyperscalers',
    tags: ['Llama', 'MTIA chip', 'social AI', 'ad targeting'],
    mainBusiness: 'Meta is deploying AI across its 3.2B daily active users on Facebook, Instagram, WhatsApp, and Threads. Its open-source Llama 3/4 models are now the most widely deployed foundation models globally, creating an ecosystem lock-in around its tooling. Meta AI assistant reached 600M MAUs within 12 months of launch. Custom MTIA silicon is reducing GPU CAPEX for inference. Ad revenue per user is expanding as AI improves targeting and creative generation.',
    thesisExplainer: 'Meta has the most underappreciated AI moat: 3.2B daily users generating training data at a scale no one can replicate. Llama open-source strategy turns the AI developer community into Meta\'s R&D army. At 22x forward earnings with 20%+ EPS growth, it trades at a discount to the quality of the franchise.',
    financials: {
      revenue: '$48.4B (Q4 2025)',
      netProfit: '$20.8B',
      cashFlow: 'FCF $13.7B Q4',
      period: 'Q4 2025'
    },
    indicators: {
      roic: '38%',
      roe: '35%',
      cashFlow: 'FCF margin 28%',
      debt: 'Net cash $50B+',
      currentRatio: '2.7',
      margin: 'Operating margin 43%',
    },
    latestDevelopments: [
      'Llama 4 Scout/Maverick/Behemoth released; Maverick tops GPT-4o on MMLU',
      'Meta AI assistant integrated across WhatsApp, IG, Facebook globally',
      'MTIA v2 chip deployed for ranking and recommendation inference',
    ],
    currentPrice: '$540.00',
  },
  {
    symbol: 'AMZN',
    fullName: 'Amazon.com Inc.',
    category: 'ai-hyperscalers',
    tags: ['AWS', 'Trainium', 'Bedrock', 'Alexa+'],
    mainBusiness: 'Amazon Web Services is the cloud infrastructure backbone for 31% of global cloud workloads. AWS Bedrock provides managed access to Anthropic Claude, Meta Llama, and Amazon Nova models. Trainium2/3 custom chips are being deployed at scale to reduce NVIDIA dependency for training. Amazon is also the largest AI inference market through Bedrock, and is layering Alexa+ (agentic AI assistant) across its 500M+ device installed base.',
    thesisExplainer: 'AWS represents ~80% of Amazon\'s operating profit. Bedrock model marketplace and Trainium chips are growing 2-3x faster than overall AWS. The agentic AI wave (multi-step task automation) plays directly to AWS Lambda/Step Functions infrastructure. Amazon trades at 35x forward earnings — compressed for a near-monopoly cloud platform.',
    financials: {
      revenue: '$187.8B (Q4 2025)',
      netProfit: '$20.0B',
      cashFlow: 'FCF $69B TTM',
      period: 'Q4 2025'
    },
    indicators: {
      roic: '19%',
      roe: '25%',
      cashFlow: 'FCF expanding rapidly post-investment cycle',
      debt: '$58B long-term debt',
      currentRatio: '1.1',
      margin: 'AWS operating margin 38.1%',
    },
    latestDevelopments: [
      'AWS re:Invent 2025: Trainium3 announced, 4x better perf/watt vs Trainium2',
      'Bedrock usage grew 300% YoY; Claude 3.7 Sonnet most popular model',
      'Project Kuiper satellite broadband launch — 3,236 satellite constellation',
    ],
    currentPrice: '$195.00',
  },
  {
    symbol: 'AAPL',
    fullName: 'Apple Inc.',
    category: 'ai-hyperscalers',
    tags: ['Apple Intelligence', 'M-series', 'on-device AI', 'privacy AI'],
    mainBusiness: 'Apple is executing a differentiated AI strategy: on-device inference via M4/A18 Pro chips with Private Cloud Compute for sensitive queries. Apple Intelligence integrates AI natively into iOS/macOS for writing, image generation, and Siri agentic tasks. With 2.3B active devices and the most affluent user base globally, Apple\'s AI monetization surface is enormous. The hardware upgrade cycle triggered by Apple Intelligence is potentially the largest in iPhone history.',
    thesisExplainer: 'Apple\'s privacy-first AI approach is a moat no one else can replicate — on-device processing means no data leaves the device. The iPhone 16/17 AI upgrade cycle is the key catalyst: 700M+ iPhones in the installed base are pre-AI hardware. At ~28x forward earnings with $162B net cash, the valuation is defensible.',
    financials: {
      revenue: '$124.3B (Q1 FY2026)',
      netProfit: '$36.3B',
      cashFlow: 'FCF $30B Q1',
      period: 'Q1 FY2026'
    },
    indicators: {
      roic: '62%',
      roe: '160%',
      cashFlow: 'Buyback ~$25B/quarter',
      debt: '$97B debt, $162B cash — net cash positive',
      currentRatio: '0.87',
      margin: 'Gross margin 46.9%; Services margin ~75%',
    },
    latestDevelopments: [
      'Apple Intelligence on-device AI launched iOS 18.1+, expanding features quarterly',
      'iPhone 16 series outselling 15 series in US/Europe',
      'Vision Pro OS 3 with spatial AI features shipping',
    ],
    currentPrice: '$195.00',
  },
  {
    symbol: 'TSLA',
    fullName: 'Tesla Inc.',
    category: 'ai-hyperscalers',
    tags: ['FSD', 'Dojo', 'Optimus', 'robotaxi'],
    mainBusiness: 'Tesla is transitioning from an EV company to an AI/robotics platform. Full Self-Driving (FSD) v13 uses an end-to-end neural network trained on 10B+ real-world driving miles — the largest real-world embodied AI dataset in existence. Optimus humanoid robot is in early production and could address a $10T+ labor replacement market. Dojo supercomputer provides in-house AI training at scale. The Cybercab robotaxi network launch is the next major inflection.',
    thesisExplainer: 'Tesla\'s real moat is data — 7M+ vehicles generate 150M miles of FSD driving data daily. No robotics/AV company can replicate this corpus. If autonomous driving reaches L4+ at scale, Tesla\'s margin structure transforms: no human driver, $1/mile revenue, near-zero marginal cost. Optimus is the wildcard: 1M units at $20K COGS = $20B hardware revenue before software.',
    financials: {
      revenue: '$97.7B (FY2025)',
      netProfit: '$7.1B',
      cashFlow: 'FCF -$3B (heavy Optimus/Dojo investment)',
      period: 'FY2025'
    },
    indicators: {
      roic: '8%',
      roe: '12%',
      cashFlow: 'FCF negative due to capex; $28B cash balance',
      debt: '$6.5B long-term debt',
      currentRatio: '1.8',
      margin: 'Auto gross margin 17.7%',
    },
    latestDevelopments: [
      'Cybercab robotaxi launch event held; fleet production begins H2 2026',
      'Optimus Gen 3 shown performing complex assembly tasks autonomously',
      'FSD v13 end-to-end model — 2x fewer interventions vs v12',
    ],
    currentPrice: '$280.00',
  },

  // ══════════════════════════════════════════════
  // AI SOFTWARE
  // ══════════════════════════════════════════════
  {
    symbol: 'PLTR',
    fullName: 'Palantir Technologies',
    category: 'chokepoints',
    tags: ['AIP', 'government AI', 'defense', 'enterprise'],
    mainBusiness: 'Palantir\'s AI Platform (AIP) is the dominant enterprise and government AI deployment layer in the US. It enables organizations to operationalize LLMs on classified and proprietary data securely. Government segment (DoD, CIA, NSA) grew 45% YoY as AIP is embedded into military decision-making systems. Commercial AIP contract growth accelerated to 71% YoY as enterprises adopt it for supply chain, operations, and manufacturing AI workflows.',
    thesisExplainer: 'Palantir is the only company cleared to run AI on classified government data at scale. Its "AI ontology" (the data model layer) is deeply embedded and switching costs are measured in years, not months. AIP boot camps are converting enterprise pilots to contracts at unprecedented velocity — the sales motion is working.',
    financials: {
      revenue: '$828M (Q4 2025)',
      netProfit: '$79M GAAP; $334M adj.',
      cashFlow: 'FCF $517M TTM',
      period: 'Q4 2025'
    },
    indicators: {
      roic: '14%',
      roe: '10%',
      cashFlow: 'FCF margin 63% (adj.)',
      debt: 'Net cash $4.6B',
      currentRatio: '6.1',
      margin: 'Adjusted gross margin 80%+',
    },
    latestDevelopments: [
      'US commercial revenue grew 54% YoY; AIP now in 300+ enterprise deployments',
      'NATO AI/ML intelligence platform contract awarded',
      'Added to S&P 500 in September 2024, driving institutional inflows',
    ],
    currentPrice: '$87.00',
  },
  {
    symbol: 'TEM',
    fullName: 'Tempus AI',
    category: 'chokepoints',
    tags: ['clinical AI', 'genomics', 'precision medicine'],
    mainBusiness: 'Tempus AI is the largest clinical AI platform in oncology, with 7M+ structured patient records and 200+ AI models deployed across radiology, pathology, and genomics. Its data licensing business (selling anonymized clinical datasets to pharma companies for drug discovery) is a high-margin recurring revenue stream. Tempus has partnerships with all top-10 pharma companies. The AI-driven drug discovery market is expected to grow from $1.4B to $18B by 2030.',
    thesisExplainer: 'Tempus has the most valuable proprietary dataset in healthcare AI — 7M multi-modal clinical records (genomic + imaging + notes + outcomes). This moat compounds: more patients → better models → more physician adoption → more patients. Pharma data licensing alone could be worth more than the current market cap.',
    financials: {
      revenue: '$693M (FY2025 est.)',
      netProfit: '-$214M (investing in growth)',
      cashFlow: 'FCF negative, improving trajectory',
      period: 'FY2025'
    },
    indicators: {
      roic: 'N/A (pre-profitability)',
      roe: 'N/A',
      cashFlow: 'Genomics segment EBITDA positive',
      debt: '$200M convertible notes',
      currentRatio: '2.8',
      margin: 'Genomics gross margin 65%+',
    },
    latestDevelopments: [
      'Partnership with Google for Gemini integration in clinical workflows',
      'Tempus One AI platform for oncologists gaining rapid adoption',
      'Expanded to radiology AI for lung cancer screening',
    ],
    currentPrice: '$38.00',
  },
  {
    symbol: 'CRSP',
    fullName: 'CRISPR Therapeutics AG',
    category: 'ai-software',
    tags: ['gene editing', 'CASGEVY', 'sickle cell', 'biotech AI'],
    mainBusiness: 'CRISPR Therapeutics co-invented and commercialized the first approved CRISPR gene editing therapy (CASGEVY, with Vertex) for sickle cell disease and beta thalassemia. Beyond CASGEVY, the pipeline includes CTX001 cancer immunotherapy, regenerative medicine programs, and a cardiovascular risk reduction program. AI is being applied to guide CRISPR target selection and optimize off-target editing prediction.',
    financials: {
      revenue: '$310M (CASGEVY royalties, FY2025)',
      netProfit: '-$180M (R&D investment)',
      cashFlow: 'FCF negative; $1.9B cash',
      period: 'FY2025'
    },
    indicators: {
      roic: 'N/A',
      roe: 'N/A',
      cashFlow: 'Cash runway 5+ years',
      debt: 'Minimal debt',
      currentRatio: '12.0',
      pipeline: '8 active clinical programs',
    },
    latestDevelopments: [
      'CASGEVY approved in EU; now available in US, EU, UK',
      'CTX112 CAR-T shows 100% response rate in Phase 1 B-cell lymphoma',
      'Cardiovascular program CTX320 (Lp(a) reduction) entering Phase 1',
    ],
    currentPrice: '$48.00',
  },
  {
    symbol: 'COIN',
    fullName: 'Coinbase Global Inc.',
    category: 'ai-software',
    tags: ['crypto exchange', 'Base L2', 'stablecoin', 'DeFi'],
    mainBusiness: 'Coinbase is the largest US crypto exchange and the dominant institutional crypto custody and settlement platform. Its Base Layer 2 blockchain (built on Ethereum) is the fastest-growing L2 by developer activity and is being used to build on-chain AI agent economies. Stablecoin revenue (USDC partnership with Circle) is a high-margin recurring stream growing with crypto adoption. Regulatory clarity from 2025 US crypto legislation has unlocked institutional expansion.',
    financials: {
      revenue: '$6.6B (FY2025)',
      netProfit: '$2.6B',
      cashFlow: 'FCF $3.2B TTM',
      period: 'FY2025'
    },
    indicators: {
      roic: '22%',
      roe: '28%',
      cashFlow: 'FCF margin 48%',
      debt: '$3.4B long-term debt',
      currentRatio: '1.7',
      margin: 'Adjusted EBITDA margin 46%',
    },
    latestDevelopments: [
      'Base L2 became largest Ethereum L2 by daily active addresses',
      'USDC market cap reached $45B, generating $180M+ quarterly to Coinbase',
      'Acquired Deribit options exchange for $2.9B, expanding institutional offering',
    ],
    currentPrice: '$200.00',
  },
  {
    symbol: 'ROKU',
    fullName: 'Roku Inc.',
    category: 'ai-software',
    tags: ['streaming platform', 'CTV advertising', 'AI ad targeting'],
    mainBusiness: 'Roku is the #1 connected TV operating system in the US with 90M+ active accounts. Its business model is platform monetization (advertising and content discovery) rather than hardware. AI is driving ad targeting improvements — Roku\'s first-party data on streaming behavior enables CPMs 2-3x higher than traditional TV. The shift of linear TV ad budgets ($65B US) to CTV is the secular tailwind.',
    financials: {
      revenue: '$1.2B (Q4 2025)',
      netProfit: '-$49M (GAAP); Platform EBITDA positive',
      cashFlow: 'FCF $55M Q4',
      period: 'Q4 2025'
    },
    indicators: {
      roic: 'N/A',
      roe: 'N/A',
      cashFlow: 'Platform ARPU $42 TTM, growing 8% YoY',
      debt: 'Net cash $2.1B',
      currentRatio: '3.2',
      margin: 'Platform gross margin 53%',
    },
    latestDevelopments: [
      'AI-powered smart guide launched — personalized content recommendations',
      'The Roku Channel now top 5 US streaming service by viewing hours',
      'AI ad attribution tools driving premium CTV CPMs',
    ],
    currentPrice: '$58.00',
  },

  // ══════════════════════════════════════════════
  // SEMIS SUPPLY CHAIN
  // ══════════════════════════════════════════════
  {
    symbol: 'AVGO',
    fullName: 'Broadcom Inc.',
    category: 'semis',
    tags: ['custom ASIC', 'networking', 'XPU', 'AI infrastructure'],
    mainBusiness: 'Broadcom is the dominant designer of custom AI accelerators (XPUs) for hyperscalers — it has exclusive ASIC agreements with Google (TPU), Meta (MTIA), and Apple (Neural Engine). Its networking chips (Tomahawk, Jericho) move data between GPUs in AI clusters. VMware integration (acquired FY2024) adds a software layer. Broadcom\'s AI semiconductor revenue grew from $2.3B in FY2023 to $12.2B in FY2025 — the clearest AI ASIC pure-play outside NVIDIA.',
    thesisExplainer: 'Broadcom is winning the secular shift from merchant silicon (NVIDIA GPU) to custom silicon (XPU ASICs). Each hyperscaler wants to reduce NVIDIA dependency — Broadcom is the engineering house that designs the alternative. The ASIC design-to-revenue cycle is 3-4 years, meaning the ~$60B+ AI TAM Broadcom guided for FY2027 is already locked in.',
    financials: {
      revenue: '$14.9B (Q1 FY2026)',
      netProfit: '$5.5B',
      cashFlow: 'FCF $9.8B Q1',
      period: 'Q1 FY2026'
    },
    indicators: {
      roic: '14%',
      roe: '42%',
      cashFlow: 'FCF margin 66%',
      debt: '$67B (VMware acquisition debt)',
      currentRatio: '1.1',
      margin: 'Semiconductor gross margin 73%',
    },
    latestDevelopments: [
      'Guided $60-90B AI TAM for FY2027 — each hyperscaler ASIC program growing',
      'VMware cross-sell into AI infrastructure networking accelerating',
      '3nm custom ASIC designs in development with Google, Meta, Apple',
    ],
    currentPrice: '$196.00',
  },
  {
    symbol: 'AMD',
    fullName: 'Advanced Micro Devices',
    category: 'semis',
    tags: ['MI300X', 'EPYC', 'AI GPU', 'data center'],
    mainBusiness: 'AMD\'s MI300X GPU is the only credible merchant alternative to NVIDIA\'s H100/H200 for AI inference workloads. MI300X has 192GB HBM3 (vs H100\'s 80GB), making it preferred for large context window LLM inference. EPYC server CPUs now hold ~35% of x86 data center CPU market. AMD is gaining share from Intel in servers and from NVIDIA in inference as hyperscalers pursue AI supply chain diversification.',
    thesisExplainer: 'AMD is the only company with at-scale GPU + CPU silicon that can challenge NVIDIA\'s AI stack. MI300X memory density advantage is decisive for inference (the fastest-growing AI workload). At 20x forward earnings vs NVDA at 35x, AMD carries significantly less multiple risk if AI growth decelerates.',
    financials: {
      revenue: '$7.7B (Q4 2025)',
      netProfit: '$1.1B GAAP; $2.2B adj.',
      cashFlow: 'FCF $1.6B Q4',
      period: 'Q4 2025'
    },
    indicators: {
      roic: '9%',
      roe: '7%',
      cashFlow: 'FCF growing rapidly with data center mix shift',
      debt: '$1.7B long-term debt',
      currentRatio: '2.5',
      margin: 'Data center gross margin ~55%',
    },
    latestDevelopments: [
      'MI300X adopted by Microsoft Azure, Meta, Oracle as NVIDIA alternative',
      'MI325X and MI350 series on roadmap for 2026',
      'EPYC 4th gen Turin: 192 cores, highest x86 compute density',
    ],
    currentPrice: '$125.00',
  },
  {
    symbol: 'ARM',
    fullName: 'Arm Holdings plc',
    category: 'semis',
    tags: ['CPU IP', 'AI edge', 'royalties', 'ISA licensing'],
    mainBusiness: 'Arm licenses CPU instruction set architecture and processor core designs used in virtually every mobile chip, and increasingly in AI inference, automotive, and data center silicon. Apple M-series, Qualcomm Snapdragon, AWS Graviton, and NVIDIA Grace CPUs are all Arm-based. The shift to Arm in data centers (AWS Graviton captures 40%+ of new EC2 instances) and AI edge devices is driving royalty rate expansion as chips become more complex.',
    thesisExplainer: 'Arm is the hidden infrastructure play behind every AI chip — it earns a royalty on virtually every processor shipped globally (230B+ cumulative shipments). The data center and automotive transitions are structurally expanding royalty rates from $0.10/chip (mobile) to $5-10/chip (server/automotive). Near-monopoly in CPU ISA licensing with no credible RISC-V competition at scale.',
    financials: {
      revenue: '$983M (Q3 FY2026)',
      netProfit: '$252M',
      cashFlow: 'FCF $420M Q3',
      period: 'Q3 FY2026'
    },
    indicators: {
      roic: '22%',
      roe: '18%',
      cashFlow: 'FCF margin 43%',
      debt: 'Net cash $2.8B',
      currentRatio: '4.1',
      margin: 'Gross margin 96% (pure IP licensing)',
    },
    latestDevelopments: [
      'Compute Subsystems (CSS) adoption accelerating — full SoC designs for AI',
      'AWS Graviton4, Apple M4, NVIDIA Grace all on Arm v9.2',
      'Automotive Arm CSS design wins at GM, Toyota, Hyundai',
    ],
    currentPrice: '$110.00',
  },
  {
    symbol: 'TSM',
    fullName: 'Taiwan Semiconductor Manufacturing Co.',
    category: 'semis',
    tags: ['foundry', '3nm', '2nm', 'CoWoS packaging', 'AI chips'],
    mainBusiness: 'TSMC is the world\'s foundry for nearly every advanced semiconductor — NVIDIA, Apple, AMD, Qualcomm, Broadcom, and Intel all manufacture at TSMC. At 3nm and below, TSMC has no credible competitor. CoWoS advanced packaging for HBM+GPU integration is the key bottleneck enabling AI accelerator production — TSMC controls this capacity. Arizona fab (N3 process) now in production, reducing geopolitical risk premium.',
    thesisExplainer: 'Every AI chip — NVIDIA H/B/GB series, Google TPU, AMD MI300X — is manufactured exclusively by TSMC. If TSMC production is disrupted, global AI training stops. CoWoS packaging is the specific chokepoint: TSMC controls ~100% of CoWoS capacity for AI accelerator HBM integration. At 18x forward earnings, the geopolitical risk discount is excessive for a true monopoly.',
    financials: {
      revenue: '$26.9B (Q4 2025)',
      netProfit: '$11.4B',
      cashFlow: 'FCF $8.7B Q4',
      period: 'Q4 2025'
    },
    indicators: {
      roic: '25%',
      roe: '31%',
      cashFlow: 'FCF yield ~4%',
      debt: '$25B long-term debt',
      currentRatio: '2.3',
      margin: 'Gross margin 57%',
    },
    latestDevelopments: [
      '2nm N2 process on track for 2025 Apple M5 and 2026 NVIDIA',
      'CoWoS-S/L capacity expanding 3x YoY to meet AI packaging demand',
      'Arizona fab 1 (N3) in volume production',
    ],
    currentPrice: '$175.00',
  },
  {
    symbol: 'ASML',
    fullName: 'ASML Holding N.V.',
    category: 'semis',
    tags: ['EUV lithography', 'High-NA EUV', 'chip equipment monopoly'],
    mainBusiness: 'ASML manufactures the only machines capable of printing the world\'s most advanced semiconductors. Its EUV (Extreme Ultraviolet) lithography systems are used by TSMC, Samsung, and Intel — there is no alternative supplier. High-NA EUV (numerical aperture 0.55 vs. 0.33) is entering production for 2nm nodes. Every advanced AI chip printed at 3nm or below requires ASML EUV machines.',
    thesisExplainer: 'ASML is the most defensible monopoly in technology. It took 30 years and $12B in R&D to build EUV — a consortium of Carl Zeiss optics, Cymer laser, and ASML\'s integration. No competitor is within a decade of replicating this. As AI drives demand for more advanced nodes, ASML\'s High-NA EUV backlog compounds. China export controls create a pricing moat on the ~60% of revenue not restricted.',
    financials: {
      revenue: '$9.3B (Q4 2025)',
      netProfit: '$3.2B',
      cashFlow: 'FCF €5.8B FY2025',
      period: 'Q4 2025'
    },
    indicators: {
      roic: '38%',
      roe: '48%',
      cashFlow: 'FCF margin 24%',
      debt: 'Net cash €4.5B',
      currentRatio: '1.9',
      margin: 'Gross margin 51.7%',
    },
    latestDevelopments: [
      'High-NA EUV NXE:3800E shipping to Intel and TSMC in 2025',
      'FY2030 revenue target raised to €44-60B vs current €28B',
      'China ban compliance — no new EUV sales to CXMT/SMIC from H2 2024',
    ],
    currentPrice: '$700.00',
  },
  {
    symbol: 'SMCI',
    fullName: 'Super Micro Computer Inc.',
    category: 'semis',
    tags: ['AI server', 'GPU server integration', 'liquid cooling', 'DGX'],
    mainBusiness: 'Super Micro is the fastest-growing AI server systems integrator, shipping complete GPU server racks (DGX H100/H200 systems, MI300X clusters) to hyperscalers and enterprises. Its "Building Block" modular architecture allows rapid configuration for any AI workload. Liquid cooling expertise is critical as GPU power density increases to 120kW/rack. Super Micro went from $7B to $25B revenue in 2 years driven entirely by AI infrastructure demand.',
    financials: {
      revenue: '$5.7B (Q2 FY2026)',
      netProfit: '$163M GAAP',
      cashFlow: 'FCF -$1.2B (working capital for rapid growth)',
      period: 'Q2 FY2026'
    },
    indicators: {
      roic: '21%',
      roe: '27%',
      cashFlow: 'Working capital intensive — inventory/receivables constrain FCF',
      debt: '$2.3B long-term debt',
      currentRatio: '2.6',
      margin: 'Gross margin 11.9% (systems integrator economics)',
    },
    latestDevelopments: [
      'Accounting restatement resolved; avoided Nasdaq delisting',
      'Liquid cooling racks for GB200 NVL72 systems — largest AI server config',
      'NVIDIA preferred partner for direct liquid cooling (DLC) solutions',
    ],
    currentPrice: '$35.00',
  },
  {
    symbol: 'MRVL',
    fullName: 'Marvell Technology Group',
    category: 'semis',
    tags: ['custom ASIC', '800G networking', 'PAM4', 'AI interconnect'],
    mainBusiness: 'Marvell designs custom AI ASICs for hyperscalers (Amazon Trainium, Google TPU ancillary chips) and high-speed networking chips for AI cluster interconnects. Its 800G ethernet and InfiniBand-class PAM4 optics chips move data between GPUs. Marvell\'s data center AI revenue grew from $200M in FY2024 to $1.5B+ in FY2026, positioning it alongside Broadcom in the custom ASIC race.',
    thesisExplainer: 'Marvell is the second-largest custom AI ASIC designer — Amazon\'s Trainium chip is a Marvell co-design. The networking TAM for AI clusters is $10B+ annually and growing. Marvell is early in a multi-year design win cycle with hyperscalers that will not be visible in revenue until 2026-2028.',
    financials: {
      revenue: '$1.82B (Q4 FY2026)',
      netProfit: '$98M GAAP; $588M adj.',
      cashFlow: 'FCF $530M Q4',
      period: 'Q4 FY2026'
    },
    indicators: {
      roic: '7%',
      roe: '5%',
      cashFlow: 'FCF margin 29% (adj.)',
      debt: '$4.1B long-term debt',
      currentRatio: '2.1',
      margin: 'Adjusted gross margin 60%+',
    },
    latestDevelopments: [
      'Amazon Trainium2 custom ASIC in mass production — Marvell co-designed',
      '800G ethernet data center interconnect chip capturing hyperscaler sockets',
      'FY2027 AI revenue guidance: $2.5B+',
    ],
    currentPrice: '$68.00',
  },
  {
    symbol: 'MU',
    fullName: 'Micron Technology',
    category: 'semis',
    tags: ['HBM', 'DRAM', 'NAND', 'AI memory'],
    mainBusiness: "Leading memory chip maker, focus on DRAM, NAND, HBM (High Bandwidth Memory) for AI/data centers. Micron is strategically positioned as a core infrastructure provider for the generative AI revolution. HBM3e is the memory layer physically stacked on AI GPUs — each NVIDIA H200 needs 141GB, GB200 needs 192GB.",
    thesisExplainer: 'HBM is the memory directly stacked on AI GPUs — every NVIDIA Blackwell chip needs 192GB of HBM3e, and Micron is one of only 3 suppliers (SK Hynix, Samsung). HBM2026 is fully sold out. At $20B CapEx for FY2026, Micron is investing ahead of a multi-year demand wave.',
    financials: {
      revenue: '$13.64B (driven by HBM)',
      netProfit: '$5.24B',
      cashFlow: 'TTM Op Cash Flow Margin 53.63%',
      period: 'Q ending Nov 2025'
    },
    indicators: {
      margin: '53.63% (Op Cash Flow)',
      roic: '21.73%',
      roe: '18.9%',
      cashFlow: 'Strong Operating Cash Flow generated by HBM premium',
      debt: 'N/A',
      currentRatio: 'N/A',
      buildup: 'Deliberate HBM inventory buildup',
    },
    latestDevelopments: [
      'HBM 2026 fully sold out',
      '$20B CapEx planned for FY26',
      'HBM4 development on track for 2026 sampling',
    ],
    currentPrice: '$95.00',
  },

  // ══════════════════════════════════════════════
  // CPO LIGHT SOURCE CHAIN
  // ══════════════════════════════════════════════
  {
    symbol: 'COHR',
    fullName: 'Coherent Corp.',
    category: 'cpo-light',
    tags: ['vertical cavity laser', 'datacom transceiver', 'EML', 'CPO'],
    mainBusiness: 'Coherent is the largest vertically integrated optical component company, manufacturing lasers, transceivers, and indium phosphide (InP) wafers used in every AI data center interconnect. NVIDIA named Coherent its preferred partner for direct liquid cooling optical integration. Coherent\'s 800G/1.6T transceiver portfolio and EML (electro-absorption modulated laser) chips are in hyperscaler racks globally. Its InP substrate manufacturing gives it control of the most critical CPO supply chain input.',
    thesisExplainer: 'Coherent sits at the intersection of 3 AI infrastructure megatrends: (1) data center interconnect bandwidth doubling every 18 months, (2) CPO replacing pluggable optics, (3) InP substrate supply constraint. NVIDIA selected Coherent as strategic optical partner — sole-source-style relationships with hyperscalers create durable revenue visibility. Market cap of ~$17B for a company generating $1.5B+ in AI-driven optics revenue.',
    financials: {
      revenue: '$1.43B (Q2 FY2026)',
      netProfit: '-$18M GAAP; $135M adj.',
      cashFlow: 'FCF improving; guided $400M+ FY2026',
      period: 'Q2 FY2026'
    },
    indicators: {
      roic: '3%',
      roe: 'N/A (restructuring)',
      cashFlow: 'Restructuring legacy businesses; AI optics carrying growth',
      debt: '$4.5B (II-VI/Coherent merger debt)',
      currentRatio: '2.0',
      margin: 'Datacom segment gross margin 40%+',
    },
    latestDevelopments: [
      'NVIDIA strategic partnership for CPO integration in GB200/Blackwell systems',
      '1.6T transceiver qualification at 3 major hyperscalers',
      'EML backlog fully booked through 2027 for CPO programs',
    ],
    currentPrice: '$72.00',
  },
  {
    symbol: 'LITE',
    fullName: 'Lumentum Holdings Inc.',
    category: 'cpo-light',
    tags: ['EML laser', '200G per lane', 'CPO light source', 'datacom'],
    mainBusiness: 'Lumentum is the leading manufacturer of EML (electro-absorption modulated laser) chips and VCSEL arrays used in high-speed optical transceivers. Its 200G-per-lane EML modules are the gold standard for 800G/1.6T AI data center interconnects. Lumentum has major design wins for CPO (co-packaged optics) light source modules at multiple hyperscalers — its order book extends to 2028-2029 at current run rates.',
    thesisExplainer: 'EML chips are the critical light source in every high-speed AI data center interconnect. Lumentum makes the best EML in the world — production-proven at 200G/lane where competitors are still sampling. CPO programs at NVIDIA, Google, and Microsoft require qualification of specific laser suppliers, and Lumentum is on the approved list for virtually every major program.',
    financials: {
      revenue: '$416M (Q2 FY2026)',
      netProfit: '$18M',
      cashFlow: 'FCF $45M Q2',
      period: 'Q2 FY2026'
    },
    indicators: {
      roic: '5%',
      roe: '6%',
      cashFlow: 'FCF recovering post-telecom downturn',
      debt: '$1.5B convertible notes',
      currentRatio: '4.2',
      margin: 'Datacom gross margin 50%+',
    },
    latestDevelopments: [
      '200G per lane EML module — only supplier at this wavelength/speed in production',
      'CPO program qualifications ongoing at all top-3 hyperscalers',
      'Order book extends to 2028-2029 — structurally sold out',
    ],
    currentPrice: '$60.00',
  },
  {
    symbol: 'AAOI',
    fullName: 'Applied Optoelectronics Inc.',
    category: 'cpo-light',
    tags: ['400mW pump laser', 'CW laser', 'CPO light source', 'SiPh'],
    mainBusiness: 'Applied Optoelectronics designs and manufactures high-power continuous-wave (CW) lasers and optical transceivers for data center and CATV markets. Its 400mW narrow-linewidth pump laser is specifically engineered for silicon photonics CPO applications — the CW light source must be narrow linewidth and high power for coherent modulation. AAOI\'s vertical integration (from epi wafer to packaged module) gives it cost and IP advantages in this niche.',
    thesisExplainer: 'CPO architecture requires high-power CW laser light fed to silicon photonics modulators — this is AAOI\'s exact product. The 400mW pump laser is the specific output needed for 1.6T CPO systems. AAOI is vertically integrated and already qualified in hyperscaler supply chains. At current market cap (~$700M), it is priced as a legacy transceiver maker, not a CPO light source critical supplier.',
    financials: {
      revenue: '$73M (Q4 2025)',
      netProfit: '-$12M (GAAP)',
      cashFlow: 'FCF -$8M, improving',
      period: 'Q4 2025'
    },
    indicators: {
      roic: 'N/A',
      roe: 'N/A',
      cashFlow: 'Transitioning from CATV legacy to CPO/datacom growth',
      debt: '$50M long-term debt',
      currentRatio: '2.1',
      pipeline: '400mW CW laser for SiPh/CPO in qualification',
    },
    latestDevelopments: [
      '400mW narrow-linewidth CW pump laser launched for CPO/silicon photonics',
      'Design wins at 2 hyperscalers for 800G CPO programs',
      'Q4 data center revenue grew 85% YoY',
    ],
    currentPrice: '$14.00',
  },
  {
    symbol: 'SIVE',
    fullName: 'Sivers Semiconductors AB (OTC: SIVR)',
    category: 'cpo-light',
    tags: ['InP DFB laser', 'CW laser array', 'CPO light source', 'Win Semi'],
    mainBusiness: 'Sivers Semiconductors designs high-power InP DFB (distributed feedback) CW laser arrays — the most critical light source for co-packaged optics (CPO) in AI data centers. Sivers\' laser arrays are embedded in platforms from Jabil (1.6T LRO), Marvell Celestial, POET Technologies Starlight, and Ayar Labs SuperNova. Manufacturing is done by Win Semiconductors (3105.TPEX) in Taiwan — Sivers designs, Win Semi produces at scale.',
    thesisExplainer: 'CPO architecture shifts from external pluggable optics to laser arrays directly integrated with the switching chip. Sivers is the only pure-play CW DFB laser array designer with hyperscaler design wins in production. Win Semi partnership solves the scale problem. This is the "SIVE + Win Semi = unbeatable CPO light source supply chain" thesis. Market cap ~$500M vs a TAM expanding to $8B+ by 2028. NOTE: Swedish-listed stock (Nasdaq First North); US investors access via OTC or Swedish brokerage.',
    financials: {
      revenue: 'SEK 180M (~$17M USD, FY2025)',
      netProfit: 'SEK -180M (R&D and ramp investment)',
      cashFlow: 'FCF negative; funded by Swedish/UK investors',
      period: 'FY2025'
    },
    indicators: {
      roic: 'N/A (pre-profitability)',
      roe: 'N/A',
      cashFlow: 'Revenue growing 60%+ YoY; profitability targeted FY2026',
      debt: 'SEK 150M convertible',
      currentRatio: '3.1',
      pipeline: 'Jabil 1.6T LRO, POET Starlight, Ayar SuperNova, Marvell Celestial',
    },
    latestDevelopments: [
      'Win Semi foundry qualification complete — scaling CW laser production',
      'Embedded in Jabil 1.6T LRO module (approved hyperscaler supply)',
      'POET Starlight and Ayar SuperNova design wins disclosed Q4 2025',
    ],
    currentPrice: 'SEK 12.50 (~$1.18)',
  },

  // ══════════════════════════════════════════════
  // PCB / CCL BOTTLENECK
  // ══════════════════════════════════════════════
  {
    symbol: 'TTMI',
    fullName: 'TTM Technologies Inc.',
    category: 'pcb-ccl',
    tags: ['PCB', 'AI server board', 'high layer count', 'advanced packaging'],
    mainBusiness: 'TTM Technologies is the largest US-based PCB manufacturer and the direct beneficiary of the AI server PCB revolution. AI server motherboards require 40-78 layer PCBs vs 20-24 for traditional servers — 8x the material content and 3-5x the price. TTMI has deep aerospace/defense relationships (classified programs) and is expanding AI server PCB capacity. The shift of AI spending to infrastructure is pulling forward massive PCB demand.',
    thesisExplainer: 'AI server PCBs are not your grandfather\'s motherboard. A single GB200 NVL72 rack requires ~$50,000 in PCB material vs ~$6,000 for a standard server. The global AI server PCB market is forecast to grow from $3.1B (2024) to $27.1B (2027). TTMI is the only pure-play US-listed PCB manufacturer directly in this order flow. Defense + AI = two structural tailwinds.',
    thesisImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/PCB_design_and_realisation_smt_and_through_hole.jpg/1200px-PCB_design_and_realisation_smt_and_through_hole.jpg',
    financials: {
      revenue: '$628M (Q3 2025)',
      netProfit: '$43M',
      cashFlow: 'FCF $67M Q3',
      period: 'Q3 2025'
    },
    indicators: {
      roic: '8%',
      roe: '12%',
      cashFlow: 'FCF improving with AI server mix shift',
      debt: '$945M long-term debt',
      currentRatio: '2.0',
      margin: 'Gross margin 20.4%',
    },
    latestDevelopments: [
      'AI server PCB capacity expansion — new capacity coming online H2 2026',
      'Defense hypersonic and advanced communications PCB backlog growing',
      'Selected as preferred PCB supplier for 2 US hyperscaler AI server programs',
    ],
    currentPrice: '$22.00',
  },
  {
    symbol: 'ROG',
    fullName: 'Rogers Corporation',
    category: 'pcb-ccl',
    tags: ['CCL material', 'low-loss laminate', 'HVLP copper foil', 'RF substrate'],
    mainBusiness: 'Rogers Corporation manufactures high-frequency, low-loss laminates (CCL — Copper Clad Laminate) for advanced PCBs. Its RO4000 and CLTE-XT series are the materials of choice for AI server backplanes, mmWave 5G antennas, and advanced radar systems. The AI server PCB upgrade cycle demands M8/M9 grade ultra-low-loss CCL where lead times are now 6 months and prices are up 30%+ in 2025-2026.',
    thesisExplainer: 'CCL is the substrate material that PCBs are literally made from. For AI servers running at 112G+ signal speeds, generic FR4 CCL doesn\'t work — you need Rogers-grade low-loss material. Rogers is the dominant US supplier of this material. The supply constraint is severe: HVLP (high-velocity low-profile) copper foil is in 57% supply deficit for 2026. Every AI server board you see uses either Rogers material or equivalent — and Rogers is the benchmark.',
    thesisImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Woven_glass_laminate.jpg/1200px-Woven_glass_laminate.jpg',
    financials: {
      revenue: '$222M (Q3 2025)',
      netProfit: '$7M',
      cashFlow: 'FCF $18M Q3',
      period: 'Q3 2025'
    },
    indicators: {
      roic: '4%',
      roe: '4%',
      cashFlow: 'Recovering from telecom capex downturn; AI server is new driver',
      debt: '$400M long-term debt',
      currentRatio: '3.4',
      margin: 'Gross margin 35%',
    },
    latestDevelopments: [
      'AI server laminate orders backlogged 6 months at premium pricing',
      'New high-frequency laminate line coming online for 2026 demand',
      'EV/ADAS advanced radar CCL orders growing 40% YoY',
    ],
    currentPrice: '$105.00',
  },
  {
    symbol: 'SANM',
    fullName: 'Sanmina Corporation',
    category: 'pcb-ccl',
    tags: ['PCBA', 'system integration', 'data center hardware', 'EMS'],
    mainBusiness: 'Sanmina is a leading electronics manufacturing services (EMS) company specializing in complex printed circuit board assemblies (PCBA) and complete system integration for data centers, defense, and medical. Sanmina assembles the full AI server systems from PCBs (from suppliers like TTMI), memory, and cables into rack-ready units for hyperscalers. Its deep relationships with NVIDIA, AMD, and hyperscalers make it a critical AI infrastructure assembly partner.',
    thesisExplainer: 'In the AI server supply chain: Rogers makes the laminate → TTMI makes the bare PCB → Sanmina assembles everything into a working system. Sanmina\'s value is integration complexity: a GB200 NVL72 rack has hundreds of components, 72 GPUs, and complex liquid cooling plumbing — Sanmina is paid to make this work reliably at scale. Data center revenue grew 22% YoY in the most recent quarter.',
    financials: {
      revenue: '$2.26B (Q4 FY2025)',
      netProfit: '$62M',
      cashFlow: 'FCF $94M Q4',
      period: 'Q4 FY2025'
    },
    indicators: {
      roic: '12%',
      roe: '18%',
      cashFlow: 'FCF consistently positive; low capex EMS model',
      debt: '$850M long-term debt',
      currentRatio: '1.9',
      margin: 'Gross margin 10.2% (EMS economics)',
    },
    latestDevelopments: [
      'Data center segment grew 22% YoY — AI server assembly ramp',
      'New San Jose facility expansion for liquid-cooled AI rack assembly',
      'Defense and medical segments provide revenue stability baseline',
    ],
    currentPrice: '$62.00',
  },

  // ══════════════════════════════════════════════
  // HIDDEN CHOKEPOINTS
  // ══════════════════════════════════════════════
  {
    symbol: 'ALRIB',
    fullName: 'Riber S.A. (Euronext: ALRIB)',
    category: 'chokepoints',
    tags: ['MBE equipment', 'InP epi wafer', 'GaAs', 'CPO upstream'],
    mainBusiness: 'Riber manufactures Molecular Beam Epitaxy (MBE) equipment — the machines used to grow ultra-pure InP and GaAs semiconductor crystal layers for laser chips and optical components. InP epi wafers grown in Riber MBE machines are the starting material for Sivers\' CW lasers, AAOI\'s pump lasers, and Coherent\'s EML chips. Riber has the MSFT Quantum Computing facility as a customer and is embedded in ROSIE (the silicon photonics R&D platform). Only 2 credible MBE equipment makers exist globally — Riber and Veeco.',
    thesisExplainer: 'You cannot make an InP laser chip without MBE equipment. Riber makes the machines that grow the epitaxial layers. If Riber\'s order books fill, the entire CPO light source chain is capacity-constrained upstream. Market cap ~€250M for a company that is a true chokepoint in the AI photonics supply chain. MSFT Quantum and ROSIE platform relationships are publicly disclosed design wins. A single MBE machine costs €2-5M — Riber\'s entire market cap is the cost of ~60 machines.',
    thesisImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/MBE-Anlage.jpg/1200px-MBE-Anlage.jpg',
    financials: {
      revenue: '€43M (FY2025)',
      netProfit: '€2.1M',
      cashFlow: 'FCF €1.8M',
      period: 'FY2025'
    },
    indicators: {
      roic: '6%',
      roe: '5%',
      cashFlow: 'Order book growing 24% YoY',
      debt: '€8M (net cash positive)',
      currentRatio: '4.2',
      pipeline: 'MSFT Quantum, ROSIE silicon photonics platform, defense',
    },
    latestDevelopments: [
      'MSFT Azure Quantum facility MBE equipment contract disclosed',
      'ROSIE (silicon photonics R&D platform) using Riber MBE systems',
      'FY2025 order book up 24%; profitability improving',
    ],
    currentPrice: '€3.80',
  },
  {
    symbol: 'AXTI',
    fullName: 'AXT Inc.',
    category: 'chokepoints',
    tags: ['InP substrate', 'GaAs substrate', 'Ge substrate', 'CPO materials'],
    mainBusiness: 'AXT Inc. is a leading manufacturer of compound semiconductor substrates — the polished wafers that chip designers build laser and optical components on. InP (Indium Phosphide) substrates from AXT are used by virtually every CPO laser chip maker including Sivers, AAOI, Coherent, and Lumentum. AXT also makes GaAs substrates for VCSEL arrays and Germanium substrates for solar cells. The CPO revolution is driving a structural uplift in InP substrate demand.',
    thesisExplainer: 'InP substrates are the foundation of every DFB laser, EML chip, and optical amplifier used in CPO and datacom. AXT is one of only 3-4 credible InP substrate suppliers globally. As CPO volumes ramp in 2026-2028, substrate supply will constrain capacity before equipment or packaging. AXT is at the very base of the photonics supply chain pyramid — a true chokepoint.',
    financials: {
      revenue: '$31M (Q3 2025)',
      netProfit: '-$2M (ramp investment)',
      cashFlow: 'FCF -$4M',
      period: 'Q3 2025'
    },
    indicators: {
      roic: 'N/A',
      roe: 'N/A',
      cashFlow: 'Revenue recovery: +18% YoY as CPO orders ramp',
      debt: '$15M long-term debt',
      currentRatio: '5.1',
      pipeline: 'InP 4" and 6" wafers for CPO laser programs',
    },
    latestDevelopments: [
      'InP substrate orders from CPO programs growing significantly',
      'Expanding China InP production capacity (Beijing Tongmei)',
      'New 6-inch InP wafer qualification for 1.6T+ CPO laser programs',
    ],
    currentPrice: '$5.50',
  },

  // ══════════════════════════════════════════════
  // EXISTING WATCHLIST
  // ══════════════════════════════════════════════
  {
    symbol: 'RCL',
    fullName: 'Royal Caribbean Group',
    category: 'watchlist',
    tags: ['cruise', 'global travel', 'Icon class'],
    mainBusiness: "World's second-largest cruise operator, owns Royal Caribbean International, Celebrity, Silversea; fleet 68 ships. The company focuses on large-scale innovation and luxury segments, maintaining a dominant market share in the premium vacation industry.",
    financials: {
      revenue: '$5.14B',
      netProfit: '$1.58B',
      cashFlow: 'Free Cash Flow -$989M',
      period: 'Q3 2025'
    },
    indicators: {
      occupancy: '112%',
      roic: '15.7%',
      roe: '28.4%',
      cashFlow: 'Negative FCF due to ship delivery timing',
      debt: '$20.98B',
      currentRatio: '0.16',
      leverageNote: 'Highly leveraged',
    },
    latestDevelopments: [
      'Extended shipbuilding with Meyer Turku to 2036',
      'Icon 5-7 orders and options confirmed',
    ],
    currentPrice: '$195.00',
  },
  {
    symbol: 'LLY',
    fullName: 'Eli Lilly and Company',
    category: 'watchlist',
    tags: ['pharma', 'obesity', 'incretin', 'Mounjaro', 'Zepbound'],
    mainBusiness: "Pharma giant, incretin drugs (Mounjaro/Zepbound) dominate revenue. Leader in metabolic diseases and weight loss treatments, expanding aggressively into global markets. Orforglipron (oral GLP-1) could expand the addressable market 10x.",
    financials: {
      revenue: '$17.60B (+54% YoY)',
      netProfit: 'N/A',
      cashFlow: 'Op Cash Flow $8.4B',
      period: 'Q3 2025'
    },
    indicators: {
      roic: 'High (Proprietary Growth)',
      roe: '45.2% (Estimated)',
      cashFlow: 'Robust conversion from Zepbound sales',
      debt: 'Controlled',
      currentRatio: 'Healthy',
      margin: '>50% revenue from incretin (Mounjaro $6.52B, Zepbound $3.59B)',
    },
    latestDevelopments: [
      'New factory for Orforglipron (oral GLP-1)',
      'Licensing deals for oral obesity drugs',
    ],
    currentPrice: '$750.00',
  },
  {
    symbol: 'MAR',
    fullName: 'Marriott International',
    category: 'watchlist',
    tags: ['hotels', 'asset-light', 'franchise', 'travel'],
    mainBusiness: "Largest hotel chain by rooms, operating an asset-light franchise model. Extensive portfolio ranging from luxury (Ritz-Carlton) to select service brands.",
    financials: {
      revenue: '$6.49B',
      netProfit: 'Net Income $728M',
      cashFlow: 'N/A',
      period: 'Q3 2025'
    },
    indicators: {
      roic: '26.12%',
      roe: 'N/A (Asset Light)',
      cashFlow: 'Consistent stable cash generation from fees',
      debt: 'N/A',
      currentRatio: 'N/A',
      pipeline: '596,000 rooms',
    },
    latestDevelopments: [
      '100+ City Express agreements in North America',
    ],
    currentPrice: '$245.00',
  },
  {
    symbol: 'HLT',
    fullName: 'Hilton Worldwide',
    category: 'watchlist',
    tags: ['hotels', 'franchise', 'lifestyle', 'buyback'],
    mainBusiness: "Asset-light hotel franchise, strong lifestyle and luxury brands. Focused on industry-leading unit growth and shareholder returns through buybacks.",
    financials: {
      revenue: 'N/A',
      netProfit: 'Net Income $420M',
      cashFlow: 'Op Cash Flow $816M',
      period: 'Q3 2025'
    },
    indicators: {
      roic: '32.76%',
      roe: 'High (Return to shareholders)',
      cashFlow: '$816M Operating Cash Flow (Q3 2025)',
      debt: 'N/A',
      currentRatio: '0.66',
      buyback: 'Buyback yield ~5%',
    },
    latestDevelopments: [
      '60+ new lifestyle hotels in 2026',
      'Global luxury expansions',
    ],
    currentPrice: '$190.00',
  },
];

export const ARK_HOLDER_NOTE = "As of Jan 2026, ARK top holdings: TSLA, CRSP, ROKU, COIN, TEM, PLTR. Several are now tracked in this dashboard.";

// ══════════════════════════════════════════════
// CIS-LUNAR SPACE ECONOMY
// ══════════════════════════════════════════════
export const CISLUNAR_TIERS: CisLunarTier[] = [
  {
    tier: 1,
    name: 'Execution Anchors',
    riskProfile: 'Low risk',
    trl: 'TRL 9',
    characteristics: 'Proven at scale • Multi-$B backlog',
    companies: [
      { name: 'SpaceX', tier: 1, tierName: 'Execution Anchors', riskProfile: 'Low risk', trl: 'TRL 9', characteristics: 'Proven at scale • Multi-$B backlog', description: 'Dominant provider of Earth-to-lunar access and landing systems via Starship.', segment: 'Earth-to-Lunar Access' },
      { name: 'BWX Technologies', tier: 1, tierName: 'Execution Anchors', riskProfile: 'Low risk', trl: 'TRL 9', characteristics: 'Proven at scale • Multi-$B backlog', description: 'Supplies nuclear reactors and advanced power systems for lunar surface operations.', segment: 'Power & Energy' },
      { name: 'RTX/Collins', tier: 1, tierName: 'Execution Anchors', riskProfile: 'Low risk', trl: 'TRL 9', characteristics: 'Proven at scale • Multi-$B backlog', description: 'Delivers power, energy, thermal control, and life support systems for habitats.', segment: 'Power & Energy / Habitats' },
      { name: 'L3Harris', tier: 1, tierName: 'Execution Anchors', riskProfile: 'Low risk', trl: 'TRL 9', characteristics: 'Proven at scale • Multi-$B backlog', description: 'Leading supplier of communications, navigation, and PNT infrastructure.', segment: 'Communications/Navigation' },
      { name: 'Lockheed Martin', tier: 1, tierName: 'Execution Anchors', riskProfile: 'Low risk', trl: 'TRL 9', characteristics: 'Proven at scale • Multi-$B backlog', description: 'Develops habitats, life support, and surface construction platforms.', segment: 'Habitats' },
    ]
  },
  {
    tier: 2,
    name: 'Contracted Implementers',
    riskProfile: 'Medium risk',
    trl: 'TRL 7-9',
    characteristics: 'Contracts won • Near-term revenue',
    companies: [
      { name: 'Blue Origin', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'New Glenn launcher and Blue Moon lander for lunar cargo and crewed landings.', segment: 'Earth-to-Lunar Access' },
      { name: 'Northrop Grumman', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'Lunar landers, habitats, and in-space logistics systems.', segment: 'Cislunar Mobility / Habitats' },
      { name: 'Rocket Lab', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'Electron and Neutron launch vehicles plus lunar payload delivery.', segment: 'Earth-to-Lunar Access' },
      { name: 'Intuitive Machines', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'Nova-C landers, communications relay, polar ice ISRU, and data services.', segment: 'Earth-to-Lunar Access / ISRU & Mining' },
      { name: 'Firefly', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'Blue Ghost lunar lander and small-to-medium launch vehicles.', segment: 'Earth-to-Lunar Access' },
      { name: 'Redwire', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'Solar arrays, power systems, and regolith processing hardware.', segment: 'Power & Energy / ISRU & Mining' },
      { name: 'Nokia', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'Lunar 4G/5G communications networks.', segment: 'Communications/Navigation' },
      { name: 'Axiom Space', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'Commercial habitats and lunar surface infrastructure.', segment: 'Habitats' },
      { name: 'Vast', tier: 2, tierName: 'Contracted Implementers', riskProfile: 'Medium risk', trl: 'TRL 7-9', characteristics: 'Contracts won • Near-term revenue', description: 'Commercial space stations and long-duration habitats.', segment: 'Habitats' },
    ]
  },
  {
    tier: 3,
    name: 'Disruptive Innovators',
    riskProfile: 'Higher risk',
    trl: 'TRL 4-7',
    characteristics: 'High asymmetric upside • Private alpha',
    companies: [
      { name: 'Stoke Space', tier: 3, tierName: 'Disruptive Innovators', riskProfile: 'Higher risk', trl: 'TRL 4-7', characteristics: 'High asymmetric upside • Private alpha', description: 'Fully reusable launch system for rapid, low-cost Earth-to-lunar access.', segment: 'Earth-to-Lunar Access' },
      { name: 'Relativity Space', tier: 3, tierName: 'Disruptive Innovators', riskProfile: 'Higher risk', trl: 'TRL 4-7', characteristics: 'High asymmetric upside • Private alpha', description: '3D-printed Terran R rockets for cost-effective lunar missions.', segment: 'Earth-to-Lunar Access' },
      { name: 'Interlune', tier: 3, tierName: 'Disruptive Innovators', riskProfile: 'Higher risk', trl: 'TRL 4-7', characteristics: 'High asymmetric upside • Private alpha', description: 'Helium-3 mining for fusion and quantum computing applications.', segment: 'ISRU & Mining' },
      { name: 'Helios', tier: 3, tierName: 'Disruptive Innovators', riskProfile: 'Higher risk', trl: 'TRL 4-7', characteristics: 'High asymmetric upside • Private alpha', description: 'Molten Regolith Electrolysis for oxygen and metal extraction from lunar soil.', segment: 'ISRU & Mining' },
    ]
  }
];

export const CISLUNAR_COMPANIES_MAP = new Map(
  CISLUNAR_TIERS.flatMap(tier =>
    tier.companies.map(company => [company.name, company])
  )
);
