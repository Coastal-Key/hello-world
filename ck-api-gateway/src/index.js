/**
 * CK API Gateway — Coastal Key Central Inference Router
 *
 * Routes:
 *   POST /v1/inference          — Claude inference with KV caching + audit logging
 *   POST /v1/leads              — Create lead in Airtable Leads table
 *   POST /v1/leads/public       — Public website contact form → Lead (no auth)
 *   POST /v1/leads/enrich       — AI-enrich an existing lead (battle plan, segment analysis)
 *   GET  /v1/leads/:id          — Fetch lead by record ID
 *   POST /v1/webhook/retell     — Retell call_analyzed → Lead + Slack
 *   POST /v1/content/generate   — Generate content (social, email, script, youtube_*) via Claude
 *   POST /v1/content/publish    — Publish Content Calendar record via Claude AI (WF-2)
 *   GET  /v1/coop/committee      — Cooperations Committee charter and dashboard
 *   GET  /v1/coop/agents         — List all 10 COOP agents
 *   GET  /v1/coop/agents/:id     — Get single COOP agent
 *   POST /v1/coop/brief          — Generate CEO meeting preparation brief
 *   POST /v1/coop/outreach       — Draft warm outreach message for target contact
 *   POST /v1/coop/network-map    — Analyze CEO relationship network
 *   GET  /v1/coop/targets        — Target contact categories and priorities
 *   POST /v1/coop/schedule       — Propose CEO meeting for calendar
 *   GET  /v1/meta-ads/status    — Meta Ads connector health check & diagnostics
 *   POST /v1/meta-ads/boost     — Boost high-engagement post via Meta Ads Manager
 *   GET  /v1/agents             — List/search agents with filtering
 *   GET  /v1/agents/metrics     — Aggregate agent metrics
 *   GET  /v1/agents/:id         — Get single agent details
 *   POST /v1/agents/:id/action  — Execute agent action (activate/pause/restart/train)
 *   GET  /v1/dashboard          — Combined dashboard data
 *   POST /v1/workflows/scaa1   — SCAA-1 Battle Plan Pipeline
 *   POST /v1/workflows/wf3     — WF-3 Investor Escalation
 *   POST /v1/workflows/wf4     — WF-4 Long-Tail Nurture
 *   POST /v1/pricing/recommend   — Dynamic pricing recommendation
 *   GET  /v1/pricing/zones      — Zone-level pricing benchmarks
 *   GET  /v1/health             — Health check
 *   GET  /v1/property-intel/search — Search ArcGIS for Saint Lucie commercial parcels
 *   POST /v1/property-intel/import — Fetch + import parcels to Airtable
 *   GET  /v1/property-intel/stats  — Property Intelligence summary stats
 *   GET  /v1/audit              — Retrieve recent audit log entries
 *   GET  /v1/campaign/calls     — TH Sentinel campaign call log
 *   GET  /v1/campaign/agents    — TH Sentinel agent performance
 *   GET  /v1/campaign/analytics — TH Sentinel campaign analytics
 *   GET  /v1/campaign/contacts  — TH Sentinel lead contacts
 *   GET  /v1/campaign/dashboard — TH Sentinel combined campaign dashboard
 *   GET  /v1/intel/officers    — List all 50 Intelligence Officers
 *   GET  /v1/intel/officers/:id — Get single Intelligence Officer
 *   POST /v1/intel/officers/:id/scan — Trigger officer scan
 *   GET  /v1/intel/dashboard   — Intelligence Officer fleet dashboard
 *   POST /v1/intel/fleet-scan  — Scan all critical-severity officers
 *   GET  /v1/email/agents      — List all 20 email agents
 *   GET  /v1/email/agents/:id  — Get single email agent
 *   POST /v1/email/compose     — AI-compose email via Claude
 *   POST /v1/email/classify    — Classify/score inbound email
 *   GET  /v1/email/dashboard   — Email operations dashboard
 *   GET  /v1/mcco/command        — MCCO Sovereign command dashboard
 *   GET  /v1/mcco/agents         — List all 15 MCCO agents
 *   GET  /v1/mcco/agents/:id     — Get single MCCO agent
 *   POST /v1/mcco/directive      — Issue sovereign directive to MKT/SEN
 *   GET  /v1/mcco/fleet-status   — Fleet inspection across governed divisions
 *   POST /v1/mcco/content-calendar — Generate 30-day content calendar
 *   POST /v1/mcco/audience-profile — Generate audience psychology profile
 *   POST /v1/mcco/positioning    — Generate authority positioning strategy
 *   POST /v1/mcco/monetization   — Generate audience monetization plan
 *   POST /v1/mcco/post           — Generate high-engagement social media post
 *   GET  /v1/frameworks                   — List all Peak Performance Frameworks
 *   GET  /v1/frameworks/category/:cat     — Get frameworks by category
 *   GET  /v1/frameworks/:id               — Get single framework
 *   POST /v1/frameworks/apply             — AI-apply framework to business scenario
 *   POST /v1/frameworks/content           — Generate content using framework principles
 *   POST /v1/frameworks/sales-playbook    — Generate sales playbook from framework rules
 *   POST /v1/frameworks/productivity-plan — Generate agent/team productivity plan
 *   POST /v1/frameworks/vpas/evaluate    — Evaluate task/project against V+P+A=S equation
 *   POST /v1/frameworks/vpas/audit       — Audit division/fleet V+P+A=S compliance
 *   GET  /v1/financial/models            — Revenue models, expense categories, benchmarks
 *   POST /v1/financial/management-fee    — Calculate management fee
 *   POST /v1/financial/rent-estimate     — Estimate optimal rent for property
 *   POST /v1/financial/roi              — Analyze property ROI (cap rate, cash-on-cash, IRR)
 *   POST /v1/financial/forecast         — Generate 12-month financial forecast
 *   POST /v1/financial/pricing-strategy — Dynamic pricing strategy for zone
 *   POST /v1/financial/budget           — Generate annual property budget
 *   POST /v1/analysis/agent             — Analyze agent performance
 *   POST /v1/analysis/fleet             — Generate fleet analytics
 *   POST /v1/analysis/market-trends     — Analyze market trends by zone
 *   POST /v1/analysis/competitive-intel — Generate competitive intelligence
 *   POST /v1/analysis/lead-pipeline     — Analyze lead pipeline health
 *   POST /v1/analysis/operational-report — Generate division operational report
 *   GET  /v1/analysis/templates         — List analysis report templates
 *   POST /v1/analysis/property-health   — Score property health
 *   POST /v1/analysis/churn-prediction  — Predict tenant churn
 *   GET  /v1/deals/stages               — Deal pipeline stages & scoring weights
 *   POST /v1/deals/score                — Score a potential deal
 *   POST /v1/deals/strategy             — Generate deal strategy
 *   POST /v1/deals/comparables          — Analyze comparable properties
 *   POST /v1/deals/closing-costs        — Calculate FL closing costs
 *   POST /v1/deals/investor-package     — Generate investor package
 *   POST /v1/deals/portfolio            — Evaluate property portfolio
 *   GET  /v1/hierarchy/command-chain     — Full org command chain & escalation matrix
 *   GET  /v1/hierarchy/fleet-status      — 382-agent fleet status summary
 *   GET  /v1/hierarchy/chain/:agentId    — Chain of command for specific agent
 *   GET  /v1/hierarchy/reports/:agentId  — Direct reports for specific agent
 *   GET  /v1/hierarchy/division/:code    — Division hierarchy tree
 *   GET  /v1/trader/dashboard            — AI Trader market overview + signals + capital calls
 *   GET  /v1/trader/agent                — AI Trader Agent details
 *   GET  /v1/trader/watchlist            — All watchlist categories and symbols
 *   POST /v1/trader/quote                — Get live quote(s) for symbol(s)
 *   POST /v1/trader/signal               — Generate trading signal for symbol
 *   POST /v1/trader/capital-call         — Generate capital call prompt
 *   POST /v1/trader/portfolio            — Calculate portfolio metrics
 *   GET  /v1/trader/news                 — Market news with sentiment
 *   POST /v1/trader/trade                — Log a trade execution
 *   GET  /v1/trader/history              — Trade execution history
 *   GET  /v1/trader/capital-tiers        — Capital investment tier definitions
 *   POST /v1/slack/commands    — Slack slash command dispatcher (10 commands)
 *   POST /v1/slack/interactions — Slack interactive component callbacks
 *   POST /v1/slack/events      — Slack event subscription handler
 *   GET  /v1/slack/channels    — Slack channel architecture
 *   GET  /v1/slack/apps        — Slack app registry
 *   GET  /v1/slack/audit       — Slack platform audit record
 *   POST /v1/email/send              — Send email via Gmail API (OAuth 2.0)
 *   POST /v1/email/draft             — Create email draft via Gmail API
 *   GET  /v1/email/oauth/health      — Gmail OAuth connectivity check
 *   POST /v1/compliance/dnc/add        — Add phone to DNC registry
 *   POST /v1/compliance/dnc/check      — Check phone against DNC list
 *   POST /v1/compliance/dnc/bulk-check — Bulk scrub phone list against DNC
 *   POST /v1/compliance/dnc/remove     — Remove phone from DNC
 *   POST /v1/compliance/consent/record — Record PEWC for contact
 *   POST /v1/compliance/consent/check  — Check consent status
 *   GET  /v1/compliance/calling-window — Check calling window status
 *   POST /v1/compliance/pre-call-check — Full pre-call compliance gate
 *   GET  /v1/compliance/audit          — Generate TCPA/DNC audit report
 *   GET  /v1/campaign/peak-time/dashboard      — Peak-Time Intelligence Engine dashboard
 *   GET  /v1/campaign/peak-time/schedule        — Generate posting schedule (DST-aware)
 *   GET  /v1/campaign/peak-time/next-slots      — Next posting slots per platform
 *   GET  /v1/campaign/peak-time/matrix          — Platform scheduling matrix
 *   GET  /v1/campaign/peak-time/dst             — DST status and transitions
 *   GET  /v1/campaign/peak-time/bulletin        — All Points Bulletin
 *   GET  /v1/campaign/peak-time/publish-status   — Claude AI publishing status
 *   POST /v1/campaign/peak-time/schedule-post   — Schedule single post via Claude AI
 *   POST /v1/campaign/peak-time/schedule-batch  — Schedule batch of posts
 *   GET  /v1/campaign/peak-time/smo             — Sovereign Marketing Officer status
 *   POST /v1/campaign/peak-time/smo/analyze     — AI market analysis via Claude
 *   GET  /v1/campaign/peak-time/market-analysis — Full market analysis
 *   GET  /v1/campaign/peak-time/problems        — Top 10 problems table
 *   GET  /v1/campaign/peak-time/offers          — Landing page offers
 *   GET  /v1/campaign/peak-time/distribution    — 30-day distribution plan
 *   GET  /v1/campaign/peak-time/division/:code  — Division-specific schedule
 *   POST /v1/campaign/peak-time/validate-slot   — Validate a posting slot
 *   GET  /v1/campaign/peak-time/weekly-counts   — Weekly post counts per platform
 *   GET  /v1/rnd/campaign              — Full 7-day R&D campaign plan
 *   GET  /v1/rnd/campaign/status       — Live campaign status
 *   GET  /v1/rnd/campaign/day/:day     — Single day's plan (1-7)
 *   GET  /v1/rnd/campaign/competitors  — Verified competitor analysis matrix
 *   GET  /v1/rnd/campaign/systems      — Unincorporated systems to adopt
 *   GET  /v1/capital/engine            — Full Capital Engine overview
 *   GET  /v1/capital/pillars/:id       — Single revenue pillar (CE-P1, CE-P2, CE-P3)
 *   GET  /v1/capital/drip-matrix       — DRIP Matrix delegation framework
 *   GET  /v1/capital/business-model    — Integrated business model
 *   GET  /v1/capital/metrics           — Revenue projections and KPIs
 *   GET  /v1/metrics/dashboard         — Profit dashboard (7 core + 4 supporting metrics)
 *   GET  /v1/metrics/targets           — Governance targets and thresholds
 *   POST /v1/metrics/calculate         — Calculate all metrics from supplied data
 *   GET  /v1/metrics/revenue-lines     — Revenue line item definitions
 *   GET  /v1/metrics/expenses          — Operating expense categories
 *   POST /v1/metrics/noi              — Calculate Net Operating Income
 *   POST /v1/metrics/gross-margin     — Calculate Gross Margin
 *   POST /v1/metrics/cac-ltv          — Calculate CAC vs LTV ratio
 *   GET  /v1/thinking/frameworks       — List all 7 expert thinking frameworks
 *   GET  /v1/thinking/frameworks/:id   — Get single thinking framework
 *   POST /v1/thinking/session          — Run thinking session (single framework)
 *   POST /v1/thinking/multi            — Multi-framework analysis with synthesis
 *   POST /v1/thinking/learning-blueprint — 90-day neuro-optimized learning blueprint
 *   POST /v1/thinking/daily-models     — CEO daily mental models briefing
 *   POST /v1/thinking/pm-mastery       — Property management mastery training
 *   POST /v1/thinking/cognitive-os     — Cognitive OS audit & rewrite
 *   POST /v1/thinking/life-architecture — High-performance life architecture
 *   POST /v1/thinking/time-leverage    — Time leverage strategy (1yr = 10yr)
 *   POST /v1/thinking/reprogram        — Psychological identity reprogrammer
 *   GET  /v1/thinking/dashboard        — Thinking Coach operational dashboard
 *   POST /v1/ceo/directive             — Issue CEO directive (optimize/architect/execute/diagnose/integrate)
 *   POST /v1/ceo/operations-review     — Full operations review (5 directives + synthesis)
 *   GET  /v1/ceo/operating-state       — Enterprise operating state
 *   GET  /v1/ceo/dashboard             — CEO sovereign command dashboard
 *   GET  /v1/forecast/agents      — List all 20 Business Forecast agents
 *   GET  /v1/forecast/agents/:id  — Get single BFR agent
 *   GET  /v1/forecast/dashboard   — BFR division dashboard
 *   GET  /v1/forecast/market-pulse — Current market conditions snapshot
 *   POST /v1/forecast/generate    — Generate 18-month forecast via Claude
 *   POST /v1/forecast/scenario    — Run stress-test scenario simulation
 *   GET  /v1/social/agents        — List all 20 Social Campaign Marketing agents
 *   GET  /v1/social/agents/:id    — Get single SCM agent
 *   GET  /v1/social/dashboard     — SCM division dashboard
 *   GET  /v1/social/calendar      — Content calendar with posting schedule
 *   POST /v1/social/generate      — Generate social content via Claude
 *   POST /v1/social/campaign      — Generate full campaign brief via Claude
 *   GET  /v1/ai-agency/dashboard       — AI Automation Agency overview with economics
 *   GET  /v1/ai-agency/units           — All AI workforce units with detail
 *   GET  /v1/ai-agency/units/:id       — Single AI workforce unit
 *   POST /v1/ai-agency/units/:id/review — Log weekly review for AI workforce unit
 *   GET  /v1/ai-agency/board-memo      — Quarterly AI EBITDA board memo
 *   GET  /v1/ai-agency/sop/:id         — Manual fallback SOP for AI workforce unit
 *   POST /v1/ai-agency/onboard         — Register new AI workforce unit
 *
 * Auth: Bearer token via WORKER_AUTH_TOKEN secret (Slack routes use signature verification)
 * Total: 137 route handlers | 422 agents | 12 divisions | 7 thinking frameworks | 5 CEO directive types
 */

import { authenticate } from './middleware/auth.js';
import { rateLimit } from './middleware/rate-limit.js';
import { handleInference } from './routes/inference.js';
import { handleCreateLead, handleGetLead, handleEnrichLead, handlePublicLead } from './routes/leads.js';
import { handleRetellWebhook } from './routes/retell.js';
import { handleContentGenerate } from './routes/content.js';
import { handleContentPublish } from './routes/content-publish.js';
import { handleAuditLog } from './routes/audit.js';
import { handleListAgents, handleGetAgent, handleAgentAction, handleAgentMetrics, handleDashboard } from './routes/agents.js';
import { handleScaa1BattlePlan, handleWf3InvestorEscalation, handleWf4LongTailNurture } from './routes/workflows.js';
import { handlePropertySearch, handlePropertyImport, handlePropertyStats } from './routes/property-intel.js';
import { handleCampaignCallLog, handleCampaignAgentPerformance, handleCampaignAnalytics, handleCampaignLeadContacts, handleCampaignDashboard } from './routes/sentinel-campaign.js';
import { handlePricingRecommend, handlePricingZones } from './routes/pricing.js';
import { handleListOfficers, handleGetOfficer, handleOfficerScan, handleOfficerDashboard, handleFleetScan } from './routes/intelligence-officers.js';
import { handleListEmailAgents, handleGetEmailAgent, handleEmailCompose, handleEmailClassify, handleEmailDashboard } from './routes/email-agents.js';
import { handleListMCCOAgents, handleGetMCCOAgent, handleMCCOCommand, handleMCCOFleetStatus, handleMCCODirective, handleMCCOContentCalendar, handleMCCOAudienceProfile, handleMCCOPositioning, handleMCCOMonetization, handleMCCOPost, handleMasterPlan, handleMasterPlanPhase, handleDivisionPlan, handleSovereignDirectiveIssue, handleActivationStatus } from './routes/mcco.js';
import { handleListFrameworks, handleGetFramework, handleGetFrameworksByCategory, handleFrameworkApply, handleFrameworkContent, handleFrameworkSalesPlaybook, handleFrameworkProductivityPlan, handleVPASEvaluate, handleVPASAudit } from './routes/frameworks.js';
import {
  handleTraderDashboard, handleTraderAgent, handleTraderFleet, handleGetTraderById,
  handleWatchlist, handleQuote, handleSignal,
  handleCapitalCall, handlePortfolio as handleTraderPortfolio, handleTraderNews,
  handleLogTrade, handleTradeHistory, handleCapitalTiers,
} from './routes/trader.js';
import {
  handleFinancialModels, handleManagementFee, handleRentEstimate, handlePropertyROI,
  handleFinancialForecast, handleDynamicPricing, handleBudget,
  handleAgentAnalysis, handleFleetAnalytics, handleMarketTrends, handleCompetitiveIntel,
  handleLeadPipeline, handleOperationalReport, handleAnalysisTemplates, handlePropertyHealth, handleChurnPrediction,
  handleDealStages, handleScoreDeal, handleDealStrategy, handleComparables, handleClosingCosts, handleInvestorPackage, handlePortfolioEvaluation,
  handleCommandChain, handleFleetStatusEndpoint, handleChainOfCommand, handleDirectReports, handleDivisionHierarchyEndpoint,
} from './routes/engines.js';
import { handleSlackCommand, handleSlackInteraction, handleSlackEvent, handleSlackChannels, handleSlackApps, handleSlackAudit, handleSlackCreateChannel } from './routes/slack.js';
import { handleMetaAdsStatus, handleMetaAdsBoost, handleMetaAdsCampaigns } from './routes/meta-ads.js';
import { handleListThinkingFrameworks, handleGetThinkingFramework, handleThinkingSession, handleMultiFramework, handleLearningBlueprint, handleDailyModels, handlePMMastery, handleCognitiveOS, handleLifeArchitecture, handleTimeLeverage, handleReprogram, handleThinkingDashboard } from './routes/thinking-coach.js';
import { handleCeoDirective, handleOperationsReview, handleOperatingState, handleCeoDashboard } from './routes/ceo-directives.js';
import { handleCampaignMatrix, handleCampaignSchedule, handleNextSlot, handleBufferTimestamp, handleBatchSchedule, handleCampaignEngineHealth } from './routes/campaign-engine.js';
import { handleEmailSend, handleEmailDraft, handleEmailOAuthHealth } from './routes/email-operations.js';
import { handleDNCAdd, handleDNCCheck, handleDNCBulkCheck, handleDNCRemove, handleConsentRecord, handleConsentCheck, handleCallingWindow, handlePreCallCheck, handleComplianceAudit } from './routes/compliance.js';
import { handleSpearTrigger, handleSpearReply, handleSpearStatus, handleSpearDashboard, handleSpearGenerate } from './routes/spear.js';
import { handleRndCampaignPlan, handleRndCampaignStatus, handleRndCampaignDay, handleRndCompetitors, handleRndSystems } from './routes/rnd-campaign.js';
import { handleCapitalEngine, handleCapitalPillar, handleDRIPMatrix, handleBusinessModel, handleCapitalMetrics } from './routes/capital-engine.js';
import { handleMetricsDashboard, handleMetricsTargets, handleMetricsCalculate, handleRevenueLines, handleExpenseCategories, handleCalculateNOI, handleCalculateGrossMargin, handleCalculateCACLTV } from './routes/profit-metrics.js';
import { handleCoopCommittee, handleListCoopAgents, handleGetCoopAgent, handleCoopBrief, handleCoopOutreach, handleCoopNetworkMap, handleCoopTargets, handleCoopSchedule } from './routes/cooperations.js';
import {
  handleCFODashboard, handleCFOChannels, handleCFOProducts, handleCFOBrand,
  handleCFOAcquisition, handleCFOContentPlan, handleCFOLeadMagnets,
  handleCFOInvestor, handleCFOProjection, handleCFOValuation, handleCFOChecklist,
} from './routes/cfo-revenue.js';
import { handleInspectionDashboard, handleInspectionTypes, handleCreateInspection, handleCompleteInspection, handleListInspectors } from './routes/field-inspection.js';
import { handleElizaDashboard, handleElizaVoiceConfig, handleElizaAvatarConfig, handleElizaRetellConfig, handleElizaCampaigns, handleElizaVideoBrief } from './routes/eliza-ai.js';
import { getGoogleAdsDashboard } from './engines/google-ads-campaign.js';
import { handleTokenDashboard, handleTokenScan, handleTokenRegistry } from './routes/token-maintenance.js';
import { handleSalesDashboard, handleScoreLead, handleSalesPipeline, handleSalesChannels, handleSalesPlaybooks } from './routes/sales-acquisition.js';
import { handleStrategyDashboard, handleStrategyGenerate, handleStrategyFramework } from './routes/market-strategy.js';
import { handleOrchestratorDashboard, handleOrchestratorAssets, handleOrchestratorAvatars, handleOrchestratorGaps, handleOrchestratorNOIModel, handleOrchestratorNOICalculate, handleOrchestratorFleet, handleOrchestratorTriggers, handleOrchestratorDispatch, handleOrchestratorHITL, handleOrchestratorPublicStatus } from './routes/master-prompt.js';
import { handleCollectionsConfig, handleCollectionsGuardrails, handleCollectionsStatus, handleCollectionsEligibility, handleCollectionsSession } from './routes/collections.js';
import { handleWorkgenCycle, handleWorkgenBuild, handleWorkgenDiagnose, handleWorkgenDashboard, handleWorkgenGoals, handleWorkgenFleet } from './routes/work-generator.js';
import { handleCKSODashboard, handleAppTemplates, handleGenerateApp, handleDataTables, handleGenerateSchema, handleWorkflowTriggers, handleWorkflowActions, handleGenerateWorkflow, handleAnalyticsMetrics, handleGenerateReport, handleAICommand, handleGovernanceStatus, handleGovernanceRoles } from './routes/ckso.js';
import { handleDeliveryDashboard, handleDeliveryExecute, handleDeliveryTemplate, handleDeliveryGovernance } from './routes/delivery-protocol.js';
import { handlePaymentDashboard, handlePublicPricing, handleCreatePaymentLink } from './routes/payments.js';
import { handleAvatarDashboard, handleAvatarGenerate, handleAvatarStatus } from './routes/banana-avatar.js';
import { handleITAMDashboard, handleITAMKpis, handleITAMCategory, handleITAMScore, handleITAMTco, handleITAMHealth, handleITAMStrategic } from './routes/itam-kpi.js';
import { getFullManifest, getManifestSummary } from './agents/agent-manifest.js';
import {
  handleCampaignPeakTimeDashboard, handleCampaignSchedule, handleCampaignNextSlots,
  handleCampaignMatrix, handleCampaignDST, handleCampaignBulletin, handleCampaignPublishStatus,
  handleCampaignSchedulePost, handleCampaignScheduleBatch,
  handleCampaignSMO, handleCampaignSMOAnalyze,
  handleCampaignMarketAnalysis, handleCampaignProblems, handleCampaignOffers,
  handleCampaignDistribution, handleCampaignDivisionSchedule, handleCampaignValidateSlot,
  handleCampaignWeeklyCounts,
} from './routes/campaign.js';
import { handleBananaGenerate, handleBananaScoreLead, handleBananaPropertyDesc, handleBananaForecast, handleBananaBatch, handleBananaHealth } from './routes/banana-pro.js';
import { handleBufferProfiles, handleBufferSchedule, handleBufferCrossPost, handleBufferQueue, handleBufferSent, handleBufferSync, handleBufferHealth } from './routes/buffer.js';
import { handleWf2ContentPipeline, handleWf4AlignableBranch } from './routes/wf2-content-pipeline.js';
import { handleMarketQuote, handleMarketScan, handleMarketReport, handleMarketPortfolio, handleMarketIndicators, handleMarketWatchlist } from './routes/market-intel.js';
import { handleDiagnosticsScan, handleDataHealth, handleSystemActivation, handleSystemUpgrade, handleSOPRegistry, handleSOPDetail, handleFleetMandate } from './routes/diagnostics.js';
import { handleListForecastAgents, handleGetForecastAgent, handleForecastDashboard, handleForecastGenerate, handleForecastScenario, handleMarketPulse } from './routes/business-forecast.js';
import { handlePeakTimeDashboard, handlePeakTimeOptimal, handlePeakTimeWindows, handlePeakTimeBlackouts } from './routes/peak-time.js';
import { handleGrowthDashboard, handleGrowthCertifications, handleGrowthRecruitment, handleGrowthReferrals } from './routes/growth-platform.js';
import { handleListSocialAgents, handleGetSocialAgent, handleSocialDashboard, handleSocialGenerate, handleSocialCampaign, handleSocialCalendar } from './routes/social-campaign.js';
import { handleGenerateReport, handleGenerateSummary, handleSentinelWorkforceStatus } from './routes/sentinel-report.js';
import { handleAgencyDashboard, handleListUnits, handleGetUnit, handleUnitReview, handleBoardMemo, handleUnitSOP, handleOnboardUnit } from './routes/ai-workforce.js';
import { handleProductCatalog, handlePaidProducts, handleLeadMagnets, handleProductDetail, handleProductCheckout, handlePurchaseLookup } from './routes/digital-products.js';
import { handleStripeWebhook } from './routes/stripe-webhook.js';
import { jsonResponse, errorResponse, corsHeaders } from './utils/response.js';

export default {
  async fetch(request, env, ctx) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // ── Health (no auth) ──
    if (path === '/v1/health' && method === 'GET') {
      const deep = url.searchParams.get('deep') === 'true';

      if (!deep) {
        return jsonResponse({
          status: 'operational',
          service: 'ck-api-gateway',
          version: '2.0.0',
          agents: 422,
          divisions: 12,
          timestamp: new Date().toISOString(),
        });
      }

      // Deep health check — verify external dependencies
      const checks = {};

      // Airtable connectivity
      try {
        const atRes = await fetch(
          `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/tblpNasm0AxreRqLW?maxRecords=1&fields%5B%5D=Lead%20Name`,
          { headers: { Authorization: `Bearer ${env.AIRTABLE_API_KEY}` } },
        );
        checks.airtable = { status: atRes.ok ? 'ok' : 'error', code: atRes.status };
      } catch (err) {
        checks.airtable = { status: 'error', message: err.message };
      }

      // Anthropic connectivity
      try {
        const anRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 5,
            messages: [{ role: 'user', content: 'ping' }],
          }),
        });
        checks.anthropic = { status: anRes.ok ? 'ok' : 'error', code: anRes.status };
      } catch (err) {
        checks.anthropic = { status: 'error', message: err.message };
      }

      // Meta Ads
      if (env.META_PAGE_ACCESS_TOKEN && env.META_AD_ACCOUNT_ID) {
        checks.metaAds = { status: 'configured', adAccount: env.META_AD_ACCOUNT_ID };
      } else {
        const metaMissing = [];
        if (!env.META_PAGE_ACCESS_TOKEN) metaMissing.push('META_PAGE_ACCESS_TOKEN');
        if (!env.META_AD_ACCOUNT_ID) metaMissing.push('META_AD_ACCOUNT_ID');
        if (!env.META_PAGE_ID) metaMissing.push('META_PAGE_ID');
        checks.metaAds = { status: 'not_configured', missing: metaMissing };
      }

      // KV stores
      checks.kv = {
        cache: env.CACHE ? 'available' : 'missing',
        sessions: env.SESSIONS ? 'available' : 'missing',
        rateLimits: env.RATE_LIMITS ? 'available' : 'missing',
        auditLog: env.AUDIT_LOG ? 'available' : 'missing',
      };

      const allOk = checks.airtable?.status === 'ok' &&
                     checks.anthropic?.status === 'ok' &&
                     checks.kv.cache === 'available';

      return jsonResponse({
        status: allOk ? 'operational' : 'degraded',
        service: 'ck-api-gateway',
        version: '2.0.0',
        agents: 422,
        divisions: 12,
        checks,
        timestamp: new Date().toISOString(),
      });
    }

    // ── Public routes (no auth) ──
    if (path === '/v1/orchestrator/public-status' && method === 'GET') {
      return handleOrchestratorPublicStatus();
    }
    if (path === '/v1/leads/public' && method === 'POST') {
      return await handlePublicLead(request, env, ctx);
    }
    if (path === '/v1/payments/pricing' && method === 'GET') {
      return handlePublicPricing();
    }
    if (path === '/v1/payments/webhook' && method === 'POST') {
      return await handleStripeWebhook(request, env, ctx);
    }

    // ── Slack routes (use signature verification, not Bearer token) ──
    if (path === '/v1/slack/commands' && method === 'POST') {
      return await handleSlackCommand(request, env, ctx);
    }
    if (path === '/v1/slack/interactions' && method === 'POST') {
      return await handleSlackInteraction(request, env, ctx);
    }
    if (path === '/v1/slack/events' && method === 'POST') {
      return await handleSlackEvent(request, env, ctx);
    }

    // ── Auth gate ──
    const authError = authenticate(request, env);
    if (authError) return authError;

    // ── Rate limit ──
    const rateLimitError = await rateLimit(request, env);
    if (rateLimitError) return rateLimitError;

    try {
      // ── Route dispatch ──
      if (path === '/v1/inference' && method === 'POST') {
        return await handleInference(request, env, ctx);
      }

      if (path === '/v1/leads' && method === 'POST') {
        return await handleCreateLead(request, env, ctx);
      }

      if (path === '/v1/leads/enrich' && method === 'POST') {
        return await handleEnrichLead(request, env, ctx);
      }

      if (path.startsWith('/v1/leads/') && method === 'GET') {
        const recordId = path.split('/v1/leads/')[1];
        return await handleGetLead(recordId, env);
      }

      if (path === '/v1/webhook/retell' && method === 'POST') {
        return await handleRetellWebhook(request, env, ctx);
      }

      if (path === '/v1/content/generate' && method === 'POST') {
        return await handleContentGenerate(request, env, ctx);
      }

      if (path === '/v1/content/publish' && method === 'POST') {
        return await handleContentPublish(request, env, ctx);
      }

      if (path === '/v1/agents' && method === 'GET') {
        return handleListAgents(url, env);
      }

      if (path === '/v1/agents/metrics' && method === 'GET') {
        return handleAgentMetrics(url, env);
      }

      if (path === '/v1/dashboard' && method === 'GET') {
        return await handleDashboard(env);
      }

      if (path.match(/^\/v1\/agents\/[^/]+\/action$/) && method === 'POST') {
        return await handleAgentAction(request, env, ctx);
      }

      if (path.match(/^\/v1\/agents\/[^/]+$/) && method === 'GET') {
        const agentId = path.split('/v1/agents/')[1];
        return handleGetAgent(agentId, env);
      }

      // ── Workflow Pipelines ──
      if (path === '/v1/workflows/scaa1' && method === 'POST') {
        return await handleScaa1BattlePlan(request, env, ctx);
      }

      if (path === '/v1/workflows/wf3' && method === 'POST') {
        return await handleWf3InvestorEscalation(request, env, ctx);
      }

      if (path === '/v1/workflows/wf4' && method === 'POST') {
        return await handleWf4LongTailNurture(request, env, ctx);
      }

      // ── Property Intelligence ──
      if (path === '/v1/property-intel/search' && method === 'GET') {
        return await handlePropertySearch(url, env);
      }

      if (path === '/v1/property-intel/import' && method === 'POST') {
        return await handlePropertyImport(request, env, ctx);
      }

      if (path === '/v1/property-intel/stats' && method === 'GET') {
        return await handlePropertyStats(env);
      }

      // ── TH Sentinel Campaign ──
      if (path === '/v1/campaign/calls' && method === 'GET') {
        return await handleCampaignCallLog(url, env);
      }

      if (path === '/v1/campaign/agents' && method === 'GET') {
        return await handleCampaignAgentPerformance(url, env);
      }

      if (path === '/v1/campaign/analytics' && method === 'GET') {
        return await handleCampaignAnalytics(url, env);
      }

      if (path === '/v1/campaign/contacts' && method === 'GET') {
        return await handleCampaignLeadContacts(url, env);
      }

      if (path === '/v1/campaign/dashboard' && method === 'GET') {
        return await handleCampaignDashboard(env);
      }

      // ── Pricing Engine ──
      if (path === '/v1/pricing/recommend' && method === 'POST') {
        return await handlePricingRecommend(request, env, ctx);
      }

      if (path === '/v1/pricing/zones' && method === 'GET') {
        return handlePricingZones();
      }

      // ── Intelligence Officers ──
      if (path === '/v1/intel/officers' && method === 'GET') {
        return handleListOfficers(url);
      }

      if (path === '/v1/intel/dashboard' && method === 'GET') {
        return await handleOfficerDashboard(env);
      }

      if (path === '/v1/intel/fleet-scan' && method === 'POST') {
        return await handleFleetScan(env, ctx);
      }

      if (path.match(/^\/v1\/intel\/officers\/[^/]+\/scan$/) && method === 'POST') {
        return await handleOfficerScan(request, env, ctx);
      }

      if (path.match(/^\/v1\/intel\/officers\/[^/]+$/) && method === 'GET') {
        const officerId = path.split('/v1/intel/officers/')[1];
        return handleGetOfficer(officerId);
      }

      // ── Email Agents ──
      if (path === '/v1/email/agents' && method === 'GET') {
        return handleListEmailAgents(url);
      }

      if (path === '/v1/email/dashboard' && method === 'GET') {
        return handleEmailDashboard();
      }

      if (path === '/v1/email/compose' && method === 'POST') {
        return await handleEmailCompose(request, env, ctx);
      }

      if (path === '/v1/email/classify' && method === 'POST') {
        return await handleEmailClassify(request, env, ctx);
      }

      if (path.match(/^\/v1\/email\/agents\/[^/]+$/) && method === 'GET') {
        const agentId = path.split('/v1/email/agents/')[1];
        return handleGetEmailAgent(agentId);
      }

      if (path === '/v1/audit' && method === 'GET') {
        return await handleAuditLog(url, env);
      }

      // ── MCCO — Master Chief Commanding Officer (Sovereign Governance) ──
      if (path === '/v1/mcco/command' && method === 'GET') {
        return handleMCCOCommand();
      }

      if (path === '/v1/mcco/agents' && method === 'GET') {
        return handleListMCCOAgents(url);
      }

      if (path === '/v1/mcco/fleet-status' && method === 'GET') {
        return handleMCCOFleetStatus();
      }

      if (path === '/v1/mcco/directive' && method === 'POST') {
        return await handleMCCODirective(request, env, ctx);
      }

      if (path === '/v1/mcco/content-calendar' && method === 'POST') {
        return await handleMCCOContentCalendar(request, env, ctx);
      }

      if (path === '/v1/mcco/audience-profile' && method === 'POST') {
        return await handleMCCOAudienceProfile(request, env, ctx);
      }

      if (path === '/v1/mcco/positioning' && method === 'POST') {
        return await handleMCCOPositioning(request, env, ctx);
      }

      if (path === '/v1/mcco/monetization' && method === 'POST') {
        return await handleMCCOMonetization(request, env, ctx);
      }

      if (path === '/v1/mcco/post' && method === 'POST') {
        return await handleMCCOPost(request, env, ctx);
      }

      if (path.match(/^\/v1\/mcco\/agents\/[^/]+$/) && method === 'GET') {
        const agentId = path.split('/v1/mcco/agents/')[1];
        return handleGetMCCOAgent(agentId);
      }

      if (path === '/v1/mcco/master-plan' && method === 'GET') {
        return handleMasterPlan();
      }

      if (path.match(/^\/v1\/mcco\/master-plan\/phase\/[^/]+$/) && method === 'GET') {
        const phaseId = path.split('/v1/mcco/master-plan/phase/')[1];
        return handleMasterPlanPhase(phaseId);
      }

      if (path.match(/^\/v1\/mcco\/master-plan\/division\/[^/]+$/) && method === 'GET') {
        const divisionId = path.split('/v1/mcco/master-plan/division/')[1];
        return handleDivisionPlan(divisionId);
      }

      if (path === '/v1/mcco/sovereign-directive' && method === 'POST') {
        return await handleSovereignDirectiveIssue(request, env, ctx);
      }

      if (path === '/v1/mcco/activation-status' && method === 'GET') {
        return handleActivationStatus();
      }

      // ── Peak Performance Frameworks ──
      if (path === '/v1/frameworks' && method === 'GET') {
        return handleListFrameworks(url);
      }

      if (path === '/v1/frameworks/apply' && method === 'POST') {
        return await handleFrameworkApply(request, env, ctx);
      }

      if (path === '/v1/frameworks/content' && method === 'POST') {
        return await handleFrameworkContent(request, env, ctx);
      }

      if (path === '/v1/frameworks/sales-playbook' && method === 'POST') {
        return await handleFrameworkSalesPlaybook(request, env, ctx);
      }

      if (path === '/v1/frameworks/productivity-plan' && method === 'POST') {
        return await handleFrameworkProductivityPlan(request, env, ctx);
      }

      if (path === '/v1/frameworks/vpas/evaluate' && method === 'POST') {
        return await handleVPASEvaluate(request, env, ctx);
      }

      if (path === '/v1/frameworks/vpas/audit' && method === 'POST') {
        return await handleVPASAudit(request, env, ctx);
      }

      if (path.match(/^\/v1\/frameworks\/category\/[^/]+$/) && method === 'GET') {
        const category = path.split('/v1/frameworks/category/')[1];
        return handleGetFrameworksByCategory(category);
      }

      if (path.match(/^\/v1\/frameworks\/[^/]+$/) && method === 'GET') {
        const frameworkId = path.split('/v1/frameworks/')[1];
        return handleGetFramework(frameworkId);
      }

      // ── Financial Engine ──
      if (path === '/v1/financial/models' && method === 'GET') {
        return handleFinancialModels();
      }
      if (path === '/v1/financial/management-fee' && method === 'POST') {
        return await handleManagementFee(request);
      }
      if (path === '/v1/financial/rent-estimate' && method === 'POST') {
        return await handleRentEstimate(request);
      }
      if (path === '/v1/financial/roi' && method === 'POST') {
        return await handlePropertyROI(request);
      }
      if (path === '/v1/financial/forecast' && method === 'POST') {
        return await handleFinancialForecast(request);
      }
      if (path === '/v1/financial/pricing-strategy' && method === 'POST') {
        return await handleDynamicPricing(request);
      }
      if (path === '/v1/financial/budget' && method === 'POST') {
        return await handleBudget(request);
      }

      // ── Analysis Suite ──
      if (path === '/v1/analysis/agent' && method === 'POST') {
        return await handleAgentAnalysis(request);
      }
      if (path === '/v1/analysis/fleet' && method === 'POST') {
        return await handleFleetAnalytics(request);
      }
      if (path === '/v1/analysis/market-trends' && method === 'POST') {
        return await handleMarketTrends(request);
      }
      if (path === '/v1/analysis/competitive-intel' && method === 'POST') {
        return await handleCompetitiveIntel(request);
      }
      if (path === '/v1/analysis/lead-pipeline' && method === 'POST') {
        return await handleLeadPipeline(request);
      }
      if (path === '/v1/analysis/operational-report' && method === 'POST') {
        return await handleOperationalReport(request);
      }
      if (path === '/v1/analysis/templates' && method === 'GET') {
        return handleAnalysisTemplates();
      }
      if (path === '/v1/analysis/property-health' && method === 'POST') {
        return await handlePropertyHealth(request);
      }
      if (path === '/v1/analysis/churn-prediction' && method === 'POST') {
        return await handleChurnPrediction(request);
      }

      // ── Trading / Deal Engine ──
      if (path === '/v1/deals/stages' && method === 'GET') {
        return handleDealStages();
      }
      if (path === '/v1/deals/score' && method === 'POST') {
        return await handleScoreDeal(request);
      }
      if (path === '/v1/deals/strategy' && method === 'POST') {
        return await handleDealStrategy(request);
      }
      if (path === '/v1/deals/comparables' && method === 'POST') {
        return await handleComparables(request);
      }
      if (path === '/v1/deals/closing-costs' && method === 'POST') {
        return await handleClosingCosts(request);
      }
      if (path === '/v1/deals/investor-package' && method === 'POST') {
        return await handleInvestorPackage(request);
      }
      if (path === '/v1/deals/portfolio' && method === 'POST') {
        return await handlePortfolioEvaluation(request);
      }

      // ── AI Trader Agent ──
      if (path === '/v1/trader/dashboard' && method === 'GET') {
        return await handleTraderDashboard(env);
      }
      if (path === '/v1/trader/agent' && method === 'GET') {
        return handleTraderAgent();
      }
      if (path === '/v1/trader/fleet' && method === 'GET') {
        return handleTraderFleet(url);
      }
      if (path.match(/^\/v1\/trader\/fleet\/[^/]+$/) && method === 'GET') {
        const traderId = path.split('/v1/trader/fleet/')[1];
        return handleGetTraderById(traderId);
      }
      if (path === '/v1/trader/watchlist' && method === 'GET') {
        return handleWatchlist();
      }
      if (path === '/v1/trader/quote' && method === 'POST') {
        return await handleQuote(request, env);
      }
      if (path === '/v1/trader/signal' && method === 'POST') {
        return await handleSignal(request, env);
      }
      if (path === '/v1/trader/capital-call' && method === 'POST') {
        return await handleCapitalCall(request, env);
      }
      if (path === '/v1/trader/portfolio' && method === 'POST') {
        return await handleTraderPortfolio(request, env);
      }
      if (path === '/v1/trader/news' && method === 'GET') {
        return await handleTraderNews(env);
      }
      if (path === '/v1/trader/trade' && method === 'POST') {
        return await handleLogTrade(request, env);
      }
      if (path === '/v1/trader/history' && method === 'GET') {
        return await handleTradeHistory(url, env);
      }
      if (path === '/v1/trader/capital-tiers' && method === 'GET') {
        return handleCapitalTiers();
      }

      // ── Agent Hierarchy & Command Structure ──
      if (path === '/v1/hierarchy/command-chain' && method === 'GET') {
        return handleCommandChain();
      }
      if (path === '/v1/hierarchy/fleet-status' && method === 'GET') {
        return handleFleetStatusEndpoint();
      }
      if (path.match(/^\/v1\/hierarchy\/chain\/[^/]+$/) && method === 'GET') {
        const agentId = path.split('/v1/hierarchy/chain/')[1];
        return handleChainOfCommand(agentId);
      }
      if (path.match(/^\/v1\/hierarchy\/reports\/[^/]+$/) && method === 'GET') {
        const agentId = path.split('/v1/hierarchy/reports/')[1];
        return handleDirectReports(agentId);
      }
      if (path.match(/^\/v1\/hierarchy\/division\/[^/]+$/) && method === 'GET') {
        const divisionCode = path.split('/v1/hierarchy/division/')[1];
        return handleDivisionHierarchyEndpoint(divisionCode);
      }

      // ── Slack (auth-protected read-only) ──
      if (path === '/v1/slack/channels' && method === 'GET') {
        return handleSlackChannels();
      }
      if (path === '/v1/slack/apps' && method === 'GET') {
        return handleSlackApps();
      }
      if (path === '/v1/slack/audit' && method === 'GET') {
        return handleSlackAudit();
      }

      if (path === '/v1/slack/channels/create' && method === 'POST') {
        return await handleSlackCreateChannel(request, env, ctx);
      }

      // ── Gmail OAuth Email Operations ──
      if (path === '/v1/email/send' && method === 'POST') {
        return await handleEmailSend(request, env, ctx);
      }
      if (path === '/v1/email/draft' && method === 'POST') {
        return await handleEmailDraft(request, env, ctx);
      }
      if (path === '/v1/email/oauth/health' && method === 'GET') {
        return await handleEmailOAuthHealth(env);
      }

      // ── TCPA/DNC Compliance ──
      if (path === '/v1/compliance/dnc/add' && method === 'POST') {
        return await handleDNCAdd(request, env, ctx);
      }
      if (path === '/v1/compliance/dnc/check' && method === 'POST') {
        return await handleDNCCheck(request, env, ctx);
      }
      if (path === '/v1/compliance/dnc/bulk-check' && method === 'POST') {
        return await handleDNCBulkCheck(request, env, ctx);
      }
      if (path === '/v1/compliance/dnc/remove' && method === 'POST') {
        return await handleDNCRemove(request, env, ctx);
      }
      if (path === '/v1/compliance/consent/record' && method === 'POST') {
        return await handleConsentRecord(request, env, ctx);
      }
      if (path === '/v1/compliance/consent/check' && method === 'POST') {
        return await handleConsentCheck(request, env, ctx);
      }
      if (path === '/v1/compliance/calling-window' && method === 'GET') {
        return handleCallingWindow();
      }
      if (path === '/v1/compliance/pre-call-check' && method === 'POST') {
        return await handlePreCallCheck(request, env, ctx);
      }
      if (path === '/v1/compliance/audit' && method === 'GET') {
        return await handleComplianceAudit(env, ctx);
      }

      // ── SPEAR Funnel System ──
      if (path === '/v1/spear/trigger' && method === 'POST') {
        return await handleSpearTrigger(request, env, ctx);
      }
      if (path === '/v1/spear/reply' && method === 'POST') {
        return await handleSpearReply(request, env, ctx);
      }
      if (path === '/v1/spear/dashboard' && method === 'GET') {
        return handleSpearDashboard();
      }
      if (path === '/v1/spear/generate' && method === 'POST') {
        return await handleSpearGenerate(request, env, ctx);
      }
      if (path.match(/^\/v1\/spear\/status\/[^/]+$/) && method === 'GET') {
        const leadId = path.split('/v1/spear/status/')[1];
        return await handleSpearStatus(leadId, env);
      }

      // ── Thinking Coach ──
      if (path === '/v1/thinking/frameworks' && method === 'GET') {
        return handleListThinkingFrameworks(url);
      }
      if (path.startsWith('/v1/thinking/frameworks/') && method === 'GET') {
        const frameworkId = path.split('/')[4];
        return handleGetThinkingFramework(frameworkId);
      }
      if (path === '/v1/thinking/session' && method === 'POST') {
        return await handleThinkingSession(request, env, ctx);
      }
      if (path === '/v1/thinking/multi' && method === 'POST') {
        return await handleMultiFramework(request, env, ctx);
      }
      if (path === '/v1/thinking/learning-blueprint' && method === 'POST') {
        return await handleLearningBlueprint(request, env, ctx);
      }
      if (path === '/v1/thinking/daily-models' && method === 'POST') {
        return await handleDailyModels(request, env, ctx);
      }
      if (path === '/v1/thinking/pm-mastery' && method === 'POST') {
        return await handlePMMastery(request, env, ctx);
      }
      if (path === '/v1/thinking/cognitive-os' && method === 'POST') {
        return await handleCognitiveOS(request, env, ctx);
      }
      if (path === '/v1/thinking/life-architecture' && method === 'POST') {
        return await handleLifeArchitecture(request, env, ctx);
      }
      if (path === '/v1/thinking/time-leverage' && method === 'POST') {
        return await handleTimeLeverage(request, env, ctx);
      }
      if (path === '/v1/thinking/reprogram' && method === 'POST') {
        return await handleReprogram(request, env, ctx);
      }
      if (path === '/v1/thinking/dashboard' && method === 'GET') {
        return handleThinkingDashboard();
      }

      // ── CEO Sovereign Directives ──
      if (path === '/v1/ceo/directive' && method === 'POST') {
        return await handleCeoDirective(request, env, ctx);
      }
      if (path === '/v1/ceo/operations-review' && method === 'POST') {
        return await handleOperationsReview(request, env, ctx);
      }
      if (path === '/v1/ceo/operating-state' && method === 'GET') {
        return handleOperatingState();
      }
      if (path === '/v1/ceo/dashboard' && method === 'GET') {
        return handleCeoDashboard();
      }

      // ── Peak-Time Intelligence Engine (Campaign #1) ──
      if (path === '/v1/campaign-engine/matrix' && method === 'GET') {
        return handleCampaignMatrix();
      }
      if (path === '/v1/campaign-engine/schedule' && method === 'GET') {
        return handleCampaignSchedule(request);
      }
      if (path.startsWith('/v1/campaign-engine/next/') && method === 'GET') {
        const platform = path.split('/').pop();
        return handleNextSlot(request, platform);
      }
      if (path === '/v1/campaign-engine/timestamp' && method === 'POST') {
        return await handleBufferTimestamp(request);
      }
      if (path === '/v1/campaign-engine/batch' && method === 'POST') {
        return await handleBatchSchedule(request, env, ctx);
      }
      if (path === '/v1/campaign-engine/health' && method === 'GET') {
        return handleCampaignEngineHealth();
      }

      // ── Sentinel Standard Report Generator (AI Workforce Unit #1) ──
      if (path === '/v1/sentinel/generate-report' && method === 'POST') {
        return await handleGenerateReport(request, env, ctx);
      }
      if (path === '/v1/sentinel/generate-summary' && method === 'POST') {
        return await handleGenerateSummary(request, env, ctx);
      }
      if (path === '/v1/sentinel/workforce-status' && method === 'GET') {
        return handleSentinelWorkforceStatus();
      }

      // ── AI Automation Agency ──
      if (path === '/v1/ai-agency/dashboard' && method === 'GET') {
        return handleAgencyDashboard();
      }
      if (path === '/v1/ai-agency/units' && method === 'GET') {
        return handleListUnits(url);
      }
      if (path === '/v1/ai-agency/board-memo' && method === 'GET') {
        return await handleBoardMemo(request, env, ctx);
      }
      if (path === '/v1/ai-agency/onboard' && method === 'POST') {
        return await handleOnboardUnit(request, env, ctx);
      }
      if (path.match(/^\/v1\/ai-agency\/sop\/[^/]+$/) && method === 'GET') {
        const unitId = path.split('/v1/ai-agency/sop/')[1];
        return handleUnitSOP(unitId);
      }
      if (path.match(/^\/v1\/ai-agency\/units\/[^/]+\/review$/) && method === 'POST') {
        const unitId = path.split('/v1/ai-agency/units/')[1].replace('/review', '');
        return await handleUnitReview(request, unitId, env, ctx);
      }
      if (path.match(/^\/v1\/ai-agency\/units\/[^/]+$/) && method === 'GET') {
        const unitId = path.split('/v1/ai-agency/units/')[1];
        return handleGetUnit(unitId);
      }

      // ── Digital Products Suite (13 products: 7 paid + 6 lead magnets) ──
      if (path === '/v1/products/catalog' && method === 'GET') {
        return handleProductCatalog();
      }
      if (path === '/v1/products/paid' && method === 'GET') {
        return handlePaidProducts();
      }
      if (path === '/v1/products/lead-magnets' && method === 'GET') {
        return handleLeadMagnets();
      }
      if (path.match(/^\/v1\/products\/purchases\/[^/]+$/) && method === 'GET') {
        const email = decodeURIComponent(path.split('/v1/products/purchases/')[1]);
        return handlePurchaseLookup(email);
      }
      if (path.match(/^\/v1\/products\/[^/]+\/checkout$/) && method === 'POST') {
        const productId = path.split('/v1/products/')[1].replace('/checkout', '');
        return await handleProductCheckout(request, productId, env, ctx);
      }
      if (path.match(/^\/v1\/products\/[^/]+$/) && method === 'GET') {
        const productId = path.split('/v1/products/')[1];
        return handleProductDetail(productId);
      }

      // ── Cooperations Committee ──
      if (path === '/v1/coop/committee' && method === 'GET') {
        return handleCoopCommittee();
      }
      if (path === '/v1/coop/agents' && method === 'GET') {
        return handleListCoopAgents(url);
      }
      if (path === '/v1/coop/brief' && method === 'POST') {
        return await handleCoopBrief(request, env, ctx);
      }
      if (path === '/v1/coop/outreach' && method === 'POST') {
        return await handleCoopOutreach(request, env, ctx);
      }
      if (path === '/v1/coop/network-map' && method === 'POST') {
        return await handleCoopNetworkMap(request, env, ctx);
      }
      if (path === '/v1/coop/targets' && method === 'GET') {
        return handleCoopTargets();
      }
      if (path === '/v1/coop/schedule' && method === 'POST') {
        return await handleCoopSchedule(request);
      }
      if (path.match(/^\/v1\/coop\/agents\/[^/]+$/) && method === 'GET') {
        const agentId = path.split('/v1/coop/agents/')[1];
        return handleGetCoopAgent(agentId);
      }

      // ── Meta Ads ──
      if (path === '/v1/meta-ads/status' && method === 'GET') {
        return await handleMetaAdsStatus(request, env, ctx);
      }
      if (path === '/v1/meta-ads/boost' && method === 'POST') {
        return await handleMetaAdsBoost(request, env, ctx);
      }
      if (path === '/v1/meta-ads/campaigns' && method === 'GET') {
        return await handleMetaAdsCampaigns(env);
      }

      // ── R&D Campaign ──
      if (path === '/v1/rnd/campaign' && method === 'GET') {
        return handleRndCampaignPlan();
      }
      if (path === '/v1/rnd/campaign/status' && method === 'GET') {
        return handleRndCampaignStatus();
      }
      if (path === '/v1/rnd/campaign/competitors' && method === 'GET') {
        return handleRndCompetitors();
      }
      if (path === '/v1/rnd/campaign/systems' && method === 'GET') {
        return handleRndSystems();
      }
      if (path.match(/^\/v1\/rnd\/campaign\/day\/\d+$/) && method === 'GET') {
        const dayNum = path.split('/v1/rnd/campaign/day/')[1];
        return handleRndCampaignDay(dayNum);
      }

      // ── Capital Engine ──
      if (path === '/v1/capital/engine' && method === 'GET') {
        return handleCapitalEngine();
      }
      if (path === '/v1/capital/drip-matrix' && method === 'GET') {
        return handleDRIPMatrix();
      }
      if (path === '/v1/capital/business-model' && method === 'GET') {
        return handleBusinessModel();
      }
      if (path === '/v1/capital/metrics' && method === 'GET') {
        return handleCapitalMetrics();
      }
      if (path.match(/^\/v1\/capital\/pillars\/CE-P[1-3]$/) && method === 'GET') {
        const pillarId = path.split('/v1/capital/pillars/')[1];
        return handleCapitalPillar(pillarId);
      }

      // ── Profit Metrics (Sovereign Governance) ──
      if (path === '/v1/metrics/dashboard' && method === 'GET') {
        return handleMetricsDashboard();
      }
      if (path === '/v1/metrics/targets' && method === 'GET') {
        return handleMetricsTargets();
      }
      if (path === '/v1/metrics/calculate' && method === 'POST') {
        return handleMetricsCalculate(request, env, ctx);
      }
      if (path === '/v1/metrics/revenue-lines' && method === 'GET') {
        return handleRevenueLines();
      }
      if (path === '/v1/metrics/expenses' && method === 'GET') {
        return handleExpenseCategories();
      }
      if (path === '/v1/metrics/noi' && method === 'POST') {
        return handleCalculateNOI(request);
      }
      if (path === '/v1/metrics/gross-margin' && method === 'POST') {
        return handleCalculateGrossMargin(request);
      }
      if (path === '/v1/metrics/cac-ltv' && method === 'POST') {
        return handleCalculateCACLTV(request);
      }

      // ── CFO Revenue Platform ──
      if (path === '/v1/cfo/dashboard' && method === 'GET') {
        return handleCFODashboard();
      }
      if (path === '/v1/cfo/channels' && method === 'GET') {
        return handleCFOChannels();
      }
      if (path === '/v1/cfo/products' && method === 'GET') {
        return handleCFOProducts();
      }
      if (path === '/v1/cfo/brand' && method === 'GET') {
        return handleCFOBrand();
      }
      if (path === '/v1/cfo/acquisition' && method === 'GET') {
        return handleCFOAcquisition();
      }
      if (path === '/v1/cfo/content-plan' && method === 'GET') {
        return handleCFOContentPlan();
      }
      if (path === '/v1/cfo/lead-magnets' && method === 'GET') {
        return handleCFOLeadMagnets();
      }
      if (path === '/v1/cfo/investor' && method === 'GET') {
        return handleCFOInvestor();
      }
      if (path === '/v1/cfo/projection' && method === 'POST') {
        return await handleCFOProjection(request, env, ctx);
      }
      if (path === '/v1/cfo/valuation' && method === 'POST') {
        return await handleCFOValuation(request, env, ctx);
      }
      if (path === '/v1/cfo/checklist' && method === 'GET') {
        return handleCFOChecklist();
      }

      // ── Field Inspections (S1-001) ──
      if (path === '/v1/inspections/dashboard' && method === 'GET') {
        return handleInspectionDashboard();
      }
      if (path === '/v1/inspections/types' && method === 'GET') {
        return handleInspectionTypes();
      }
      if (path === '/v1/inspections/create' && method === 'POST') {
        return await handleCreateInspection(request, env, ctx);
      }
      if (path === '/v1/inspections/complete' && method === 'POST') {
        return await handleCompleteInspection(request, env, ctx);
      }
      if (path === '/v1/inspections/inspectors' && method === 'GET') {
        return handleListInspectors();
      }

      // ── Eliza AI (S1-003) ──
      if (path === '/v1/eliza/dashboard' && method === 'GET') {
        return handleElizaDashboard();
      }
      if (path === '/v1/eliza/voice-config' && method === 'GET') {
        return handleElizaVoiceConfig();
      }
      if (path === '/v1/eliza/avatar-config' && method === 'GET') {
        return handleElizaAvatarConfig();
      }
      if (path === '/v1/eliza/retell-config' && method === 'GET') {
        return handleElizaRetellConfig();
      }
      if (path === '/v1/eliza/campaigns' && method === 'GET') {
        return handleElizaCampaigns();
      }
      if (path === '/v1/eliza/video-brief' && method === 'POST') {
        return await handleElizaVideoBrief(request, env, ctx);
      }

      // ── Google Ads Campaign ──
      if (path === '/v1/ads/google/dashboard' && method === 'GET') {
        return jsonResponse(getGoogleAdsDashboard());
      }

      // ── Token Maintenance Agent (TEC-026) ──
      if (path === '/v1/tokens/dashboard' && method === 'GET') {
        return handleTokenDashboard(env);
      }
      if (path === '/v1/tokens/scan' && method === 'POST') {
        return await handleTokenScan(env, ctx);
      }
      if (path === '/v1/tokens/registry' && method === 'GET') {
        return handleTokenRegistry();
      }

      // ── Sales & Client Acquisition Engine ──
      if (path === '/v1/sales/dashboard' && method === 'GET') {
        return handleSalesDashboard();
      }
      if (path === '/v1/sales/score' && method === 'POST') {
        return await handleScoreLead(request, env, ctx);
      }
      if (path === '/v1/sales/pipeline' && method === 'GET') {
        return handleSalesPipeline();
      }
      if (path === '/v1/sales/channels' && method === 'GET') {
        return handleSalesChannels();
      }
      if (path === '/v1/sales/playbooks' && method === 'GET') {
        return handleSalesPlaybooks();
      }

      // ── Market Strategy Skill ──
      if (path === '/v1/strategy/dashboard' && method === 'GET') {
        return handleStrategyDashboard();
      }
      if (path === '/v1/strategy/generate' && method === 'POST') {
        return await handleStrategyGenerate(request, env, ctx);
      }
      if (path === '/v1/strategy/framework' && method === 'GET') {
        return handleStrategyFramework();
      }

      // ── Master Orchestrator V2.1 ──
      if (path === '/v1/orchestrator/dashboard' && method === 'GET') {
        return handleOrchestratorDashboard();
      }
      if (path === '/v1/orchestrator/assets' && method === 'GET') {
        return handleOrchestratorAssets();
      }
      if (path === '/v1/orchestrator/avatars' && method === 'GET') {
        return handleOrchestratorAvatars();
      }
      if (path === '/v1/orchestrator/gaps' && method === 'GET') {
        return handleOrchestratorGaps();
      }
      if (path === '/v1/orchestrator/noi-model' && method === 'GET') {
        return handleOrchestratorNOIModel();
      }
      if (path === '/v1/orchestrator/noi-model' && method === 'POST') {
        return await handleOrchestratorNOICalculate(request, env, ctx);
      }
      if (path === '/v1/orchestrator/fleet' && method === 'GET') {
        return handleOrchestratorFleet();
      }
      if (path === '/v1/orchestrator/triggers' && method === 'GET') {
        return handleOrchestratorTriggers();
      }
      if (path === '/v1/orchestrator/dispatch' && method === 'POST') {
        return await handleOrchestratorDispatch(request, env, ctx);
      }
      if (path === '/v1/orchestrator/hitl' && method === 'POST') {
        return await handleOrchestratorHITL(request, env, ctx);
      }

      // ── Collections Agent (FIN Division, reports to MCCO-000) ──
      if (path === '/v1/collections/config' && method === 'GET') {
        return handleCollectionsConfig();
      }
      if (path === '/v1/collections/guardrails' && method === 'GET') {
        return handleCollectionsGuardrails();
      }
      if (path === '/v1/collections/status' && method === 'GET') {
        return handleCollectionsStatus();
      }
      if (path === '/v1/collections/eligibility' && method === 'POST') {
        return await handleCollectionsEligibility(request, env, ctx);
      }
      if (path === '/v1/collections/session' && method === 'POST') {
        return await handleCollectionsSession(request, env, ctx);
      }

      // ── Delivery Protocol (SGR-001) ──
      if (path === '/v1/delivery/dashboard' && method === 'GET') {
        return handleDeliveryDashboard();
      }
      if (path === '/v1/delivery/execute' && method === 'POST') {
        return await handleDeliveryExecute(request, env, ctx);
      }
      if (path === '/v1/delivery/template' && method === 'GET') {
        return handleDeliveryTemplate();
      }
      if (path === '/v1/delivery/governance' && method === 'GET') {
        return handleDeliveryGovernance();
      }

      // ── Payments (Stripe) ──
      if (path === '/v1/payments/dashboard' && method === 'GET') {
        return handlePaymentDashboard(env);
      }
      if (path === '/v1/payments/link' && method === 'POST') {
        return await handleCreatePaymentLink(request, env, ctx);
      }

      // ── Banana Pro AI Avatar Generation ──
      if (path === '/v1/avatar/dashboard' && method === 'GET') {
        return handleAvatarDashboard(env);
      }
      if (path === '/v1/avatar/generate' && method === 'POST') {
        return await handleAvatarGenerate(request, env, ctx);
      }
      if (path.startsWith('/v1/avatar/status/') && method === 'GET') {
        return await handleAvatarStatus(request, env);
      }

      // ── ITAM KPI Engine ──
      if (path === '/v1/itam/dashboard' && method === 'GET') {
        return handleITAMDashboard();
      }
      if (path === '/v1/itam/kpis' && method === 'GET') {
        return handleITAMKpis();
      }
      if (path.startsWith('/v1/itam/kpis/') && method === 'GET') {
        const category = path.split('/v1/itam/kpis/')[1];
        return handleITAMCategory(category);
      }
      if (path === '/v1/itam/score' && method === 'POST') {
        const body = await request.json();
        return handleITAMScore(body);
      }
      if (path === '/v1/itam/tco' && method === 'POST') {
        const body = await request.json();
        return handleITAMTco(body);
      }
      if (path === '/v1/itam/health' && method === 'GET') {
        return handleITAMHealth();
      }
      if (path === '/v1/itam/strategic' && method === 'GET') {
        return handleITAMStrategic();
      }

      // ── Work Generator Orchestrator ──
      if (path === '/v1/workgen/cycle' && method === 'POST') {
        return await handleWorkgenCycle(request, env, ctx);
      }
      if (path === '/v1/workgen/build' && method === 'POST') {
        return await handleWorkgenBuild(request, env, ctx);
      }
      if (path === '/v1/workgen/diagnose' && method === 'POST') {
        return await handleWorkgenDiagnose(request, env, ctx);
      }
      if (path === '/v1/workgen/dashboard' && method === 'GET') {
        return handleWorkgenDashboard();
      }
      if (path === '/v1/workgen/goals' && method === 'GET') {
        return handleWorkgenGoals();
      }
      if (path === '/v1/workgen/fleet' && method === 'GET') {
        return handleWorkgenFleet();
      }

      // ── Coastal Key Sovereign OS (CKSO) ──
      if (path === '/v1/ckso/dashboard' && method === 'GET') return handleCKSODashboard();
      if (path === '/v1/ckso/app/templates' && method === 'GET') return handleAppTemplates();
      if (path === '/v1/ckso/app/generate' && method === 'POST') return await handleGenerateApp(request, env, ctx);
      if (path === '/v1/ckso/data/tables' && method === 'GET') return handleDataTables();
      if (path === '/v1/ckso/data/schema' && method === 'POST') return await handleGenerateSchema(request, env, ctx);
      if (path === '/v1/ckso/workflow/triggers' && method === 'GET') return handleWorkflowTriggers();
      if (path === '/v1/ckso/workflow/actions' && method === 'GET') return handleWorkflowActions();
      if (path === '/v1/ckso/workflow/generate' && method === 'POST') return await handleGenerateWorkflow(request, env, ctx);
      if (path === '/v1/ckso/analytics/metrics' && method === 'GET') return handleAnalyticsMetrics();
      if (path === '/v1/ckso/analytics/report' && method === 'POST') return await handleGenerateReport(request, env, ctx);
      if (path === '/v1/ckso/ai/command' && method === 'POST') return await handleAICommand(request, env, ctx);
      if (path === '/v1/ckso/governance/status' && method === 'GET') return handleGovernanceStatus();
      if (path === '/v1/ckso/governance/roles' && method === 'GET') return handleGovernanceRoles();

      // ── Agent Manifest ──
      if (path === '/v1/manifest' && method === 'GET') {
        const summary = url.searchParams.get('summary') === 'true';
        return jsonResponse(summary ? getManifestSummary() : getFullManifest());
      }

      // ── Peak-Time Intelligence Engine (Campaign #1) ──
      if (path === '/v1/campaign/peak-time/dashboard' && method === 'GET') {
        return handleCampaignPeakTimeDashboard();
      }
      if (path === '/v1/campaign/peak-time/schedule' && method === 'GET') {
        return handleCampaignSchedule(url);
      }
      if (path === '/v1/campaign/peak-time/next-slots' && method === 'GET') {
        return handleCampaignNextSlots();
      }
      if (path === '/v1/campaign/peak-time/matrix' && method === 'GET') {
        return handleCampaignMatrix();
      }
      if (path === '/v1/campaign/peak-time/dst' && method === 'GET') {
        return handleCampaignDST(url);
      }
      if (path === '/v1/campaign/peak-time/bulletin' && method === 'GET') {
        return handleCampaignBulletin(env, ctx);
      }
      if (path === '/v1/campaign/peak-time/publish-status' && method === 'GET') {
        return handleCampaignPublishStatus(env);
      }
      if (path === '/v1/campaign/peak-time/schedule-post' && method === 'POST') {
        return await handleCampaignSchedulePost(request, env, ctx);
      }
      if (path === '/v1/campaign/peak-time/schedule-batch' && method === 'POST') {
        return await handleCampaignScheduleBatch(request, env, ctx);
      }
      if (path === '/v1/campaign/peak-time/smo' && method === 'GET') {
        return handleCampaignSMO();
      }
      if (path === '/v1/campaign/peak-time/smo/analyze' && method === 'POST') {
        return await handleCampaignSMOAnalyze(request, env, ctx);
      }
      if (path === '/v1/campaign/peak-time/market-analysis' && method === 'GET') {
        return handleCampaignMarketAnalysis();
      }
      if (path === '/v1/campaign/peak-time/problems' && method === 'GET') {
        return handleCampaignProblems();
      }
      if (path === '/v1/campaign/peak-time/offers' && method === 'GET') {
        return handleCampaignOffers();
      }
      if (path === '/v1/campaign/peak-time/distribution' && method === 'GET') {
        return handleCampaignDistribution(url);
      }
      if (path === '/v1/campaign/peak-time/weekly-counts' && method === 'GET') {
        return handleCampaignWeeklyCounts();
      }
      if (path === '/v1/campaign/peak-time/validate-slot' && method === 'POST') {
        return await handleCampaignValidateSlot(request);
      }
      if (path.match(/^\/v1\/campaign\/peak-time\/division\/[^/]+$/) && method === 'GET') {
        const divisionCode = path.split('/v1/campaign/peak-time/division/')[1];
        return handleCampaignDivisionSchedule(divisionCode, url);
      }

      // ── Banana Pro AI ──
      if (path === '/v1/banana/generate' && method === 'POST') return await handleBananaGenerate(request, env, ctx);
      if (path === '/v1/banana/score-lead' && method === 'POST') return await handleBananaScoreLead(request, env, ctx);
      if (path === '/v1/banana/property-desc' && method === 'POST') return await handleBananaPropertyDesc(request, env, ctx);
      if (path === '/v1/banana/forecast' && method === 'POST') return await handleBananaForecast(request, env, ctx);
      if (path === '/v1/banana/batch' && method === 'POST') return await handleBananaBatch(request, env, ctx);
      if (path === '/v1/banana/health' && method === 'GET') return await handleBananaHealth(env);

      // ── Buffer Integration ──
      if (path === '/v1/buffer/profiles' && method === 'GET') return await handleBufferProfiles(env);
      if (path === '/v1/buffer/schedule' && method === 'POST') return await handleBufferSchedule(request, env, ctx);
      if (path === '/v1/buffer/cross-post' && method === 'POST') return await handleBufferCrossPost(request, env, ctx);
      if (path === '/v1/buffer/sync' && method === 'POST') return await handleBufferSync(env, ctx);
      if (path === '/v1/buffer/health' && method === 'GET') return await handleBufferHealth(env);
      if (path.match(/^\/v1\/buffer\/queue\/[^/]+$/) && method === 'GET') return await handleBufferQueue(path.split('/v1/buffer/queue/')[1], env);
      if (path.match(/^\/v1\/buffer\/sent\/[^/]+$/) && method === 'GET') return await handleBufferSent(path.split('/v1/buffer/sent/')[1], env, url);

      // ── WF-2 Content Pipeline & WF-4 Alignable ──
      if (path === '/v1/workflows/wf2' && method === 'POST') return await handleWf2ContentPipeline(request, env, ctx);
      if (path === '/v1/workflows/wf4-alignable' && method === 'POST') return await handleWf4AlignableBranch(request, env, ctx);

      // ── Market Intelligence ──
      if (path === '/v1/market/scan' && method === 'GET') return await handleMarketScan(env, ctx);
      if (path === '/v1/market/report' && method === 'GET') return await handleMarketReport(env, ctx);
      if (path === '/v1/market/portfolio' && method === 'POST') return await handleMarketPortfolio(request, env, ctx);
      if (path === '/v1/market/indicators' && method === 'GET') return await handleMarketIndicators(env);
      if (path === '/v1/market/watchlist' && method === 'GET') return handleMarketWatchlist();
      if (path.match(/^\/v1\/market\/quote\/[^/]+$/) && method === 'GET') return await handleMarketQuote(path.split('/v1/market/quote/')[1], env);

      // ── Enterprise Diagnostics ──
      if (path === '/v1/diagnostics/scan' && method === 'GET') return await handleDiagnosticsScan(env, ctx);
      if (path === '/v1/diagnostics/data-health' && method === 'GET') return await handleDataHealth(env, ctx);
      if (path === '/v1/diagnostics/activate' && method === 'POST') return await handleSystemActivation(request, env, ctx);
      if (path === '/v1/diagnostics/upgrade' && method === 'POST') return await handleSystemUpgrade(request, env, ctx);
      if (path === '/v1/diagnostics/sops' && method === 'GET') return handleSOPRegistry(url);
      if (path === '/v1/diagnostics/fleet' && method === 'GET') return handleFleetMandate();
      if (path.match(/^\/v1\/diagnostics\/sops\/[^/]+$/) && method === 'GET') return handleSOPDetail(path.split('/v1/diagnostics/sops/')[1]);

      // ── Business Forecast Division ──
      if (path === '/v1/forecast/agents' && method === 'GET') return handleListForecastAgents(url);
      if (path === '/v1/forecast/dashboard' && method === 'GET') return handleForecastDashboard();
      if (path === '/v1/forecast/market-pulse' && method === 'GET') return handleMarketPulse();
      if (path === '/v1/forecast/generate' && method === 'POST') return await handleForecastGenerate(request, env, ctx);
      if (path === '/v1/forecast/scenario' && method === 'POST') return await handleForecastScenario(request, env, ctx);
      if (path.match(/^\/v1\/forecast\/agents\/[^/]+$/) && method === 'GET') {
        const agentId = path.split('/v1/forecast/agents/')[1];
        return handleGetForecastAgent(agentId);
      }

      // ── Peak-Time Intelligence ──
      if (path === '/v1/peak-time/dashboard' && method === 'GET') {
        return handlePeakTimeDashboard();
      }
      if (path === '/v1/peak-time/optimal' && method === 'POST') {
        return await handlePeakTimeOptimal(request);
      }
      if (path === '/v1/peak-time/windows' && method === 'GET') {
        return handlePeakTimeWindows(url);
      }
      if (path === '/v1/peak-time/blackouts' && method === 'GET') {
        return handlePeakTimeBlackouts();
      }

      // ── Growth Platform (Learning + Recruitment + Referral) ──
      if (path === '/v1/growth/dashboard' && method === 'GET') {
        return handleGrowthDashboard();
      }
      if (path === '/v1/growth/certifications' && method === 'GET') {
        return handleGrowthCertifications(url);
      }
      if (path === '/v1/growth/recruitment' && method === 'GET') {
        return handleGrowthRecruitment();
      }
      if (path === '/v1/growth/referrals' && method === 'GET') {
        return handleGrowthReferrals();
      }

      // ── Social Campaign Marketing Division ──
      if (path === '/v1/social/agents' && method === 'GET') return handleListSocialAgents(url);
      if (path === '/v1/social/dashboard' && method === 'GET') return handleSocialDashboard();
      if (path === '/v1/social/calendar' && method === 'GET') return handleSocialCalendar(url);
      if (path === '/v1/social/generate' && method === 'POST') return await handleSocialGenerate(request, env, ctx);
      if (path === '/v1/social/campaign' && method === 'POST') return await handleSocialCampaign(request, env, ctx);
      if (path.match(/^\/v1\/social\/agents\/[^/]+$/) && method === 'GET') {
        const agentId = path.split('/v1/social/agents/')[1];
        return handleGetSocialAgent(agentId);
      }

      return errorResponse('Not found', 404);
    } catch (err) {
      console.error(`[CK Gateway Error] ${path}:`, err);

      // Log errors to audit KV
      if (env.AUDIT_LOG) {
        const key = `error:${Date.now()}`;
        ctx.waitUntil(
          env.AUDIT_LOG.put(key, JSON.stringify({
            path,
            method,
            error: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString(),
          }), { expirationTtl: 86400 * 30 })
        );
      }

      return errorResponse(`Internal error: ${err.message}`, 500);
    }
  },
};
