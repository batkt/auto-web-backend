# API Usage Examples

## Create a Section

```bash
POST /api/sections
Content-Type: application/json

{
  "pageId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "data": {
    "title": "Welcome to our Church",
    "description": "Join us every Sunday for worship",
    "backgroundImage": "https://example.com/church-image.jpg"
  },
  "fieldDefinitions": [
    { "name": "title", "type": "string", "required": true },
    { "name": "description", "type": "string" },
    { "name": "backgroundImage", "type": "image", "required": true }
  ]
}
```

## Get Page by Slug

```bash
GET /api/pages/home
```

Response:

```json
{
  "code": 200,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "slug": "home",
    "name": {
      "mn": "Нүүр хуудас",
      "en": "Home"
    },
    "description": {
      "mn": "Церковын үндсэн хуудас",
      "en": "Main church page"
    },
    "sections": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "pageId": "64f1a2b3c4d5e6f7g8h9i0j1",
        "sortOrder": 0,
        "data": {
          "title": "Welcome to our Church",
          "description": "Join us every Sunday for worship",
          "backgroundImage": "https://example.com/church-image.jpg"
        }
      }
    ]
  }
}
```
