---
title: Categories
# All the Categories of posts
# v2.0
# https://github.com/cotes2020/jekyll-theme-chirpy
# © 2017-2019 Cotes Chung
# MIT License
---
{% assign HEAD_PREFIX = "h_" %}
{% assign LIST_PREFIX = "l_" %}

{% assign sort_categories = site.categories | sort %}
<!-- level 0 -->
{% for category0 in sort_categories %} <!-- change level here -->
  <div>
    <!-- top-category -->
    {% assign printed0 = false %} <!-- change level here -->
    {% for post in site.posts %}
      {% if post.categories[0] == category0[0] and printed0 == false %} <!-- change level here -->
        {% assign category_name = category0 | first %}
        {% assign posts_of_category = category0 | last %}
        {% assign first_post = posts_of_category | first %}

        {% if category_name == first_post.categories[0] %}
          {% assign sub_categories = "" | split: "" %}

          {% for post in posts_of_category %}
            {% assign second_category = post.categories[1] %}
            {% if second_category %}
              {% unless sub_categories contains second_category %}
              {% assign sub_categories = sub_categories | push: second_category %}
              {% endunless %}
            {% endif %}
          {% endfor %}

          {% assign sub_categories = sub_categories | sort %}
          {% assign sub_categories_size = sub_categories | size %}
        {% endif %}

        <div class="card categories">
          <div class="card-header d-flex justify-content-between hide-border-bottom" id="{{ HEAD_PREFIX }}{{ category_name }}">
          <span>
            {% if sub_categories_size > 0 %}
              <i class="far fa-folder-open fa-fw"></i>
            {% else %}
              <i class="far fa-folder fa-fw"></i>
            {% endif %}
              <a href="{{ site.baseurl }}/categories/{{ category_name | replace: ' ', '-' | downcase | url_encode }}/"
                 class="ml-1 mr-2">
                {{ category_name }}
              </a>
            <!-- content count -->
              {% assign top_posts_size = site.categories[category_name] | size %}
              <span class="text-muted small font-weight-light">
              {% if sub_categories_size > 0 %}
                {{ sub_categories_size }}
                {% if sub_categories_size > 1 %}categories{% else %}category{% endif %},
              {% endif %}
                {{ top_posts_size }}
                post{% if top_posts_size > 1 %}s{% endif %}
              </span>
          </span>
            <!-- arrow -->
            {% if sub_categories_size > 0 %}
              <a href="#{{ LIST_PREFIX }}{{ category_name }}" data-toggle="collapse" aria-expanded="true" class="category-trigger hide-border-bottom">
                <i class="fas fa-fw fa-angle-down"></i>
              </a>
            {% else %}
              <span data-toggle="collapse" class="category-trigger hide-border-bottom disabled">
              <i class="fas fa-fw fa-angle-right"></i>
            </span>
            {% endif %}
          </div> <!-- .card-header -->
          {% assign printed0 = true %} <!-- change level here -->
          <!-- level 1 -->
          <!-- Sub-categories -->
          {% if sub_categories_size > 0 %}
            <div id="{{ LIST_PREFIX }}{{ category_name }}" class="collapse show" aria-expanded="true">
              <ul class="list-group">
                {% for category1 in sort_categories %} <!-- change level here -->
                  {% assign printed1 = false %} <!-- change level here -->
                  {% for post in site.posts %}
                    {% if post.categories[0] == category0[0] and post.categories[1] == category1[0] and printed1 == false %} <!-- change level here -->

                      {% assign category_name = category1 | first %}
                      {% assign sub_category = category_name %}
                      {% assign posts_of_category = category1 | last %}
                      {% assign first_post = posts_of_category | first %}
                      {% assign sub_categories = "" | split: "" %}

                      {% for post in posts_of_category %}
                        {% assign second_category = post.categories[2] %}
                        {% if second_category %}
                          {% unless sub_categories contains second_category %}
                          {% assign sub_categories = sub_categories | push: second_category %}
                          {% endunless %}
                        {% endif %}
                      {% endfor %}

                      {% assign sub_categories = sub_categories | sort %}
                      {% assign sub_categories_size = sub_categories | size %}

                      {% if sub_categories_size > 0 %}
                        <div class="level2 card-header d-flex justify-content-between show-border-top hide-border-bottom" id="{{ HEAD_PREFIX }}{{ category_name }}">
                        <span>
                          {% if sub_categories_size > 0 %}
                            <i class="far fa-folder-open fa-fw"></i>
                          {% else %}
                            <i class="far fa-folder fa-fw"></i>
                          {% endif %}
                          <a href="{{ site.baseurl }}/categories/{{ category_name | replace: ' ', '-' | downcase | url_encode }}/"
                             class="ml-1 mr-2">
                            {{ category_name }}
                          </a>
                            <!-- content count -->
                            {% assign top_posts_size = site.categories[category_name] | size %}
                            <span class="text-muted small font-weight-light">
                            {% if sub_categories_size > 0 %}
                              {{ sub_categories_size }}
                              {% if sub_categories_size > 1 %}categories{% else %}category{% endif %},
                            {% endif %}
                              {{ top_posts_size }}
                              post{% if top_posts_size > 1 %}s{% endif %}
                            </span>
                          </span>
                          <!-- arrow -->
                          {% if sub_categories_size > 0 %}
                            <a href="#{{ LIST_PREFIX }}{{ category_name }}" data-toggle="collapse" aria-expanded="true" class="category-trigger hide-border-bottom">
                              <i class="fas fa-fw fa-angle-down"></i>
                            </a>
                          {% else %}
                            <span data-toggle="collapse" class="category-trigger hide-border-bottom disabled">
                            <i class="fas fa-fw fa-angle-right"></i>
                          </span>
                          {% endif %}
                        </div> <!-- .card-header -->
                      {% else %}
                        <li class="list-group-item">
                          <i class="far fa-folder fa-fw"></i>
                          <a href="{{ site.baseurl }}/categories/{{ sub_category | replace: ' ', '-' | downcase | url_encode }}/"
                             class="ml-1 mr-2">{{ sub_category }}</a>
                          {% assign posts_size = site.categories[sub_category] | size %}
                          <span class="text-muted small font-weight-light">{{ posts_size }}
                          post{% if posts_size > 1 %}s{% endif %}
                        </span>
                        </li>
                      {% endif %}

                      {% assign printed1 = true %} <!-- change level here -->
                      <!-- level 2 -->
                      <div id="{{ LIST_PREFIX }}{{ category_name }}" class="collapse show" aria-expanded="true">
                      <ul class="list-group">
                        {% for category2 in sort_categories %} <!-- change level here -->
                          {% assign printed2 = false %} <!-- change level here -->
                          {% for post in site.posts %}
                            {% if post.categories[0] == category0[0] and post.categories[1] == category1[0] and post.categories[2] == category2[0] and printed2 == false %} <!-- change level here -->
                              {% assign sub_category = category2[0] %}
                              <li class="level3 list-group-item">
                                <i class="far fa-folder fa-fw"></i>
                                <a href="{{ site.baseurl }}/categories/{{ sub_category | replace: ' ', '-' | downcase | url_encode }}/"
                                   class="ml-1 mr-2">{{ sub_category }}</a>
                                {% assign posts_size = site.categories[sub_category] | size %}
                                <span class="text-muted small font-weight-light">{{ posts_size }}
                                  post{% if posts_size > 1 %}s{% endif %}
                                </span>
                              </li>
                              {% assign printed2 = true %} <!-- change level here -->
                              <!-- level 3 -->
                              <!-- end of level 3 -->
                            {% endif %}
                          {% endfor %}
                        {% endfor %}
                      </ul>
                      </div>
                      <!-- end of level 2 -->
                    {% endif %}
                  {% endfor %}
                {% endfor %}
              </ul>
            </div>
          {% endif %}
          <!-- end of level 1 -->
        </div> <!-- .card -->
      {% endif %}
    {% endfor %}
  </div> <!-- .card -->
{% endfor %}
<!-- end of level 0 -->
