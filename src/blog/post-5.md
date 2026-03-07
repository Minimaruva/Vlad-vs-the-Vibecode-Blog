---

title: HackEurope Hacathon 2026
author: Vladyslav Yahnon
description: "A journey to Paris only to find myself debugging code for 2 days straight"
image:
    url: "https://docs.astro.build/assets/rays.webp"
    alt: "The Astro logo on a dark background with rainbow rays."
pubDate: 2022-07-15
tags: [ "hacathon", "community"]
---


I had to recover from 30 hours of sleep deprivation before writing this because I spent the weekend at CentraleSupélec in Paris for HackEurope 26. While I technically had the opportunity to explore Paris, I spent most of the time exploring my codebase for bugs.

Operating simultaneously across Paris, Dublin, and Stockholm, the main focus was on building European tech independence. Backed by heavyweights like Monzo Bank, Susquehanna International Group, Google DeepMind, and Anthropic, the competition was fierce.

Together with Dmytro Avdieienko Taras Hrybovskyi and Danylo Piatyhorets, we tackled the agentic track. We built a modular, agent-driven ERP dashboard that bridges proprietary business data with highly configurable, autonomous workflows.

## What we did

For the demo, we focused on a supply chain use case, but it is only the tip of the iceberg. Our architecture's true value lies in its adaptability and modularity:

- **The Two-Part "Recipe"**: We don't do "black box" AI. Companies can configure agents for specific tasks using a strict separation of concerns:
    - Deterministic Math:  Python modules consistently and precisely allocate resources and perform difficult mathematical computations.
    - LLM Interpretability: The LLM is restricted entirely to 
 semantic analysis and web searches. 
 It takes the hard data and writes a clear report that 
 explains the reasoning behind the mathematical decision.

- **Cost Tracking via Paid.ai**: Running agents comes at unpredictable costs. We solved this problem by integrating Paid to track agent operation costs against the financial value saved.

- **Stripe Integration**: Eliminates a very error-prone procedure by automatically completing invoices for contracts that have been executed.

- **Human-in-the-Loop (HITL)**: We don't trust AI with final financial decisions. The system needs a human to evaluate the agentic decision and decide how to interpret it.

## Conclusions

Building this forced me to learn the actual mechanics of agent orchestration and dynamic cost tracking, most of which was entirely new territory for me.

We didn't win the hackathon. We won by finding meaningful connections and getting direct outreach from companies like Avelios Medical.

---

Now off to recover my 30 hours of sleep debt. Unfortunately, our Stripe integration doesn't automate paying that back.
