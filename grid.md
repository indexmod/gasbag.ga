---
title: Grid
permalink: grid
layout: tech-universe
shortname: UNIVERSE
exclude: true
---

<wrap>

{% assign mypages = site.html_pages | sort: "title" %}
{% for page in mypages %}
{% unless page.exclude %}
<figure>
<a href="{{ page.permalink | absolute_url }}">{% include indexmod-indicator.html %}</a>
<figcaption>
<p class="shortname">{{page.shortname}}</p></figcaption>
</figure>
{% endunless %}
{% endfor %}

</wrap>
