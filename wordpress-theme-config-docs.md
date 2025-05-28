# 📄 API Documentation: WordPress Theme Configuration

**Endpoint:** `/api/theme/config`  
**Method:** `GET`  
**Response Format:** `application/json`

This API provides a structured JSON configuration for setting up a WordPress theme with optional SASS directory structure, Gutenberg block components, and Webpack integration.

---

## 🔧 Response Schema

### Root Object

| Property      | Type      | Description                                   |
|---------------|-----------|-----------------------------------------------|
| `themeSetup`  | `object`  | Basic metadata describing the WordPress theme |
| `sass`        | `object`  | SASS directory structure and color variables  |
| `inc`         | `object`  | Custom post types and taxonomies              |
| `blocks`      | `array`   | Reusable Gutenberg blocks                     |
| `webpack`     | `boolean` | Indicates if Webpack is enabled               |

---

## 🧱 `themeSetup`

Describes general information about the WordPress theme.

| Property     | Type     | Description                      |
|--------------|----------|----------------------------------|
| `author`     | `string` | Theme author's name              |
| `description`| `string` | Short description of the theme   |
| `version`    | `string` | Semantic version of the theme    |

**Example:**

```json
"themeSetup": {
  "author": "Author",
  "description": "This is your Wordpress theme",
  "version": "1.0.0"
}
```

---

## 🎨 `sass`

Configuration for SASS usage, including color variables and directory structure.

### Properties

| Property      | Type       | Description                                     |
|---------------|------------|-------------------------------------------------|
| `colors`      | `array`    | Array of color tokens used in stylesheets      |
| `parentDir`   | `array`    | Names of primary SASS directories (BEM-based)   |

### `colors` Item

| Property | Type     | Description               |
|----------|----------|---------------------------|
| `slug`   | `string` | Unique key for the color  |
| `color`  | `string` | Hex color value           |
| `name`   | `string` | Human-readable color name |

**Example:**

```json
"colors": [
  { "slug": "white", "color": "#ffffff", "name": "white" },
  { "slug": "black", "color": "#000", "name": "black" }
]
```

**Example Directories:**

```json
"parentDir": ["archive", "base", "blocks", "elements", "global", "page", "single"]
```

---

## 📦 `inc`

Defines custom post types and taxonomies for WordPress.

### Properties

| Property     | Type     | Description                         |
|--------------|----------|-------------------------------------|
| `postTypes`  | `array`  | Custom post types to register       |
| `taxonomies` | `array`  | Custom taxonomies and their targets |

### `taxonomies` Item

| Property     | Type     | Description                              |
|--------------|----------|------------------------------------------|
| `name`       | `string` | Taxonomy slug/name                       |
| `postTypes`  | `array`  | Post types this taxonomy is applied to   |

**Example:**

```json
"postTypes": ["program", "directory", "good_news"],
"taxonomies": [
  {
    "name": "interests",
    "postTypes": ["program", "good_news", "post"]
  },
  {
    "name": "faculty",
    "postTypes": ["department"]
  }
]
```

---

## 🧩 `blocks`

Lists the custom Gutenberg blocks to be included with the theme.

### Block Object

| Property       | Type      | Description                                |
|----------------|-----------|--------------------------------------------|
| `name`         | `string`  | Block display name                         |
| `customFields` | `boolean` | Whether block uses custom ACF fields       |
| `jsx`          | `boolean` | Indicates use of JSX in the block's build  |
| `javaScript`   | `boolean` | Indicates if custom JavaScript is used     |

**Example:**

```json
"blocks": [
  {
    "name": "Duotone Wave",
    "customFields": true,
    "jsx": true,
    "javaScript": true
  },
  {
    "name": "Accordion",
    "customFields": false,
    "jsx": false,
    "javaScript": false
  }
]
```

---

## ⚙️ `webpack`

| Property | Type      | Description                          |
|----------|-----------|--------------------------------------|
| `webpack`| `boolean` | If true, Webpack is enabled in build |

**Example:**

```json
"webpack": true
```

---

## ✅ Sample Full Response

```json
{
  "themeSetup": {
    "author": "Author",
    "description": "This is your Wordpress theme",
    "version": "1.0.0"
  },
  "sass": {
    "colors": [
      { "slug": "white", "color": "#ffffff", "name": "white" },
      { "slug": "black", "color": "#000", "name": "black" }
    ],
    "parentDir": [
      "archive", "base", "blocks", "elements", "global", "page", "single"
    ]
  },
  "inc": {
    "postTypes": ["program", "directory", "good_news"],
    "taxonomies": [
      {
        "name": "interests",
        "postTypes": ["program", "good_news", "post"]
      },
      {
        "name": "faculty",
        "postTypes": ["department"]
      }
    ]
  },
  "blocks": [
    {
      "name": "Duotone Wave",
      "customFields": true,
      "jsx": true,
      "javaScript": true
    },
    {
      "name": "Accordion",
      "customFields": false,
      "jsx": false,
      "javaScript": false
    }
  ],
  "webpack": true
}
```