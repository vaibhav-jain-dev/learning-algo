# Design The Twitch API

## Overview

A live streaming platform enables creators to broadcast video content to millions of concurrent viewers with real-time chat interaction. The architecture must handle <span style="color:#00ff00">**video ingest**</span>, <span style="color:#00ff00">**real-time transcoding**</span>, <span style="color:#00ff00">**global CDN delivery**</span>, <span style="color:#00ff00">**WebSocket-based chat**</span>, and <span style="color:#00ff00">**personalized recommendations**</span>.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: #1e293b;">
<h4 style="margin-top: 0; color: #1e293b; font-size: 18px;">Core Equation</h4>
<div style="font-family: 'Courier New', monospace; font-size: 16px; background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; text-align: center;">
    Streaming Platform = Ingest + Transcode + CDN Delivery + Real-time Chat + VOD Storage + Recommendations
</div>
</div>

**Critical Assumption**: The platform assumes viewers have variable network conditions. <span style="color:#00ff00">**Adaptive bitrate streaming (ABR)**</span> allows seamless quality switching without rebuffering. If network is stable, this complexity adds overhead.

**Key Trade-off**: Latency vs. Stability. Lower latency means smaller buffers and more rebuffering risk. Higher latency provides stable playback but reduces interactivity. This trade-off drives most streaming architecture decisions.

---

## Core Requirements

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #9146ff;">

  ### Functional Requirements
  - **Live Streaming**: Ingest RTMP, transcode to multiple qualities, deliver via HLS/DASH
  - **Real-time Chat**: Channel chat with sub-second delivery, moderation, emotes
  - **Subscriptions**: Paid subscriber tiers with benefits (emotes, badges, ad-free)
  - **VOD**: Video on demand from past streams with full playback
  - **Clips**: Short highlights extracted from live streams
  - **Discovery**: Browse categories, search, personalized recommendations

  ### Non-Functional Requirements
  - **Scale**: 100K+ concurrent streamers, 15M+ concurrent viewers
  - **Latency**: 3-15 seconds stream latency, <100ms chat latency
  - **Availability**: 99.99% for video delivery, 99.9% for chat
  - **Global**: Low-latency access from any geography

</div>

---

## Section 1: High-Level Architecture

### System Components Overview

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">TWITCH STREAMING ARCHITECTURE</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- Broadcaster -->
<div style="display: flex; justify-content: center;">
<div style="background: linear-gradient(135deg, #9146ff 0%, #772ce8 100%); padding: 16px 32px; border-radius: 12px; text-align: center; color: #1e293b;">
<strong style="font-size: 16px;">BROADCASTER</strong>
<p style="margin: 8px 0 0 0; font-size: 12px; opacity: 0.9;">OBS / Streamlabs / Hardware Encoder</p>
<p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.7;">RTMP Push to Ingest</p>
</div>
</div>

<div style="text-align: center; color: #9146ff; font-size: 24px;">↓</div>

    <!-- Ingest Layer -->
<div style="background: rgba(145, 70, 255, 0.1); border: 2px solid #9146ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #9146ff; margin: 0 0 16px 0; text-align: center;">INGEST LAYER (Edge Locations)</h5>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #475569; font-size: 12px;">US-EAST</span><br>
<span style="color: #1e293b; font-size: 11px;">ingest-iad.twitch.tv</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #475569; font-size: 12px;">US-WEST</span><br>
<span style="color: #1e293b; font-size: 11px;">ingest-lax.twitch.tv</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #475569; font-size: 12px;">EU-WEST</span><br>
<span style="color: #1e293b; font-size: 11px;">ingest-ams.twitch.tv</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #475569; font-size: 12px;">AP-NORTHEAST</span><br>
<span style="color: #1e293b; font-size: 11px;">ingest-tyo.twitch.tv</span>
</div>
</div>
</div>

<div style="text-align: center; color: #f0883e; font-size: 24px;">↓</div>

            <!-- Media Processing -->
<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px;">
<h5 style="color: #f0883e; margin: 0 0 16px 0; text-align: center;">MEDIA PROCESSING (GPU Clusters)</h5>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
<strong style="color: #f0883e;">Transcoder</strong>
<p style="color: #475569; font-size: 12px; margin: 8px 0 0 0;">Real-time encoding to multiple quality levels (1080p60, 720p60, 480p30, 360p30, 160p)</p>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
<strong style="color: #f0883e;">Packager</strong>
<p style="color: #475569; font-size: 12px; margin: 8px 0 0 0;">Segment into HLS (.m3u8 + .ts) with 2-4 second segments for CDN delivery</p>
</div>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 100px;">
<div style="text-align: center; color: #58a6ff; font-size: 24px;">↓</div>
<div style="text-align: center; color: #3fb950; font-size: 24px;">↓</div>
</div>

            <!-- Origin + VOD -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(88, 166, 255, 0.1); border: 2px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #58a6ff; margin: 0 0 12px 0; text-align: center;">ORIGIN SERVERS</h5>
<p style="color: #475569; font-size: 12px; text-align: center; margin: 0;">Live segment cache, playlist generation, CDN origin pull</p>
</div>
<div style="background: rgba(63, 185, 80, 0.1); border: 2px solid #3fb950; border-radius: 12px; padding: 20px;">
<h5 style="color: #3fb950; margin: 0 0 12px 0; text-align: center;">VOD STORAGE (S3)</h5>
<p style="color: #475569; font-size: 12px; text-align: center; margin: 0;">Archived streams, clips, thumbnails, metadata</p>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px;">↓</div>

            <!-- CDN Layer -->
<div style="background: rgba(88, 166, 255, 0.1); border: 2px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #58a6ff; margin: 0 0 16px 0; text-align: center;">CDN EDGE LAYER (100+ PoPs Globally)</h5>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #f8fafc; padding: 8px 16px; border-radius: 8px;">
<span style="color: #1e293b; font-size: 11px;">Edge PoP 1</span>
</div>
<div style="background: #f8fafc; padding: 8px 16px; border-radius: 8px;">
<span style="color: #1e293b; font-size: 11px;">Edge PoP 2</span>
</div>
<div style="background: #f8fafc; padding: 8px 16px; border-radius: 8px;">
<span style="color: #1e293b; font-size: 11px;">Edge PoP 3</span>
</div>
<div style="background: #f8fafc; padding: 8px 16px; border-radius: 8px;">
<span style="color: #1e293b; font-size: 11px;">...</span>
</div>
<div style="background: #f8fafc; padding: 8px 16px; border-radius: 8px;">
<span style="color: #1e293b; font-size: 11px;">Edge PoP N</span>
</div>
</div>
<p style="color: #58a6ff; font-size: 11px; text-align: center; margin: 12px 0 0 0;">~95% cache hit rate for popular streams</p>
</div>

<div style="text-align: center; color: #1e293b; font-size: 24px;">↓</div>

            <!-- Viewers -->
<div style="display: flex; justify-content: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 48px; border-radius: 12px; text-align: center; color: #1e293b;">
<strong style="font-size: 16px;">VIEWERS (Millions)</strong>
<p style="margin: 8px 0 0 0; font-size: 12px; opacity: 0.9;">HLS playback via native player or hls.js</p>
</div>
</div>
</div>
</div>

        ### Related Concepts

        This architecture leverages [[CDN]](/topic/system-design/cdn) for edge caching, [[message-queues]](/topic/system-design/message-queues) for chat distribution, [[load-balancing]](/topic/system-design/load-balancing) for ingest server selection, and [[rate-limiting]](/topic/system-design/rate-limiting) for chat flood protection.

        ---

        ## Section 2: Live Streaming Pipeline

        ### Deep Mechanics

The live streaming pipeline transforms a single <span style="color:#00ff00">**RTMP stream**</span> from the broadcaster into multiple <span style="color:#00ff00">**HLS streams**</span> at different quality levels, delivered globally through CDN edge servers. The pipeline operates in real-time with strict latency budgets.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">VIDEO PROCESSING PIPELINE</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">
            <!-- Ingest Stage -->
<div style="background: rgba(145, 70, 255, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #9146ff;">
<h5 style="color: #9146ff; margin: 0 0 12px 0;">STAGE 1: INGEST (from broadcaster)</h5>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<p style="color: #475569; font-size: 13px; margin: 0;"><strong style="color: #1e293b;">Protocol:</strong> RTMP (Real-Time Messaging Protocol)</p>
<p style="color: #475569; font-size: 13px; margin: 8px 0 0 0;"><strong style="color: #1e293b;">Input:</strong> 1080p60, 6000 kbps, x264/NVENC</p>
<p style="color: #475569; font-size: 13px; margin: 8px 0 0 0;"><strong style="color: #1e293b;">Auth:</strong> Stream key validation</p>
</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px;">
<span style="color: #16a34a;">rtmp://ingest-nyc.twitch.tv/app/</span><br>
<span style="color: #475569;">live_abc123_streamkey</span>
</div>
</div>
</div>

              <!-- Transcode Stage -->
<div style="background: rgba(240, 136, 62, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
<h5 style="color: #f0883e; margin: 0 0 12px 0;">STAGE 2: TRANSCODE (real-time ABR ladder)</h5>
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 12px;">
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #f0883e; font-weight: bold; font-size: 14px;">1080p60</span><br>
<span style="color: #475569; font-size: 11px;">6000 kbps</span><br>
<span style="color: #58a6ff; font-size: 10px;">Source</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #f0883e; font-weight: bold; font-size: 14px;">720p60</span><br>
<span style="color: #475569; font-size: 11px;">3000 kbps</span><br>
<span style="color: #58a6ff; font-size: 10px;">High</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #f0883e; font-weight: bold; font-size: 14px;">480p30</span><br>
<span style="color: #475569; font-size: 11px;">1500 kbps</span><br>
<span style="color: #58a6ff; font-size: 10px;">Medium</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #f0883e; font-weight: bold; font-size: 14px;">360p30</span><br>
<span style="color: #475569; font-size: 11px;">800 kbps</span><br>
<span style="color: #58a6ff; font-size: 10px;">Low</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #f0883e; font-weight: bold; font-size: 14px;">160p</span><br>
<span style="color: #475569; font-size: 11px;">400 kbps</span><br>
<span style="color: #58a6ff; font-size: 10px;">Audio-only</span>
</div>
</div>
<p style="color: #475569; font-size: 12px; margin: 12px 0 0 0;"><strong style="color: #1e293b;">Note:</strong> Partners get full ladder. Affiliates get limited transcodes. Regular streamers may get source-only.</p>
</div>

                                  <!-- Package Stage -->
<div style="background: rgba(88, 166, 255, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<h5 style="color: #58a6ff; margin: 0 0 12px 0;">STAGE 3: PACKAGE (HLS segmentation)</h5>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<p style="color: #475569; font-size: 13px; margin: 0;"><strong style="color: #1e293b;">Format:</strong> HLS (.m3u8 manifest + .ts segments)</p>
<p style="color: #475569; font-size: 13px; margin: 8px 0 0 0;"><strong style="color: #1e293b;">Segment Duration:</strong> 2-4 seconds (normal), 1-2s (low-latency)</p>
<p style="color: #475569; font-size: 13px; margin: 8px 0 0 0;"><strong style="color: #1e293b;">Latency:</strong> 10-15s normal, 3-5s low-latency mode</p>
</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px;">
<span style="color: #16a34a;">#EXTM3U</span><br>
<span style="color: #475569;">#EXT-X-VERSION:3</span><br>
<span style="color: #475569;">#EXT-X-TARGETDURATION:4</span><br>
<span style="color: #475569;">#EXTINF:4.000,</span><br>
<span style="color: #58a6ff;">segment_00001.ts</span><br>
<span style="color: #475569;">#EXTINF:4.000,</span><br>
<span style="color: #58a6ff;">segment_00002.ts</span>
</div>
</div>
</div>
</div>
</div>

                                          ### Latency Stack Breakdown

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #166534; margin-top: 0;">Where Latency Comes From</h4>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: #1e293b; min-width: 120px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">Encoding</div>
<div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
<span style="color: #475569; font-size: 14px;"><strong>1-2 seconds</strong> - Broadcaster's encoder (OBS) buffers frames before sending</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: #1e293b; min-width: 120px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">Network</div>
<div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
<span style="color: #475569; font-size: 14px;"><strong>0.1-0.5 seconds</strong> - RTMP upload from broadcaster to ingest server</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: #1e293b; min-width: 120px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">Transcoding</div>
<div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
<span style="color: #475569; font-size: 14px;"><strong>1-2 seconds</strong> - GPU cluster processes and outputs multiple quality levels</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: #1e293b; min-width: 120px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">Segmentation</div>
<div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
<span style="color: #475569; font-size: 14px;"><strong>2-4 seconds</strong> - Must wait for full segment before it can be delivered</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: #1e293b; min-width: 120px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">CDN</div>
<div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
<span style="color: #475569; font-size: 14px;"><strong>0.1-0.5 seconds</strong> - Propagation from origin to edge + edge to viewer</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: #1e293b; min-width: 120px; padding: 8px 16px; border-radius: 8px; text-align: center; font-weight: bold;">Player Buffer</div>
<div style="flex: 1; background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
<span style="color: #475569; font-size: 14px;"><strong>4-8 seconds</strong> - Player buffers 2-3 segments before playback starts</span>
</div>
</div>
</div>
<div style="background: #dcfce7; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #166534;">Total:</strong>
<span style="color: #15803d;"> Normal mode: 10-15 seconds | Low-latency mode: 3-5 seconds (smaller segments, fewer buffered)</span>
</div>
</div>

                                          ### Live Streaming Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: Why does Twitch use HLS instead of WebRTC for live streaming?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> HLS (HTTP Live Streaming) uses HTTP-based segment delivery, which integrates seamlessly with existing <span style="color:#00ff00">**CDN infrastructure**</span>. A popular streamer with 100K viewers needs each video segment cached and served from edge locations globally. WebRTC is designed for peer-to-peer, low-latency scenarios (video calls) but doesn't have the CDN caching layer needed for broadcast. The economics are clear: serving 100K viewers at 5Mbps via WebRTC from origin = 500 Gbps from your servers. With CDN + HLS, that traffic is distributed across hundreds of edge PoPs with 95%+ cache hit rates.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you achieve sub-5-second latency with HLS when segments are 4 seconds long?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Standard HLS has 10-30 second latency because you wait for: segment encoding + upload + CDN propagation + player buffer (2-3 segments). <span style="color:#00ff00">**Low-Latency HLS (LL-HLS)**</span> attacks each component: (1) <strong>Partial Segments:</strong> Instead of waiting for full 4s segment, emit 200ms "parts" using <span style="color:#00ff00">**Chunked Transfer Encoding**</span>. (2) <strong>Playlist Delta Updates:</strong> Instead of re-fetching entire playlist, server pushes just the delta via HTTP/2 push. (3) <strong>Reduced Buffering:</strong> Player buffers 2-3 parts instead of 2-3 full segments. (4) <strong>Preload Hints:</strong> Playlist includes hints about next parts so player can request them early. Trade-off: Lower latency = more origin requests, less cache efficiency, more rebuffering on poor connections. See [[latency-throughput]](/topic/system-design/latency-throughput) for optimization strategies.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: A streamer in Australia is broadcasting to viewers in Europe. How do you minimize the latency disadvantage compared to local streamers?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Cross-continental streaming faces ~300ms network RTT just for physics. Minimize additional latency through: (1) <strong>Regional Ingest:</strong> Streamer connects to closest ingest server (Sydney). RTMP upload latency minimized. (2) <strong>Internal Backbone:</strong> Transcoded segments travel over optimized internal network (not public internet) from Sydney transcoding cluster to EU origin. Use dedicated fiber/peering arrangements. (3) <strong>Origin Replication:</strong> Push segments to EU origin servers proactively rather than waiting for CDN pull. EU origin serves EU edge PoPs. (4) <strong>Edge Pre-positioning:</strong> For popular streamers, pre-warm major edge PoPs by predicting where viewers will be based on historical data. (5) <strong>Anycast DNS:</strong> Viewers automatically routed to nearest edge PoP regardless of origin location. (6) <strong>Accept the floor:</strong> Physics sets a ~150ms minimum for AU-to-EU. Focus on not adding more. (7) <strong>Measure end-to-end:</strong> Track glass-to-glass latency per region. Alert on regression. Real implementation: Twitch maintains dedicated inter-region backbones and replicates segments to regional origin clusters.</p>
</div>
</div>
</div>

                                          ---

                                          ## Section 3: Real-Time Chat System

                                          ### Deep Mechanics

Chat at Twitch scale is a <span style="color:#00ff00">**massive fan-out problem**</span>: one message from a viewer must reach 100K+ connected clients in near real-time. The architecture uses hierarchical distribution with edge WebSocket servers consuming from a central message bus.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #a371f7; text-align: center; margin: 0 0 24px 0;">CHAT ARCHITECTURE FOR 100K+ VIEWERS</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">
                                              <!-- Chat Ingest -->
<div style="background: rgba(163, 113, 247, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #a371f7;">
<h5 style="color: #a371f7; margin: 0 0 12px 0;">CHAT INGEST SERVERS</h5>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #1e293b; font-size: 13px;">Validate</span><br>
<span style="color: #475569; font-size: 11px;">Auth, permissions</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #1e293b; font-size: 13px;">Rate Limit</span><br>
<span style="color: #475569; font-size: 11px;">1 msg/sec/user</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #1e293b; font-size: 13px;">Moderate</span><br>
<span style="color: #475569; font-size: 11px;">AutoMod, filters</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #1e293b; font-size: 13px;">Enrich</span><br>
<span style="color: #475569; font-size: 11px;">Badges, emotes</span>
</div>
</div>
</div>

<div style="text-align: center; color: #a371f7; font-size: 24px;">↓</div>

                                                      <!-- Message Queue -->
<div style="background: rgba(240, 136, 62, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
<h5 style="color: #f0883e; margin: 0 0 12px 0;">MESSAGE QUEUE (Kafka)</h5>
<p style="color: #475569; font-size: 13px; margin: 0;"><strong style="color: #1e293b;">Topic:</strong> chat.{channel_id} | <strong style="color: #1e293b;">Partitions:</strong> By user_id % N | <strong style="color: #1e293b;">Retention:</strong> 2 hours</p>
<p style="color: #475569; font-size: 12px; margin: 8px 0 0 0;">Provides ordered delivery, durability, and decouples ingest from distribution</p>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px;">↓</div>

                                                      <!-- Edge WebSocket Servers -->
<div style="background: rgba(88, 166, 255, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<h5 style="color: #58a6ff; margin: 0 0 16px 0;">EDGE WEBSOCKET SERVERS</h5>
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;">
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #58a6ff; font-weight: bold;">WS Server 1</span><br>
<span style="color: #475569; font-size: 11px;">10K connections</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #58a6ff; font-weight: bold;">WS Server 2</span><br>
<span style="color: #475569; font-size: 11px;">10K connections</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #58a6ff; font-weight: bold;">WS Server 3</span><br>
<span style="color: #475569; font-size: 11px;">10K connections</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #475569; font-weight: bold;">...</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #58a6ff; font-weight: bold;">WS Server N</span><br>
<span style="color: #475569; font-size: 11px;">10K connections</span>
</div>
</div>
<p style="color: #58a6ff; font-size: 12px; text-align: center; margin: 12px 0 0 0;">For 100K viewer stream → ~10 edge servers needed</p>
</div>

<div style="text-align: center; color: #3fb950; font-size: 24px;">↓</div>

                                                              <!-- Viewers -->
<div style="display: flex; justify-content: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 48px; border-radius: 12px; text-align: center; color: #1e293b;">
<strong style="font-size: 16px;">VIEWERS (100K+)</strong>
<p style="margin: 8px 0 0 0; font-size: 12px; opacity: 0.9;">WebSocket connection to nearest edge server</p>
</div>
</div>
</div>
</div>

                                                          ### Chat Implementation

                                                          ```python
                                                          class ChatService:
                                                          """
                                                          Production chat service with rate limiting and moderation.

                                                          Key Design Decisions:
                                                          - Messages are ephemeral (not persisted long-term)
                                                          - Eventually consistent delivery is acceptable
                                                          - Fan-out happens at edge, not origin
                                                          """

                                                          def __init__(self, kafka_producer, redis_client):
                                                          self.kafka = kafka_producer
                                                          self.redis = redis_client

                                                          async def send_message(
                                                          self,
                                                          channel_id: str,
                                                          user_id: str,
                                                          message: str,
                                                          context: ChatContext
                                                          ) -> ChatMessage:
                                                          # Step 1: Rate limit check (1 message/second/user)
                                                          rate_key = f"chat:rate:{channel_id}:{user_id}"
                                                          if not await self.check_rate_limit(rate_key, limit=1, window=1):
                                                          raise RateLimitExceeded("Slow down! 1 message per second.")

                                                          # Step 2: Check restrictions (banned, timed out)
                                                          restrictions = await self.get_restrictions(channel_id, user_id)
                                                          if restrictions.is_banned:
                                                          raise UserBanned(restrictions.ban_reason)
                                                          if restrictions.is_timed_out:
                                                          raise UserTimedOut(restrictions.timeout_remaining)

                                                          # Step 3: Moderation pipeline
                                                          moderation_result = await self.moderate_message(
                                                          channel_id, message, context
                                                          )
                                                          if moderation_result.blocked:
                                                          raise MessageBlocked(moderation_result.reason)

                                                          # Step 4: Enrich with badges, emotes
                                                          enriched = ChatMessage(
                                                          id=str(uuid4()),
                                                          channel_id=channel_id,
                                                          user_id=user_id,
                                                          username=context.username,
                                                          message=moderation_result.filtered_message,
                                                          badges=await self.get_user_badges(user_id, channel_id),
                                                          emotes=self.parse_emotes(message),
                                                          timestamp=time.time(),
                                                          color=context.chat_color,
                                                          )

                                                          # Step 5: Publish to Kafka for distribution
                                                          await self.kafka.send(
                                                          topic=f"chat.{channel_id}",
                                                          key=user_id.encode(),  # Partition by user for ordering
                                                          value=enriched.to_json().encode(),
                                                          )

                                                          return enriched

                                                          async def moderate_message(
                                                          self,
                                                          channel_id: str,
                                                          message: str,
                                                          context: ChatContext
                                                          ) -> ModerationResult:
                                                          """
                                                          Multi-layer moderation pipeline:
                                                          1. Channel-specific blocked terms
                                                          2. Global blocked terms
                                                          3. AutoMod ML model
                                                          4. Spam detection
                                                          """
                                                          # Check channel-specific filters
                                                          channel_filters = await self.redis.smembers(f"filters:{channel_id}")
                                                          for term in channel_filters:
                                                          if term.lower() in message.lower():
                                                          return ModerationResult(blocked=True, reason="blocked_term")

                                                          # AutoMod check (ML-based content moderation)
                                                          automod_result = await self.automod.check(message, context)
                                                          if automod_result.score > context.automod_threshold:
                                                          # Hold for mod review instead of blocking
                                                          await self.queue_for_review(channel_id, message, automod_result)
                                                          return ModerationResult(blocked=True, reason="automod_held")

                                                          # R9K duplicate check (prevents spam)
                                                          if context.r9k_enabled:
                                                          message_hash = hashlib.md5(message.lower().encode()).hexdigest()
                                                          if await self.redis.sismember(f"r9k:{channel_id}", message_hash):
                                                          return ModerationResult(blocked=True, reason="duplicate_message")
                                                          await self.redis.sadd(f"r9k:{channel_id}", message_hash)
                                                          await self.redis.expire(f"r9k:{channel_id}", 3600)

                                                          return ModerationResult(blocked=False, filtered_message=message)
                                                          ```

                                                          ### Edge WebSocket Server

                                                          ```python
                                                          class EdgeChatServer:
                                                          """
                                                          Edge server holding 10K+ WebSocket connections.
                                                          Consumes from Kafka and broadcasts to connected clients.
                                                          """

                                                          def __init__(self, kafka_consumer, max_connections: int = 10000):
                                                          self.kafka = kafka_consumer
                                                          self.max_connections = max_connections

                                                          # channel_id -> set of WebSocket connections
                                                          self.subscriptions: Dict[str, Set[WebSocket]] = defaultdict(set)

                                                          # Connection tracking
                                                          self.connections: Dict[str, WebSocket] = {}

                                                          async def handle_connection(self, websocket: WebSocket, user_id: str):
                                                          """Handle new WebSocket connection."""
                                                          if len(self.connections) >= self.max_connections:
                                                          await websocket.close(code=1013, reason="Server at capacity")
                                                          return

                                                          self.connections[user_id] = websocket

                                                          try:
                                                          async for message in websocket:
                                                          await self.handle_client_message(websocket, user_id, message)
                                                          finally:
                                                          self.cleanup_connection(user_id)

                                                          async def handle_client_message(
                                                          self,
                                                          websocket: WebSocket,
                                                          user_id: str,
                                                          message: str
                                                          ):
                                                          """Handle JOIN/PART commands from client."""
                                                          data = json.loads(message)

                                                          if data["type"] == "JOIN":
                                                          channel_id = data["channel_id"]
                                                          self.subscriptions[channel_id].add(websocket)

                                                          # Send recent messages (last 50)
                                                          recent = await self.get_recent_messages(channel_id, limit=50)
                                                          await websocket.send(json.dumps({
                                                          "type": "RECENT_MESSAGES",
                                                          "messages": recent
                                                          }))

                                                          elif data["type"] == "PART":
                                                          channel_id = data["channel_id"]
                                                          self.subscriptions[channel_id].discard(websocket)

                                                          async def consume_messages(self):
                                                          """
                                                          Consume from Kafka and broadcast to subscribed connections.
                                                          This is the core fan-out loop.
                                                          """
                                                          async for record in self.kafka:
                                                          channel_id = record.topic.split(".")[-1]  # chat.{channel_id}
                                                          message = json.loads(record.value)

                                                          # Get all WebSocket connections subscribed to this channel
                                                          subscribers = self.subscriptions.get(channel_id, set())

                                                          if not subscribers:
                                                          continue

                                                          # Broadcast to all subscribers concurrently
                                                          payload = json.dumps({
                                                          "type": "MESSAGE",
                                                          "data": message
                                                          })

                                                          # Use gather for concurrent sends, handle failures gracefully
                                                          await asyncio.gather(
                                                          *[self.safe_send(ws, payload) for ws in subscribers],
                                                          return_exceptions=True
                                                          )

                                                          async def safe_send(self, websocket: WebSocket, payload: str):
                                                          """Send with error handling - remove dead connections."""
                                                          try:
                                                          await asyncio.wait_for(websocket.send(payload), timeout=5.0)
                                                          except (ConnectionClosed, asyncio.TimeoutError):
                                                          # Connection dead - will be cleaned up
                                                          pass
                                                          ```

                                                          ### Chat Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: How do you scale chat for 100K+ concurrent viewers in a single channel?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The core challenge is <span style="color:#00ff00">**fan-out**</span>: one message needs to reach 100K connected clients. You can't have one server holding 100K WebSocket connections. The architecture is hierarchical: (1) <strong>Chat Ingest Layer</strong> receives messages, validates, rate-limits, applies moderation. (2) <strong>Message Queue (Kafka)</strong> provides topic per channel, ordered delivery, handles burst writes. (3) <strong>Edge WebSocket Servers</strong> each hold ~10K connections, consume from Kafka, broadcast to connected users. For 100K viewers, you need ~10 edge servers. Key insight: chat is <span style="color:#00ff00">**eventually consistent**</span> - if message delivery is delayed 100ms between edge servers, nobody notices.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle a chat message storm during a viral moment (streamer wins tournament)?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Viral moments cause chat to spike 10-100x normal volume. Multiple mitigation layers: (1) <strong>Slow Mode:</strong> Force N seconds between messages per user - reduces eligible senders. (2) <strong>Sub-only Mode:</strong> Only subscribers can chat - dramatic reduction in volume. (3) <strong>Client-side Throttling:</strong> Player shows subset of messages to prevent UI lag. Client randomly samples messages above threshold. (4) <strong>R9K Mode:</strong> Block duplicate/similar messages - prevents copy-paste spam. (5) <strong>Graceful Degradation:</strong> Under extreme load, delay messages rather than drop them. Queue depth alerts trigger auto-slow-mode. (6) <strong>Edge Server Scaling:</strong> Auto-scale WebSocket servers based on connection count and CPU. Use [[rate-limiting]](/topic/system-design/rate-limiting) patterns at multiple layers.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: A user is connected to Edge Server A but sends a message. How does that message reach users connected to Edge Server B, and how do you ensure ordering?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires understanding the full message flow and consistency model. (1) <strong>Message Path:</strong> User on Edge A sends message -> Chat Ingest Server (not Edge A!) validates and writes to Kafka -> All Edge Servers (A, B, C...) consume from Kafka and broadcast. Edge servers are <em>read-only distributors</em>, not message originators. (2) <strong>Ordering Guarantee:</strong> Kafka provides <span style="color:#00ff00">**partition-level ordering**</span>. We partition by user_id, so messages from same user are ordered. Messages from different users may be reordered between edges - this is acceptable for chat. (3) <strong>Cross-Edge Consistency:</strong> Edge A and Edge B consume from the same Kafka topic but may be at different offsets (one is behind). This means User X on Edge A might see a message before User Y on Edge B. Acceptable delay is ~100ms. (4) <strong>Total Ordering Alternative:</strong> If strict ordering required (e.g., auction), use single partition or sequence numbers. But this limits throughput. (5) <strong>Edge Case - Message Dedup:</strong> If Kafka consumer restarts, it may re-deliver messages. Edge servers must deduplicate by message ID to prevent duplicates. Use bloom filter or small LRU cache of recent message IDs.</p>
</div>
</div>
</div>

                                                          ---

                                                          ## Section 4: VOD Storage and Clips

                                                          ### Deep Mechanics

<span style="color:#00ff00">**VOD (Video on Demand)**</span> stores past broadcasts for later viewing. Unlike live streaming where segments are ephemeral, VOD requires long-term storage with efficient retrieval. <span style="color:#00ff00">**Clips**</span> are short highlights extracted from live or VOD content.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #3fb950; text-align: center; margin: 0 0 24px 0;">VOD STORAGE ARCHITECTURE</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">
                                                              <!-- Live Pipeline -->
<div style="display: flex; gap: 20px; align-items: stretch;">
<div style="background: rgba(145, 70, 255, 0.15); border: 2px solid #9146ff; border-radius: 12px; padding: 20px; flex: 1;">
<h5 style="color: #9146ff; margin: 0 0 12px 0;">LIVE PIPELINE</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">During stream, segments are cached in memory/SSD for low-latency delivery</p>
</div>
<div style="display: flex; align-items: center; color: #3fb950; font-size: 24px;">→</div>
<div style="background: rgba(63, 185, 80, 0.15); border: 2px solid #3fb950; border-radius: 12px; padding: 20px; flex: 1;">
<h5 style="color: #3fb950; margin: 0 0 12px 0;">VOD ARCHIVE</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">After stream ends, segments are archived to object storage (S3)</p>
</div>
</div>

                                                              <!-- Storage Tiers -->
<div style="background: rgba(63, 185, 80, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #3fb950;">
<h5 style="color: #3fb950; margin: 0 0 16px 0;">TIERED STORAGE</h5>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
<span style="color: #3fb950; font-weight: bold;">HOT (0-7 days)</span><br>
<span style="color: #475569; font-size: 12px;">S3 Standard</span><br>
<span style="color: #1e293b; font-size: 11px; margin-top: 8px; display: block;">$0.023/GB/month</span>
<span style="color: #475569; font-size: 11px;">Most replays happen in first week</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
<span style="color: #f0883e; font-weight: bold;">WARM (7-60 days)</span><br>
<span style="color: #475569; font-size: 12px;">S3 Standard-IA</span><br>
<span style="color: #1e293b; font-size: 11px; margin-top: 8px; display: block;">$0.0125/GB/month</span>
<span style="color: #475569; font-size: 11px;">Infrequent access, fast retrieval</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
<span style="color: #475569; font-weight: bold;">COLD (60+ days)</span><br>
<span style="color: #475569; font-size: 12px;">S3 Glacier</span><br>
<span style="color: #1e293b; font-size: 11px; margin-top: 8px; display: block;">$0.004/GB/month</span>
<span style="color: #475569; font-size: 11px;">Archive, retrieval takes minutes</span>
</div>
</div>
</div>

                                                                          <!-- VOD Structure -->
<div style="background: rgba(88, 166, 255, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<h5 style="color: #58a6ff; margin: 0 0 12px 0;">VOD DATA STRUCTURE</h5>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px;">
<span style="color: #16a34a;">s3://twitch-vods/</span><br>
<span style="color: #475569;">  ├── {channel_id}/</span><br>
<span style="color: #475569;">  │   ├── {vod_id}/</span><br>
<span style="color: #58a6ff;">  │   │   ├── manifest.m3u8</span><br>
<span style="color: #58a6ff;">  │   │   ├── 1080p60/</span><br>
<span style="color: #475569;">  │   │   │   ├── 00001.ts</span><br>
<span style="color: #475569;">  │   │   │   ├── 00002.ts</span><br>
<span style="color: #475569;">  │   │   │   └── ...</span><br>
<span style="color: #58a6ff;">  │   │   ├── 720p60/</span><br>
<span style="color: #58a6ff;">  │   │   ├── thumbnails/</span><br>
<span style="color: #58a6ff;">  │   │   └── metadata.json</span>
</div>
<div>
<p style="color: #475569; font-size: 13px; margin: 0;"><strong style="color: #1e293b;">Typical VOD Size:</strong></p>
<p style="color: #475569; font-size: 12px; margin: 4px 0;">4-hour stream @ 1080p60 = ~50GB</p>
<p style="color: #475569; font-size: 12px; margin: 4px 0;">With all quality levels = ~100GB</p>
<p style="color: #475569; font-size: 13px; margin: 16px 0 0 0;"><strong style="color: #1e293b;">Retention:</strong></p>
<p style="color: #475569; font-size: 12px; margin: 4px 0;">Partners: 60 days</p>
<p style="color: #475569; font-size: 12px; margin: 4px 0;">Turbo/Prime: 60 days</p>
<p style="color: #475569; font-size: 12px; margin: 4px 0;">Regular: 14 days</p>
</div>
</div>
</div>
</div>
</div>

                                                                                          ### Clip Creation System

                                                                                          ```go
                                                                                          // Real-time clip extraction from live stream or VOD
                                                                                          type ClipService struct {
                                                                                          segmentStore  SegmentStore     // In-memory/SSD cache of recent segments
                                                                                          vodStore      VODStore         // S3 for archived content
                                                                                          processQueue  *WorkQueue       // Async clip processing
                                                                                          metadata      MetadataStore    // PostgreSQL for clip metadata
                                                                                          }

                                                                                          func (c *ClipService) CreateClip(req ClipRequest) (*Clip, error) {
                                                                                          // Validate: clips are 5-60 seconds
                                                                                          if req.Duration < 5 || req.Duration > 60 {
                                                                                          return nil, ErrInvalidDuration
                                                                                          }

                                                                                          // Calculate time range
                                                                                          // If from live stream, use current time - offset
                                                                                          // If from VOD, use VOD timestamp
                                                                                          var startTime, endTime time.Time
                                                                                          if req.Source == SourceLive {
                                                                                          endTime = time.Now().Add(-time.Duration(req.Delay) * time.Second)
                                                                                          startTime = endTime.Add(-time.Duration(req.Duration) * time.Second)
                                                                                          } else {
                                                                                          startTime = req.VODTimestamp
                                                                                          endTime = startTime.Add(time.Duration(req.Duration) * time.Second)
                                                                                          }

                                                                                          // Get segments from appropriate store
                                                                                          var segments []*Segment
                                                                                          var err error

                                                                                          if req.Source == SourceLive {
                                                                                          // Recent segments in memory/SSD (kept for ~2 hours)
                                                                                          segments, err = c.segmentStore.GetRange(req.ChannelID, startTime, endTime)
                                                                                          } else {
                                                                                          // Fetch from S3
                                                                                          segments, err = c.vodStore.GetSegments(req.VODID, startTime, endTime)
                                                                                          }

                                                                                          if err != nil {
                                                                                          return nil, fmt.Errorf("failed to get segments: %w", err)
                                                                                          }

                                                                                          // Create clip record
                                                                                          clip := &Clip{
                                                                                          ID:           uuid.New().String(),
                                                                                          ChannelID:    req.ChannelID,
                                                                                          CreatorID:    req.UserID,
                                                                                          Title:        req.Title,
                                                                                          Duration:     req.Duration,
                                                                                          SourceType:   req.Source,
                                                                                          Status:       ClipStatusProcessing,
                                                                                          CreatedAt:    time.Now(),
                                                                                          }

                                                                                          // Save metadata immediately (clip is "created" but processing)
                                                                                          if err := c.metadata.SaveClip(clip); err != nil {
                                                                                          return nil, err
                                                                                          }

                                                                                          // Queue async processing (combine segments, generate thumbnail)
                                                                                          c.processQueue.Push(&ClipJob{
                                                                                          Clip:     clip,
                                                                                          Segments: segments,
                                                                                          })

                                                                                          // Return immediately - client polls for completion
                                                                                          return clip, nil
                                                                                          }

                                                                                          func (c *ClipService) ProcessClip(job *ClipJob) error {
                                                                                          // Step 1: Combine segments into single video file
                                                                                          // Uses FFmpeg to concatenate and trim to exact timestamps
                                                                                          combinedPath, err := c.combineSegments(job.Segments, job.Clip.Duration)
                                                                                          if err != nil {
                                                                                          return c.markFailed(job.Clip.ID, err)
                                                                                          }

                                                                                          // Step 2: Generate thumbnail at middle of clip
                                                                                          thumbnailPath, err := c.generateThumbnail(combinedPath)
                                                                                          if err != nil {
                                                                                          return c.markFailed(job.Clip.ID, err)
                                                                                          }

                                                                                          // Step 3: Upload to permanent storage
                                                                                          videoURL, err := c.vodStore.Upload(combinedPath, fmt.Sprintf("clips/%s/video.mp4", job.Clip.ID))
                                                                                          if err != nil {
                                                                                          return c.markFailed(job.Clip.ID, err)
                                                                                          }

                                                                                          thumbURL, err := c.vodStore.Upload(thumbnailPath, fmt.Sprintf("clips/%s/thumb.jpg", job.Clip.ID))
                                                                                          if err != nil {
                                                                                          return c.markFailed(job.Clip.ID, err)
                                                                                          }

                                                                                          // Step 4: Update metadata
                                                                                          return c.metadata.UpdateClip(job.Clip.ID, map[string]interface{}{
                                                                                          "status":        ClipStatusReady,
                                                                                          "video_url":     videoURL,
                                                                                          "thumbnail_url": thumbURL,
                                                                                          "processed_at":  time.Now(),
                                                                                          })
                                                                                          }
                                                                                          ```

                                                                                          ### VOD Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: How do you efficiently store VODs when a popular streamer broadcasts 8 hours daily?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> An 8-hour stream at 1080p60 with all quality levels is ~200GB. For a platform with 100K daily streams, that's petabytes per day. The solution is <span style="color:#00ff00">**tiered storage**</span>: (1) <strong>Hot tier (S3 Standard)</strong> for first 7 days - most VOD views happen in this window. (2) <strong>Warm tier (S3 Standard-IA)</strong> for days 7-60 - cheaper, retrieval still fast. (3) <strong>Cold tier (S3 Glacier)</strong> for 60+ days - very cheap, minutes to retrieve. (4) <strong>Retention limits:</strong> Regular users get 14 days, Partners get 60 days. Automatic deletion prevents unbounded growth. (5) <strong>Transcoding on demand:</strong> Only store source quality long-term; regenerate lower qualities on-demand for cold VODs.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: A user wants to clip a moment from 30 seconds ago in a live stream. How do you serve this instantly?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Clips require access to recent stream segments. Architecture: (1) <strong>Segment Buffer:</strong> During live stream, keep last 2 hours of segments in memory/SSD cache on origin servers. This is the "clip window." (2) <strong>Instant Clip Creation:</strong> When user clips, we already have segments cached - no need to fetch from cold storage. (3) <strong>Async Processing:</strong> Return clip ID immediately. Background worker combines segments, generates thumbnail, uploads to S3. Client polls for completion (typically 5-10 seconds). (4) <strong>Pre-generated Thumbnails:</strong> Generate thumbnails every 10 seconds during live stream. Clip can use nearest pre-generated thumbnail while final one is processing. See [[storage]](/topic/system-design/storage) for tiered caching strategies.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How do you handle seeking to any timestamp in a 10-hour VOD without downloading the entire file?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This is where <span style="color:#00ff00">**HLS segment indexing**</span> shines. (1) <strong>Manifest Structure:</strong> The .m3u8 playlist contains entries for every segment with duration. Player can calculate which segment contains target timestamp. (2) <strong>Byte-Range Requests:</strong> Segments are stored as discrete files. Player requests only the needed segment(s) via HTTP Range requests. (3) <strong>Keyframe Index:</strong> For frame-accurate seeking, we need an index of <span style="color:#00ff00">**I-frames (keyframes)**</span>. HLS #EXT-X-I-FRAME-STREAM-INF provides this. Without keyframe, must decode from previous keyframe. (4) <strong>Segment Granularity:</strong> 4-second segments mean worst-case 4 seconds of "overshoot" when seeking. For precise seeking, use smaller segments or byte-range within segments. (5) <strong>Thumbnail Scrubbing:</strong> Generate sprite sheets (grid of thumbnails) at 10-second intervals. As user scrubs, show thumbnail instantly while actual video loads. (6) <strong>Prefetching:</strong> Once user starts watching, prefetch next N segments. If they seek forward, likely segments already cached. (7) <strong>CDN Caching:</strong> Popular VOD segments are cached at edge. Seeking within popular VODs is fast because segments are edge-cached.</p>
</div>
</div>
</div>

                                                                                          ---

                                                                                          ## Section 5: Transcoding Pipeline

                                                                                          ### Deep Mechanics

<span style="color:#00ff00">**Real-time transcoding**</span> is the most computationally intensive component. It converts the broadcaster's single input stream into multiple quality levels (ABR ladder) with strict latency requirements - processing must be faster than real-time.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">TRANSCODING INFRASTRUCTURE</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">
                                                                                              <!-- GPU Cluster -->
<div style="background: rgba(240, 136, 62, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
<h5 style="color: #f0883e; margin: 0 0 16px 0;">GPU TRANSCODING CLUSTER</h5>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #f0883e; font-weight: bold;">NVIDIA T4</span><br>
<span style="color: #475569; font-size: 11px;">8-12 streams/GPU</span><br>
<span style="color: #1e293b; font-size: 10px;">NVENC encoder</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #f0883e; font-weight: bold;">NVIDIA T4</span><br>
<span style="color: #475569; font-size: 11px;">8-12 streams/GPU</span><br>
<span style="color: #1e293b; font-size: 10px;">NVENC encoder</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #f0883e; font-weight: bold;">NVIDIA T4</span><br>
<span style="color: #475569; font-size: 11px;">8-12 streams/GPU</span><br>
<span style="color: #1e293b; font-size: 10px;">NVENC encoder</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #475569; font-weight: bold;">...</span>
</div>
</div>
<p style="color: #475569; font-size: 12px; margin: 12px 0 0 0;"><strong style="color: #1e293b;">Scale:</strong> 100K concurrent streams × 5 outputs = 500K parallel encoding jobs</p>
</div>

                                                                                                          <!-- Transcoding Tiers -->
<div style="background: rgba(88, 166, 255, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<h5 style="color: #58a6ff; margin: 0 0 16px 0;">TRANSCODING TIERS (Business Logic)</h5>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
<span style="color: #9146ff; font-weight: bold;">PARTNERS</span><br>
<span style="color: #475569; font-size: 12px; margin-top: 8px; display: block;">Full ABR ladder</span>
<span style="color: #1e293b; font-size: 11px;">1080p, 720p, 480p, 360p, 160p</span><br>
<span style="color: #3fb950; font-size: 11px;">Always guaranteed</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
<span style="color: #58a6ff; font-weight: bold;">AFFILIATES</span><br>
<span style="color: #475569; font-size: 12px; margin-top: 8px; display: block;">Limited ladder</span>
<span style="color: #1e293b; font-size: 11px;">Source + 720p + 480p</span><br>
<span style="color: #f0883e; font-size: 11px;">When capacity available</span>
</div>
<div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
<span style="color: #475569; font-weight: bold;">REGULAR</span><br>
<span style="color: #475569; font-size: 12px; margin-top: 8px; display: block;">Source only</span>
<span style="color: #1e293b; font-size: 11px;">No transcoding</span><br>
<span style="color: #ef4444; font-size: 11px;">Viewers need bandwidth</span>
</div>
</div>
</div>

                                                                                                                      <!-- Quality Ladder -->
<div style="background: rgba(63, 185, 80, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #3fb950;">
<h5 style="color: #3fb950; margin: 0 0 12px 0;">ABR LADDER ENCODING SETTINGS</h5>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 12px;">
<tr style="border-bottom: 1px solid #3fb950;">
<th style="padding: 8px; text-align: left; color: #3fb950;">Quality</th>
<th style="padding: 8px; text-align: left; color: #3fb950;">Resolution</th>
<th style="padding: 8px; text-align: left; color: #3fb950;">Bitrate</th>
<th style="padding: 8px; text-align: left; color: #3fb950;">Frame Rate</th>
<th style="padding: 8px; text-align: left; color: #3fb950;">Keyframe</th>
</tr>
<tr style="border-bottom: 1px solid #333;">
<td style="padding: 8px; color: #1e293b;">Source</td>
<td style="padding: 8px; color: #475569;">1920×1080</td>
<td style="padding: 8px; color: #475569;">6000 kbps</td>
<td style="padding: 8px; color: #475569;">60 fps</td>
<td style="padding: 8px; color: #475569;">2 sec</td>
</tr>
<tr style="border-bottom: 1px solid #333;">
<td style="padding: 8px; color: #1e293b;">720p60</td>
<td style="padding: 8px; color: #475569;">1280×720</td>
<td style="padding: 8px; color: #475569;">3000 kbps</td>
<td style="padding: 8px; color: #475569;">60 fps</td>
<td style="padding: 8px; color: #475569;">2 sec</td>
</tr>
<tr style="border-bottom: 1px solid #333;">
<td style="padding: 8px; color: #1e293b;">480p30</td>
<td style="padding: 8px; color: #475569;">852×480</td>
<td style="padding: 8px; color: #475569;">1500 kbps</td>
<td style="padding: 8px; color: #475569;">30 fps</td>
<td style="padding: 8px; color: #475569;">2 sec</td>
</tr>
<tr style="border-bottom: 1px solid #333;">
<td style="padding: 8px; color: #1e293b;">360p30</td>
<td style="padding: 8px; color: #475569;">640×360</td>
<td style="padding: 8px; color: #475569;">800 kbps</td>
<td style="padding: 8px; color: #475569;">30 fps</td>
<td style="padding: 8px; color: #475569;">2 sec</td>
</tr>
<tr>
<td style="padding: 8px; color: #1e293b;">160p (audio)</td>
<td style="padding: 8px; color: #475569;">284×160</td>
<td style="padding: 8px; color: #475569;">400 kbps</td>
<td style="padding: 8px; color: #475569;">30 fps</td>
<td style="padding: 8px; color: #475569;">2 sec</td>
</tr>
</table>
</div>
</div>
</div>
</div>

                                                                                                                  ### Transcoding Implementation

                                                                                                                  ```python
                                                                                                                  class TranscodingPipeline:
                                                                                                                  """
                                                                                                                  Real-time transcoding pipeline using GPU acceleration.

                                                                                                                  Performance Requirements:
                                                                                                                  - Must encode faster than real-time (1 second of video in < 1 second)
                                                                                                                  - Target: 0.3-0.5 seconds processing per second of content
                                                                                                                  - GPU memory: ~500MB per stream per output quality
                                                                                                                  """

                                                                                                                  def __init__(self, gpu_cluster: GPUCluster, config: TranscodeConfig):
                                                                                                                  self.gpu_cluster = gpu_cluster
                                                                                                                  self.config = config
                                                                                                                  self.active_streams: Dict[str, TranscodeSession] = {}

                                                                                                                  async def start_stream(
                                                                                                                  self,
                                                                                                                  channel_id: str,
                                                                                                                  input_stream: RTMPStream,
                                                                                                                  tier: StreamerTier
                                                                                                                  ) -> TranscodeSession:
                                                                                                                  # Determine quality ladder based on tier
                                                                                                                  qualities = self.get_quality_ladder(tier)

                                                                                                                  # Allocate GPU resources
                                                                                                                  gpu_allocation = await self.gpu_cluster.allocate(
                                                                                                                  stream_id=channel_id,
                                                                                                                  outputs=len(qualities),
                                                                                                                  priority=tier.priority,
                                                                                                                  )

                                                                                                                  if not gpu_allocation:
                                                                                                                  if tier == StreamerTier.PARTNER:
                                                                                                                  # Partners are guaranteed - wait for resources
                                                                                                                  gpu_allocation = await self.gpu_cluster.allocate_with_preemption(
                                                                                                                  stream_id=channel_id,
                                                                                                                  outputs=len(qualities),
                                                                                                                  )
                                                                                                                  else:
                                                                                                                  # Non-partners get source-only when capacity constrained
                                                                                                                  return self.create_passthrough_session(channel_id, input_stream)

                                                                                                                  # Create FFmpeg pipeline
                                                                                                                  session = TranscodeSession(
                                                                                                                  channel_id=channel_id,
                                                                                                                  input_stream=input_stream,
                                                                                                                  outputs=qualities,
                                                                                                                  gpu_id=gpu_allocation.gpu_id,
                                                                                                                  )

                                                                                                                  # Start encoding pipeline
                                                                                                                  await session.start()
                                                                                                                  self.active_streams[channel_id] = session

                                                                                                                  return session

                                                                                                                  def get_quality_ladder(self, tier: StreamerTier) -> List[QualityProfile]:
                                                                                                                  """Get ABR ladder based on streamer tier."""
                                                                                                                  if tier == StreamerTier.PARTNER:
                                                                                                                  return [
                                                                                                                  QualityProfile("1080p60", 1920, 1080, 60, 6000),
                                                                                                                  QualityProfile("720p60", 1280, 720, 60, 3000),
                                                                                                                  QualityProfile("480p30", 852, 480, 30, 1500),
                                                                                                                  QualityProfile("360p30", 640, 360, 30, 800),
                                                                                                                  QualityProfile("160p30", 284, 160, 30, 400),
                                                                                                                  ]
                                                                                                                  elif tier == StreamerTier.AFFILIATE:
                                                                                                                  return [
                                                                                                                  QualityProfile("source", 1920, 1080, 60, 6000),
                                                                                                                  QualityProfile("720p60", 1280, 720, 60, 3000),
                                                                                                                  QualityProfile("480p30", 852, 480, 30, 1500),
                                                                                                                  ]
                                                                                                                  else:
                                                                                                                  # Regular streamers - source only (no transcoding)
                                                                                                                  return [QualityProfile("source", 1920, 1080, 60, 6000)]


                                                                                                                  class TranscodeSession:
                                                                                                                  """
                                                                                                                  Active transcoding session using FFmpeg with NVENC.
                                                                                                                  """

                                                                                                                  async def start(self):
                                                                                                                  """Start FFmpeg transcoding pipeline."""
                                                                                                                  # Build FFmpeg command for multi-output encoding
                                                                                                                  cmd = self.build_ffmpeg_command()

                                                                                                                  # Start process
                                                                                                                  self.process = await asyncio.create_subprocess_exec(
                                                                                                                  *cmd,
                                                                                                                  stdin=asyncio.subprocess.PIPE,
                                                                                                                  stdout=asyncio.subprocess.PIPE,
                                                                                                                  stderr=asyncio.subprocess.PIPE,
                                                                                                                  )

                                                                                                                  # Start monitoring task
                                                                                                                  asyncio.create_task(self.monitor_health())

                                                                                                                  def build_ffmpeg_command(self) -> List[str]:
                                                                                                                  """
                                                                                                                  Build FFmpeg command for GPU-accelerated multi-output encoding.

                                                                                                                  Key flags:
                                                                                                                  - -hwaccel cuda: Use GPU for decoding
                                                                                                                  - -c:v h264_nvenc: Use NVIDIA hardware encoder
                                                                                                                  - -preset p4: Balance quality/speed (p1=fastest, p7=slowest)
                                                                                                                  - -g 120: Keyframe every 2 seconds at 60fps
                                                                                                                  - -sc_threshold 0: Disable scene change detection for consistent segments
                                                                                                                  """
                                                                                                                  cmd = [
                                                                                                                  "ffmpeg",
                                                                                                                  "-hwaccel", "cuda",
                                                                                                                  "-hwaccel_device", str(self.gpu_id),
                                                                                                                  "-i", self.input_url,
                                                                                                                  ]

                                                                                                                  for output in self.outputs:
                                                                                                                  cmd.extend([
                                                                                                                  "-map", "0:v", "-map", "0:a",
                                                                                                                  "-c:v", "h264_nvenc",
                                                                                                                  "-preset", "p4",
                                                                                                                  "-b:v", f"{output.bitrate}k",
                                                                                                                  "-maxrate", f"{int(output.bitrate * 1.5)}k",
                                                                                                                  "-bufsize", f"{output.bitrate * 2}k",
                                                                                                                  "-vf", f"scale={output.width}:{output.height}",
                                                                                                                  "-r", str(output.fps),
                                                                                                                  "-g", str(output.fps * 2),  # Keyframe interval
                                                                                                                  "-sc_threshold", "0",
                                                                                                                  "-c:a", "aac",
                                                                                                                  "-b:a", "128k",
                                                                                                                  "-f", "hls",
                                                                                                                  "-hls_time", "4",
                                                                                                                  "-hls_list_size", "5",
                                                                                                                  "-hls_flags", "delete_segments",
                                                                                                                  f"{self.output_path}/{output.name}/playlist.m3u8"
                                                                                                                  ])

                                                                                                                  return cmd
                                                                                                                  ```

                                                                                                                  ### Transcoding Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: Why does Twitch need to transcode streams? Can't viewers just watch the source quality?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color:#00ff00">**Adaptive Bitrate (ABR)**</span> streaming is essential because viewers have varying network conditions. A viewer on mobile data can't sustain 6 Mbps for 1080p60. Without transcoding, that viewer either rebuffers constantly or can't watch at all. Transcoding creates multiple quality options (720p, 480p, 360p) so the player can automatically switch based on available bandwidth. Additionally, transcoding normalizes the input - streamers use different encoders, bitrates, and settings. Transcoding ensures consistent output format for CDN delivery.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: Transcoding is expensive. How does Twitch decide which streams get transcoding and which don't?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Transcoding economics drive a tiered approach: (1) <strong>Partners:</strong> Guaranteed full quality ladder (5 outputs) regardless of capacity. They generate revenue through ads and subs, justifying cost. (2) <strong>Affiliates:</strong> Get transcoding when capacity available. If GPU cluster is at 80% capacity, new affiliates may only get source + 1-2 qualities. (3) <strong>Regular streamers:</strong> Source-only (passthrough) - no transcoding. Most regular streams have <10 viewers who likely have good internet. (4) <strong>Dynamic allocation:</strong> System monitors GPU utilization. When capacity frees up (streams end), affiliates waiting for transcoding get upgraded. When a partner goes live, lower-priority streams may be downgraded. See [[resource-allocation]](/topic/system-design/distributed-systems) for scheduling patterns.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: The transcoding cluster is at 95% capacity and a popular partner is about to go live. How do you ensure they get resources without degrading other partners?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires sophisticated <span style="color:#00ff00">**resource management with preemption**</span>: (1) <strong>Capacity Reservation:</strong> Reserve 10-15% of cluster capacity for partner burst. This "reserved" capacity can be used by affiliates but is preemptible. (2) <strong>Preemption Priority:</strong> When partner needs resources: first preempt affiliate streams above their minimum tier (reduce 3 outputs to 2), then preempt regular passthrough streams if needed. Never preempt partners. (3) <strong>Graceful Degradation:</strong> Don't instantly drop quality - give stream 30 seconds to wind down, let viewers' players adapt. (4) <strong>Predictive Scaling:</strong> If scheduled events (esports, big streamers' schedules), pre-scale GPU capacity. Use historical data to predict peak demand. (5) <strong>Multi-Region:</strong> Spread transcoding across regions. If US-East is constrained, route some streams to US-West transcoding (acceptable latency for output to CDN). (6) <strong>Quality Reduction vs Stream Drop:</strong> Never drop a stream entirely - instead reduce quality ladder. A partner with 3 outputs is better than a dropped stream. (7) <strong>Cost-Based Spillover:</strong> In extreme cases, use cloud GPU instances (AWS g4dn) as overflow. More expensive but prevents degradation.</p>
</div>
</div>
</div>

                                                                                                                  ---

                                                                                                                  ## Section 6: Recommendation Engine

                                                                                                                  ### Deep Mechanics

The <span style="color:#00ff00">**recommendation engine**</span> personalizes content discovery, helping viewers find streams they'll enjoy. Unlike Netflix (catalog of fixed content), Twitch recommendations must account for real-time factors: who is currently live, viewer count trends, and stream recency.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #a371f7; text-align: center; margin: 0 0 24px 0;">RECOMMENDATION SYSTEM ARCHITECTURE</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">
                                                                                                                      <!-- Data Sources -->
<div style="background: rgba(163, 113, 247, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #a371f7;">
<h5 style="color: #a371f7; margin: 0 0 16px 0;">DATA SOURCES</h5>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #1e293b; font-size: 13px;">Watch History</span><br>
<span style="color: #475569; font-size: 11px;">Channels, duration, recency</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #1e293b; font-size: 13px;">Follows/Subs</span><br>
<span style="color: #475569; font-size: 11px;">Explicit preferences</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #1e293b; font-size: 13px;">Interactions</span><br>
<span style="color: #475569; font-size: 11px;">Chat, clips, raids</span>
</div>
<div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #1e293b; font-size: 13px;">Real-time</span><br>
<span style="color: #475569; font-size: 11px;">Live status, viewers, trends</span>
</div>
</div>
</div>

                                                                                                                              <!-- Model Pipeline -->
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
<div style="background: rgba(240, 136, 62, 0.15); border: 2px solid #f0883e; border-radius: 12px; padding: 20px;">
<h5 style="color: #f0883e; margin: 0 0 12px 0;">CANDIDATE GENERATION</h5>
<p style="color: #475569; font-size: 12px; margin: 0;">Retrieve 1000s of potentially relevant streams using lightweight models (embedding similarity, collaborative filtering)</p>
</div>
<div style="background: rgba(88, 166, 255, 0.15); border: 2px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #58a6ff; margin: 0 0 12px 0;">RANKING</h5>
<p style="color: #475569; font-size: 12px; margin: 0;">Deep neural network scores candidates on predicted engagement (watch time, follows, interactions)</p>
</div>
<div style="background: rgba(63, 185, 80, 0.15); border: 2px solid #3fb950; border-radius: 12px; padding: 20px;">
<h5 style="color: #3fb950; margin: 0 0 12px 0;">FILTERING & DIVERSITY</h5>
<p style="color: #475569; font-size: 12px; margin: 0;">Remove duplicates, apply business rules, ensure category diversity, inject exploration</p>
</div>
</div>

                                                                                                                              <!-- Signals -->
<div style="background: rgba(88, 166, 255, 0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<h5 style="color: #58a6ff; margin: 0 0 16px 0;">RANKING SIGNALS (Feature Engineering)</h5>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div>
<strong style="color: #1e293b; font-size: 13px;">User-Stream Affinity</strong>
<ul style="color: #475569; font-size: 12px; margin: 8px 0 0 0; padding-left: 20px;">
<li>Cosine similarity of user/streamer embeddings</li>
<li>Shared viewers (collaborative signal)</li>
<li>Category match to watch history</li>
<li>Language preference match</li>
</ul>
</div>
<div>
<strong style="color: #1e293b; font-size: 13px;">Stream Quality Signals</strong>
<ul style="color: #475569; font-size: 12px; margin: 8px 0 0 0; padding-left: 20px;">
<li>Current viewer count (social proof)</li>
<li>Viewer trend (growing vs declining)</li>
<li>Chat activity rate</li>
<li>Stream duration (just started vs 8 hours in)</li>
</ul>
</div>
<div>
<strong style="color: #1e293b; font-size: 13px;">Contextual Features</strong>
<ul style="color: #475569; font-size: 12px; margin: 8px 0 0 0; padding-left: 20px;">
<li>Time of day / day of week</li>
<li>User's current session length</li>
<li>Recently watched in session</li>
<li>Device type (mobile prefers shorter content)</li>
</ul>
</div>
<div>
<strong style="color: #1e293b; font-size: 13px;">Business Rules</strong>
<ul style="color: #475569; font-size: 12px; margin: 8px 0 0 0; padding-left: 20px;">
<li>Partner boost (contractual requirements)</li>
<li>New streamer boost (growth program)</li>
<li>Promoted content (sponsored)</li>
<li>Mature content filter</li>
</ul>
</div>
</div>
</div>
</div>
</div>

                                                                                                                          ### Recommendation Implementation

                                                                                                                          ```python
                                                                                                                          class RecommendationEngine:
                                                                                                                          """
                                                                                                                          Two-stage recommendation pipeline: Candidate Generation + Ranking.

                                                                                                                          Architecture follows YouTube's deep learning recommendations paper
                                                                                                                          adapted for live streaming constraints.
                                                                                                                          """

                                                                                                                          def __init__(
                                                                                                                          self,
                                                                                                                          embedding_store: EmbeddingStore,
                                                                                                                          ranking_model: RankingModel,
                                                                                                                          feature_store: FeatureStore,
                                                                                                                          ):
                                                                                                                          self.embeddings = embedding_store
                                                                                                                          self.ranker = ranking_model
                                                                                                                          self.features = feature_store

                                                                                                                          async def get_recommendations(
                                                                                                                          self,
                                                                                                                          user_id: str,
                                                                                                                          context: RecommendationContext,
                                                                                                                          limit: int = 20,
                                                                                                                          ) -> List[RecommendedStream]:
                                                                                                                          # Stage 1: Candidate Generation (fast, retrieves 1000s)
                                                                                                                          candidates = await self.generate_candidates(user_id, context)

                                                                                                                          # Stage 2: Ranking (slower, scores 100s)
                                                                                                                          ranked = await self.rank_candidates(user_id, candidates, context)

                                                                                                                          # Stage 3: Post-processing
                                                                                                                          final = self.apply_business_rules(ranked, context)
                                                                                                                          final = self.ensure_diversity(final)

                                                                                                                          return final[:limit]

                                                                                                                          async def generate_candidates(
                                                                                                                          self,
                                                                                                                          user_id: str,
                                                                                                                          context: RecommendationContext,
                                                                                                                          ) -> List[CandidateStream]:
                                                                                                                          """
                                                                                                                          Retrieve candidate streams using multiple strategies.
                                                                                                                          Goal: High recall (don't miss good streams), speed (< 50ms).
                                                                                                                          """
                                                                                                                          candidates = set()

                                                                                                                          # Strategy 1: Followed channels that are live
                                                                                                                          followed_live = await self.get_followed_live(user_id)
                                                                                                                          candidates.update(followed_live)

                                                                                                                          # Strategy 2: Similar to recently watched (embedding similarity)
                                                                                                                          user_embedding = await self.embeddings.get_user(user_id)
                                                                                                                          similar_streams = await self.embeddings.nearest_neighbors(
                                                                                                                          user_embedding,
                                                                                                                          k=500,
                                                                                                                          filter="is_live=true"
                                                                                                                          )
                                                                                                                          candidates.update(similar_streams)

                                                                                                                          # Strategy 3: Popular in user's preferred categories
                                                                                                                          preferred_categories = await self.features.get_user_categories(user_id)
                                                                                                                          for category in preferred_categories[:5]:
                                                                                                                          popular_in_cat = await self.get_popular_in_category(category, limit=100)
                                                                                                                          candidates.update(popular_in_cat)

                                                                                                                          # Strategy 4: Collaborative filtering (viewers like you also watched)
                                                                                                                          cf_candidates = await self.collaborative_filter(user_id, limit=200)
                                                                                                                          candidates.update(cf_candidates)

                                                                                                                          # Strategy 5: Global trending (ensures fresh content)
                                                                                                                          trending = await self.get_trending(limit=100)
                                                                                                                          candidates.update(trending)

                                                                                                                          return list(candidates)

                                                                                                                          async def rank_candidates(
                                                                                                                          self,
                                                                                                                          user_id: str,
                                                                                                                          candidates: List[CandidateStream],
                                                                                                                          context: RecommendationContext,
                                                                                                                          ) -> List[ScoredStream]:
                                                                                                                          """
                                                                                                                          Score candidates using deep ranking model.
                                                                                                                          Model predicts: P(user watches for 5+ minutes | stream, context)
                                                                                                                          """
                                                                                                                          # Fetch features for all candidates (batch for efficiency)
                                                                                                                          user_features = await self.features.get_user_features(user_id)
                                                                                                                          stream_features = await self.features.get_batch_stream_features(
                                                                                                                          [c.stream_id for c in candidates]
                                                                                                                          )

                                                                                                                          # Build feature vectors
                                                                                                                          feature_vectors = []
                                                                                                                          for candidate in candidates:
                                                                                                                          sf = stream_features[candidate.stream_id]

                                                                                                                          features = {
                                                                                                                          # User-stream affinity
                                                                                                                          "embedding_similarity": self.cosine_sim(
                                                                                                                          user_features["embedding"], sf["embedding"]
                                                                                                                          ),
                                                                                                                          "shared_viewers_count": sf["shared_viewers"].get(user_id, 0),
                                                                                                                          "category_match": int(sf["category"] in user_features["preferred_categories"]),
                                                                                                                          "language_match": int(sf["language"] == user_features["language"]),

                                                                                                                          # Stream quality
                                                                                                                          "viewer_count": sf["viewer_count"],
                                                                                                                          "viewer_count_log": math.log1p(sf["viewer_count"]),
                                                                                                                          "viewer_trend": sf["viewer_5min_delta"],
                                                                                                                          "chat_messages_per_minute": sf["chat_rate"],
                                                                                                                          "stream_duration_minutes": sf["duration_minutes"],

                                                                                                                          # Historical interaction
                                                                                                                          "times_watched_channel": user_features["channel_watches"].get(
                                                                                                                          sf["channel_id"], 0
                                                                                                                          ),
                                                                                                                          "days_since_last_watch": user_features["channel_recency"].get(
                                                                                                                          sf["channel_id"], 999
                                                                                                                          ),
                                                                                                                          "is_following": int(sf["channel_id"] in user_features["follows"]),
                                                                                                                          "is_subscribed": int(sf["channel_id"] in user_features["subs"]),

                                                                                                                          # Context
                                                                                                                          "hour_of_day": context.hour,
                                                                                                                          "day_of_week": context.day_of_week,
                                                                                                                          "session_watch_count": context.streams_watched_this_session,
                                                                                                                          "is_mobile": int(context.device_type == "mobile"),
                                                                                                                          }

                                                                                                                          feature_vectors.append(features)

                                                                                                                          # Batch prediction
                                                                                                                          scores = await self.ranker.predict_batch(feature_vectors)

                                                                                                                          # Combine candidates with scores
                                                                                                                          scored = [
                                                                                                                          ScoredStream(stream=c, score=s)
                                                                                                                          for c, s in zip(candidates, scores)
                                                                                                                          ]

                                                                                                                          return sorted(scored, key=lambda x: x.score, reverse=True)

                                                                                                                          def ensure_diversity(
                                                                                                                          self,
                                                                                                                          streams: List[ScoredStream],
                                                                                                                          max_same_category: int = 3,
                                                                                                                          max_same_game: int = 2,
                                                                                                                          ) -> List[ScoredStream]:
                                                                                                                          """
                                                                                                                          Ensure recommendation diversity using MMR-like approach.
                                                                                                                          Prevent "filter bubble" of same category/game.
                                                                                                                          """
                                                                                                                          result = []
                                                                                                                          category_counts = defaultdict(int)
                                                                                                                          game_counts = defaultdict(int)

                                                                                                                          for stream in streams:
                                                                                                                          cat = stream.category
                                                                                                                          game = stream.game_id

                                                                                                                          # Skip if category/game over-represented
                                                                                                                          if category_counts[cat] >= max_same_category:
                                                                                                                          continue
                                                                                                                          if game and game_counts[game] >= max_same_game:
                                                                                                                          continue

                                                                                                                          result.append(stream)
                                                                                                                          category_counts[cat] += 1
                                                                                                                          if game:
                                                                                                                          game_counts[game] += 1

                                                                                                                          return result
                                                                                                                          ```

                                                                                                                          ### Real-Time Features Pipeline

                                                                                                                          ```python
                                                                                                                          class RealTimeFeatureService:
                                                                                                                          """
                                                                                                                          Computes and serves real-time features for recommendations.

                                                                                                                          Challenge: Features like "viewer count" change every second.
                                                                                                                          Solution: Streaming computation with windowed aggregations.
                                                                                                                          """

                                                                                                                          def __init__(self, kafka_consumer, redis_client, flink_cluster):
                                                                                                                          self.kafka = kafka_consumer
                                                                                                                          self.redis = redis_client
                                                                                                                          self.flink = flink_cluster

                                                                                                                          async def start_feature_computation(self):
                                                                                                                          """
                                                                                                                          Flink job for streaming feature computation.

                                                                                                                          Input events:
                                                                                                                          - stream_start, stream_end
                                                                                                                          - viewer_join, viewer_leave
                                                                                                                          - chat_message
                                                                                                                          - follow, subscribe, raid
                                                                                                                          """
                                                                                                                          job = self.flink.create_job("recommendation_features")

                                                                                                                          # Viewer count: count distinct viewers per stream
                                                                                                                          job.add_operator(
                                                                                                                          name="viewer_count",
                                                                                                                          input="viewer_events",
                                                                                                                          operation=CountDistinct(
                                                                                                                          key="stream_id",
                                                                                                                          value="user_id",
                                                                                                                          window=TumblingWindow(seconds=10),
                                                                                                                          ),
                                                                                                                          output="stream_viewer_counts"
                                                                                                                          )

                                                                                                                          # Viewer trend: compare current count to 5 minutes ago
                                                                                                                          job.add_operator(
                                                                                                                          name="viewer_trend",
                                                                                                                          input="stream_viewer_counts",
                                                                                                                          operation=WindowDelta(
                                                                                                                          key="stream_id",
                                                                                                                          current_window=10,
                                                                                                                          compare_window=300,  # 5 minutes
                                                                                                                          ),
                                                                                                                          output="stream_viewer_trends"
                                                                                                                          )

                                                                                                                          # Chat rate: messages per minute
                                                                                                                          job.add_operator(
                                                                                                                          name="chat_rate",
                                                                                                                          input="chat_events",
                                                                                                                          operation=Rate(
                                                                                                                          key="channel_id",
                                                                                                                          window=SlidingWindow(minutes=1),
                                                                                                                          ),
                                                                                                                          output="channel_chat_rates"
                                                                                                                          )

                                                                                                                          # Write to Redis for serving
                                                                                                                          job.add_sink(
                                                                                                                          inputs=["stream_viewer_counts", "stream_viewer_trends", "channel_chat_rates"],
                                                                                                                          sink=RedisSink(
                                                                                                                          self.redis,
                                                                                                                          key_pattern="features:{stream_id}",
                                                                                                                          ttl_seconds=30,
                                                                                                                          )
                                                                                                                          )

                                                                                                                          await job.start()
                                                                                                                          ```

                                                                                                                          ### Recommendation Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: How does Twitch's recommendation system differ from Netflix's?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The key difference is <span style="color:#00ff00">**real-time inventory**</span>. Netflix has a fixed catalog - recommendations can be precomputed and cached. Twitch's "catalog" changes constantly: streams go live/offline, viewer counts fluctuate, chat activity varies. This means: (1) Recommendations must incorporate real-time signals (who is live now, trending streams). (2) Cannot fully precompute - must generate on-request with fresh data. (3) "Quality" is temporal - a stream that was great 2 hours ago might be boring now. (4) Cold start for new streams - need to surface new content without historical engagement data.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: A new streamer with zero followers goes live. How do you give them a chance to be discovered?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> This is the <span style="color:#00ff00">**cold start problem**</span> for content. Strategies: (1) <strong>Exploration injection:</strong> Reserve 5-10% of recommendation slots for exploration. Randomly sample new/low-viewer streams to surface them. (2) <strong>Category-based seeding:</strong> If user watches Minecraft, new Minecraft streamers get boosted in their feed. Category match is a strong signal even without history. (3) <strong>Engagement velocity:</strong> Track early signals like follower rate, chat engagement relative to viewer count. High engagement rate suggests quality even with low absolute numbers. (4) <strong>Raid/host boost:</strong> If established streamer raids a small channel, that's a strong endorsement signal - boost discovery. (5) <strong>New streamer program:</strong> Explicit boost for first N streams or first 30 days. Related: [[machine-learning]](/topic/system-design/ml-systems) exploration-exploitation tradeoffs.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How do you prevent the recommendation system from creating a "rich get richer" effect where top streamers dominate all recommendations?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> <span style="color:#00ff00">**Popularity bias**</span> is real and requires explicit mitigation: (1) <strong>Log-transform viewer counts:</strong> Use log(viewers) instead of raw count as a feature. Difference between 100 and 1000 viewers is more meaningful than 100K vs 101K. (2) <strong>Calibration by category:</strong> A 500-viewer speedrunner is "popular" for that category; normalize by category distribution. (3) <strong>Diversity constraints:</strong> Max 2-3 streams from same popularity tier per page. Force mix of large, medium, small streams. (4) <strong>Personalization over popularity:</strong> Weight user-specific affinity signals (embedding similarity, watch history) more than global popularity. A user who loves niche content should see niche streams. (5) <strong>Position-aware training:</strong> Train ranking model on data that accounts for position bias - clicks on position 1 aren't more "valuable" than position 10. Use techniques like IPW (Inverse Propensity Weighting). (6) <strong>A/B test for ecosystem health:</strong> Track not just click-through rate but metrics like "unique streamers watched per user" and "new streamers reaching 100 concurrent viewers." Optimize for healthy ecosystem, not just engagement. (7) <strong>Editorial curation:</strong> Human-curated "Rising Stars" or "Hidden Gems" sections that surface quality small streamers identified by content team.</p>
</div>
</div>
</div>

                                                                                                                          ---

                                                                                                                          ## Section 7: Scale Phases

                                                                                                                          ### Phase 1: Starting Phase (MVP)

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f1f5f9; border-radius: 10px; padding: 24px;">

                                                                                                                              **Assumptions:**
                                                                                                                              - **Streamers**: 100 - 1,000 concurrent
                                                                                                                              - **Viewers**: 10K - 100K concurrent
                                                                                                                              - **Chat messages**: 10K - 100K/minute
                                                                                                                              - **Budget**: $10,000 - $50,000/month

                                                                                                                              **Architecture Decision: Use Managed Services**

<div style="background: rgba(63, 185, 80, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

                                                                                                                                | Component | Managed Service | Monthly Cost |
                                                                                                                                |-----------|----------------|--------------|
                                                                                                                                | **Ingest + Transcode** | AWS IVS or Mux | ~$2,000-5,000 |
                                                                                                                                | **Video Delivery** | Included with IVS/Mux | - |
                                                                                                                                | **Chat** | Ably or PubNub | ~$500-1,000 |
                                                                                                                                | **Database** | Supabase or PlanetScale | ~$100-500 |
                                                                                                                                | **Hosting** | Vercel/Railway | ~$100-500 |

</div>

                                                                                                                              ```python
                                                                                                                              # Phase 1: Simple architecture using managed services
                                                                                                                              class StreamService:
                                                                                                                              def __init__(self, ivs_client, chat_service):
                                                                                                                              self.ivs = ivs_client  # AWS IVS handles ingest + transcode + CDN
                                                                                                                              self.chat = chat_service  # Ably handles WebSocket scale

                                                                                                                              def create_stream(self, channel_id: str):
                                                                                                                              # AWS IVS creates everything - ingest, transcode, CDN
                                                                                                                              channel = self.ivs.create_channel(
                                                                                                                              name=channel_id,
                                                                                                                              type="STANDARD",  # Includes transcoding
                                                                                                                              latency_mode="LOW",  # 3-5 second latency
                                                                                                                              )

                                                                                                                              return {
                                                                                                                              "ingest_endpoint": channel.ingest_endpoint,
                                                                                                                              "stream_key": channel.stream_key,
                                                                                                                              "playback_url": channel.playback_url,
                                                                                                                              }

                                                                                                                              class ChatService:
                                                                                                                              def __init__(self, ably_client):
                                                                                                                              self.ably = ably_client

                                                                                                                              def send_message(self, channel_id: str, user_id: str, message: str):
                                                                                                                              # Ably handles fan-out, no need to manage WebSocket servers
                                                                                                                              channel = self.ably.channels.get(f"chat:{channel_id}")
                                                                                                                              channel.publish("message", {
                                                                                                                              "user_id": user_id,
                                                                                                                              "message": message,
                                                                                                                              "timestamp": time.time(),
                                                                                                                              })
                                                                                                                              ```

</div>
</div>

                                                                                                                          ### Phase 2: Growth Phase

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f1f5f9; border-radius: 10px; padding: 24px;">

                                                                                                                              **Assumptions:**
                                                                                                                              - **Streamers**: 10K concurrent
                                                                                                                              - **Viewers**: 1M concurrent
                                                                                                                              - **Chat messages**: 10M/minute
                                                                                                                              - **Budget**: $100,000 - $500,000/month

                                                                                                                              **Architecture Decision: Hybrid (Managed + Custom)**

                                                                                                                              At this scale, managed service costs become significant. Start building custom components for highest-cost items while keeping others managed.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

                                                                                                                                | Component | Approach | Reason |
                                                                                                                                |-----------|----------|--------|
                                                                                                                                | **Ingest** | Custom RTMP servers | Control, cost at scale |
                                                                                                                                | **Transcode** | Custom GPU cluster | Biggest cost driver |
                                                                                                                                | **CDN** | CloudFront or Fastly | CDN is commodity, don't build |
                                                                                                                                | **Chat** | Custom Kafka + WebSocket | Scale requires custom |
                                                                                                                                | **Recommendations** | Custom ML pipeline | Differentiation |

</div>

</div>
</div>

                                                                                                                          ### Phase 3: Twitch Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f1f5f9; border-radius: 10px; padding: 24px;">

                                                                                                                              **Assumptions:**
                                                                                                                              - **Concurrent streamers**: 100K+
                                                                                                                              - **Concurrent viewers**: 15M+ peak
                                                                                                                              - **Chat messages**: 100M+/minute
                                                                                                                              - **Video bandwidth**: 100+ Tbps

                                                                                                                              **Architecture Decision: Fully Custom**

                                                                                                                              At Twitch scale, nearly everything is custom-built for cost and control.

<div style="background: rgba(163, 113, 247, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

                                                                                                                                | Component | Twitch Approach |
                                                                                                                                |-----------|-----------------|
                                                                                                                                | **Ingest** | 50+ global ingest PoPs, custom RTMP extensions |
                                                                                                                                | **Transcode** | Custom GPU clusters with NVENC, tiered allocation |
                                                                                                                                | **CDN** | Custom CDN + multi-CDN for redundancy |
                                                                                                                                | **Chat** | IRC-based protocol, custom fan-out infrastructure |
                                                                                                                                | **VOD** | Custom tiered storage with S3 + Glacier |
                                                                                                                                | **Recommendations** | Custom ML platform with real-time features |

</div>

                                                                                                                              **Why Custom CDN at This Scale:**

                                                                                                                              At 100+ Tbps, CDN costs are $0.01-0.02/GB. That's $30M+/year in CDN fees. Building custom CDN with owned/leased infrastructure becomes economically viable.

</div>
</div>

                                                                                                                          ---

                                                                                                                          ## Trade-off Analysis

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

                                                                                                                            ### Core Trade-offs in Live Streaming

<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="border-bottom: 2px solid #58a6ff;">
<th style="padding: 12px; text-align: left; color: #58a6ff;">Trade-off</th>
<th style="padding: 12px; text-align: left; color: #58a6ff;">Option A</th>
<th style="padding: 12px; text-align: left; color: #58a6ff;">Option B</th>
<th style="padding: 12px; text-align: left; color: #58a6ff;">Twitch's Choice</th>
</tr>
<tr style="border-bottom: 1px solid #333;">
<td style="padding: 12px; color: #1e293b;">Latency vs. Stability</td>
<td style="padding: 12px; color: #475569;">Low latency (3-5s), more rebuffering</td>
<td style="padding: 12px; color: #475569;">Higher latency (15-30s), stable</td>
<td style="padding: 12px; color: #3fb950;">User-selectable, default stable</td>
</tr>
<tr style="border-bottom: 1px solid #333;">
<td style="padding: 12px; color: #1e293b;">Transcode Cost vs. Quality</td>
<td style="padding: 12px; color: #475569;">Transcode all (expensive)</td>
<td style="padding: 12px; color: #475569;">Partners only (cheaper)</td>
<td style="padding: 12px; color: #3fb950;">Tiered by streamer level</td>
</tr>
<tr style="border-bottom: 1px solid #333;">
<td style="padding: 12px; color: #1e293b;">Chat Consistency vs. Perf</td>
<td style="padding: 12px; color: #475569;">Strong ordering (slower)</td>
<td style="padding: 12px; color: #475569;">Eventually consistent (faster)</td>
<td style="padding: 12px; color: #3fb950;">Eventually consistent</td>
</tr>
<tr style="border-bottom: 1px solid #333;">
<td style="padding: 12px; color: #1e293b;">Recommendations</td>
<td style="padding: 12px; color: #475569;">Popularity-based (simple)</td>
<td style="padding: 12px; color: #475569;">Personalized (complex)</td>
<td style="padding: 12px; color: #3fb950;">Personalized with diversity</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;">VOD Retention</td>
<td style="padding: 12px; color: #475569;">Keep forever (expensive)</td>
<td style="padding: 12px; color: #475569;">Aggressive deletion (cheap)</td>
<td style="padding: 12px; color: #3fb950;">Tiered by user level</td>
</tr>
</table>

</div>

                                                                                                                          ---

                                                                                                                          ## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

                                                                                                                            ### Red Flags in Your Answer

<div style="background: #3d1f1f; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 4px solid #f85149;">

                                                                                                                              - **"Use WebRTC for the main broadcast stream"** - Shows lack of understanding of scale requirements
                                                                                                                              - **"Store chat messages in SQL database"** - Missed the real-time/ephemeral nature of chat
                                                                                                                              - **"Build custom CDN from scratch"** - Unless you're at Twitch scale, this is over-engineering
                                                                                                                              - **"Single WebSocket server for all users"** - Doesn't understand connection limits (~65K per server)
                                                                                                                              - **"Transcode to all qualities for every streamer"** - Ignores cost constraints
                                                                                                                              - **"Same architecture for 100 viewers and 100K viewers"** - Missing scale awareness

</div>

                                                                                                                            ### Impressive Statements

<div style="background: #1f3d1f; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 4px solid #3fb950;">

                                                                                                                              - **"For < 100 concurrent streamers, I'd use AWS IVS rather than building transcoding infrastructure"** - Shows pragmatism
                                                                                                                              - **"The median stream has very few viewers, so optimize for the common case while handling viral moments"** - Demonstrates workload understanding
                                                                                                                              - **"Chat can be eventually consistent because viewers don't notice 100ms delay between edge servers"** - Shows consistency trade-off awareness
                                                                                                                              - **"HLS latency comes from segment duration + encoding + CDN + buffer - each can be optimized independently"** - Shows deep latency stack knowledge
                                                                                                                              - **"CDN caching converts O(n) bandwidth into O(1) for popular content"** - Demonstrates CDN value understanding
                                                                                                                              - **"Transcoding is where Twitch differentiates - partners get priority access to limited GPU resources"** - Shows business/technical connection

</div>

                                                                                                                            ### 30-Second Summary for Interviews

                                                                                                                            > "A streaming platform has five core systems: **Ingest** (receive RTMP from broadcasters), **Transcode** (convert to multiple qualities in real-time using GPUs), **Delivery** (HLS segments via CDN), **Chat** (WebSocket fan-out with Kafka), and **Recommendations** (two-stage ML pipeline with real-time features). The key insight is that video scales via CDN caching - popular streams are served from edge, making cost-per-viewer approach zero. Chat scales via hierarchical fan-out. Start with managed services (AWS IVS) and only build custom when you hit scale limits or cost thresholds."

</div>

                                                                                                                          ---

                                                                                                                          ## Related Topics

                                                                                                                          - [[cdn]](/topic/system-design/cdn) - Edge caching and delivery networks
                                                                                                                          - [[message-queues]](/topic/system-design/message-queues) - Kafka for chat distribution
                                                                                                                          - [[rate-limiting]](/topic/system-design/rate-limiting) - Chat flood protection
                                                                                                                          - [[caching]](/topic/system-design/caching) - Segment and metadata caching
                                                                                                                          - [[load-balancing]](/topic/system-design/load-balancing) - Ingest server selection
                                                                                                                          - [[storage]](/topic/system-design/storage) - VOD tiered storage patterns
                                                                                                                          - [[concurrency-patterns]](/topic/system-design/concurrency-patterns) - WebSocket server design
                                                                                                                          - [[latency-throughput]](/topic/system-design/latency-throughput) - Streaming latency optimization
