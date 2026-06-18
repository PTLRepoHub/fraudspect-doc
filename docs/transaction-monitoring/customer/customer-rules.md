---
title: Customer Rules (Risk Factors)
sidebar_label: Customer Rules
sidebar_position: 4
---

# Customer Rules (Risk Factors)

A customer rule — also called a **risk factor** — is a configurable scoring rule that evaluates your customers' data and contributes to their overall risk score. Each rule looks at one or more conditions about a customer (such as their account type, country, or custom fields) and adds a numeric score when those conditions are met.

Together, all active risk factors produce a **cumulative risk score** for each customer. That score is used to classify customers as low, medium, or high risk — and it feeds directly into transaction monitoring decisions.

---

## How it works

Customer rules follow a three-level structure:

```
Rule (Risk Factor)
└── Group
    └── Condition (field + operator + value)
```

### Rule

The top-level risk factor. A rule has a name, a status, and one or more groups. You can configure whether the rule:

- Takes only the **highest-scoring group** (`takeMaxScore`) — useful when groups are mutually exclusive risk categories
- Allows **multiple groups to score** simultaneously — useful when a customer can match several risk indicators at once

### Group

A group is a named scenario within a rule, with its own score. For example, a "High-risk countries" group might carry a score of 40, while a "Medium-risk countries" group carries 20.

A group can be scored in two ways:

| Scoring mode | How it works |
|---|---|
| `fixed` | The group's score is applied as-is when the conditions are met |
| `classifier` | The score is calculated dynamically using a trained classifier model |

### Condition

A condition is the actual check: a customer field, an operator, and a target value. All conditions within a group must be satisfied for the group to trigger.

Example: `accountTypeId` `equals` `2` (i.e., the customer is a company).

---

## Manual rules

Rules can also be set to **manual mode**. A manual rule has no automated conditions — instead, your team assigns the score directly against a customer. This is useful for risk factors that cannot be derived from data alone, such as a compliance officer's assessment after an in-person review.

---

## API reference

### List rules

```
GET /api/v1/customer-rules
```

#### Query parameters

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `search`  | string | Filter by rule name |
| `status`  | string | `active` or `disabled` |
| `skip`    | number | Pagination offset. Default: `0` |
| `take`    | number | Page size. Default: `20` |

#### Response

```json
{
  "status": 200,
  "message": "Customer rules fetched",
  "data": {
    "data": [
      {
        "id": 1,
        "name": "High-risk country",
        "status": "active",
        "isManual": false,
        "takeMaxScore": true,
        "allowMultipleChoice": false,
        "groups": [
          {
            "id": 10,
            "name": "Tier 1 risk",
            "score": 40,
            "scoringMode": "fixed",
            "_count": { "fieldOptions": 1 }
          }
        ],
        "_count": { "groups": 1 }
      }
    ],
    "total": 1
  }
}
```

---

### Get a rule

```
GET /api/v1/customer-rules/:id
```

Returns the full rule including all groups and their conditions.

#### Response

```json
{
  "status": 200,
  "message": "Customer rule fetched",
  "data": {
    "id": 1,
    "name": "High-risk country",
    "status": "active",
    "isManual": false,
    "takeMaxScore": true,
    "allowMultipleChoice": false,
    "groups": [
      {
        "id": 10,
        "name": "Tier 1 risk",
        "score": 40,
        "scoringMode": "fixed",
        "fieldOptions": [
          {
            "id": 100,
            "field": "country",
            "operator": "in",
            "value": "NG,GH,KE",
            "functionKey": "field_check",
            "classifier": null
          }
        ]
      }
    ]
  }
}
```

---

### Create a rule

```
POST /api/v1/customer-rules
```

#### Request body

| Field               | Type    | Required | Description |
|---------------------|---------|----------|-------------|
| `name`              | string  | ✅       | Display name for the risk factor |
| `status`            | string  | —        | `active` or `disabled`. Default: `active` |
| `isManual`          | boolean | —        | `true` for manual scoring rules. Default: `false` |
| `takeMaxScore`      | boolean | —        | Only apply the highest-scoring matching group. Default: `false` |
| `allowMultipleChoice` | boolean | —      | Allow multiple groups to score simultaneously. Default: `false` |
| `groups`            | array   | —        | Groups to create with the rule (see below) |

#### Group fields

| Field        | Type    | Required | Description |
|--------------|---------|----------|-------------|
| `name`       | string  | ✅       | Group label |
| `score`      | number  | ✅       | Score applied when this group matches |
| `scoringMode`| string  | —        | `fixed` or `classifier`. Default: `fixed` |
| `fieldOptions` | array | —        | Conditions to evaluate (not allowed when `isManual` is `true`) |

#### Condition fields

| Field         | Type   | Required | Description |
|---------------|--------|----------|-------------|
| `functionKey` | string | ✅       | The evaluation function to use |
| `field`       | string | ✅       | The customer field to evaluate |
| `operator`    | string | ✅       | Comparison operator (e.g. `equals`, `in`, `greaterThan`) |
| `value`       | string | —        | Value to compare against |
| `classifierId`| number | —        | Classifier to use when `scoringMode` is `classifier` |

#### Example

```json
{
  "name": "High-risk country",
  "takeMaxScore": true,
  "groups": [
    {
      "name": "Tier 1 risk",
      "score": 40,
      "fieldOptions": [
        {
          "functionKey": "field_check",
          "field": "country",
          "operator": "in",
          "value": "NG,GH,KE"
        }
      ]
    }
  ]
}
```

---

### Update a rule

```
PUT /api/v1/customer-rules/:id
```

Updates the rule's top-level fields. To modify groups or conditions, use the group and condition endpoints below.

| Field               | Type    | Description |
|---------------------|---------|-------------|
| `name`              | string  | New display name |
| `status`            | string  | `active` or `disabled` |
| `isManual`          | boolean | Toggle manual scoring |
| `takeMaxScore`      | boolean | |
| `allowMultipleChoice` | boolean | |

---

### Delete a rule

```
DELETE /api/v1/customer-rules/:id
```

---

## Managing groups

### Add a group

```
POST /api/v1/customer-rules/:id/groups
```

Body accepts the same fields as the `groups` array items in create.

### Update a group

```
PUT /api/v1/customer-rules/:id/groups/:groupId
```

| Field        | Type   | Description |
|--------------|--------|-------------|
| `name`       | string | |
| `score`      | number | |
| `scoringMode`| string | `fixed` or `classifier` |

### Remove a group

```
DELETE /api/v1/customer-rules/:id/groups/:groupId
```

---

## Managing conditions

### Add a condition

```
POST /api/v1/customer-rules/:id/groups/:groupId/options
```

Body accepts the same fields as condition items in create.

### Update a condition

```
PUT /api/v1/customer-rules/:id/groups/:groupId/options/:optionId
```

All fields are optional — only the provided fields are updated.

### Remove a condition

```
DELETE /api/v1/customer-rules/:id/groups/:groupId/options/:optionId
```
