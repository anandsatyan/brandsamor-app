export function getScentStudioConfig() {
  const featureEnabled = String(process.env.SCENT_AI_FEATURE_ENABLED ?? 'true').toLowerCase() !== 'false';
  const baseUrl = String(process.env.SCENT_AI_BASE_URL || '').trim().replace(/\/$/, '');
  const apiKey = String(process.env.SCENT_AI_API_KEY || '').trim();
  const chatModel = String(process.env.SCENT_AI_CHAT_MODEL || '').trim();
  const formulaModel = String(process.env.SCENT_AI_FORMULA_MODEL || chatModel).trim();
  const temperature = Number(process.env.SCENT_AI_CHAT_TEMPERATURE ?? 0.6);
  const formulaTemperature = Number(process.env.SCENT_AI_FORMULA_TEMPERATURE ?? 0.2);
  const maxOutputTokens = Number(process.env.SCENT_AI_MAX_OUTPUT_TOKENS ?? 900);
  const maxRepairAttempts = Number(process.env.SCENT_AI_MAX_REPAIR_ATTEMPTS ?? 1);
  const timeoutMs = Number(process.env.SCENT_AI_TIMEOUT_MS ?? 30000);

  const providerConfigured = Boolean(baseUrl && chatModel);

  return {
    featureEnabled,
    baseUrl,
    apiKey,
    chatModel,
    formulaModel,
    temperature: Number.isFinite(temperature) ? temperature : 0.6,
    formulaTemperature: Number.isFinite(formulaTemperature) ? formulaTemperature : 0.2,
    maxOutputTokens: Number.isFinite(maxOutputTokens) ? maxOutputTokens : 900,
    maxRepairAttempts: Number.isFinite(maxRepairAttempts) ? maxRepairAttempts : 1,
    timeoutMs: Number.isFinite(timeoutMs) ? timeoutMs : 30000,
    providerConfigured,
    useLocalConsultant: featureEnabled && !providerConfigured,
  };
}
