# Monolith to Microservices: Real-World Case Studies

## Overview

This guide presents detailed case studies of companies that successfully migrated from monolithic to microservices architectures. Each case study covers the motivation, approach, challenges, and lessons learned.

**Tags:** Case Studies, Migration, Real-World, Architecture

---

## Case Study 1: Amazon (2001-2006)

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #ff9900; margin: 0 0 8px 0; font-size: 1.4em; text-align: center;">Case Study: Amazon's Microservices Transformation</h3>
  <div style="text-align: center; color: #8892b0; margin-bottom: 20px;">
    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4px 12px; border-radius: 12px; font-size: 0.85em; margin-right: 8px;">Timeline: 2001-2006</span>
    <span style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1a1a2e; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">Scale: Millions of customers to Billions in revenue</span>
  </div>

  <div style="background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
    <h4 style="color: #fff; margin: 0 0 12px 0;">The Problem (2001): "Obidos" Monolith</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <div>
        <ul style="color: #ffe0e0; margin: 0; padding-left: 20px; font-size: 0.9em;">
          <li>Single C++ application handling everything</li>
          <li>All teams worked on same codebase</li>
          <li>2-week deployment cycles</li>
          <li>Single failure could take down entire site</li>
        </ul>
      </div>
      <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 12px;">
        <div style="color: #fff; font-weight: 600; margin-bottom: 6px;">Pain Points:</div>
        <ul style="color: #ffe0e0; margin: 0; padding-left: 16px; font-size: 0.85em;">
          <li>Feature releases took months</li>
          <li>Deployments required coordinated downtime</li>
          <li>Database was single point of failure</li>
        </ul>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
    <h4 style="color: #fff; margin: 0 0 12px 0;">The Mandate (2002): Jeff Bezos API Mandate</h4>
    <ol style="color: #e0e0ff; margin: 0; padding-left: 20px; font-size: 0.9em;">
      <li style="margin-bottom: 6px;">All teams will expose their data and functionality through <strong style="color: #fff;">service interfaces</strong></li>
      <li style="margin-bottom: 6px;">Teams must communicate with each other <strong style="color: #fff;">through these interfaces</strong></li>
      <li style="margin-bottom: 6px;">No other form of inter-process communication: no direct linking, no direct reads of another team's data store</li>
      <li style="margin-bottom: 6px;">It doesn't matter what <strong style="color: #fff;">technology</strong> they use</li>
      <li style="margin-bottom: 6px;">All service interfaces must be designed to be <strong style="color: #fff;">externalizable</strong></li>
      <li><em style="color: #ff9900;">Anyone who doesn't do this will be fired</em></li>
    </ol>
  </div>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
    <h4 style="color: #1a1a2e; margin: 0 0 12px 0;">The Approach</h4>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
      <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 12px;">
        <div style="color: #667eea; font-weight: 600; margin-bottom: 6px;">Phase 1: Define Boundaries</div>
        <ul style="color: #333; margin: 0; padding-left: 16px; font-size: 0.8em;">
          <li>Product catalog</li>
          <li>Customer data</li>
          <li>Orders & Payments</li>
          <li>Inventory</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 12px;">
        <div style="color: #667eea; font-weight: 600; margin-bottom: 6px;">Phase 2: Extract Services</div>
        <ul style="color: #333; margin: 0; padding-left: 16px; font-size: 0.8em;">
          <li>Start with low-risk services</li>
          <li>Build API layer in front</li>
          <li>Strangler Pattern</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 12px;">
        <div style="color: #667eea; font-weight: 600; margin-bottom: 6px;">Phase 3: Scale & Iterate</div>
        <ul style="color: #333; margin: 0; padding-left: 16px; font-size: 0.8em;">
          <li>Two-pizza teams</li>
          <li>Choose own tech</li>
          <li>Own databases</li>
        </ul>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
    <h4 style="color: #1a1a2e; margin: 0 0 12px 0;">Results (2006)</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.9em;">
      <div style="background: rgba(0,0,0,0.1); border-radius: 8px; padding: 10px;">
        <div style="color: #8b0000; font-weight: 600;">Before (2001)</div>
        <div style="color: #1a1a2e;">1 monolith, 2-week deployments, Single database</div>
      </div>
      <div style="background: rgba(0,0,0,0.1); border-radius: 8px; padding: 10px;">
        <div style="color: #006400; font-weight: 600;">After (2006)</div>
        <div style="color: #1a1a2e;">100+ services, Multiple deploys/day, Database per service</div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 12px; color: #ff9900; font-weight: 600;">Bonus: AWS was born from this infrastructure!</div>
  </div>

  <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 12px;">
    <h4 style="color: #4facfe; margin: 0 0 8px 0;">Key Lessons:</h4>
    <ul style="color: #c0c0c0; margin: 0; padding-left: 20px; font-size: 0.9em;">
      <li>Strong mandate from leadership is essential</li>
      <li>Service boundaries should align with business domains</li>
      <li>Small, autonomous teams work best</li>
      <li>Design APIs as if they'll be public</li>
    </ul>
  </div>
</div>

---

## Case Study 2: Netflix (2008-2016)

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #e50914; margin: 0 0 8px 0; font-size: 1.4em; text-align: center;">Case Study: Netflix Cloud Migration</h3>
  <div style="text-align: center; color: #8892b0; margin-bottom: 20px;">
    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4px 12px; border-radius: 12px; font-size: 0.85em; margin-right: 8px;">Timeline: 2008-2016</span>
    <span style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1a1a2e; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">Scale: 8M to 130M+ subscribers</span>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
    <div style="background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); border-radius: 10px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 10px 0;">The Catalyst (2008)</h4>
      <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 12px; color: #fff; font-size: 0.9em;">
        <strong>Major database corruption caused 3-day outage</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #ffe0e0;">
          <li>DVD shipping stopped</li>
          <li>Massive revenue loss</li>
          <li>Customer trust damaged</li>
        </ul>
      </div>
      <div style="color: #fff; font-style: italic; margin-top: 10px; font-size: 0.9em;">"We need to move to the cloud and become a distributed system"</div>
    </div>
    <div style="background: linear-gradient(135deg, #2d3561 0%, #1e2a4a 100%); border-radius: 10px; padding: 16px;">
      <h4 style="color: #4facfe; margin: 0 0 10px 0;">Before State</h4>
      <ul style="color: #c0c0c0; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Vertically scaled data center</li>
        <li>Oracle database (single point of failure)</li>
        <li>Java monolith</li>
        <li>Tight coupling between DVD and streaming</li>
        <li>Manual scaling</li>
      </ul>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
    <h4 style="color: #fff; margin: 0 0 12px 0;">Migration Strategy (8 Years)</h4>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
      <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
        <div style="color: #4facfe; font-weight: 600; font-size: 0.85em;">Year 1-2: Foundation</div>
        <ul style="color: #e0e0ff; margin: 6px 0 0 0; padding-left: 14px; font-size: 0.75em;">
          <li>Non-critical systems to AWS</li>
          <li>Built Netflix OSS tools</li>
          <li>Learned cloud patterns</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
        <div style="color: #4facfe; font-weight: 600; font-size: 0.85em;">Year 3-4: Core Systems</div>
        <ul style="color: #e0e0ff; margin: 6px 0 0 0; padding-left: 14px; font-size: 0.75em;">
          <li>Decomposed monolith</li>
          <li>Oracle to Cassandra</li>
          <li>Custom streaming infra</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
        <div style="color: #4facfe; font-weight: 600; font-size: 0.85em;">Year 5-6: Full Migration</div>
        <ul style="color: #e0e0ff; margin: 6px 0 0 0; padding-left: 14px; font-size: 0.75em;">
          <li>Customer-facing APIs</li>
          <li>Billing and payments</li>
          <li>100% on AWS</li>
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
        <div style="color: #4facfe; font-weight: 600; font-size: 0.85em;">Year 7-8: Optimization</div>
        <ul style="color: #e0e0ff; margin: 6px 0 0 0; padding-left: 14px; font-size: 0.75em;">
          <li>Chaos Engineering</li>
          <li>Multi-region deployment</li>
          <li>Active-active</li>
        </ul>
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 10px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 10px 0;">Netflix OSS Contributions</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.85em;">
        <div style="background: rgba(255,255,255,0.2); border-radius: 4px; padding: 6px 10px;"><strong style="color: #fff;">Eureka</strong> <span style="color: #ffe0e0;">- Service discovery</span></div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 4px; padding: 6px 10px;"><strong style="color: #fff;">Zuul</strong> <span style="color: #ffe0e0;">- API Gateway</span></div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 4px; padding: 6px 10px;"><strong style="color: #fff;">Hystrix</strong> <span style="color: #ffe0e0;">- Circuit breaker</span></div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 4px; padding: 6px 10px;"><strong style="color: #fff;">Ribbon</strong> <span style="color: #ffe0e0;">- Load balancing</span></div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 4px; padding: 6px 10px;"><strong style="color: #fff;">Chaos Monkey</strong> <span style="color: #ffe0e0;">- Failure injection</span></div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 4px; padding: 6px 10px;"><strong style="color: #fff;">Spinnaker</strong> <span style="color: #ffe0e0;">- CD pipeline</span></div>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 10px; padding: 16px;">
      <h4 style="color: #1a1a2e; margin: 0 0 10px 0;">Results</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85em;">
        <div><span style="color: #666;">Data center</span> <span style="color: #006400; font-weight: 600;">100% AWS</span></div>
        <div><span style="color: #666;">Oracle DB</span> <span style="color: #006400; font-weight: 600;">Cassandra/DynamoDB</span></div>
        <div><span style="color: #666;">1 monolith</span> <span style="color: #006400; font-weight: 600;">700+ microservices</span></div>
        <div><span style="color: #666;">Hours to deploy</span> <span style="color: #006400; font-weight: 600;">1000s deploys/day</span></div>
        <div><span style="color: #666;">Single region</span> <span style="color: #006400; font-weight: 600;">Multi-region active</span></div>
        <div><span style="color: #666;">99.9% uptime</span> <span style="color: #006400; font-weight: 600;">99.99% uptime</span></div>
      </div>
    </div>
  </div>

  <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 12px;">
    <h4 style="color: #e50914; margin: 0 0 8px 0;">Key Lessons:</h4>
    <ul style="color: #c0c0c0; margin: 0; padding-left: 20px; font-size: 0.9em; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
      <li>Migration takes years, not months</li>
      <li>Build tools as you go (then open source them)</li>
      <li>Start with stateless services</li>
      <li>Invest heavily in observability</li>
      <li>Embrace failure as normal (Chaos Engineering)</li>
    </ul>
  </div>
</div>

---

## Case Study 3: Uber (2014-2018)

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #000; margin: 0 0 8px 0; font-size: 1.4em; text-align: center;"><span style="background: #000; color: #fff; padding: 4px 12px; border-radius: 4px;">Case Study: Uber's Microservices Journey</span></h3>
  <div style="text-align: center; color: #8892b0; margin-bottom: 20px;">
    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4px 12px; border-radius: 12px; font-size: 0.85em; margin-right: 8px;">Timeline: 2014-2018</span>
    <span style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1a1a2e; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">Scale: $0 to $11B revenue, 3 to 600+ cities</span>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
    <div style="background: linear-gradient(135deg, #2d3561 0%, #1e2a4a 100%); border-radius: 10px; padding: 16px;">
      <h4 style="color: #4facfe; margin: 0 0 10px 0;">Before State (2014)</h4>
      <div style="color: #c0c0c0; font-size: 0.9em; margin-bottom: 10px;">Two Python monoliths: API & Dispatch</div>
      <div style="background: rgba(255,65,108,0.2); border-radius: 8px; padding: 10px;">
        <div style="color: #ff6b6b; font-weight: 600; margin-bottom: 6px;">Problems:</div>
        <ul style="color: #e0e0e0; margin: 0; padding-left: 16px; font-size: 0.85em;">
          <li>Deployment took 1 hour, frequent rollbacks</li>
          <li>All engineers worked on same codebase</li>
          <li>Dispatch changes could break payments</li>
          <li>Couldn't scale dispatch independently</li>
        </ul>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 10px 0;">Domain-Driven Decomposition</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8em;">
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px;">
          <div style="color: #4facfe; font-weight: 600;">Marketplace</div>
          <div style="color: #e0e0ff;">Dispatch, Pricing, Surge, Matching</div>
        </div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px;">
          <div style="color: #4facfe; font-weight: 600;">Platform</div>
          <div style="color: #e0e0ff;">Geospatial, Maps, Notifications</div>
        </div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px;">
          <div style="color: #4facfe; font-weight: 600;">Payments</div>
          <div style="color: #e0e0ff;">Billing, Invoicing, Fraud</div>
        </div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px;">
          <div style="color: #4facfe; font-weight: 600;">Identity</div>
          <div style="color: #e0e0ff;">Users, Auth, Authorization</div>
        </div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px;">
          <div style="color: #4facfe; font-weight: 600;">Trips</div>
          <div style="color: #e0e0ff;">Trip Service, Tracking, Rating</div>
        </div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px;">
          <div style="color: #4facfe; font-weight: 600;">Driver</div>
          <div style="color: #e0e0ff;">Onboarding, Earnings, Vehicles</div>
        </div>
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 10px; padding: 16px;">
      <h4 style="color: #1a1a2e; margin: 0 0 10px 0;">Technology Choices</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85em;">
        <div style="background: rgba(255,255,255,0.7); border-radius: 6px; padding: 8px;">
          <strong>Languages:</strong><br/>Go, Java, Node.js, Python
        </div>
        <div style="background: rgba(255,255,255,0.7); border-radius: 6px; padding: 8px;">
          <strong>Infrastructure:</strong><br/>gRPC, Kafka, K8s
        </div>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); border-radius: 10px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 10px 0;">Problems That Emerged (2018)</h4>
      <ul style="color: #ffe0e0; margin: 0; padding-left: 18px; font-size: 0.9em;">
        <li><strong style="color: #fff;">2,200+ microservices</strong></li>
        <li>Dependency hell & service sprawl</li>
        <li>Inconsistent patterns</li>
        <li>Debugging nightmares</li>
      </ul>
      <div style="color: #fff; font-style: italic; margin-top: 8px; font-size: 0.85em; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 6px;">"We went from 2 services everyone understood to 2000 services nobody understood"</div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
    <h4 style="color: #1a1a2e; margin: 0 0 12px 0;">The Correction (2018+): DOMA - Domain-Oriented Microservice Architecture</h4>
    <div style="display: flex; gap: 16px; align-items: center;">
      <div style="flex: 1;">
        <ol style="color: #1a1a2e; margin: 0; padding-left: 20px; font-size: 0.9em;">
          <li>Group services into domains</li>
          <li>Each domain has gateway service</li>
          <li>External communication only through gateway</li>
          <li>Domain teams own entire domain</li>
        </ol>
      </div>
      <div style="flex: 1; background: rgba(0,0,0,0.1); border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #666; font-size: 0.85em; margin-bottom: 8px;">External Request</div>
        <div style="font-size: 1.5em; color: #1a1a2e;">v</div>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 12px; border-radius: 8px; margin-top: 4px;">
          <strong>PAYMENTS DOMAIN</strong>
          <div style="font-size: 0.8em; margin-top: 4px; color: #e0e0ff;">Gateway | Billing | Invoice | Fraud</div>
        </div>
        <div style="color: #666; font-size: 0.75em; margin-top: 6px;">Internal services hidden from outside</div>
      </div>
    </div>
  </div>

  <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 12px;">
    <h4 style="color: #000; margin: 0 0 8px 0;"><span style="background: #000; color: #fff; padding: 2px 8px; border-radius: 4px;">Key Lessons:</span></h4>
    <ul style="color: #c0c0c0; margin: 0; padding-left: 20px; font-size: 0.9em; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
      <li>More services does not equal better architecture</li>
      <li>Domain boundaries matter more than service boundaries</li>
      <li>Standardization across services is essential</li>
      <li>Ownership should be at domain level</li>
      <li>Course correction is normal and expected</li>
    </ul>
  </div>
</div>

---

## Case Study 4: Shopify (2016-2020)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #95bf47; margin: 0 0 8px 0; font-size: 1.4em; text-align: center;">Case Study: Shopify's Modular Monolith</h3>
  <div style="text-align: center; color: #8b949e; margin-bottom: 24px;">
    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4px 12px; border-radius: 12px; font-size: 0.85em; margin-right: 8px;">Timeline: 2016-2020</span>
    <span style="background: linear-gradient(135deg, #95bf47 0%, #7ab535 100%); color: #1a1a2e; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">Scale: 1M+ stores, $300B+ GMV</span>
  </div>

  <!-- The Decision -->
  <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <h4 style="color: #fff; margin: 0 0 12px 0;">THE DECISION: NOT TO DO MICROSERVICES</h4>
    <div style="color: #ede9fe; margin-bottom: 16px; font-size: 0.9em;">In 2016, Shopify evaluated microservices and decided against them.</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 14px;">
        <div style="color: #fff; font-weight: 600; margin-bottom: 8px;">Reasons:</div>
        <ul style="color: #ede9fe; margin: 0; padding-left: 18px; font-size: 0.85em;">
          <li>Ruby on Rails monolith was working well</li>
          <li>Team was productive in monolith</li>
          <li>Operational complexity of microservices was too high</li>
          <li>Data consistency requirements were strong</li>
        </ul>
      </div>
      <div style="background: rgba(126,231,135,0.2); border-radius: 8px; padding: 14px; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
          <div style="color: #fff; font-size: 0.9em; margin-bottom: 8px;">Instead, they chose:</div>
          <div style="color: #7ee787; font-size: 1.3em; font-weight: 600;">MODULAR MONOLITH</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Component-Based Architecture -->
  <div style="background: rgba(88,166,255,0.15); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #58a6ff;">
    <h4 style="color: #58a6ff; margin: 0 0 16px 0;">THE APPROACH: COMPONENT-BASED ARCHITECTURE</h4>
    <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <div style="text-align: center; color: #58a6ff; font-weight: 600; margin-bottom: 16px;">SHOPIFY MONOLITH</div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px;">
        <div style="background: #238636; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="color: #fff; font-weight: 600;">Shop</div>
          <div style="color: #d1fae5; font-size: 0.75em;">Component</div>
        </div>
        <div style="background: #1f6feb; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="color: #fff; font-weight: 600;">Checkout</div>
          <div style="color: #dbeafe; font-size: 0.75em;">Component</div>
        </div>
        <div style="background: #f97316; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="color: #fff; font-weight: 600;">Orders</div>
          <div style="color: #fed7aa; font-size: 0.75em;">Component</div>
        </div>
        <div style="background: #8957e5; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="color: #fff; font-weight: 600;">Products</div>
          <div style="color: #ede9fe; font-size: 0.75em;">Component</div>
        </div>
      </div>
      <div style="text-align: center; color: #8b949e; font-size: 0.85em; margin-bottom: 12px;">| PUBLIC INTERFACES ONLY |</div>
      <div style="background: #95bf47; border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #fff; font-weight: 600;">SHARED DATABASE</div>
      </div>
    </div>
    <div style="color: #8b949e; font-size: 0.9em;">
      <strong style="color: #58a6ff;">Rules:</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 20px;">
        <li>Components communicate through defined public interfaces</li>
        <li>No reaching into another component's internals</li>
        <li>Database tables are owned by components</li>
        <li>Violations are caught by automated tools</li>
      </ul>
    </div>
  </div>

  <!-- Packwerk -->
  <div style="background: rgba(249,115,22,0.15); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #f97316;">
    <h4 style="color: #f97316; margin: 0 0 16px 0;">PACKWERK: THE ENFORCEMENT TOOL</h4>
    <div style="color: #8b949e; margin-bottom: 12px; font-size: 0.9em;">Shopify built Packwerk to enforce component boundaries:</div>
    <pre style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; margin: 0 0 16px 0; overflow-x: auto; font-size: 0.8em;"><code style="color: #e6edf3;"># package.yml in each component
enforce_privacy: true
enforce_dependencies: true

dependencies:
  - shop                   <span style="color: #8b949e;"># Can depend on shop component</span>
  - products               <span style="color: #8b949e;"># Can depend on products component</span>

public_path: app/public/   <span style="color: #8b949e;"># Only this folder is accessible</span></code></pre>
    <div style="background: rgba(248,81,73,0.2); border-radius: 8px; padding: 12px;">
      <div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">CI fails if:</div>
      <ul style="color: #8b949e; margin: 0; padding-left: 20px; font-size: 0.85em;">
        <li>Code accesses private methods of other components</li>
        <li>Code depends on undeclared components</li>
        <li>Circular dependencies are introduced</li>
      </ul>
    </div>
  </div>

  <!-- Selective Extraction -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
    <div style="background: rgba(137,87,229,0.15); border-radius: 12px; padding: 16px; border-left: 4px solid #8957e5;">
      <h4 style="color: #8957e5; margin: 0 0 12px 0;">EXTRACTED TO SERVICES</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.2); border-radius: 6px; padding: 8px; font-size: 0.85em;">
          <span style="color: #a371f7;">Storefront Renderer</span>
          <span style="color: #8b949e;">Different scaling needs</span>
        </div>
        <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.2); border-radius: 6px; padding: 8px; font-size: 0.85em;">
          <span style="color: #a371f7;">Identity</span>
          <span style="color: #8b949e;">Security isolation</span>
        </div>
        <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.2); border-radius: 6px; padding: 8px; font-size: 0.85em;">
          <span style="color: #a371f7;">Payments</span>
          <span style="color: #8b949e;">PCI compliance</span>
        </div>
        <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.2); border-radius: 6px; padding: 8px; font-size: 0.85em;">
          <span style="color: #a371f7;">Analytics</span>
          <span style="color: #8b949e;">Different data patterns</span>
        </div>
      </div>
    </div>
    <div style="background: rgba(126,231,135,0.15); border-radius: 12px; padding: 16px; border-left: 4px solid #7ee787;">
      <h4 style="color: #7ee787; margin: 0 0 12px 0;">KEPT IN MONOLITH</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
        <span style="background: #238636; border-radius: 6px; padding: 6px 12px; color: #fff; font-size: 0.85em;">Shop</span>
        <span style="background: #238636; border-radius: 6px; padding: 6px 12px; color: #fff; font-size: 0.85em;">Products</span>
        <span style="background: #238636; border-radius: 6px; padding: 6px 12px; color: #fff; font-size: 0.85em;">Orders</span>
        <span style="background: #238636; border-radius: 6px; padding: 6px 12px; color: #fff; font-size: 0.85em;">Checkout</span>
        <span style="background: #238636; border-radius: 6px; padding: 6px 12px; color: #fff; font-size: 0.85em;">Inventory</span>
      </div>
      <div style="color: #8b949e; font-size: 0.85em; font-style: italic;">(Core business logic that needs strong consistency)</div>
    </div>
  </div>

  <!-- Results -->
  <div style="background: linear-gradient(135deg, #95bf47 0%, #7ab535 100%); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <h4 style="color: #fff; margin: 0 0 12px 0;">RESULTS</h4>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 16px;">
      <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 10px; text-align: center;">
        <div style="color: #fff; font-weight: 600; font-size: 1.1em;">3M+</div>
        <div style="color: #d1fae5; font-size: 0.75em;">lines of Ruby code</div>
      </div>
      <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 10px; text-align: center;">
        <div style="color: #fff; font-weight: 600; font-size: 1.1em;">500+</div>
        <div style="color: #d1fae5; font-size: 0.75em;">engineers</div>
      </div>
      <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 10px; text-align: center;">
        <div style="color: #fff; font-weight: 600; font-size: 1.1em;">Black Friday</div>
        <div style="color: #d1fae5; font-size: 0.75em;">traffic handled</div>
      </div>
      <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 10px; text-align: center;">
        <div style="color: #fff; font-weight: 600; font-size: 1.1em;">Multiple</div>
        <div style="color: #d1fae5; font-size: 0.75em;">deploys/day</div>
      </div>
      <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 10px; text-align: center;">
        <div style="color: #fff; font-weight: 600; font-size: 1.1em;">Simple</div>
        <div style="color: #d1fae5; font-size: 0.75em;">debugging</div>
      </div>
    </div>
    <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 12px; text-align: center;">
      <div style="color: #d1fae5; font-style: italic; font-size: 0.9em;">"The modular monolith gives us the benefits of microservices (clear boundaries, team ownership) without the costs (network latency, distributed transactions)"</div>
    </div>
  </div>

  <!-- Key Lessons -->
  <div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 4px solid #58a6ff;">
    <h4 style="color: #58a6ff; margin: 0 0 12px 0;">KEY LESSONS</h4>
    <ul style="color: #8b949e; margin: 0; padding-left: 20px; font-size: 0.9em; columns: 2; column-gap: 20px;">
      <li>Microservices are not the only path to scaling</li>
      <li>Modular monolith can handle massive scale</li>
      <li>Enforce boundaries with tooling, not just convention</li>
      <li>Extract services selectively based on real needs</li>
      <li>Consistency is easier with shared database</li>
    </ul>
  </div>
</div>

---

## Migration Pattern Summary

| Company | Original | Target | Duration | Key Pattern |
|---------|----------|--------|----------|-------------|
| **Amazon** | Monolith | Microservices | 5 years | Mandate from top, API-first |
| **Netflix** | Data center | Cloud + Microservices | 8 years | Strangler fig, OSS tooling |
| **Uber** | 2 monoliths | 2000+ services → DOMA | 4 years | Over-decomposed, then domain-grouped |
| **Shopify** | Monolith | Modular Monolith | Ongoing | Enforced boundaries, selective extraction |

---

## Key Takeaways

1. **There's no one-size-fits-all** - Amazon, Netflix chose microservices; Shopify chose modular monolith
2. **Migrations take years** - Netflix took 8 years, Amazon took 5 years
3. **Over-decomposition is common** - Uber went from 2 to 2000 services, then reorganized
4. **Tooling is essential** - Netflix built OSS tools, Shopify built Packwerk
5. **Leadership support is crucial** - Amazon's mandate, Netflix's cloud commitment
6. **Course correction is normal** - Uber's DOMA restructuring
7. **Start with the end in mind** - Define domains before decomposing
