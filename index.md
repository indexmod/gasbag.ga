---
title:
layout: cover
exclude: true
---

<ul>
  {% assign mypages = site.html_pages | sort: "order" %}
  {% for page in mypages %}
  {% unless page.exclude %}
  <li class="cover_list">
  <a href="{{ page.permalink | absolute_url }}">{{ page.shortname }}</a>
  </li>
  {% endunless %}
 {% endfor %}
</ul>
