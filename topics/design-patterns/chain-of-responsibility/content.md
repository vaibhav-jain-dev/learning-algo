# Chain of Responsibility Pattern

## Overview

The Chain of Responsibility pattern passes requests along a chain of handlers. Each handler decides to process the request or pass it to the next handler in the chain. It decouples senders from receivers by giving multiple objects a chance to handle the request.

**Difficulty:** Intermediate
**Category:** Behavioral Pattern
**First Documented:** GoF (1994)

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #22c55e;">
<h4 style="color: #22c55e; margin: 0 0 0.75rem 0;">Core Insight</h4>
<p style="color: #eee; margin: 0; line-height: 1.6;">Chain of Responsibility transforms <span style="color: #22c55e; font-weight: 600;">hard-coded request routing</span> into a <span style="color: #22c55e; font-weight: 600;">dynamic chain of potential handlers</span>. The sender doesn't know (or care) which handler will ultimately process the request - only that the request enters the chain. This is the foundation of <span style="color: #22c55e; font-weight: 600;">middleware architectures</span> used in every major web framework.</p>
</div>

---

## Simple Explanation: The Customer Support Escalation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; margin-top: 0; font-size: 1.3rem;">Think of Customer Support Escalation</h3>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
    When you contact customer support with a problem, your request goes through a chain:
</p>

<div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0; align-items: center; justify-content: center;">
<div style="background: #dbeafe; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #1e40af; font-weight: 700; font-size: 0.9rem;">Chatbot</div>
<div style="color: #1e3a8a; font-size: 0.75rem;">FAQs, simple issues</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
<div style="background: #dcfce7; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #166534; font-weight: 700; font-size: 0.9rem;">L1 Support</div>
<div style="color: #14532d; font-size: 0.75rem;">Common problems</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
<div style="background: #fef3c7; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #92400e; font-weight: 700; font-size: 0.9rem;">L2 Support</div>
<div style="color: #78350f; font-size: 0.75rem;">Technical issues</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
<div style="background: #fce7f3; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #9d174d; font-weight: 700; font-size: 0.9rem;">Engineering</div>
<div style="color: #831843; font-size: 0.75rem;">Complex bugs</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
<div style="background: #e0e7ff; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #3730a3; font-weight: 700; font-size: 0.9rem;">Management</div>
<div style="color: #312e81; font-size: 0.75rem;">Escalations</div>
</div>
</div>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
    Each level tries to handle your issue. If they can't, they escalate to the next level. You don't need to know who will ultimately solve your problem - the chain figures it out.
</p>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">The Key Insight:</strong>
<span style="color: #334155;"> The sender doesn't know (or care) which handler will process the request. Each handler decides: <span style="color: #22c55e; font-weight: 600;">handle it</span>, <span style="color: #22c55e; font-weight: 600;">pass it on</span>, or <span style="color: #22c55e; font-weight: 600;">both</span>.</span>
</div>
</div>

---

## Real Company Usage

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

  | Company/Framework | How They Use Chain of Responsibility |
  |-------------------|-------------------------------------|
  | **Express.js** | Middleware chain (auth, logging, parsing, routing) |
  | **Django** | Middleware pipeline for request/response processing |
  | **Spring** | Filter chains for security, logging, compression |
  | **AWS Lambda** | Event handlers in serverless pipelines |
  | **Stripe** | Webhook handlers for different event types |
  | **Logging (Python)** | Logger hierarchy with different handlers |
  | **DOM Events** | Event bubbling from child to parent elements |

</div>

---

## Pattern Architecture Deep Dive

### The Three Handler Behaviors

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">

<p style="color: #334155; margin-bottom: 20px;">Every handler in a chain must decide one of three behaviors:</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 20px; border-radius: 12px; border: 2px solid #22c55e;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
<div style="background: #22c55e; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</div>
<h4 style="color: #166534; margin: 0;">Handle and Stop</h4>
</div>
<p style="color: #14532d; font-size: 0.9rem; margin: 0;">Process the request completely and <span style="color: #22c55e; font-weight: 600;">terminate the chain</span>. No downstream handlers see the request.</p>
<div style="background: #166534; color: white; padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
  return Response(200, body)
</div>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 12px; border: 2px solid #3b82f6;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
<div style="background: #3b82f6; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</div>
<h4 style="color: #1e40af; margin: 0;">Handle and Pass</h4>
</div>
<p style="color: #1e3a8a; font-size: 0.9rem; margin: 0;">Do some processing (enrich, validate, log) then <span style="color: #22c55e; font-weight: 600;">delegate to next handler</span>. May also process the response.</p>
<div style="background: #1e40af; color: white; padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
  log(req); resp = next(req); log(resp)
</div>
</div>

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; border: 2px solid #f59e0b;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
<div style="background: #f59e0b; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</div>
<h4 style="color: #92400e; margin: 0;">Pass Without Processing</h4>
</div>
<p style="color: #78350f; font-size: 0.9rem; margin: 0;">Request doesn't match this handler's criteria. <span style="color: #22c55e; font-weight: 600;">Forward unchanged</span> to next handler.</p>
<div style="background: #92400e; color: white; padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
  return self._next.handle(request)
</div>
</div>

</div>

</div>

### Chain Flow Visualization

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 32px; margin: 24px 0;">

<div style="display: flex; flex-direction: column; gap: 24px;">

    <!-- Request Flow -->
<div>
<div style="color: #22c55e; font-weight: 700; font-size: 0.9rem; margin-bottom: 12px;">REQUEST FLOW (Inbound)</div>
<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 12px 20px; border-radius: 10px; color: white; font-weight: 600;">Client</div>
<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>
<div style="background: #1e3a5f; border: 2px solid #4ecdc4; padding: 12px 16px; border-radius: 10px;">
<div style="color: #4ecdc4; font-weight: 600; font-size: 0.85rem;">Logging</div>
<div style="color: #888; font-size: 0.7rem;">log request</div>
</div>
<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>
<div style="background: #1e3a5f; border: 2px solid #f093fb; padding: 12px 16px; border-radius: 10px;">
<div style="color: #f093fb; font-weight: 600; font-size: 0.85rem;">Auth</div>
<div style="color: #888; font-size: 0.7rem;">verify token</div>
</div>
<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>
<div style="background: #1e3a5f; border: 2px solid #ffd93d; padding: 12px 16px; border-radius: 10px;">
<div style="color: #ffd93d; font-weight: 600; font-size: 0.85rem;">Rate Limit</div>
<div style="color: #888; font-size: 0.7rem;">check quota</div>
</div>
<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>
<div style="background: #1e3a5f; border: 2px solid #74b9ff; padding: 12px 16px; border-radius: 10px;">
<div style="color: #74b9ff; font-weight: 600; font-size: 0.85rem;">Validation</div>
<div style="color: #888; font-size: 0.7rem;">check body</div>
</div>
<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>
<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 12px 20px; border-radius: 10px; color: white; font-weight: 600;">Handler</div>
</div>
</div>

    <!-- Response Flow -->
<div>
<div style="color: #f093fb; font-weight: 700; font-size: 0.9rem; margin-bottom: 12px;">RESPONSE FLOW (Outbound)</div>
<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 12px 20px; border-radius: 10px; color: white; font-weight: 600;">Handler</div>
<div style="color: #f093fb; font-size: 1.5rem;">&#8594;</div>
<div style="background: #1e3a5f; border: 2px solid #74b9ff; padding: 12px 16px; border-radius: 10px;">
<div style="color: #74b9ff; font-weight: 600; font-size: 0.85rem;">Validation</div>
<div style="color: #888; font-size: 0.7rem;">pass-through</div>
</div>
<div style="color: #f093fb; font-size: 1.5rem;">&#8594;</div>
<div style="background: #1e3a5f; border: 2px solid #ffd93d; padding: 12px 16px; border-radius: 10px;">
<div style="color: #ffd93d; font-weight: 600; font-size: 0.85rem;">Rate Limit</div>
<div style="color: #888; font-size: 0.7rem;">add headers</div>
</div>
<div style="color: #f093fb; font-size: 1.5rem;">&#8594;</div>
<div style="background: #1e3a5f; border: 2px solid #f093fb; padding: 12px 16px; border-radius: 10px;">
<div style="color: #f093fb; font-weight: 600; font-size: 0.85rem;">Auth</div>
<div style="color: #888; font-size: 0.7rem;">pass-through</div>
</div>
<div style="color: #f093fb; font-size: 1.5rem;">&#8594;</div>
<div style="background: #1e3a5f; border: 2px solid #4ecdc4; padding: 12px 16px; border-radius: 10px;">
<div style="color: #4ecdc4; font-weight: 600; font-size: 0.85rem;">Logging</div>
<div style="color: #888; font-size: 0.7rem;">log response</div>
</div>
<div style="color: #f093fb; font-size: 1.5rem;">&#8594;</div>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 12px 20px; border-radius: 10px; color: white; font-weight: 600;">Client</div>
</div>
</div>

</div>

<div style="background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; padding: 16px; border-radius: 8px; margin-top: 20px;">
<strong style="color: #22c55e;">Key Observation:</strong>
<span style="color: #eee;"> The response flows back through the <em>same handlers in reverse order</em>. This enables handlers like Logging to measure total request duration by capturing timestamps on both inbound and outbound passes.</span>
</div>

</div>

---

## Handler Chain Termination Strategies

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<p style="color: #334155; margin-bottom: 20px;">One of the most critical design decisions in Chain of Responsibility is <span style="color: #22c55e; font-weight: 600;">how and when the chain terminates</span>. There are several strategies:</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">

<div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">1. First Match Wins</h4>
<p style="color: #334155; font-size: 0.9rem;">Chain stops at the <span style="color: #22c55e; font-weight: 600;">first handler that can process</span> the request. Common in routing.</p>
<pre style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code>if self.can_handle(request):
  return self.process(request)
return self._next.handle(request)</code></pre>
</div>

<div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">2. Pipeline (All Process)</h4>
<p style="color: #334155; font-size: 0.9rem;"><span style="color: #22c55e; font-weight: 600;">Every handler processes</span> and passes along. Chain ends at final handler. Used in middleware.</p>
<pre style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code>self.before_processing(request)
  response = self._next.handle(request)
return self.after_processing(response)</code></pre>
</div>

<div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
<h4 style="color: #92400e; margin-top: 0;">3. Short-Circuit on Failure</h4>
<p style="color: #334155; font-size: 0.9rem;">Chain stops immediately when a handler <span style="color: #22c55e; font-weight: 600;">rejects the request</span>. Common in auth/validation.</p>
<pre style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code>if not self.is_valid(request):
  return Response(400, "Invalid")
return self._next.handle(request)</code></pre>
</div>

<div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #ec4899;">
<h4 style="color: #9d174d; margin-top: 0;">4. Default/Fallback Handler</h4>
<p style="color: #334155; font-size: 0.9rem;">Chain always ends with a <span style="color: #22c55e; font-weight: 600;">guaranteed handler</span> that catches unhandled requests.</p>
<pre style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code>class DefaultHandler(Handler):
  def handle(self, request):
return Response(404, "Not Found")</code></pre>
</div>

</div>

</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444;">
<h4 style="color: #991b1b; margin-top: 0;">Critical Design Decision: What Happens if No Handler Processes?</h4>
<p style="color: #7f1d1d; margin-bottom: 12px;">If your chain can potentially have <em>no handler</em> process the request, you MUST handle this case:</p>
<ul style="color: #7f1d1d; margin: 0; padding-left: 20px;">
<li><strong>Return null/None:</strong> Client must check and handle gracefully</li>
<li><strong>Throw exception:</strong> Explicit failure, caught at boundary</li>
<li><strong>Default handler:</strong> Catch-all at chain end (recommended)</li>
<li><strong>Return error response:</strong> HTTP 404, gRPC NOT_FOUND, etc.</li>
</ul>
</div>

---

## Middleware Pattern: The Modern Chain of Responsibility

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #22c55e;">
<h4 style="color: #22c55e; margin: 0 0 0.75rem 0;">Understanding Middleware</h4>
<p style="color: #eee; margin: 0; line-height: 1.6;"><span style="color: #22c55e; font-weight: 600;">Middleware</span> is Chain of Responsibility applied to HTTP request/response processing. Each middleware wraps the next, creating an "onion" architecture where requests pass inward through layers and responses pass outward through the same layers in reverse. This is the dominant pattern in web frameworks: Express.js, Koa, Django, Spring, ASP.NET Core, and virtually every modern HTTP framework.</p>
</div>

### Middleware Architecture Diagram

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">

<div style="text-align: center; margin-bottom: 24px;">
<span style="color: #475569; font-size: 0.9rem; font-weight: 600;">The "Onion" Model of Middleware</span>
</div>

<div style="display: flex; justify-content: center; align-items: center;">
<div style="position: relative; width: 400px; height: 400px;">

  <!-- Outer layer - Logging -->
<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(78, 205, 196, 0.2) 0%, rgba(78, 205, 196, 0.1) 100%); border: 3px solid #4ecdc4; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
<div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: #4ecdc4; font-weight: 700; font-size: 0.85rem;">LOGGING</div>
</div>

  <!-- Auth layer -->
<div style="position: absolute; top: 40px; left: 40px; right: 40px; bottom: 40px; background: linear-gradient(135deg, rgba(240, 147, 251, 0.2) 0%, rgba(240, 147, 251, 0.1) 100%); border: 3px solid #f093fb; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
<div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: #f093fb; font-weight: 700; font-size: 0.85rem;">AUTH</div>
</div>

  <!-- Rate Limit layer -->
<div style="position: absolute; top: 80px; left: 80px; right: 80px; bottom: 80px; background: linear-gradient(135deg, rgba(255, 217, 61, 0.2) 0%, rgba(255, 217, 61, 0.1) 100%); border: 3px solid #ffd93d; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
<div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: #ffd93d; font-weight: 700; font-size: 0.85rem;">RATE LIMIT</div>
</div>

  <!-- Validation layer -->
<div style="position: absolute; top: 120px; left: 120px; right: 120px; bottom: 120px; background: linear-gradient(135deg, rgba(116, 185, 255, 0.2) 0%, rgba(116, 185, 255, 0.1) 100%); border: 3px solid #74b9ff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
<div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: #74b9ff; font-weight: 700; font-size: 0.85rem;">VALIDATION</div>
</div>

  <!-- Core Handler -->
<div style="position: absolute; top: 160px; left: 160px; right: 160px; bottom: 160px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
<div style="color: white; font-weight: 700; font-size: 0.9rem; text-align: center;">HANDLER<br><span style="font-size: 0.7rem; opacity: 0.8;">Business Logic</span></div>
</div>

</div>
</div>

<div style="display: flex; justify-content: center; gap: 24px; margin-top: 24px; flex-wrap: wrap;">
<div style="display: flex; align-items: center; gap: 8px;">
<div style="width: 20px; height: 3px; background: #22c55e;"></div>
<span style="color: #22c55e; font-size: 0.8rem;">Request flows inward</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="width: 20px; height: 3px; background: #f093fb;"></div>
<span style="color: #f093fb; font-size: 0.8rem;">Response flows outward</span>
</div>
</div>

</div>

### Express.js vs Python Middleware Comparison

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin: 24px 0;">

<div style="background: #1a1a2e; border-radius: 12px; padding: 20px; border: 2px solid #f7df1e;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
<div style="background: #f7df1e; color: black; padding: 4px 8px; border-radius: 4px; font-weight: 700; font-size: 0.8rem;">JavaScript</div>
<span style="color: #f7df1e; font-weight: 600;">Express.js Middleware</span>
</div>
<pre style="background: #0f172a; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; color: #e2e8f0; margin: 0;"><code>// Middleware receives (req, res, next)
  function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!validateToken(token)) {
  // Short-circuit: don't call next()
  return res.status(401).json({
  error: 'Unauthorized'
  });
  }

  // Enrich request for downstream
  req.user = decodeToken(token);

  // Pass to next middleware
  next();
  }

  // Chain order = execution order
  app.use(loggingMiddleware);
  app.use(authMiddleware);
  app.use(rateLimitMiddleware);
app.use('/api', router);</code></pre>
</div>

<div style="background: #1a1a2e; border-radius: 12px; padding: 20px; border: 2px solid #3776ab;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
<div style="background: #3776ab; color: white; padding: 4px 8px; border-radius: 4px; font-weight: 700; font-size: 0.8rem;">Python</div>
<span style="color: #3776ab; font-weight: 600;">Class-Based Handler Chain</span>
</div>
<pre style="background: #0f172a; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; color: #e2e8f0; margin: 0;"><code># Handler holds reference to next
  class AuthHandler(Handler):
  def handle(self, request):
  token = request.headers.get("Authorization")

  if not self.validate_token(token):
# Short-circuit: return without
# calling next
  return Response(
  status=401,
  body={"error": "Unauthorized"}
  )

# Enrich request for downstream
  request.user = self.decode_token(token)

# Pass to next handler
  return self._next.handle(request)

# Build chain via set_next()
logging.set_next(auth).set_next(rate_limit)</code></pre>
</div>

</div>

  ---

## Interview Deep-Dive: Chain Fundamentals

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: What is the core problem Chain of Responsibility solves?</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> It solves the problem of <span style="color: #22c55e; font-weight: 600;">coupling the sender of a request to its receiver</span>. Without the pattern, the sender must know exactly which object can handle its request, leading to tight coupling and violations of the Open/Closed Principle.
  <br/><br/>
  With Chain of Responsibility, the sender only knows about a single entry point (the first handler). The chain itself determines which handler(s) process the request. This enables:
<ul style="margin: 8px 0 0 0; padding-left: 20px;">
<li>Adding new handlers without modifying sender code</li>
<li>Reordering handlers without modifying sender code</li>
<li>Different chains for different contexts (testing, production)</li>
</ul>
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: How does Chain of Responsibility differ from the [[Decorator]](/topic/design-patterns/decorator) pattern? They look structurally similar.</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> While both patterns involve chaining objects with similar interfaces, they differ in <span style="color: #22c55e; font-weight: 600;">intent and behavior</span>:
  <br/><br/>
<strong>Chain of Responsibility:</strong>
<ul style="margin: 4px 0; padding-left: 20px;">
<li>Handlers <em>decide</em> whether to process</li>
<li>Request may be handled by zero, one, or many handlers</li>
<li>Chain can be <em>short-circuited</em> at any point</li>
<li>Primary goal: <em>route</em> requests to appropriate handler</li>
</ul>
  <br/>
<strong>[[Decorator]](/topic/design-patterns/decorator):</strong>
<ul style="margin: 4px 0; padding-left: 20px;">
<li>Decorators <em>always</em> add behavior</li>
<li>Every decorator in the chain executes</li>
<li>Chain cannot be short-circuited</li>
<li>Primary goal: <em>enhance</em> object capabilities</li>
</ul>
  <br/>
  The key tell: in Decorator, all wrappers execute. In Chain of Responsibility, handlers may pass without processing.
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: Design a handler chain where handlers can execute in parallel for independent checks, then merge results. What are the tradeoffs?</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> This is a <span style="color: #22c55e; font-weight: 600;">Fan-Out/Fan-In</span> variant of Chain of Responsibility:

      ```python
      class ParallelHandler(Handler):
      def __init__(self, handlers: List[Handler]):
      self._handlers = handlers

      async def handle(self, request):
      # Fan-out: run handlers concurrently
      tasks = [h.handle(request) for h in self._handlers]
      results = await asyncio.gather(*tasks, return_exceptions=True)

      # Fan-in: merge results
      for result in results:
      if isinstance(result, Exception):
      return Response(500, f"Handler failed: {result}")
      if result.status >= 400:
      return result  # First failure wins

      # All passed, continue chain
      return self._next.handle(request)
      ```

<strong>Tradeoffs:</strong>
<ul style="margin: 8px 0 0 0; padding-left: 20px;">
<li><strong>Pro:</strong> Reduced latency when handlers are I/O-bound (auth check + rate limit check in parallel)</li>
<li><strong>Pro:</strong> Better resource utilization under high concurrency</li>
<li><strong>Con:</strong> Wasted work if early handler would have rejected (can't short-circuit)</li>
<li><strong>Con:</strong> Complex error handling - what if 2 of 3 handlers fail?</li>
<li><strong>Con:</strong> Handlers can't enrich request for each other (no data flow between parallel handlers)</li>
<li><strong>Con:</strong> Debugging is harder - non-deterministic execution order</li>
</ul>

<strong>When to use:</strong> When handlers are independent, I/O-bound, and rejection is rare. Classic example: validating a request against multiple external services (fraud check, inventory check, payment pre-auth).
</div>
</div>

  ---

## Interview Deep-Dive: Middleware Patterns

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: Why does middleware order matter? Give a concrete example.</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> Middleware order determines <span style="color: #22c55e; font-weight: 600;">which cross-cutting concerns apply to which requests</span> and in what sequence.
  <br/><br/>
<strong>Example - Auth before Rate Limiting:</strong>
      ```
      CORRECT:  Logging -> Auth -> RateLimit -> Handler
      WRONG:    Logging -> RateLimit -> Auth -> Handler
      ```

  If rate limiting comes before auth:
<ul style="margin: 4px 0; padding-left: 20px;">
<li>Unauthenticated requests consume rate limit quota</li>
<li>Attacker can exhaust rate limit for legitimate users</li>
<li>Rate limits can't be per-user (user unknown yet)</li>
</ul>

  Another example - Compression and Encryption:
      ```
      CORRECT:  Compress -> Encrypt (compress plaintext, then encrypt)
      WRONG:    Encrypt -> Compress (encrypted data doesn't compress well)
      ```
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: How do you handle errors that occur in the middle of a middleware chain? What about cleanup?</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> There are three main strategies:
  <br/><br/>
<strong>1. Error Handler Middleware (Recommended):</strong>
  <br/>
  Place an error-catching middleware at the <em>outermost</em> layer:

      ```python
      class ErrorHandlerMiddleware(Handler):
      def handle(self, request):
      try:
      return self._next.handle(request)
      except ValidationError as e:
      return Response(400, {"error": str(e)})
      except AuthError as e:
      return Response(401, {"error": str(e)})
      except Exception as e:
      log.exception("Unhandled error")
      return Response(500, {"error": "Internal error"})
      ```

<strong>2. Result Objects Instead of Exceptions:</strong>

      ```python
      @dataclass
      class Result:
      success: bool
      value: Any = None
      error: str = None

      # Handlers return Result, never raise
      def handle(self, request) -> Result:
      if not valid:
      return Result(success=False, error="Invalid")
      return self._next.handle(request)
      ```

<strong>3. Cleanup via Context Managers:</strong>

      ```python
      class ResourceHandler(Handler):
      def handle(self, request):
      with self.acquire_resource() as resource:
      request.context["resource"] = resource
      return self._next.handle(request)
      # Resource automatically cleaned up, even on exception
      ```

<strong>Best Practice:</strong> Use error middleware at the boundary, Result objects for expected failures, exceptions for unexpected failures.
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: Design a middleware system that supports both synchronous and asynchronous handlers in the same chain. What are the challenges?</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> This is a real challenge in mixed codebases. Here's an approach:

      ```python
      import asyncio
      import inspect

      class UnifiedHandler(ABC):
      @abstractmethod
      def handle(self, request) -> Union[Response, Awaitable[Response]]:
      pass

      class ChainRunner:
      def __init__(self, handlers: List[UnifiedHandler]):
      self._handlers = handlers

      async def run_async(self, request) -> Response:
      async def run_handler(handler, req, next_fn):
      # Wrap sync handlers in async
      result = handler.handle(req)
      if inspect.isawaitable(result):
      return await result
      return result

      # Build the chain from end to start
      async def terminal(req):
      return Response(404, "Not Found")

      chain = terminal
      for handler in reversed(self._handlers):
      prev_chain = chain
      chain = lambda req, h=handler, p=prev_chain: run_handler(h, req, p)

      return await chain(request)

      def run_sync(self, request) -> Response:
      # For sync-only chains, avoid async overhead
      return asyncio.run(self.run_async(request))
      ```

<strong>Challenges:</strong>
<ul style="margin: 8px 0 0 0; padding-left: 20px;">
<li><strong>Colored function problem:</strong> Once you have one async handler, the entire chain must be async-aware</li>
<li><strong>Performance:</strong> Wrapping sync handlers in async adds overhead (~1-5 microseconds per handler)</li>
<li><strong>Context propagation:</strong> Python's contextvars work differently in sync vs async</li>
<li><strong>Testing:</strong> Need both sync and async test utilities</li>
<li><strong>Error handling:</strong> Async exceptions behave differently (unhandled exceptions, cancellation)</li>
</ul>

<strong>Recommendation:</strong> In new code, go fully async. For legacy, wrap the sync/async boundary at the outermost layer, not per-handler.

  See [[Concurrency Patterns]](/topic/system-design/concurrency-patterns) for more on async design.
</div>
</div>

  ---

## Interview Deep-Dive: Request Processing

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: How do handlers communicate data to downstream handlers?</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> The standard approach is <span style="color: #22c55e; font-weight: 600;">request enrichment</span> - handlers add data to the request object:

      ```python
      class AuthHandler(Handler):
      def handle(self, request):
      token = request.headers.get("Authorization")
      user = self.validate_and_decode(token)

      # Enrich request with user info
      request.user = user
      request.context["permissions"] = user.permissions
      request.context["authenticated_at"] = datetime.now()

      return self._next.handle(request)

      class AuthorizationHandler(Handler):
      def handle(self, request):
      # Use data from upstream handler
      if "admin" not in request.context["permissions"]:
      return Response(403, "Forbidden")
      return self._next.handle(request)
      ```

<strong>Alternative approaches:</strong>
<ul style="margin: 8px 0 0 0; padding-left: 20px;">
<li><strong>Thread-local/Context variables:</strong> Implicit passing (Python's contextvars, Java's ThreadLocal)</li>
<li><strong>Return value chaining:</strong> Each handler returns modified request</li>
<li><strong>Separate context object:</strong> Pass (request, context) tuple through chain</li>
</ul>
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: How do you implement request/response transformation in middleware?</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> The key is that middleware executes <span style="color: #22c55e; font-weight: 600;">twice per request</span> - once on the way in, once on the way out:

      ```python
      class CompressionHandler(Handler):
      def handle(self, request):
      # INBOUND: Check if client accepts compression
      accepts_gzip = "gzip" in request.headers.get("Accept-Encoding", "")

      # Pass request to next handler
      response = self._next.handle(request)

      # OUTBOUND: Compress response if client accepts and body is large
      if accepts_gzip and len(response.body) > 1000:
      response.body = gzip.compress(response.body.encode())
      response.headers["Content-Encoding"] = "gzip"

      return response

      class TimingHandler(Handler):
      def handle(self, request):
      start = time.perf_counter()

      response = self._next.handle(request)

      # Add timing to response headers
      elapsed_ms = (time.perf_counter() - start) * 1000
      response.headers["X-Response-Time"] = f"{elapsed_ms:.2f}ms"

      return response
      ```

<strong>Critical insight:</strong> The order of inbound processing is opposite to outbound processing. If chain is A -> B -> C -> Handler:
<ul style="margin: 8px 0 0 0; padding-left: 20px;">
<li>Inbound: A's pre-processing, B's pre-processing, C's pre-processing, Handler</li>
<li>Outbound: C's post-processing, B's post-processing, A's post-processing</li>
</ul>
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: Design a handler that retries failed requests. What invariants must you maintain?</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> Retry middleware is deceptively complex:

      ```python
      class RetryHandler(Handler):
      def __init__(self, max_retries=3, backoff_ms=100, retryable_statuses={500, 502, 503}):
      self._max_retries = max_retries
      self._backoff_ms = backoff_ms
      self._retryable = retryable_statuses

      def handle(self, request):
      # INVARIANT 1: Must buffer request body (streams can only be read once)
      if hasattr(request, 'body_stream'):
      request.body = request.body_stream.read()

      # INVARIANT 2: Idempotency - only retry safe/idempotent methods
      if request.method not in ('GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'):
      # POST is not idempotent - don't retry
      return self._next.handle(request)

      last_response = None
      for attempt in range(self._max_retries + 1):
      # INVARIANT 3: Fresh request copy each attempt
      request_copy = self._clone_request(request)

      try:
      response = self._next.handle(request_copy)

      if response.status not in self._retryable:
      return response

      last_response = response

      except TransientError as e:
      # Network errors are retryable
      last_response = Response(503, str(e))

      # INVARIANT 4: Exponential backoff
      if attempt < self._max_retries:
      sleep_ms = self._backoff_ms * (2 ** attempt)
      time.sleep(sleep_ms / 1000)

      # INVARIANT 5: Return last response, not raise
      return last_response
      ```

<strong>Critical Invariants:</strong>
<ol style="margin: 8px 0 0 0; padding-left: 20px;">
<li><strong>Body buffering:</strong> Request body streams can only be read once - must buffer before retry</li>
<li><strong>Idempotency:</strong> Only retry idempotent operations (GET, PUT, DELETE). Never blindly retry POST</li>
<li><strong>Request isolation:</strong> Each retry must use a fresh request copy (prevents state leakage)</li>
<li><strong>Backoff:</strong> Exponential backoff prevents thundering herd on recovering service</li>
<li><strong>Timeout budget:</strong> Total retry time must fit within client's timeout</li>
<li><strong>Circuit breaker integration:</strong> Stop retrying if service is known-down (see [[Circuit Breaker]](/topic/system-design/removing-bottlenecks))</li>
</ol>
</div>
</div>

  ---

## Real-World Example: Authentication Middleware

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<h3 style="color: #1e293b; margin-top: 0;">Complete JWT Authentication Handler</h3>

<p style="color: #334155; margin-bottom: 20px;">This example demonstrates a production-quality authentication handler with <span style="color: #22c55e; font-weight: 600;">multiple authentication strategies</span>, <span style="color: #22c55e; font-weight: 600;">proper error handling</span>, and <span style="color: #22c55e; font-weight: 600;">request enrichment</span>.</p>

    ```python
    from abc import ABC, abstractmethod
    from dataclasses import dataclass, field
    from typing import Optional, Dict, Any, List
    from datetime import datetime, timedelta
    import jwt
    import hashlib
    import re


    @dataclass
    class User:
    """Authenticated user information."""
    id: str
    email: str
    roles: List[str] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)


    @dataclass
    class AuthResult:
    """Result of authentication attempt."""
    success: bool
    user: Optional[User] = None
    error: Optional[str] = None
    auth_method: Optional[str] = None


    class AuthStrategy(ABC):
    """Abstract authentication strategy."""

    @property
    @abstractmethod
    def name(self) -> str:
    pass

    @abstractmethod
    def authenticate(self, request) -> AuthResult:
    pass


    class JWTAuthStrategy(AuthStrategy):
    """JWT Bearer token authentication."""

    def __init__(self, secret_key: str, algorithms: List[str] = None):
    self._secret = secret_key
    self._algorithms = algorithms or ["HS256"]

    @property
    def name(self) -> str:
    return "jwt"

    def authenticate(self, request) -> AuthResult:
    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Bearer "):
    return AuthResult(success=False, error="Missing Bearer token")

    token = auth_header[7:]  # Strip "Bearer "

    try:
    payload = jwt.decode(
    token,
    self._secret,
    algorithms=self._algorithms
    )

    # Validate expiration
    if "exp" in payload:
    exp = datetime.fromtimestamp(payload["exp"])
    if exp < datetime.now():
    return AuthResult(success=False, error="Token expired")

    user = User(
    id=payload.get("sub"),
    email=payload.get("email", ""),
    roles=payload.get("roles", []),
    metadata={"token_issued": payload.get("iat")}
    )

    return AuthResult(success=True, user=user, auth_method="jwt")

    except jwt.InvalidTokenError as e:
    return AuthResult(success=False, error=f"Invalid token: {e}")


    class APIKeyAuthStrategy(AuthStrategy):
    """API key authentication for service-to-service calls."""

    def __init__(self, valid_keys: Dict[str, User]):
    # Map of API key hash -> User
    self._keys = {self._hash_key(k): v for k, v in valid_keys.items()}

    @property
    def name(self) -> str:
    return "api_key"

    def _hash_key(self, key: str) -> str:
    return hashlib.sha256(key.encode()).hexdigest()

    def authenticate(self, request) -> AuthResult:
    api_key = request.headers.get("X-API-Key")

    if not api_key:
    return AuthResult(success=False, error="Missing API key")

    key_hash = self._hash_key(api_key)
    user = self._keys.get(key_hash)

    if not user:
    return AuthResult(success=False, error="Invalid API key")

    return AuthResult(success=True, user=user, auth_method="api_key")


    class AuthenticationHandler(Handler):
    """
    Multi-strategy authentication handler.

    Tries each authentication strategy in order.
    Short-circuits on first successful auth or explicit rejection.
    """

    def __init__(self, strategies: List[AuthStrategy], required: bool = True):
    super().__init__()
    self._strategies = strategies
    self._required = required

    def handle(self, request) -> Response:
    # Skip auth for certain paths (health checks, public endpoints)
    if self._is_public_path(request.path):
    return self._pass_to_next(request)

    # Try each strategy
    for strategy in self._strategies:
    result = strategy.authenticate(request)

    if result.success:
    # Enrich request with user info
    request.user = result.user
    request.context["auth_method"] = result.auth_method
    request.context["authenticated"] = True

    return self._pass_to_next(request)

    # If strategy explicitly rejected (vs just "not applicable"), stop
    if self._is_explicit_rejection(result):
    return Response(
    status=401,
    body={"error": result.error, "auth_method": strategy.name},
    headers={"WWW-Authenticate": self._get_challenge(strategy)}
    )

    # No strategy succeeded
    if self._required:
    return Response(
    status=401,
    body={"error": "Authentication required"},
    headers={"WWW-Authenticate": self._get_challenges()}
    )

    # Auth optional, continue without user
    request.context["authenticated"] = False
    return self._pass_to_next(request)

    def _is_public_path(self, path: str) -> bool:
    public_patterns = [
    r"^/health$",
    r"^/metrics$",
    r"^/api/v\d+/public/",
    ]
    return any(re.match(p, path) for p in public_patterns)

    def _is_explicit_rejection(self, result: AuthResult) -> bool:
    # Distinguish "wrong credentials" from "no credentials provided"
    explicit_errors = ["Invalid token", "Token expired", "Invalid API key"]
    return result.error and any(e in result.error for e in explicit_errors)

    def _get_challenge(self, strategy: AuthStrategy) -> str:
    if strategy.name == "jwt":
    return 'Bearer realm="api"'
    return f'{strategy.name} realm="api"'

    def _get_challenges(self) -> str:
    return ", ".join(self._get_challenge(s) for s in self._strategies)
    ```

</div>

  ---

## Real-World Example: Logging Middleware

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<h3 style="color: #1e293b; margin-top: 0;">Production Logging Handler with Structured Output</h3>

    ```python
    import json
    import time
    import uuid
    from dataclasses import dataclass, asdict
    from typing import Optional, Dict, Any
    from datetime import datetime


    @dataclass
    class RequestLog:
    """Structured log entry for request."""
    timestamp: str
    request_id: str
    method: str
    path: str
    query_params: Dict[str, str]
    user_id: Optional[str]
    user_agent: str
    client_ip: str

    def to_json(self) -> str:
    return json.dumps(asdict(self))


    @dataclass
    class ResponseLog:
    """Structured log entry for response."""
    timestamp: str
    request_id: str
    status_code: int
    duration_ms: float
    response_size: int
    error: Optional[str]

    def to_json(self) -> str:
    return json.dumps(asdict(self))


    class LoggingHandler(Handler):
    """
    Structured logging middleware with request correlation.

    Features:
    - Request ID generation/propagation
    - Timing measurement
    - Structured JSON output
    - PII redaction
    - Configurable log levels
    """

    SENSITIVE_HEADERS = {"authorization", "x-api-key", "cookie", "set-cookie"}
    SENSITIVE_FIELDS = {"password", "token", "secret", "credit_card"}

    def __init__(self, logger, log_bodies: bool = False, max_body_size: int = 1000):
    super().__init__()
    self._logger = logger
    self._log_bodies = log_bodies
    self._max_body_size = max_body_size

    def handle(self, request) -> Response:
    # Generate or propagate request ID
    request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
    request.context["request_id"] = request_id

    # Capture start time
    start_time = time.perf_counter()

    # Log inbound request
    self._log_request(request, request_id)

    try:
    # Process rest of chain
    response = self._pass_to_next(request)

    # Log outbound response
    duration_ms = (time.perf_counter() - start_time) * 1000
    self._log_response(response, request_id, duration_ms)

    # Add correlation headers to response
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time"] = f"{duration_ms:.2f}ms"

    return response

    except Exception as e:
    # Log error
    duration_ms = (time.perf_counter() - start_time) * 1000
    self._log_error(request_id, e, duration_ms)
    raise

    def _log_request(self, request, request_id: str):
    log_entry = RequestLog(
    timestamp=datetime.utcnow().isoformat() + "Z",
    request_id=request_id,
    method=request.method,
    path=request.path,
    query_params=self._redact_sensitive(dict(getattr(request, 'query', {}))),
    user_id=getattr(request, 'user', None) and request.user.id,
    user_agent=request.headers.get("User-Agent", ""),
    client_ip=request.headers.get("X-Forwarded-For", "unknown").split(",")[0],
    )

    self._logger.info(f"REQUEST {log_entry.to_json()}")

    if self._log_bodies and request.body:
    safe_body = self._redact_body(request.body)
    self._logger.debug(f"REQUEST_BODY request_id={request_id} body={safe_body}")

    def _log_response(self, response, request_id: str, duration_ms: float):
    body_size = len(str(response.body)) if response.body else 0

    log_entry = ResponseLog(
    timestamp=datetime.utcnow().isoformat() + "Z",
    request_id=request_id,
    status_code=response.status,
    duration_ms=round(duration_ms, 2),
    response_size=body_size,
    error=response.body.get("error") if isinstance(response.body, dict) else None,
    )

    # Use appropriate log level based on status
    if response.status >= 500:
    self._logger.error(f"RESPONSE {log_entry.to_json()}")
    elif response.status >= 400:
    self._logger.warning(f"RESPONSE {log_entry.to_json()}")
    else:
    self._logger.info(f"RESPONSE {log_entry.to_json()}")

    def _log_error(self, request_id: str, error: Exception, duration_ms: float):
    self._logger.error(
    f"ERROR request_id={request_id} "
    f"duration_ms={duration_ms:.2f} "
    f"error_type={type(error).__name__} "
    f"error_message={str(error)}"
    )

    def _redact_sensitive(self, data: Dict[str, Any]) -> Dict[str, Any]:
    """Redact sensitive fields from dictionaries."""
    return {
    k: "[REDACTED]" if k.lower() in self.SENSITIVE_FIELDS else v
    for k, v in data.items()
    }

    def _redact_body(self, body: Any) -> str:
    """Redact and truncate request/response bodies."""
    if isinstance(body, dict):
    safe_body = self._redact_sensitive(body)
    body_str = json.dumps(safe_body)
    else:
    body_str = str(body)

    if len(body_str) > self._max_body_size:
    return body_str[:self._max_body_size] + "...[TRUNCATED]"
    return body_str
    ```

</div>

  ---

## Python Implementation: Complete Middleware Chain

### HTTP Middleware Chain

  ```python
  from abc import ABC, abstractmethod
  from dataclasses import dataclass, field
  from typing import Optional, Dict, Any, Callable, List
  from datetime import datetime
  import json
  import time


  @dataclass
  class Request:
  """HTTP-like request object."""
  path: str
  method: str
  headers: Dict[str, str] = field(default_factory=dict)
  body: Optional[Any] = None
  user: Optional[str] = None
  context: Dict[str, Any] = field(default_factory=dict)


  @dataclass
  class Response:
  """HTTP-like response object."""
  status: int
  body: Any
  headers: Dict[str, str] = field(default_factory=dict)


  class Handler(ABC):
  """
  Base handler in the chain.
  Each handler can process the request and/or pass to next.
  """

  def __init__(self):
  self._next: Optional['Handler'] = None

  def set_next(self, handler: 'Handler') -> 'Handler':
  """Set the next handler and return it for chaining."""
  self._next = handler
  return handler

  def handle(self, request: Request) -> Optional[Response]:
  """Process request. Override in subclasses."""
  return self._pass_to_next(request)

  def _pass_to_next(self, request: Request) -> Optional[Response]:
  """Pass request to next handler in chain."""
  if self._next:
  return self._next.handle(request)
  return None


  class AuthenticationHandler(Handler):
  """Verify authentication token."""

  def __init__(self, valid_tokens: set = None):
  super().__init__()
  self.valid_tokens = valid_tokens or {"token123", "admin_token"}

  def handle(self, request: Request) -> Optional[Response]:
  auth_header = request.headers.get("Authorization", "")

  if not auth_header.startswith("Bearer "):
  return Response(
  status=401,
  body={"error": "Missing or invalid Authorization header"}
  )

  token = auth_header.split(" ")[1]
  if token not in self.valid_tokens:
  return Response(
  status=401,
  body={"error": "Invalid token"}
  )

  # Set user info for downstream handlers
  request.user = f"user_{token[:5]}"
  request.context["authenticated"] = True

  return self._pass_to_next(request)


  class RateLimitHandler(Handler):
  """Limit requests per user/IP."""

  def __init__(self, max_requests: int = 100, window_seconds: int = 60):
  super().__init__()
  self.max_requests = max_requests
  self.window_seconds = window_seconds
  self._request_counts: Dict[str, List[float]] = {}

  def handle(self, request: Request) -> Optional[Response]:
  identifier = request.user or request.headers.get("X-Forwarded-For", "unknown")
  current_time = time.time()

  # Get or create request history
  if identifier not in self._request_counts:
  self._request_counts[identifier] = []

  # Remove old requests outside window
  cutoff = current_time - self.window_seconds
  self._request_counts[identifier] = [
  t for t in self._request_counts[identifier] if t > cutoff
  ]

  # Check rate limit
  if len(self._request_counts[identifier]) >= self.max_requests:
  return Response(
  status=429,
  body={"error": "Rate limit exceeded"},
  headers={"Retry-After": str(self.window_seconds)}
  )

  # Record this request
  self._request_counts[identifier].append(current_time)
  request.context["rate_limit_remaining"] = (
  self.max_requests - len(self._request_counts[identifier])
  )

  return self._pass_to_next(request)


  class ValidationHandler(Handler):
  """Validate request data."""

  def handle(self, request: Request) -> Optional[Response]:
  # POST/PUT requests should have a body
  if request.method in ("POST", "PUT", "PATCH"):
  if not request.body:
  return Response(
  status=400,
  body={"error": "Request body required"}
  )

  # Validate JSON if Content-Type indicates JSON
  content_type = request.headers.get("Content-Type", "")
  if "application/json" in content_type:
  if not isinstance(request.body, (dict, list)):
  return Response(
  status=400,
  body={"error": "Invalid JSON body"}
  )

  return self._pass_to_next(request)


  class LoggingHandler(Handler):
  """Log request and response details."""

  def handle(self, request: Request) -> Optional[Response]:
  start_time = time.time()

  # Log incoming request
  print(f"[{datetime.now().isoformat()}] --> {request.method} {request.path}")
  print(f"    User: {request.user or 'anonymous'}")

  # Process rest of chain
  response = self._pass_to_next(request)

  # Log response
  duration_ms = (time.time() - start_time) * 1000
  status = response.status if response else "NO_RESPONSE"
  print(f"[{datetime.now().isoformat()}] <-- {status} ({duration_ms:.2f}ms)")

  return response


  class CORSHandler(Handler):
  """Handle Cross-Origin Resource Sharing."""

  def __init__(self, allowed_origins: List[str] = None):
  super().__init__()
  self.allowed_origins = allowed_origins or ["*"]

  def handle(self, request: Request) -> Optional[Response]:
  origin = request.headers.get("Origin", "")

  # Handle preflight OPTIONS request
  if request.method == "OPTIONS":
  return Response(
  status=204,
  body=None,
  headers={
  "Access-Control-Allow-Origin": self._get_allowed_origin(origin),
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400"
  }
  )

  # Add CORS headers for regular requests
  response = self._pass_to_next(request)
  if response:
  response.headers["Access-Control-Allow-Origin"] = self._get_allowed_origin(origin)

  return response

  def _get_allowed_origin(self, origin: str) -> str:
  if "*" in self.allowed_origins:
  return "*"
  if origin in self.allowed_origins:
  return origin
  return self.allowed_origins[0] if self.allowed_origins else ""


  class RoutingHandler(Handler):
  """Route requests to appropriate handlers."""

  def __init__(self):
  super().__init__()
  self._routes: Dict[str, Dict[str, Callable]] = {}

  def route(self, path: str, method: str, handler: Callable):
  """Register a route handler."""
  if path not in self._routes:
  self._routes[path] = {}
  self._routes[path][method] = handler

  def handle(self, request: Request) -> Optional[Response]:
  # Find matching route
  path_handlers = self._routes.get(request.path)
  if not path_handlers:
  return Response(status=404, body={"error": "Not found"})

  method_handler = path_handlers.get(request.method)
  if not method_handler:
  return Response(
  status=405,
  body={"error": "Method not allowed"},
  headers={"Allow": ", ".join(path_handlers.keys())}
  )

  # Execute route handler
  try:
  return method_handler(request)
  except Exception as e:
  return Response(
  status=500,
  body={"error": str(e)}
  )


  # Build the middleware chain
  def create_app():
  """Create application with middleware chain."""

  # Create handlers
  logging = LoggingHandler()
  cors = CORSHandler(allowed_origins=["https://example.com", "http://localhost:3000"])
  auth = AuthenticationHandler()
  rate_limit = RateLimitHandler(max_requests=10, window_seconds=60)
  validation = ValidationHandler()
  router = RoutingHandler()

  # Build chain: logging -> cors -> auth -> rate_limit -> validation -> router
  logging.set_next(cors).set_next(auth).set_next(rate_limit).set_next(validation).set_next(router)

  # Register routes
  router.route("/api/users", "GET", lambda req: Response(
  status=200,
  body={"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}
  ))

  router.route("/api/users", "POST", lambda req: Response(
  status=201,
  body={"created": req.body, "id": 3}
  ))

  return logging  # Return first handler in chain


  # Usage
  app = create_app()

  print("=== Test 1: Valid GET request ===")
  response = app.handle(Request(
  path="/api/users",
  method="GET",
  headers={"Authorization": "Bearer token123"}
  ))
  print(f"Response: {response}\n")

  print("=== Test 2: Missing auth ===")
  response = app.handle(Request(
  path="/api/users",
  method="GET",
  headers={}
  ))
  print(f"Response: {response}\n")

  print("=== Test 3: POST with body ===")
  response = app.handle(Request(
  path="/api/users",
  method="POST",
  headers={
  "Authorization": "Bearer token123",
  "Content-Type": "application/json"
  },
  body={"name": "Charlie", "email": "charlie@example.com"}
  ))
  print(f"Response: {response}\n")

  print("=== Test 4: POST without body ===")
  response = app.handle(Request(
  path="/api/users",
  method="POST",
  headers={
  "Authorization": "Bearer token123",
  "Content-Type": "application/json"
  }
  ))
  print(f"Response: {response}\n")
  ```

  ---

## Chain of Responsibility vs Related Patterns

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Chain of Responsibility</h4>
<p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 12px;">Passes request through handlers until processed.</p>
<div style="background: #eff6ff; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #1e40af;">Handler decides:</strong> <span style="color: #1e3a8a;">Process or pass</span><br>
<strong style="color: #1e40af;">Result:</strong> <span style="color: #1e3a8a;">0, 1, or many handlers process</span>
</div>
</div>

<div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-top: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">[[Decorator]](/topic/design-patterns/decorator)</h4>
<p style="color: #14532d; font-size: 0.9rem; margin-bottom: 12px;">Wraps objects to add behavior.</p>
<div style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #166534;">All decorators:</strong> <span style="color: #14532d;">Always execute</span><br>
<strong style="color: #166534;">Result:</strong> <span style="color: #14532d;">All enhance the object</span>
</div>
</div>

<div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-top: 4px solid #f59e0b;">
<h4 style="color: #92400e; margin-top: 0;">[[Command]](/topic/design-patterns/command)</h4>
<p style="color: #78350f; font-size: 0.9rem; margin-bottom: 12px;">Encapsulates request as object.</p>
<div style="background: #fffbeb; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #92400e;">Request is:</strong> <span style="color: #78350f;">Stored/queued</span><br>
<strong style="color: #92400e;">Handler:</strong> <span style="color: #78350f;">Known in advance</span>
</div>
</div>

<div style="background: #fce7f3; padding: 20px; border-radius: 12px; border-top: 4px solid #ec4899;">
<h4 style="color: #9d174d; margin-top: 0;">[[Strategy]](/topic/design-patterns/strategy)</h4>
<p style="color: #831843; font-size: 0.9rem; margin-bottom: 12px;">Selects one algorithm at runtime.</p>
<div style="background: #fdf2f8; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #9d174d;">Selection:</strong> <span style="color: #831843;">Explicit, single</span><br>
<strong style="color: #9d174d;">Result:</strong> <span style="color: #831843;">Exactly one strategy runs</span>
</div>
</div>

</div>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 20px;">
<strong style="color: #0f172a;">Quick Decision Guide:</strong>
<ul style="color: #334155; margin-bottom: 0;">
<li><strong>Chain of Responsibility:</strong> "I don't know who should handle this - let the chain decide"</li>
<li><strong>[[Decorator]](/topic/design-patterns/decorator):</strong> "I want to add features to this object"</li>
<li><strong>[[Command]](/topic/design-patterns/command):</strong> "I want to parameterize, queue, or log operations"</li>
<li><strong>[[Strategy]](/topic/design-patterns/strategy):</strong> "I want to swap algorithms without changing context"</li>
</ul>
</div>
</div>

  ---

## Common Mistakes and Anti-Patterns

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">

### Mistake 1: Forgetting Default Handler

            ```python
            # BAD: Request might not be handled
            chain = auth.set_next(validation).set_next(router)
            response = chain.handle(request)  # Could be None!

            # GOOD: Always have a fallback
            class NotFoundHandler(Handler):
            def handle(self, request):
            return Response(status=404, body={"error": "Not found"})

            chain = auth.set_next(validation).set_next(router).set_next(NotFoundHandler())
            ```

### Mistake 2: Circular Chain

            ```python
            # BAD: Infinite loop!
            handler_a.set_next(handler_b)
            handler_b.set_next(handler_a)  # Circular!

            # GOOD: Linear chain with termination
            handler_a.set_next(handler_b).set_next(handler_c)  # Ends at c
            ```

### Mistake 3: Order-Dependent Hidden Bugs

            ```python
            # BAD: Auth after rate limit - can rate limit unauthenticated requests
            chain = rate_limit.set_next(auth)

            # GOOD: Auth before rate limit - rate limit per authenticated user
            chain = auth.set_next(rate_limit)
            ```

### Mistake 4: Handlers Modifying Shared State

            ```python
            # BAD: Handler modifies shared request object, affects other chains
            class BadHandler(Handler):
            def handle(self, request):
            request.headers["X-Modified"] = "true"  # Mutates original!
            return self._pass_to_next(request)

            # GOOD: Create a copy if you need to modify
            class GoodHandler(Handler):
            def handle(self, request):
            enriched = Request(
            path=request.path,
            method=request.method,
            headers={**request.headers, "X-Modified": "true"},
            body=request.body
            )
            return self._pass_to_next(enriched)
            ```

### Mistake 5: Not Handling Exceptions

            ```python
            # BAD: Exception in handler breaks entire chain
            class FragileHandler(Handler):
            def handle(self, request):
            data = json.loads(request.body)  # Could raise!
            return self._pass_to_next(request)

            # GOOD: Wrap in error handling or use error middleware
            class RobustHandler(Handler):
            def handle(self, request):
            try:
            data = json.loads(request.body)
            except json.JSONDecodeError as e:
            return Response(400, {"error": f"Invalid JSON: {e}"})
            return self._pass_to_next(request)
            ```

</div>

  ---

## Interview Deep-Dive: Advanced Scenarios

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: How would you implement chain configuration that can be changed at runtime?</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> Use a <span style="color: #22c55e; font-weight: 600;">ChainBuilder</span> pattern that reconstructs the chain when configuration changes:

              ```python
              class ChainBuilder:
              def __init__(self):
              self._handlers = []

              def add(self, handler: Handler) -> 'ChainBuilder':
              self._handlers.append(handler)
              return self

              def add_if(self, condition: bool, handler: Handler) -> 'ChainBuilder':
              if condition:
              self._handlers.append(handler)
              return self

              def build(self) -> Handler:
              if not self._handlers:
              raise ValueError("Chain must have at least one handler")

              for i in range(len(self._handlers) - 1):
              self._handlers[i].set_next(self._handlers[i + 1])

              return self._handlers[0]

              # Usage with runtime configuration
              def build_chain(config: dict) -> Handler:
              builder = ChainBuilder()

              if config.get("enable_logging"):
              builder.add(LoggingHandler())

              if config.get("require_auth"):
              builder.add(AuthHandler())

              if config.get("rate_limit"):
              builder.add(RateLimitHandler(
              max_requests=config["rate_limit"]["max"],
              window_seconds=config["rate_limit"]["window"]
              ))

              builder.add(ValidationHandler())
              builder.add(RouterHandler())

              return builder.build()
              ```
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: How would you implement branching chains where a handler can route to different sub-chains?</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> Implement a <span style="color: #22c55e; font-weight: 600;">CompositeHandler</span> that routes to sub-chains based on conditions:

              ```python
              class BranchingHandler(Handler):
              """Routes to different chains based on request properties."""

              def __init__(self):
              super().__init__()
              self._branches: Dict[str, Handler] = {}
              self._default: Optional[Handler] = None

              def add_branch(self, condition: str, chain: Handler) -> 'BranchingHandler':
              self._branches[condition] = chain
              return self

              def set_default(self, chain: Handler) -> 'BranchingHandler':
              self._default = chain
              return self

              def handle(self, request: Request) -> Response:
              # Route based on path prefix
              for prefix, chain in self._branches.items():
              if request.path.startswith(prefix):
              return chain.handle(request)

              if self._default:
              return self._default.handle(request)

              return Response(404, {"error": "No matching route"})

              # Usage: Different chains for different API versions
              branching = BranchingHandler()
              branching.add_branch("/api/v1/", v1_chain)
              branching.add_branch("/api/v2/", v2_chain)
              branching.add_branch("/internal/", internal_chain)
              branching.set_default(public_chain)
              ```

This enables <span style="color: #22c55e; font-weight: 600;">tree-like routing</span> where different paths get different middleware stacks.
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: Design a handler chain that supports transactional semantics - if any handler fails, all previous handlers' effects are rolled back.</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> This requires a <span style="color: #22c55e; font-weight: 600;">Saga-like pattern</span> with compensating actions:

              ```python
              from typing import Callable, List, Tuple
              from contextlib import contextmanager

              class TransactionalHandler(Handler):
              """Handler that supports rollback on downstream failures."""

              @abstractmethod
              def execute(self, request: Request) -> Request:
              """Forward action - modify request/state."""
              pass

              @abstractmethod
              def compensate(self, request: Request, error: Exception):
              """Rollback action - undo changes on failure."""
              pass

              def handle(self, request: Request) -> Response:
              try:
              # Execute forward action
              modified_request = self.execute(request)

              # Pass to next handler
              response = self._pass_to_next(modified_request)

              # If downstream failed, compensate
              if response and response.status >= 500:
              self.compensate(request, Exception(f"Downstream error: {response.status}"))

              return response

              except Exception as e:
              # Compensate on exception
              self.compensate(request, e)
              raise


              class SagaCoordinator(Handler):
              """Coordinates transactional chain with compensation."""

              def __init__(self, handlers: List[TransactionalHandler]):
              super().__init__()
              self._handlers = handlers

              def handle(self, request: Request) -> Response:
              executed: List[Tuple[TransactionalHandler, Request]] = []
              current_request = request

              try:
              # Execute each handler
              for handler in self._handlers:
              current_request = handler.execute(current_request)
              executed.append((handler, current_request))

              return Response(200, {"status": "committed"})

              except Exception as e:
              # Compensate in reverse order
              for handler, req in reversed(executed):
              try:
              handler.compensate(req, e)
              except Exception as comp_error:
              # Log but continue compensating
              logging.error(f"Compensation failed: {comp_error}")

              return Response(500, {"error": str(e), "status": "rolled_back"})


              # Example: Transactional order processing
              class ReserveInventoryHandler(TransactionalHandler):
              def execute(self, request):
              item_id = request.body["item_id"]
              self._inventory_service.reserve(item_id)
              request.context["inventory_reserved"] = item_id
              return request

              def compensate(self, request, error):
              item_id = request.context.get("inventory_reserved")
              if item_id:
              self._inventory_service.release(item_id)

              class ChargePaymentHandler(TransactionalHandler):
              def execute(self, request):
              charge = self._payment_service.charge(
              request.body["amount"],
              request.body["payment_method"]
              )
              request.context["charge_id"] = charge.id
              return request

              def compensate(self, request, error):
              charge_id = request.context.get("charge_id")
              if charge_id:
              self._payment_service.refund(charge_id)
              ```

<strong>Key considerations:</strong>
<ul style="margin: 8px 0 0 0; padding-left: 20px;">
<li><strong>Compensation order matters:</strong> Compensate in reverse order of execution</li>
<li><strong>Compensation can fail:</strong> Need strategy for partial compensation failures</li>
<li><strong>Idempotency:</strong> Compensations must be idempotent (may run multiple times)</li>
<li><strong>State tracking:</strong> Must track what was done to know what to undo</li>
<li><strong>Timeout handling:</strong> What if compensation takes too long?</li>
</ul>

  See [[Event Sourcing]](/topic/system-design/event-sourcing) and [[Distributed Transactions]](/topic/microservices/event-strategies) for related patterns.
</div>
</div>

  ---

## Key Takeaways

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #93c5fd;">

1. **<span style="color: #22c55e;">Decouples Sender from Receiver</span>** - Sender doesn't know which handler will process the request

2. **<span style="color: #22c55e;">Dynamic Handler Selection</span>** - Chain determines the right handler at runtime

3. **<span style="color: #22c55e;">Single Responsibility</span>** - Each handler focuses on one concern (auth, logging, validation)

4. **<span style="color: #22c55e;">Order Matters</span>** - Handler sequence affects behavior (always auth before rate limit)

5. **<span style="color: #22c55e;">Always Have a Default</span>** - Ensure requests don't fall through unhandled

6. **<span style="color: #22c55e;">Pipeline vs First-Match</span>** - Understand whether all handlers should execute or just the first match

7. **<span style="color: #22c55e;">Request Enrichment</span>** - Upstream handlers add context for downstream handlers

8. **<span style="color: #22c55e;">Error Handling Strategy</span>** - Plan for failures at any point in the chain

</div>

  ---

## Related Patterns

          - [[Command]](/topic/design-patterns/command) - Encapsulates requests as objects for queuing, logging, undo
          - [[Decorator]](/topic/design-patterns/decorator) - Similar structure but all decorators always execute
          - [[Composite]](/topic/design-patterns/composite) - Can form tree of handlers for complex routing
          - [[Strategy]](/topic/design-patterns/strategy) - Single handler selection vs chain of handlers
          - [[Observer]](/topic/design-patterns/observer) - Multiple handlers notified of events (broadcast vs chain)
          - [[Mediator]](/topic/design-patterns/mediator) - Centralizes complex communications between objects
