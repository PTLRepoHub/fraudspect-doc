---
sidebar_position: 2
title: Run AML Scan
---

# Run AML Scan

Trigger an asynchronous Anti-Money Laundering (AML) graph scan to detect multi-account financial crime typologies across transactions, including structuring/smurfing, rapid pass-through movement, and coordinated network rings.

:::info Graph Topology Detection
Unlike single-transaction rules that evaluate payments in isolation, the AML scan analyzes multi-hop entity graphs across time windows to uncover suspicious flows intentionally split to evade standard transaction limits.
:::

## API Call

Send an HTTP **POST** request to:

```text
POST /api/v1/aml/run
```

### Parameters

| Parameter | Location | Required | Description |
| :--- | :--- | :--- | :--- |
| `organization_id` | query / body | — | Optional identifier to restrict the scan to a specific organization or tenant |
| `lookback_days` | body | — | Number of prior days of transaction activity to include in the graph scan (default: `30`) |

### Request

```json
{
  "organization_id": "0b042d50-fa8d-44d6-b3e5-02ace4c24f8b",
  "lookback_days": 30
}
```

### Response — Successful

```json
{
  "status": "success",
  "message": "AML graph scan completed successfully",
  "data": {
    "total_cases": 2,
    "scanned_transactions": 1420,
    "cases": [
      {
        "case_id": "AML-CASE-2026-001",
        "pattern_type": "fan_out_smurfing",
        "title": "Rapid Fan-Out / Smurfing Pattern",
        "risk_level": "HIGH",
        "confidence": 0.94,
        "summary": "1 source account distributed funds across 14 beneficiary accounts within 18 minutes, keeping individual transfers below standard regulatory thresholds.",
        "accounts_involved": 15,
        "total_volume": 420000.0,
        "currency": "NGN"
      },
      {
        "case_id": "AML-CASE-2026-002",
        "pattern_type": "rapid_pass_through",
        "title": "Rapid Pass-Through Layering",
        "risk_level": "MEDIUM",
        "confidence": 0.82,
        "summary": "Funds deposited were transferred out to an external beneficiary within 4 minutes with negligible account balance retention.",
        "accounts_involved": 3,
        "total_volume": 850000.0,
        "currency": "NGN"
      }
    ]
  }
}
```

### Response — Error

```json
{
  "message": "AML pipeline scan failed: database connection timeout",
  "error": "Internal Server Error",
  "statusCode": 500
}
```
