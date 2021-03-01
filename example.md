---
templateEngineOverride: njk,md
---
# Example Contributors

Here are the contributors to this page:

{% set contributions = page.inputPath | getContributors -%}

{% for contributor in contributions -%}
-   {{contributor.authorName}} {{ contributor.authorEmail}}
{% endfor %}