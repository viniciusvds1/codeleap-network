import { rest } from 'msw';

const API_URL = 'https://dev.codeleap.co.uk/careers/';

// Mock data
const mockPosts = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      username: "testuser",
      created_datetime: "2025-04-22T23:00:00Z",
      title: "Test Post 1",
      content: "This is a test post content"
    },
    {
      id: 2,
      username: "anotheruser",
      created_datetime: "2025-04-22T22:30:00Z",
      title: "Another Test Post",
      content: "This is another test post content"
    }
  ]
};

export const handlers = [
  // GET /careers - Get all posts
  rest.get(API_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockPosts)
    );
  }),

  // POST /careers - Create new post
  rest.post(API_URL, async (req, res, ctx) => {
    const { username, title, content } = await req.json();
    
    if (!username || !title || !content) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Missing required fields' })
      );
    }

    const newPost = {
      id: mockPosts.results.length + 1,
      username,
      created_datetime: new Date().toISOString(),
      title,
      content
    };

    return res(
      ctx.status(201),
      ctx.json(newPost)
    );
  }),

  // PATCH /careers/:id - Update post
  rest.patch(`${API_URL}:id/`, async (req, res, ctx) => {
    const { id } = req.params;
    const { title, content } = await req.json();
    
    if (!title || !content) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Missing required fields' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: Number(id),
        username: "testuser",
        created_datetime: "2025-04-22T23:00:00Z",
        title,
        content
      })
    );
  }),

  // DELETE /careers/:id - Delete post
  rest.delete(`${API_URL}:id/`, (req, res, ctx) => {
    return res(
      ctx.status(204)
    );
  })
];
