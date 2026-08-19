---
title: Social Media Analytics and Reporting Automation
slug: analytics-automation
summary: Built a repeatable social-media analytics pipeline that pulled multi-platform data from ClickHouse into automated spreadsheets, KOL scrapers, and BI dashboards for four FMCG brands.
evidenceType: Professional Experience
organization: Future Creative Network (Maleo)
industry: Marketing and creative analytics
role: Data Analyst
timeline: June 2025–June 2026
tools: [ClickHouse, Apps Script, Python, PostgreSQL, MySQL, TablePlus, Google Sheets, Looker Studio, Tableau, Metabase]
categories: [Analytics & Automation, Business Intelligence]
featured: true
confidential: true
confidentialityNote: Brand names are shown with permission, but all operating figures, stakeholder identities, competitor handles, internal file names, and campaign specifics are withheld. Code samples are generic templates with placeholders; diagrams and tables use illustrative data.
coverImage: /images/projects/analytics-automation.svg
coverAlt: Abstract flow from data sources through processing to dashboards and decision signals
outcomes: [Reduced repetitive manual reporting across brands, Improved consistency of recurring monthly and campaign outputs, Created timely daily signals for performance discussions]
relatedAssets:
  - { label: Sanitized architecture diagram, type: image, href: /images/projects/analytics-automation.svg, available: true, note: Abstract representation only }
---
## Snapshot

Social-media reporting for several FMCG brands ran across five or more platforms, with raw data scattered across tools. I built a maintained pipeline that moved that data into automated spreadsheets, recurring reports, and dashboards so analysts could spend time on interpretation instead of manual preparation. Figures are described qualitatively because approved measurements are not available for publication.

## The situation

Maleo manages social-media analytics for consumer brands. The work covered monthly reports, campaign reports, KOL (influencer) reporting, quarterly reviews, and ad-hoc social listening. Data lived across Instagram, TikTok, X/Twitter, Facebook, and YouTube, plus an internal ClickHouse warehouse.

## The problem

Recurring preparation was repetitive and error-prone: pull the data, clean it, recompute KPIs, rebuild the same deck each cycle. Each brand also had its own report structure and stakeholder expectations, which made handover fragile.

## The brands

Four FMCG brands anchored the workload. Names are shown with permission; all figures stay confidential.

| Brand | Primary report types | Main channels |
|---|---|---|
| SilverQueen | Monthly + campaign reports | Instagram, TikTok |
| BlueBand | Ad-hoc, campaign, quarterly, social listening | Multi-platform |
| Pantene | Campaign + KOL reporting | Instagram, TikTok |
| TOP Coffee | Whitelabel report supervision | Multi-platform |

## The pipeline

The system moved data from source to decision signal through a maintained processing layer:

![Abstract pipeline from data sources through processing to reports and daily decision signals. No client data.](/images/projects/pipeline-flow.svg)

1. **ClickHouse → Sheets.** Apps Script pulled platform tables into brand workbooks on a daily schedule, refreshing content and follower tabs automatically.
2. **KPI workbook.** Each workbook separated raw/update tabs from a master sheet that appended manual campaign fields, then computed standardized engagement metrics.
3. **Python scrapers.** Notebook templates handled KOL and campaign pulls that the warehouse did not cover, with logging so errors could be traced.
4. **BI layer.** Dashboards and recurring outputs consumed the cleaned tables.
5. **Decision signals.** A chatbot delivered daily performance nudges to internal teams.

## Technical patterns

The following are generic, sanitized templates. Placeholders mark anything that would reference a real brand, period, or credential.

### SQL — followers growth template

```sql
-- Followers growth to the last recorded point per period
SELECT
  platform,
  DATE_TRUNC('month', captured_at)        AS period,
  MAX(followers)                          AS followers_end,
  MAX(followers) - MIN(followers)         AS followers_growth
FROM social_followers
WHERE brand = '<brand>'
  AND captured_at BETWEEN '<start_date>' AND '<end_date>'
GROUP BY platform, period
ORDER BY period, platform;
```

### Apps Script — scheduled ClickHouse → Sheets refresh

```javascript
// Credentials are read from Script Properties, never hard-coded.
function refresh_<brand>_tabs() {
  const props = PropertiesService.getScriptProperties();
  const conn = {
    host: props.getProperty('CH_HOST'),
    user: props.getProperty('CH_USER'),
    password: props.getProperty('CH_PASS'),
  };
  run_query_into_sheet(conn, SQL_IG_CONTENT,   'update_ig');
  run_query_into_sheet(conn, SQL_TT_CONTENT,   'update_tiktok');
  run_query_into_sheet(conn, SQL_IG_FOLLOWERS, 'ig_followers');
}

function create_daily_trigger() {
  ScriptApp.newTrigger('refresh_<brand>_tabs')
    .timeBased()
    .everyDays(1)
    .atHour(9)          // morning refresh, local time
    .create();
}
```

### Python — KOL / campaign pull pattern

```python
# Cookies/tokens are loaded from a local file that is never committed
# or sent with the output. Each run appends to a scrape_log for tracing.
def scrape_kol_posts(post_urls: list[str]) -> pd.DataFrame:
    rows, scrape_log = [], []
    for url in post_urls:
        try:
            media = fetch_media(url)            # platform-specific fetch
            rows.append({
                'url':       url,
                'views':     media.views,
                'likes':     media.likes,
                'comments':  media.comments,
                'shares':    media.shares,
            })
        except Exception as exc:                # keep going, log the gap
            scrape_log.append({'url': url, 'error': str(exc)})
    df = pd.DataFrame(rows)
    df['engagement_total'] = df[['likes', 'comments', 'shares']].sum(axis=1)
    df['er_by_views']      = df['engagement_total'] / df['views']
    return df
```

## Quality-control standards

- **Metric definitions are explicit.** Every report documents how engagement rate is computed — whether divided by reach, impressions, views, or followers — because the platforms disagree.
- **Organic and paid stay separate** before any total is produced.
- **Freshness checks** confirm each pull reached the expected cut-off before a report is built.
- **No credentials in artifacts.** Passwords, tokens, and cookies live in a credential vault or Script Properties, never in notebooks, sheets, or decks.

## Outcome

The pipeline reduced repetitive manual reporting across the brands, improved consistency of recurring monthly and campaign outputs, and gave teams timely daily signals for performance discussions. No unverified time-saving figure is published.

## What I learned

Automation is only useful when KPI definitions, freshness checks, and escalation paths are equally clear. The reusable asset is not any single script — it is the documented pattern that lets the next analyst rerun the whole workflow without reverse-engineering it.
