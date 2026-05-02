/**
 * MIMO AI Telegram Bot — Cloudflare Worker
 * Handles web_app_data from Telegram Mini App
 * Calls MIMO LLM API and replies to user
 */

export default {
  async fetch(request, env) {
    const botToken = env.BOT_TOKEN;
    const mimoKey = env.MIMO_LLM_API_KEY;
    const mimoEndpoint = 'https://api.mimo-llm.io/v1/chat/completions';

    const update = await request.json();

    // Handle /start command
    if (update.message && update.message.text === '/start') {
      const welcome = `👋 Welcome to MIMO AI Mini App!\n\nTap the menu button below to open the chat interface.`;
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: update.message.chat.id,
          text: welcome,
          parse_mode: 'Markdown'
        })
      });
      return new Response('OK');
    }

    // Handle Mini App data
    if (update.web_app_data) {
      const { message } = JSON.parse(update.web_app_data.data);
      const chatId = update.message.from.id;

      try {
        const mimoResp = await fetch(mimoEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${mimoKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'mimo-gpt',
            messages: [
              { role: 'system', content: 'You are MIMO AI, a helpful assistant. Respond concisely and clearly.' },
              { role: 'user', content: message }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        if (!mimoResp.ok) {
          throw new Error(`MIMO API error: ${mimoResp.status}`);
        }

        const mimoData = await mimoResp.json();
        const reply = mimoData.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: reply,
            parse_mode: 'Markdown'
          })
        });

      } catch (error) {
        console.error('Error:', error);
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `❌ Error: ${error.message}. Please try again.`
          })
        });
      }
    }

    return new Response('OK');
  }
};