import stablecoinDashboard from '../assets/stablecoin_dashboard.png';
import workflowPipeline from '../assets/workflow_pipeline.png';
import walletConnection from '../assets/wallet_connection.png';

export const SKILLS = [
  "AI Agent Orchestration",
  "LLM API Integration",
  "n8n Workflows",
  "Product Positioning",
  "Community Growth",
  "Content Strategy",
  "Web3 Research",
  "UI/UX Planning",
  "Web Development",
  "Community Support"
];

export const PROJECTS = [
  {
    id: "1",
    title: "GigPay Indonesia",
    role: "UI/UX & Frontend Developer",
    description: "GigPay Indonesia is a Web3-based freelance payment platform operating on the Base network using the IDRX stablecoin. The platform provides a transparent, secure, and efficient solution for sending and receiving freelance wages.",
    contribution: "Responsible for the visual interface design and frontend implementation of the platform. The main focus was building an educational home page to explain the application workflows clearly before accessing the system, while ensuring Web3 interactions are packaged within a clean, minimalist, and professional design.",
    tech: ["WEB3", "Base", "IDRX", "Frontend"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec8ce?auto=format&fit=crop&q=80&w=800&h=400",
    github: "https://github.com/GigPay-Indonesia",
    website: "https://gigpay1.vercel.app/",
    status: "SHIPPED"
  },
  {
    id: "2",
    title: "ArisanDAO",
    role: "Product Designer",
    description: "ArisanDAO is a system that digitalizes traditional Indonesian social gatherings (arisan) into a decentralized ecosystem using smart contracts and a DAO (Decentralized Autonomous Organization) structure.",
    contribution: "Held full responsibility for designing the entire user experience (UX) and visual user interface (UI) of the platform. The primary challenge solved was simplifying blockchain operational complexity and DAO governance into intuitive, familiar user flows that are easily understood by the general public.",
    tech: ["WEB3", "DAO", "Smart Contract", "UI/UX"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400",
    github: "https://github.com/thebegithub/ArisanDAO",
    website: "https://arisan-dao.vercel.app/",
    status: "SHIPPED"
  },
  {
    id: "3",
    title: "RetroPick",
    role: "Marketing Lead & Workflow Engineer",
    description: "RetroPick is a deterministic event contract market and risk terminal designed to transform real-world uncertainty into tradeable, oracle-resolved risk markets. Leveraging AI agent workflows and distributed knowledge aggregation, the platform filters raw news inputs into real-time market prices and direct probability signals for hedging, forecasting, and data-driven decision-making.",
    contribution: "Led the marketing engineering strategy by architecting the core RetroPick Signal Engine. Engineered an autonomous AI-driven agent pipeline that monitors live economic feeds, leverages LLMs to synthesize complex financial indicators into clean market insights, and automatically broadcasts formatted digests to social hubs (Telegram, Discord, Twitter). Standardized n8n workflow systems to translate raw information into high-signal growth hooks with zero manual intervention.",
    tech: ["WEB3", "AI AGENT", "LLMs", "N8N", "AUTOMATION"],
    image: "https://images.unsplash.com/photo-1608223652631-5079a4da9001?auto=format&fit=crop&q=80&w=800&h=400",
    github: "https://github.com/RetroPick",
    website: "https://retropick.xyz/",
    status: "IN-PROGRESS"
  }
];

export const EXPERIENCE = [
  {
    id: "1",
    role: "GTM & Community Builder",
    company: "RetroPick",
    description: "Spearheaded GTM strategies, content planning, and waitlist promotion. Managed Telegram and Discord engagement, defined product positioning, and conducted Web3 community research."
  }
];

export const NOTES = [
  {
    id: "1",
    title: "Web3 Escrow Ledger",
    category: "SOLIDITY",
    desc: "A lightweight, secure escrow ledger logic designed to hold stablecoins (like IDRX) on L2 Base until conditions are met.",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleEscrow {
    address public client;
    address public freelancer;
    uint256 public amount;
    bool public isReleased;

    function release() external {
        require(msg.sender == client, "Only client can release");
        isReleased = true;
        payable(freelancer).transfer(amount);
    }
}`
  },
  {
    id: "2",
    title: "n8n Discord Dispatcher",
    category: "AUTOMATION",
    desc: "JSON payload blueprint configuration for webhook dispatch routing of real-time trading signals directly to community Discord servers.",
    code: `{
  "action": "dispatch_signal",
  "source": "RetroPick Marketing Engine",
  "payload": {
    "embeds": [{
      "title": "New Prediction Market Active",
      "color": 3066993,
      "fields": [{"name": "Asset", "value": "Base IDRX Pool"}]
    }]
  }
}`
  },
  {
    id: "3",
    title: "Unified AI SDK Client Wrapper",
    category: "AI & NODE.JS",
    desc: "A lightweight, multi-provider API client wrapper built in Node.js to abstract model calls between OpenAI, Anthropic, and Gemini with clean, standardized schemas.",
    code: `// Config model — unified client layer
const AI_CONFIG = {
  provider: "openai", // Options: "openai", "anthropic"
  model: "gpt-4o-mini"
}

// Wrapper universal untuk multi-provider LLM
async function callAI(messages, tools) {
  if (AI_CONFIG.provider === "anthropic") {
    return await anthropic.messages.create({
      model: AI_CONFIG.model,
      messages,
      tools
    });
  }

  if (AI_CONFIG.provider === "openai") {
    return await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages,
      tools: tools.map(toOpenAIFormat)
    });
  }
}`
  },
  {
    id: "4",
    title: "OnchainKit Wallet Connection",
    category: "WEB3 L2",
    desc: "Problem: Custom Web3 wallet UI flows require writing substantial boilerplate to track connection, network, and avatar states. Solution: Abstract connection logic via Coinbase OnchainKit, implementing a clean React connection gate. Key Takeaways: 1. Reduces UI state code footprint by 80%. 2. Integrates native ENS and balance queries at the client layer. 3. Fully compatible with Wagmi/Viem provider contexts on Base L2.",
    code: `import { Wallet, ConnectWallet, WalletDropdown } from '@coinbase/onchainkit/wallet';
import { Address, Avatar, Name, Identity, EthAmount } from '@coinbase/onchainkit/identity';

export function OnchainWallet() {
  return (
    <Wallet>
      <ConnectWallet className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address className="text-slate-500" />
          <EthBalance />
        </Identity>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}`
  }
];

export const BLOG_POSTS = [
  {
    id: "1",
    title: "Why L2 Base & IDRX Stablecoins are Redefining Indonesian Freelance Gigs",
    category: "WEB3 EDUCATION",
    date: "July 08, 2026",
    readTime: "4 min read",
    excerpt: "With inflation-resistant local stablecoins and sub-penny gas fees on Layer-2 Base network, local creators can now receive direct payments instantly without double conversion fees.",
    image: walletConnection
  },
  {
    id: "2",
    title: "Building Automated Marketing Funnels with n8n & Discord Webhooks",
    category: "WORKFLOW AUTOMATION",
    date: "June 25, 2026",
    readTime: "6 min read",
    excerpt: "Automated distribution workflows are the secret weapon of modern lean Web3 teams. Here is how we automated RetroPick content pipeline with zero monthly infrastructure cost.",
    image: workflowPipeline
  },
  {
    id: "3",
    title: "Bootstrapping Wallet Onboarding on Base L2 using Coinbase OnchainKit",
    category: "WEB3 DEVELOPMENT",
    date: "July 10, 2026",
    readTime: "5 min read",
    excerpt: "Custom Web3 wallet configuration often introduces substantial boilerplate code and UI edge cases. Learn how we integrated Coinbase OnchainKit and Wagmi to resolve ENS names and track balances in under 5 minutes.",
    image: stablecoinDashboard
  }
];
