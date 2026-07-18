import { getScentStudioConfig } from './config.mjs';

function extractJsonObject(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    // fall through
  }

  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    try {
      return JSON.parse(fenced[1].trim());
    } catch {
      // fall through
    }
  }

  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(raw.slice(start, end + 1));
    } catch {
      return null;
    }
  }
  return null;
}

export async function completeChatJson({
  systemPrompt,
  messages,
  temperature,
  maxTokens,
} = {}) {
  const config = getScentStudioConfig();
  if (!config.providerConfigured) {
    throw new Error('Scent AI provider is not configured');
  }

  const url = `${config.baseUrl}/chat/completions`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  const started = Date.now();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: config.chatModel,
        temperature: temperature ?? config.temperature,
        max_tokens: maxTokens ?? config.maxOutputTokens,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
        ],
      }),
      signal: controller.signal,
    });

    const latencyMs = Date.now() - started;
    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Scent AI provider error ${response.status}: ${errText.slice(0, 300)}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? '';
    const parsed = extractJsonObject(content);
    const usage = data?.usage || null;

    console.info('[scent-studio] model turn', {
      model: config.chatModel,
      latencyMs,
      promptTokens: usage?.prompt_tokens ?? null,
      completionTokens: usage?.completion_tokens ?? null,
    });

    return { parsed, rawContent: content, usage, latencyMs };
  } finally {
    clearTimeout(timer);
  }
}

export { extractJsonObject };
