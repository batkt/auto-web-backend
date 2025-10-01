# Blog API Usage Examples

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Blog Endpoints

### Create Blog Post

```bash
POST /api/blogs
Content-Type: application/json

{
  "title": "Америкийн алдарт ONYX, Icetop хамтлагийн хамтарсан тоглолт ирэх сард болно",
  "thumbImage": "blob:http://localhost:4000/cd360e5f-ae6b-4846-8b49-e2d8c73ad834",
  "categories": ["c0327541-8a0a-48e3-adce-10a749072342"],
  "blocks": [
    {
      "id": "c0327541-8a0a-48e3-adce-10a749075164",
      "type": "text",
      "content": "<p>Ирэх наймдугаар сарын 8-нд 18:00 цагт Төв цэнгэлдэх хүрээлэнд&nbsp; Америкийн алдарт Old School хамтлаг <strong>\"ONYX\" </strong>Монголын хип хоп урлагийг үүсгэн байгуулагчдын нэг ICETOP хамтлаг хамтран \"Шүтээн минь\" &nbsp;нэртэй тоглолтоо сонсогч фэнүүддээ толилуулахаар болсон байна.</p>"
    },
    {
      "id": "97557300-5e10-4522-bc5c-3c414e8e5a04",
      "type": "video",
      "url": "https://www.youtube.com/watch?v=X3dUbxHhR-s&list=RDX3dUbxHhR-s&start_radio=1"
    },
    {
      "id": "ccf71051-41c8-404b-9fc5-566c0482f9bb",
      "type": "image",
      "data": {
        "id": "690613.757844158",
        "url": "blob:http://localhost:4000/6df8666a-befe-4256-8b43-8ad5999443a8",
        "alt": ""
      }
    }
  ]
}
```

### Get Blog List

```bash
GET /api/blogs
GET /api/blogs?status=published
GET /api/blogs?category=category-id
GET /api/blogs?search=search-term
GET /api/blogs?page=1&limit=10
```

### Get Blog by ID

```bash
GET /api/blogs/:id
```

### Get Blog by Slug

```bash
GET /api/blogs/slug/:slug
```

### Update Blog

```bash
PUT /api/blogs/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "thumbImage": "new-image-url",
  "categories": ["category-id"],
  "blocks": [...],
  "status": "published"
}
```

### Delete Blog

```bash
DELETE /api/blogs/:id
```

### Publish Blog

```bash
PATCH /api/blogs/:id/publish
```

## Category Endpoints

### Create Category

```bash
POST /api/categories
Content-Type: application/json

{
  "name": "Events",
  "description": "Event related blog posts"
}
```

### Get Category List

```bash
GET /api/categories
```

### Get Category by ID

```bash
GET /api/categories/:id
```

### Get Category by Slug

```bash
GET /api/categories/slug/:slug
```

### Update Category

```bash
PUT /api/categories/:id
Content-Type: application/json

{
  "name": "Updated Category Name",
  "description": "Updated description"
}
```

### Delete Category

```bash
DELETE /api/categories/:id
```

## Response Format

All endpoints return responses in this format:

```json
{
  "code": 200,
  "data": {
    // Response data
  }
}
```

## Error Response Format

```json
{
  "code": 400,
  "message": "Error message"
}
```

## Block Types

### Text Block

```json
{
  "id": "unique-id",
  "type": "text",
  "content": "<p>HTML content</p>"
}
```

### Image Block

```json
{
  "id": "unique-id",
  "type": "image",
  "data": {
    "id": "image-id",
    "url": "image-url",
    "alt": "Alt text"
  }
}
```

### Video Block

```json
{
  "id": "unique-id",
  "type": "video",
  "url": "https://www.youtube.com/watch?v=video-id"
}
```

### Gallery Block

```json
{
  "id": "unique-id",
  "type": "gallery",
  "images": ["image-url-1", "image-url-2"]
}
```
