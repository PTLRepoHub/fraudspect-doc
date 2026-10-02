---
sidebar_position: 1
title: Score Transaction (ML)
---

# Score Transaction (ML)

Submit a transaction for real-time machine learning inference. The ML engine evaluates the transaction against the customer's historical behavioral baseline and population distributions using Isolation Forest and sequential CUSUM drift detection, returning a risk score and plain-language explanations.

:::info Behavioral Baseline
The ML service automatically analyzes the customer's prior transaction history in real time. If a customer is new, a cold-start baseline is used without interrupting scoring.
:::

## API Call

Send an HTTP **POST** request to:

```text
POST /api/v1/ml/score
```

### Parameters

| Parameter | Location | Required | Description |
| :--- | :--- | :--- | :--- |
| `customer_id` | body | ✅ | Customer identifier used for behavioral baseline lookup |
| `amount` | body | ✅ | Monetary amount of the transaction |
| `currency` | body | — | ISO currency code (default: `NGN`) |
| `transaction_id` | body | — | Unique transaction identifier. Auto-generated if omitted |
| `channel` | body | — | Delivery channel (e.g. `MOBILE`, `WEB`, `POS`) |
| `transmode` | body | — | Transaction mode (e.g. `P2P`, `P2B`, `CASH_WITHDRAWAL`) |
| `device_id` | body | — | Device fingerprint or hardware identifier |
| `location` | body | — | Comma-separated coordinates (e.g. `"6.5244,3.3792"`) |
| `destination_country`| body | — | Destination country name or ISO code |
| `thresholds` | body | — | Custom risk thresholds for anomaly classification and drift detection |

### Request

```json
{
  "transaction_id": "TX-2026-0042",
  "customer_id": "8880",
  "amount": 185000.0,
  "currency": "NGN",
  "channel": "MOBILE",
  "transmode": "P2P",
  "device_id": "dev-and-99",
  "location": "6.5244,3.3792",
  "destination_country": "Nigeria",
  "thresholds": {
    "anomaly_high": 0.7,
    "anomaly_medium": 0.5
  }
}
```

:::tip Plain-Language Explanations
The response includes `top_features` explaining the primary drivers behind the score, with user-friendly labels and human-readable narratives designed for compliance officers and analysts.
:::

### Response — Successful

```json
{
  "transaction_id": "TX-2026-0042",
  "organization_id": "default",
  "customer_id": "8880",
  "ml_score": 0.65,
  "is_anomaly": true,
  "confidence": "MEDIUM",
  "summary": "Moderate anomaly risk (65%) on transaction of ₦185,000.00: Amount to Average Ratio is 4.2x customer's historical average; Transaction initiated from an unfamiliar geographic location.",
  "top_features": [
    {
      "feature_name": "amount_to_avg_ratio",
      "feature_label": "Amount to Average Ratio",
      "shap_value": 0.38,
      "direction": "increases_risk",
      "impact_level": "HIGH",
      "description": "Transaction amount is 4.2x higher than customer's historical average",
      "feature_value": 4.2
    },
    {
      "feature_name": "geo_distance_km",
      "feature_label": "Geographic Distance",
      "shap_value": 0.22,
      "direction": "increases_risk",
      "impact_level": "MEDIUM",
      "description": "Location is 412 km from customer's usual transaction cluster",
      "feature_value": 412.0
    }
  ],
  "triggered_concepts": [],
  "is_drifting": false,
  "drift_score": 0.45,
  "history_count": 24,
  "history_status": "ok",
  "used_cold_start": false
}
```

### Response — Bad Request

```json
{
  "message": "Validation error: 'customer_id' and 'amount' are required fields",
  "error": "Bad Request",
  "statusCode": 400
}
```
