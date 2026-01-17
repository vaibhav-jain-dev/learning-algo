# Database Sharding

## Overview

Database sharding is a horizontal scaling technique that partitions data across multiple database instances (shards). Each shard holds a subset of the total data, allowing the system to handle more data and traffic than a single database can manage.

## Key Concepts

### Why Sharding?

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

1. **Horizontal Scalability**: Distribute data across many machines
2. **Improved Performance**: Queries only hit relevant shards
3. **Higher Availability**: Failure of one shard doesn't affect others
4. **Geographic Distribution**: Place data closer to users

</div>

### The Scaling Problem

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">WHY SINGLE DATABASE DOESN'T SCALE</div>

  <div style="margin-bottom: 32px;">
    <div style="color: #8b949e; font-size: 14px; font-weight: 500; margin-bottom: 16px;">VERTICAL SCALING (Scale Up)</div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px 20px; min-width: 140px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 14px;">Small DB</div>
        <div style="color: #aaffaa; font-size: 12px; margin-top: 8px;">8 CPU</div>
        <div style="color: #aaffaa; font-size: 12px;">32 GB RAM</div>
        <div style="color: #aaffaa; font-size: 12px;">1 TB Disk</div>
      </div>
      <div style="color: #58a6ff; font-size: 24px;">→</div>
      <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 20px; min-width: 140px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 14px;">Bigger DB</div>
        <div style="color: #aaddff; font-size: 12px; margin-top: 8px;">32 CPU</div>
        <div style="color: #aaddff; font-size: 12px;">256 GB RAM</div>
        <div style="color: #aaddff; font-size: 12px;">10 TB SSD</div>
      </div>
      <div style="color: #58a6ff; font-size: 24px;">→</div>
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px 20px; min-width: 140px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 14px;">BIGGEST DB</div>
        <div style="color: #ddccff; font-size: 12px; margin-top: 8px;">128 CPU</div>
        <div style="color: #ddccff; font-size: 12px;">1 TB RAM</div>
        <div style="color: #ddccff; font-size: 12px;">100 TB SSD</div>
      </div>
      <div style="color: #58a6ff; font-size: 24px;">→</div>
      <div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 12px; padding: 16px 20px; min-width: 120px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 14px;">LIMIT!</div>
        <div style="color: #ffdddd; font-size: 12px; margin-top: 8px;">Can't buy</div>
        <div style="color: #ffdddd; font-size: 12px;">bigger box</div>
      </div>
    </div>
  </div>

  <div>
    <div style="color: #8b949e; font-size: 14px; font-weight: 500; margin-bottom: 16px;">HORIZONTAL SCALING (Scale Out) with Sharding</div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 12px 16px; min-width: 90px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Shard 1</div>
        <div style="color: #aaffaa; font-size: 11px; margin-top: 4px;">Users 1-1M</div>
      </div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 12px 16px; min-width: 90px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Shard 2</div>
        <div style="color: #aaffaa; font-size: 11px; margin-top: 4px;">Users 1M-2M</div>
      </div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 12px 16px; min-width: 90px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Shard 3</div>
        <div style="color: #aaffaa; font-size: 11px; margin-top: 4px;">Users 2M-3M</div>
      </div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 12px 16px; min-width: 90px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Shard 4</div>
        <div style="color: #aaffaa; font-size: 11px; margin-top: 4px;">Users 3M-4M</div>
      </div>
      <div style="color: #8b949e; font-size: 16px;">...</div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 12px 16px; min-width: 90px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Shard N</div>
        <div style="color: #aaffaa; font-size: 11px; margin-top: 4px;">Users ...</div>
      </div>
    </div>
    <div style="text-align: center; color: #7ee787; font-size: 18px; font-weight: 600; margin-top: 16px;">NO LIMIT! ∞</div>
  </div>
</div>

### Sharding vs Replication

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Sharding | Replication |
|----------|-------------|
| Splits data across nodes | Copies same data to multiple nodes |
| Increases write capacity | Increases read capacity |
| Each shard has unique data | All replicas have same data |
| Complex queries across shards | Simple failover |

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">SHARDING vs REPLICATION</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
    <div>
      <div style="color: #58a6ff; font-size: 14px; font-weight: 600; margin-bottom: 16px; text-align: center;">SHARDING (Different Data)</div>
      <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 16px;">
        <div style="color: #ffffff; font-weight: 600;">All Users Data</div>
      </div>
      <div style="text-align: center; color: #58a6ff; font-size: 20px; margin-bottom: 12px;">↓ ↓ ↓</div>
      <div style="display: flex; gap: 8px; justify-content: center;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px; text-align: center; flex: 1;">
          <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Shard 1</div>
          <div style="color: #aaffaa; font-size: 11px;">Users A-M</div>
        </div>
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px; text-align: center; flex: 1;">
          <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Shard 2</div>
          <div style="color: #aaffaa; font-size: 11px;">Users N-S</div>
        </div>
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px; text-align: center; flex: 1;">
          <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Shard 3</div>
          <div style="color: #aaffaa; font-size: 11px;">Users T-Z</div>
        </div>
      </div>
      <div style="margin-top: 16px; padding: 12px; background: rgba(35, 134, 54, 0.2); border-radius: 8px; text-align: center;">
        <div style="color: #7ee787; font-size: 13px;">Total capacity: <strong>3x</strong></div>
        <div style="color: #7ee787; font-size: 13px;">Write capacity: <strong>3x</strong></div>
      </div>
    </div>

    <div>
      <div style="color: #a371f7; font-size: 14px; font-weight: 600; margin-bottom: 16px; text-align: center;">REPLICATION (Same Data)</div>
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 16px;">
        <div style="color: #ffffff; font-weight: 600;">All Users Data</div>
      </div>
      <div style="text-align: center; color: #a371f7; font-size: 20px; margin-bottom: 12px;">↓ ↓ ↓</div>
      <div style="display: flex; gap: 8px; justify-content: center;">
        <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 12px; text-align: center; flex: 1;">
          <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Copy 1</div>
          <div style="color: #ddccff; font-size: 11px;">ALL Users</div>
        </div>
        <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 12px; text-align: center; flex: 1;">
          <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Copy 2</div>
          <div style="color: #ddccff; font-size: 11px;">ALL Users</div>
        </div>
        <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 12px; text-align: center; flex: 1;">
          <div style="color: #ffffff; font-weight: 600; font-size: 13px;">Copy 3</div>
          <div style="color: #ddccff; font-size: 11px;">ALL Users</div>
        </div>
      </div>
      <div style="margin-top: 16px; padding: 12px; background: rgba(137, 87, 229, 0.2); border-radius: 8px; text-align: center;">
        <div style="color: #d2a8ff; font-size: 13px;">Read capacity: <strong>3x</strong></div>
        <div style="color: #ffa657; font-size: 13px;">Write capacity: <strong>1x</strong> (all writes go to all)</div>
      </div>
    </div>
  </div>
</div>

## Sharding Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">SHARDING STRATEGY COMPARISON</div>

  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
        <tr style="border-bottom: 2px solid #30363d;">
          <th style="padding: 12px; text-align: left; color: #58a6ff;">Strategy</th>
          <th style="padding: 12px; text-align: center; color: #58a6ff;">Distribution</th>
          <th style="padding: 12px; text-align: center; color: #58a6ff;">Range Queries</th>
          <th style="padding: 12px; text-align: center; color: #58a6ff;">Resharding</th>
          <th style="padding: 12px; text-align: left; color: #58a6ff;">Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px; color: #f0f6fc; font-weight: 500;">Range-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #ffa657;">Uneven</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #7ee787;">Excellent</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #ffa657;">Medium</span></td>
          <td style="padding: 12px; color: #8b949e;">Time data</td>
        </tr>
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px; color: #f0f6fc; font-weight: 500;">Hash-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #7ee787;">Even</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #f85149;">Poor</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #f85149;">Hard</span></td>
          <td style="padding: 12px; color: #8b949e;">Random access</td>
        </tr>
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px; color: #f0f6fc; font-weight: 500;">Consistent Hash</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #7ee787;">Even</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #f85149;">Poor</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #7ee787;">Easy</span></td>
          <td style="padding: 12px; color: #8b949e;">Dynamic scaling</td>
        </tr>
        <tr style="border-bottom: 1px solid #21262d;">
          <td style="padding: 12px; color: #f0f6fc; font-weight: 500;">Directory-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #58a6ff;">Flexible</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #7ee787;">Good</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #7ee787;">Easy</span></td>
          <td style="padding: 12px; color: #8b949e;">Custom logic</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #f0f6fc; font-weight: 500;">Geographic</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #a371f7;">By region</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #8b949e;">N/A</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #8b949e;">N/A</span></td>
          <td style="padding: 12px; color: #8b949e;">Multi-DC</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### 1. Range-Based Sharding

Partition data by ranges of a key value.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">RANGE-BASED SHARDING</div>

  <div style="text-align: center; margin-bottom: 16px;">
    <span style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); color: #ffffff; padding: 8px 16px; border-radius: 8px; font-weight: 600;">user_id = 1,500,000</span>
  </div>

  <div style="text-align: center; color: #58a6ff; font-size: 24px; margin-bottom: 16px;">↓</div>

  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <div style="color: #58a6ff; font-weight: 600; font-size: 14px; margin-bottom: 12px; text-align: center;">SHARD ROUTER</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: monospace; font-size: 13px;">
      <div style="color: #8b949e;">if id &lt; 1M</div><div style="color: #f0f6fc;">→ Shard 1</div>
      <div style="color: #8b949e;">if id &lt; 2M</div><div style="color: #7ee787;">→ Shard 2 ← This one!</div>
      <div style="color: #8b949e;">if id &lt; 3M</div><div style="color: #f0f6fc;">→ Shard 3</div>
      <div style="color: #8b949e;">else</div><div style="color: #f0f6fc;">→ Shard 4</div>
    </div>
  </div>

  <div style="text-align: center; color: #58a6ff; font-size: 24px; margin-bottom: 16px;">↓</div>

  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; min-width: 100px; text-align: center;">
      <div style="color: #f0f6fc; font-weight: 600;">Shard 1</div>
      <div style="color: #8b949e; font-size: 12px;">0-1M</div>
    </div>
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; min-width: 100px; text-align: center; box-shadow: 0 0 20px rgba(46, 160, 67, 0.3);">
      <div style="color: #ffffff; font-weight: 600;">Shard 2</div>
      <div style="color: #aaffaa; font-size: 12px;">1M-2M</div>
      <div style="color: #7ee787; font-size: 16px; margin-top: 4px;">✓</div>
    </div>
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; min-width: 100px; text-align: center;">
      <div style="color: #f0f6fc; font-weight: 600;">Shard 3</div>
      <div style="color: #8b949e; font-size: 12px;">2M-3M</div>
    </div>
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; min-width: 100px; text-align: center;">
      <div style="color: #f0f6fc; font-weight: 600;">Shard 4</div>
      <div style="color: #8b949e; font-size: 12px;">3M+</div>
    </div>
  </div>

  <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #ffa657; font-weight: 600;">Warning:</span>
    <span style="color: #f0f6fc;"> Hotspots! New users (high IDs) always hit the last shard</span>
  </div>
</div>

```python
def get_shard_by_range(user_id):
    if user_id < 1000000:
        return "shard_1"
    elif user_id < 2000000:
        return "shard_2"
    elif user_id < 3000000:
        return "shard_3"
    else:
        return "shard_4"
```

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

**Pros**
- Simple to implement
- Efficient range queries (e.g., "get all users 1-1000")
- Data locality for related records

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

**Cons**
- Uneven distribution (hotspots)
- Requires rebalancing when shards fill up
- New data hits one shard

</div>

</div>

### 2. Hash-Based Sharding

Use hash function to determine shard.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">HASH-BASED SHARDING</div>

  <div style="text-align: center; margin-bottom: 16px;">
    <span style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); color: #ffffff; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-family: monospace;">user_id = "user_12345"</span>
  </div>

  <div style="text-align: center; color: #58a6ff; font-size: 24px; margin-bottom: 16px;">↓</div>

  <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <div style="color: #ffffff; font-weight: 600; font-size: 14px; margin-bottom: 12px; text-align: center;">HASH FUNCTION</div>
    <div style="font-family: monospace; font-size: 13px; text-align: center;">
      <div style="color: #f0f6fc;">hash("user_12345") = 0x7A3B... = <span style="color: #7ee787;">2,045,678,901</span></div>
      <div style="color: #f0f6fc; margin-top: 8px;">shard_index = 2,045,678,901 % 4 = <span style="color: #7ee787; font-weight: bold;">1</span></div>
    </div>
  </div>

  <div style="text-align: center; color: #a371f7; font-size: 24px; margin-bottom: 16px;">↓</div>

  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; min-width: 100px; text-align: center;">
      <div style="color: #f0f6fc; font-weight: 600;">Shard 0</div>
      <div style="color: #8b949e; font-size: 12px;">~25% of data</div>
    </div>
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; min-width: 100px; text-align: center; box-shadow: 0 0 20px rgba(46, 160, 67, 0.3);">
      <div style="color: #ffffff; font-weight: 600;">Shard 1</div>
      <div style="color: #aaffaa; font-size: 12px;">~25% of data</div>
      <div style="color: #7ee787; font-size: 16px; margin-top: 4px;">✓</div>
    </div>
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; min-width: 100px; text-align: center;">
      <div style="color: #f0f6fc; font-weight: 600;">Shard 2</div>
      <div style="color: #8b949e; font-size: 12px;">~25% of data</div>
    </div>
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; min-width: 100px; text-align: center;">
      <div style="color: #f0f6fc; font-weight: 600;">Shard 3</div>
      <div style="color: #8b949e; font-size: 12px;">~25% of data</div>
    </div>
  </div>

  <div style="background: rgba(46, 160, 67, 0.1); border: 1px solid #238636; border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #7ee787; font-weight: 600;">✓ Even distribution across all shards!</span>
  </div>
</div>

```python
import hashlib

def get_shard_by_hash(user_id, num_shards):
    hash_value = int(hashlib.md5(str(user_id).encode()).hexdigest(), 16)
    return f"shard_{hash_value % num_shards}"
```

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

**Pros**
- Even distribution of data
- No hotspots
- Simple to implement

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

**Cons**
- Range queries hit ALL shards
- Resharding moves ~all data
- Adding shards is expensive

</div>

</div>

### 3. Consistent Hashing

Minimizes data movement when adding/removing shards.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">CONSISTENT HASHING</div>

  <div style="text-align: center; color: #8b949e; margin-bottom: 20px;">The Hash Ring (0 to 2^32)</div>

  <div style="display: flex; justify-content: center; margin-bottom: 24px;">
    <div style="position: relative; width: 280px; height: 280px;">
      <div style="position: absolute; width: 240px; height: 240px; border: 3px solid #30363d; border-radius: 50%; top: 20px; left: 20px;"></div>
      <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); text-align: center;">
        <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px;">A</div>
        <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">0°</div>
      </div>
      <div style="position: absolute; top: 50%; right: 0; transform: translateY(-50%); text-align: center;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px;">B</div>
        <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">90°</div>
      </div>
      <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); text-align: center;">
        <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px;">C</div>
        <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">180°</div>
      </div>
      <div style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); text-align: center;">
        <div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px;">D</div>
        <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">270°</div>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; margin-bottom: 24px; text-align: center;">
    <span style="color: #58a6ff;">Key "user_123"</span>
    <span style="color: #8b949e;"> → hash() = </span>
    <span style="color: #ffa657;">45°</span>
    <span style="color: #8b949e;"> → Find next node clockwise → </span>
    <span style="color: #7ee787; font-weight: 600;">Node B</span>
  </div>

  <div style="border-top: 1px solid #30363d; padding-top: 24px;">
    <div style="color: #ffa657; font-weight: 600; margin-bottom: 16px;">ADDING A NEW NODE (E at 67°):</div>
    <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 16px; font-size: 14px;">
      <div style="color: #8b949e;">Before:</div>
      <div style="color: #f0f6fc;">Keys 45°-90° go to Node B</div>
      <div style="color: #8b949e;">After:</div>
      <div><span style="color: #7ee787;">Keys 45°-67° go to Node E</span> <span style="color: #ffa657;">← Only these keys move!</span></div>
      <div></div>
      <div style="color: #f0f6fc;">Keys 67°-90° go to Node B</div>
    </div>
    <div style="background: rgba(46, 160, 67, 0.1); border: 1px solid #238636; border-radius: 8px; padding: 12px; text-align: center; margin-top: 16px;">
      <span style="color: #7ee787;">Only ~1/N of data moves (not all data like in hash-based!)</span>
    </div>
  </div>
</div>

```python
class ConsistentHashSharding:
    def __init__(self, shards, virtual_nodes=100):
        self.ring = []
        self.shard_map = {}

        for shard in shards:
            for i in range(virtual_nodes):
                hash_val = self._hash(f"{shard}:{i}")
                self.ring.append(hash_val)
                self.shard_map[hash_val] = shard

        self.ring.sort()

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def get_shard(self, key):
        if not self.ring:
            return None

        hash_val = self._hash(str(key))

        # Binary search for first node >= hash_val
        for node_hash in self.ring:
            if hash_val <= node_hash:
                return self.shard_map[node_hash]

        return self.shard_map[self.ring[0]]
```

### 4. Directory-Based Sharding

Lookup table maps keys to shards.

```python
class DirectorySharding:
    def __init__(self):
        self.directory = {}  # key -> shard mapping
        self.shards = ["shard_1", "shard_2", "shard_3"]
        self.current_shard_idx = 0

    def get_shard(self, key):
        if key in self.directory:
            return self.directory[key]

        # Assign to shard (round-robin or by capacity)
        shard = self.shards[self.current_shard_idx]
        self.directory[key] = shard
        self.current_shard_idx = (self.current_shard_idx + 1) % len(self.shards)
        return shard
```

**Pros**: Flexible, easy to move data
**Cons**: Directory becomes single point of failure

### 5. Geographic Sharding

Partition by user location.

```python
def get_shard_by_region(user_region):
    region_shards = {
        "us-east": "shard_us_east",
        "us-west": "shard_us_west",
        "eu": "shard_eu",
        "asia": "shard_asia"
    }
    return region_shards.get(user_region, "shard_default")
```

## Shard Key Selection

The shard key is crucial for performance:

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">SHARD KEY SELECTION</div>

  <div style="margin-bottom: 32px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <span style="color: #7ee787; font-size: 20px;">✓</span>
      <span style="color: #7ee787; font-weight: 600;">GOOD SHARD KEY: user_id</span>
    </div>
    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px;">
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 12px;">Shard 1</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 12px;">Shard 2</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 12px;">Shard 3</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 12px;">Shard 4</div>
      </div>
    </div>
    <div style="text-align: center; color: #7ee787; font-size: 13px;">← Even distribution!</div>
  </div>

  <div style="margin-bottom: 32px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <span style="color: #f85149; font-size: 20px;">✗</span>
      <span style="color: #f85149; font-weight: 600;">BAD SHARD KEY: country</span>
    </div>
    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px;">
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); height: 60px; border-radius: 8px; margin-bottom: 8px; box-shadow: 0 0 20px rgba(248, 81, 73, 0.3);"></div>
        <div style="color: #8b949e; font-size: 12px;">US (90%)</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(to top, #21262d 75%, #da3633 75%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 12px;">EU (7%)</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(to top, #21262d 90%, #da3633 90%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 12px;">Asia (2%)</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: #21262d; height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 12px;">Other (1%)</div>
      </div>
    </div>
    <div style="text-align: center; color: #f85149; font-size: 13px;">← Hotspot on US!</div>
  </div>

  <div>
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <span style="color: #f85149; font-size: 20px;">✗</span>
      <span style="color: #f85149; font-weight: 600;">BAD SHARD KEY: created_at (time-based)</span>
    </div>
    <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 8px; font-size: 12px; color: #8b949e;">
      <div style="width: 90px; text-align: center;">Day 1 ↓</div>
      <div style="width: 90px; text-align: center;">Day 2 ↓</div>
      <div style="width: 90px; text-align: center;">Day 3 ↓</div>
      <div style="width: 90px; text-align: center;">Day 4 ↓</div>
    </div>
    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px;">
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 11px;">Jan 1-7</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 11px;">Jan 8-14</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); height: 60px; border-radius: 8px; margin-bottom: 8px;"></div>
        <div style="color: #8b949e; font-size: 11px;">Jan 15-21</div>
      </div>
      <div style="width: 90px; text-align: center;">
        <div style="background: linear-gradient(135deg, #ffa657 0%, #d29922 100%); height: 60px; border-radius: 8px; margin-bottom: 8px; box-shadow: 0 0 20px rgba(255, 166, 87, 0.3);"></div>
        <div style="color: #8b949e; font-size: 11px;">Jan 22-28</div>
      </div>
    </div>
    <div style="text-align: center; color: #ffa657; font-size: 13px;">← All writes here! (current)</div>
  </div>
</div>

### Good Shard Key Properties

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

1. **High Cardinality**: Many unique values (user_id: millions, country: ~200)
2. **Even Distribution**: Data spreads evenly across shards
3. **Query Patterns**: Matches how you query (shard by user_id if you query by user)
4. **Immutable**: Shouldn't change (changing shard key = moving data!)

</div>

### Examples

```sql
-- Good: user_id (high cardinality, even distribution)
-- Table: orders
-- Shard key: user_id

-- Bad: country (low cardinality, uneven)
-- 90% of users might be in one country

-- Bad: created_at (time-based hotspot)
-- All new writes go to one shard
```

## Cross-Shard Operations

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

⚠️ **Cross-shard operations are expensive!** Design your schema to minimize them. If you frequently need to join data across shards, you may have chosen the wrong shard key.

</div>

### Scatter-Gather Pattern

Query all shards and aggregate results.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">SCATTER-GATHER PATTERN</div>

  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; margin-bottom: 20px; text-align: center;">
    <div style="color: #58a6ff; font-family: monospace; font-size: 13px;">Query: "SELECT * FROM orders WHERE product='iPhone' ORDER BY date"</div>
    <div style="color: #ffa657; font-size: 12px; margin-top: 8px;">(Can't use shard key - must query all shards!)</div>
  </div>

  <div style="text-align: center; margin-bottom: 20px;">
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 32px; display: inline-block;">
      <div style="color: #ffffff; font-weight: 600;">Coordinator</div>
    </div>
  </div>

  <div style="text-align: center; color: #58a6ff; font-weight: 600; margin-bottom: 12px;">1. SCATTER (parallel)</div>
  <div style="text-align: center; color: #58a6ff; font-size: 24px; margin-bottom: 16px;">↓ ↓ ↓</div>

  <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; min-width: 120px; text-align: center;">
      <div style="color: #ffffff; font-weight: 600;">Shard 1</div>
      <div style="color: #aaffaa; font-size: 12px; margin-top: 4px;">Query...</div>
      <div style="color: #ffffff; font-size: 14px; margin-top: 8px; font-weight: 600;">50 rows</div>
    </div>
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; min-width: 120px; text-align: center;">
      <div style="color: #ffffff; font-weight: 600;">Shard 2</div>
      <div style="color: #aaffaa; font-size: 12px; margin-top: 4px;">Query...</div>
      <div style="color: #ffffff; font-size: 14px; margin-top: 8px; font-weight: 600;">30 rows</div>
    </div>
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; min-width: 120px; text-align: center;">
      <div style="color: #ffffff; font-weight: 600;">Shard 3</div>
      <div style="color: #aaffaa; font-size: 12px; margin-top: 4px;">Query...</div>
      <div style="color: #ffffff; font-size: 14px; margin-top: 8px; font-weight: 600;">70 rows</div>
    </div>
  </div>

  <div style="text-align: center; color: #a371f7; font-size: 24px; margin-bottom: 12px;">↓ ↓ ↓</div>
  <div style="text-align: center; color: #a371f7; font-weight: 600; margin-bottom: 16px;">2. GATHER (merge)</div>

  <div style="text-align: center; margin-bottom: 20px;">
    <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px 32px; display: inline-block;">
      <div style="color: #ffffff; font-weight: 600;">Merge & Sort</div>
      <div style="color: #ddccff; font-size: 12px; margin-top: 4px;">150 total rows - Sort by date</div>
    </div>
  </div>

  <div style="text-align: center; color: #7ee787; font-size: 24px; margin-bottom: 8px;">↓</div>
  <div style="text-align: center; color: #7ee787; font-weight: 600; margin-bottom: 20px;">Return to client</div>

  <div style="background: rgba(255, 166, 87, 0.1); border: 1px solid #ffa657; border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #ffa657; font-weight: 600;">Warning:</span>
    <span style="color: #f0f6fc;"> Latency = slowest shard + merge time</span>
  </div>
</div>

```python
async def search_all_shards(query):
    tasks = []
    for shard in shards:
        tasks.append(query_shard(shard, query))

    results = await asyncio.gather(*tasks)
    return merge_results(results)
```

### Distributed Transactions

Two-phase commit for cross-shard consistency.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">TWO-PHASE COMMIT (2PC)</div>

  <div style="text-align: center; color: #8b949e; margin-bottom: 24px;">Transaction: Transfer $100 from User A (Shard 1) to User B (Shard 2)</div>

  <div style="text-align: center; margin-bottom: 24px;">
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 32px; display: inline-block;">
      <div style="color: #ffffff; font-weight: 600;">Coordinator</div>
    </div>
  </div>

  <div style="background: rgba(88, 166, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <div style="color: #58a6ff; font-weight: 600; text-align: center; margin-bottom: 16px;">PHASE 1: PREPARE</div>
    <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; min-width: 160px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; margin-bottom: 8px;">Shard 1</div>
        <div style="color: #aaffaa; font-size: 12px;">PREPARE</div>
        <div style="color: #aaffaa; font-size: 12px;">-$100 from A</div>
        <div style="color: #aaffaa; font-size: 12px;">Lock row</div>
        <div style="color: #7ee787; font-weight: 600; margin-top: 8px;">→ VOTE YES ✓</div>
      </div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; min-width: 160px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; margin-bottom: 8px;">Shard 2</div>
        <div style="color: #aaffaa; font-size: 12px;">PREPARE</div>
        <div style="color: #aaffaa; font-size: 12px;">+$100 to B</div>
        <div style="color: #aaffaa; font-size: 12px;">Lock row</div>
        <div style="color: #7ee787; font-weight: 600; margin-top: 8px;">→ VOTE YES ✓</div>
      </div>
    </div>
  </div>

  <div style="background: rgba(163, 113, 247, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <div style="color: #a371f7; font-weight: 600; text-align: center; margin-bottom: 16px;">PHASE 2: COMMIT (if all voted YES)</div>
    <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 10px; padding: 16px; min-width: 160px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; margin-bottom: 8px;">Shard 1</div>
        <div style="color: #ddccff; font-size: 12px;">COMMIT</div>
        <div style="color: #ddccff; font-size: 12px;">Apply -$100</div>
        <div style="color: #ddccff; font-size: 12px;">Release lock</div>
        <div style="color: #7ee787; font-weight: 600; margin-top: 8px;">→ ACK ✓</div>
      </div>
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 10px; padding: 16px; min-width: 160px; text-align: center;">
        <div style="color: #ffffff; font-weight: 600; margin-bottom: 8px;">Shard 2</div>
        <div style="color: #ddccff; font-size: 12px;">COMMIT</div>
        <div style="color: #ddccff; font-size: 12px;">Apply +$100</div>
        <div style="color: #ddccff; font-size: 12px;">Release lock</div>
        <div style="color: #7ee787; font-weight: 600; margin-top: 8px;">→ ACK ✓</div>
      </div>
    </div>
  </div>

  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 8px; padding: 12px; text-align: center;">
      <span style="color: #f85149; font-weight: 600;">Warning:</span>
      <span style="color: #f0f6fc;"> If any shard votes NO → ABORT all (rollback)</span>
    </div>
    <div style="background: rgba(255, 166, 87, 0.1); border: 1px solid #ffa657; border-radius: 8px; padding: 12px; text-align: center;">
      <span style="color: #ffa657; font-weight: 600;">Blocking:</span>
      <span style="color: #f0f6fc;"> If coordinator fails, shards wait forever!</span>
    </div>
  </div>
</div>

```python
class TwoPhaseCommit:
    def execute(self, shards, operations):
        # Phase 1: Prepare
        prepared = []
        for shard, op in zip(shards, operations):
            if shard.prepare(op):
                prepared.append(shard)
            else:
                # Rollback all prepared
                for s in prepared:
                    s.rollback()
                return False

        # Phase 2: Commit
        for shard in prepared:
            shard.commit()
        return True
```

## Implementation Example

### Go - Sharded Database Router

```go
package main

import (
	"crypto/md5"
	"database/sql"
	"encoding/binary"
	"fmt"
	"sync"
)

type ShardRouter struct {
	shards    []*sql.DB
	numShards int
	mu        sync.RWMutex
}

func NewShardRouter(dsns []string) (*ShardRouter, error) {
	router := &ShardRouter{
		shards:    make([]*sql.DB, len(dsns)),
		numShards: len(dsns),
	}

	for i, dsn := range dsns {
		db, err := sql.Open("postgres", dsn)
		if err != nil {
			return nil, err
		}
		router.shards[i] = db
	}

	return router, nil
}

func (r *ShardRouter) GetShard(key string) *sql.DB {
	hash := md5.Sum([]byte(key))
	shardIdx := binary.BigEndian.Uint64(hash[:8]) % uint64(r.numShards)
	return r.shards[shardIdx]
}

func (r *ShardRouter) ExecuteOnShard(key string, query string, args ...interface{}) (*sql.Rows, error) {
	shard := r.GetShard(key)
	return shard.Query(query, args...)
}

func (r *ShardRouter) ExecuteOnAllShards(query string, args ...interface{}) ([][]map[string]interface{}, error) {
	var wg sync.WaitGroup
	results := make([][]map[string]interface{}, r.numShards)
	errors := make([]error, r.numShards)

	for i, shard := range r.shards {
		wg.Add(1)
		go func(idx int, db *sql.DB) {
			defer wg.Done()
			rows, err := db.Query(query, args...)
			if err != nil {
				errors[idx] = err
				return
			}
			defer rows.Close()

			results[idx] = scanRows(rows)
		}(i, shard)
	}

	wg.Wait()

	// Check for errors
	for _, err := range errors {
		if err != nil {
			return nil, err
		}
	}

	return results, nil
}

func scanRows(rows *sql.Rows) []map[string]interface{} {
	columns, _ := rows.Columns()
	var results []map[string]interface{}

	for rows.Next() {
		values := make([]interface{}, len(columns))
		pointers := make([]interface{}, len(columns))
		for i := range values {
			pointers[i] = &values[i]
		}

		rows.Scan(pointers...)

		row := make(map[string]interface{})
		for i, col := range columns {
			row[col] = values[i]
		}
		results = append(results, row)
	}

	return results
}

func main() {
	dsns := []string{
		"postgres://localhost:5432/shard1",
		"postgres://localhost:5433/shard2",
		"postgres://localhost:5434/shard3",
	}

	router, _ := NewShardRouter(dsns)

	// Query specific shard
	userID := "user123"
	shard := router.GetShard(userID)
	fmt.Printf("User %s routes to shard\n", userID)

	// Query all shards
	results, _ := router.ExecuteOnAllShards("SELECT COUNT(*) FROM users")
	fmt.Printf("Results from all shards: %v\n", results)
}
```

### Python - Sharding with SQLAlchemy

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import hashlib

class ShardedDatabase:
    def __init__(self, shard_configs):
        self.shards = {}
        self.shard_names = []

        for name, config in shard_configs.items():
            engine = create_engine(config['url'])
            Session = sessionmaker(bind=engine)
            self.shards[name] = {
                'engine': engine,
                'session': Session
            }
            self.shard_names.append(name)

    def get_shard_key(self, user_id):
        hash_val = int(hashlib.md5(str(user_id).encode()).hexdigest(), 16)
        idx = hash_val % len(self.shard_names)
        return self.shard_names[idx]

    def get_session(self, user_id):
        shard_name = self.get_shard_key(user_id)
        return self.shards[shard_name]['session']()

    def execute_on_all(self, query):
        results = []
        for shard in self.shards.values():
            session = shard['session']()
            try:
                result = session.execute(query)
                results.extend(result.fetchall())
            finally:
                session.close()
        return results


# Usage
db = ShardedDatabase({
    'shard1': {'url': 'postgresql://localhost:5432/shard1'},
    'shard2': {'url': 'postgresql://localhost:5433/shard2'},
})

# Get session for specific user
session = db.get_session(user_id=12345)
user = session.query(User).filter_by(id=12345).first()
```

## Resharding

When you need to add or remove shards:

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #f0f6fc; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363d;">ONLINE RESHARDING (Zero Downtime)</div>

  <div style="margin-bottom: 28px;">
    <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">Step 1: Add New Shards</div>
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px; width: 80px; height: 50px;"></div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px; width: 80px; height: 50px;"></div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px; width: 80px; height: 50px;"></div>
      <div style="color: #8b949e; font-size: 20px;">+</div>
      <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px dashed #ffa657; border-radius: 8px; padding: 12px; width: 80px; height: 50px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #ffa657; font-size: 11px;">New empty</span>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 28px;">
    <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">Step 2: Double-Write</div>
    <div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <span style="color: #f0f6fc;">New Write</span>
        <span style="color: #58a6ff;">→</span>
        <span style="color: #7ee787;">Shard 2 (old location)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 8px; padding-left: 70px;">
        <span style="color: #58a6ff;">→</span>
        <span style="color: #ffa657;">Shard 4 (new location)</span>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 28px;">
    <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">Step 3: Backfill (copy existing data in background)</div>
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; width: 80px; height: 50px;"></div>
      <div style="background: linear-gradient(to right, #238636 50%, #21262d 50%); border-radius: 8px; width: 80px; height: 50px;"></div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; width: 80px; height: 50px;"></div>
      <div style="color: #ffa657; font-size: 24px;">→</div>
      <div style="background: linear-gradient(to right, #21262d 30%, #ffa657 30%); border-radius: 8px; width: 80px; height: 50px;"></div>
      <span style="color: #ffa657; font-size: 12px;">Backfilling...</span>
    </div>
  </div>

  <div style="margin-bottom: 28px;">
    <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">Step 4: Switch Reads</div>
    <div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <span style="color: #f0f6fc;">Read</span>
        <span style="color: #58a6ff;">→</span>
        <span style="color: #a371f7;">Router</span>
        <span style="color: #58a6ff;">→</span>
        <span style="color: #7ee787;">Shard 4 (new location)</span>
      </div>
    </div>
  </div>

  <div>
    <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">Step 5: Remove Double-Write & Cleanup</div>
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 12px;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; width: 80px; height: 50px;"></div>
      <div style="background: linear-gradient(to right, #238636 60%, #21262d 60%); border-radius: 8px; width: 80px; height: 50px;"></div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; width: 80px; height: 50px;"></div>
      <div style="background: linear-gradient(to right, #21262d 40%, #238636 40%); border-radius: 8px; width: 80px; height: 50px;"></div>
    </div>
    <div style="text-align: center; color: #7ee787; font-size: 13px;">← Data redistributed!</div>
  </div>
</div>

### Online Resharding Steps

1. **Add new shards** - Provision new database instances
2. **Double-write** - Write to both old and new locations
3. **Backfill** - Copy existing data to new shards
4. **Verify** - Ensure data consistency
5. **Switch reads** - Direct reads to new shards
6. **Remove double-write** - Write only to new locations
7. **Cleanup** - Remove data from old shards

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **How do you handle joins across shards?**
   - Denormalize data
   - Application-level joins
   - Use reference tables replicated to all shards

2. **How do you maintain auto-increment IDs?**
   - UUID/GUID
   - Centralized ID service (like Twitter's Snowflake)
   - Shard prefix + local sequence

3. **What happens when a shard fails?**
   - Each shard should have replicas
   - Automatic failover to replica
   - Circuit breaker for failed shards

4. **How do you choose the number of shards?**
   - Start with more shards than needed
   - Consider data growth projections
   - Balance between overhead and flexibility

</div>

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Choose shard key carefully** - It's hard to change later
2. **Plan for resharding** - Use consistent hashing
3. **Keep shards balanced** - Monitor data distribution
4. **Replicate each shard** - For high availability
5. **Avoid cross-shard transactions** - Design for single-shard operations
6. **Use connection pooling** - Manage connections efficiently

</div>

## Related Topics

- [Database Replication](/topic/system-design/database-replication)
- [CAP Theorem](/topic/system-design/cap-theorem)
- [Consistent Hashing](/topic/system-design/load-balancing)
