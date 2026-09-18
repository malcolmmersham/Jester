# Jester Hat MCP Server

A commercial MCP (Model Context Protocol) server that hosts and serves proprietary `.md` skill files to customers via their AI tools (Claude, ChatGPT, local LLMs, etc.).

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   AI Tool       │────▶│  Jester Hat     │────▶│  .md Skill      │
│  (Claude, etc)  │◀────│  MCP Server     │◀────│  Files (5-25)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │              ┌─────────────────┐              │
        └──────────────│  API Key Auth   │──────────────┘
                       └─────────────────┘
```

### Key Characteristics
- **Read-only access model**: Customers browse and retrieve skills via MCP tools only
- **Streamable HTTP transport**: Required for remote customer connections
- **API key authentication**: Per-customer access control
- **Stateless design**: No database required (skills served from in-memory cache)

## Tech Stack

| Component | Technology | Why |
|-----------|------------|-----|
| Language | TypeScript | Mature MCP SDK, easy development |
| Runtime | Node.js 20+ | LTS, great performance for I/O |
| MCP SDK | `@modelcontextprotocol/sdk` | Official SDK with HTTP transport |
| Hosting | Fly.io | Cheapest at ~$3/mo, scales easily |
| TLS | Let's Encrypt | Free, automatic via Fly.io |

## Project Structure

```
jester-hat-mcp/
├── src/
│   ├── index.ts           # Entry point, HTTP server setup
│   ├── mcp-server.ts      # MCP server with tools
│   ├── skills-loader.ts   # Load and cache .md files
│   ├── auth.ts            # API key validation middleware
│   └── types.ts           # TypeScript interfaces
├── skills/                 # Directory containing .md skill files
│   ├── frontend-design.md
│   ├── mcp-builder.md
│   └── ...
├── package.json
├── tsconfig.json
├── Dockerfile
└── fly.toml               # Fly.io deployment config
```

## MCP Tools Exposed

### 1. `list_skills`
Lists all available skills with titles and brief descriptions.

**Input**: None
**Output**:
```json
{
  "skills": [
    {
      "id": "frontend-design",
      "title": "Frontend Design Skill",
      "description": "Expert in creating beautiful frontend designs..."
    }
  ]
}
```

### 2. `get_skill`
Retrieves the full content of a specific skill by ID.

**Input**:
- `skill_id` (string, required): The ID of the skill to retrieve

**Output**:
```json
{
  "id": "frontend-design",
  "title": "Frontend Design Skill",
  "content": "# Frontend Design Skill\n\nYou are an expert...",
  "tools_available": ["create_frontend_design"]
}
```

### 3. `search_skills`
Searches skills by keywords.

**Input**:
- `query` (string, required): Search terms

**Output**:
```json
{
  "results": [
    {
      "id": "frontend-design",
      "title": "Frontend Design Skill",
      "relevance": 0.95,
      "snippet": "Expert in creating beautiful frontend designs..."
    }
  ]
}
```

## Implementation

### 1. Project Setup

```bash
# Create project directory
mkdir jester-hat-mcp
cd jester-hat-mcp

# Initialize TypeScript project
npm init -y
npm install typescript @types/node @modelcontextprotocol/sdk
npm install -D tsx

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
EOF
```

### 2. Types (`src/types.ts`)

```typescript
export interface Skill {
  id: string;
  title: string;
  description: string;
  content: string;
  tools_available?: string[];
}

export interface SkillSummary {
  id: string;
  title: string;
  description: string;
}

export interface SearchQuery {
  query: string;
}

export interface SkillId {
  skill_id: string;
}
```

### 3. Skills Loader (`src/skills-loader.ts`)

```typescript
import { readdir, readFile, stat } from 'fs/promises';
import { join, basename } from 'path';
import { Skill, SkillSummary } from './types.js';

export class SkillsLoader {
  private skills: Map<string, Skill> = new Map();
  private skillsDir: string;

  constructor(skillsDir: string) {
    this.skillsDir = skillsDir;
  }

  async loadAll(): Promise<void> {
    const files = await readdir(this.skillsDir);
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const content = await readFile(join(this.skillsDir, file), 'utf-8');
        const id = basename(file, '.md');
        
        const skill = this.parseSkill(id, content);
        this.skills.set(id, skill);
      }
    }
    
    console.log(`Loaded ${this.skills.size} skills`);
  }

  private parseSkill(id: string, rawContent: string): Skill {
    const lines = rawContent.split('\n');
    let title = id;
    let description = '';
    let contentStart = 0;

    // Parse title and description from markdown
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('# ')) {
        title = line.slice(2).trim();
        contentStart = i + 1;
      } else if (line.startsWith('description:')) {
        description = line.replace('description:', '').trim();
        contentStart = i + 1;
      } else if (line.trim() !== '' && description === '') {
        description = line.trim();
        contentStart = i + 1;
        break;
      }
    }

    const content = lines.slice(contentStart).join('\n').trim();

    return {
      id,
      title,
      description,
      content
    };
  }

  getAll(): SkillSummary[] {
    return Array.from(this.skills.values()).map(skill => ({
      id: skill.id,
      title: skill.title,
      description: skill.description
    }));
  }

  get(id: string): Skill | undefined {
    return this.skills.get(id);
  }

  search(query: string): SkillSummary[] {
    const terms = query.toLowerCase().split(/\s+/);
    
    return Array.from(this.skills.values())
      .map(skill => {
        const searchText = `${skill.title} ${skill.description} ${skill.content}`.toLowerCase();
        let relevance = 0;
        
        for (const term of terms) {
          if (searchText.includes(term)) {
            relevance += 1;
          }
        }
        
        return {
          id: skill.id,
          title: skill.title,
          description: skill.description,
          relevance: relevance / terms.length
        };
      })
      .filter(result => result.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);
  }

  reload(): Promise<void> {
    this.skills.clear();
    return this.loadAll();
  }
}
```

### 4. Auth Middleware (`src/auth.ts`)

```typescript
import { IncomingMessage } from 'http';

export interface AuthConfig {
  apiKeys: string[];
  headerName: string;
}

export function createAuthMiddleware(config: AuthConfig) {
  return (req: IncomingMessage): boolean => {
    const apiKey = req.headers[config.headerName];
    
    if (!apiKey) {
      return false;
    }
    
    const key = Array.isArray(apiKey) ? apiKey[0] : apiKey;
    
    return config.apiKeys.includes(key);
  };
}

// For development - generate a key
export function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
```

### 5. MCP Server (`src/mcp-server.ts`)

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SkillsLoader } from './skills-loader.js';
import { SkillId, SearchQuery } from './types.js';

export function createMcpServer(skillsLoader: SkillsLoader): McpServer {
  const server = new McpServer({
    name: 'jester-hat-mcp',
    version: '1.0.0',
    description: 'Commercial skill repository served via MCP'
  });

  // Tool 1: List all skills
  server.tool(
    'list_skills',
    'List all available skills with titles and descriptions',
    {},
    async () => {
      const skills = skillsLoader.getAll();
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ skills }, null, 2)
          }
        ]
      };
    }
  );

  // Tool 2: Get skill by ID
  server.tool(
    'get_skill',
    'Retrieve the full content of a specific skill',
    {
      skill_id: {
        type: 'string',
        description: 'The ID of the skill to retrieve (filename without .md extension)'
      }
    },
    async (params: SkillId) => {
      const skill = skillsLoader.get(params.skill_id);
      
      if (!skill) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ 
                error: `Skill not found: ${params.skill_id}`,
                available: skillsLoader.getAll().map(s => s.id)
              }, null, 2)
            }
          ],
          isError: true
        };
      }
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(skill, null, 2)
          }
        ]
      };
    }
  );

  // Tool 3: Search skills
  server.tool(
    'search_skills',
    'Search skills by keywords',
    {
      query: {
        type: 'string',
        description: 'Search terms to find matching skills'
      }
    },
    async (params: SearchQuery) => {
      const results = skillsLoader.search(params.query);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ results }, null, 2)
          }
        ]
      };
    }
  );

  return server;
}
```

### 6. Main Entry Point (`src/index.ts`)

```typescript
import { createServer } from 'http';
import { SkillsLoader } from './skills-loader.js';
import { createMcpServer } from './mcp-server.js';
import { createAuthMiddleware, generateApiKey } from './auth.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const PORT = parseInt(process.env.PORT || '3000');
const SKILLS_DIR = process.env.SKILLS_DIR || join(__dirname, '..', 'skills');
const API_KEYS = (process.env.API_KEYS || '').split(',').filter(Boolean);

// Generate a key if none provided
if (API_KEYS.length === 0) {
  const newKey = generateApiKey();
  console.log('⚠️  No API keys configured. Generated development key:');
  console.log(`   ${newKey}`);
  console.log('   Set API_KEYS env var for production use');
  API_KEYS.push(newKey);
}

// Initialize
const skillsLoader = new SkillsLoader(SKILLS_DIR);
await skillsLoader.loadAll();

const mcpServer = createMcpServer(skillsLoader);
const authMiddleware = createAuthMiddleware({
  apiKeys: API_KEYS,
  headerName: 'x-api-key'
});

// Create HTTP server
const httpServer = createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      skills: skillsLoader.getAll().length,
      version: '1.0.0'
    }));
    return;
  }

  // MCP endpoint
  if (req.url === '/mcp' && req.method === 'POST') {
    // Check auth
    if (!authMiddleware(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid or missing API key' }));
      return;
    }

    // Parse the request body
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const request = JSON.parse(body);
        
        // Use the MCP SDK's HTTP transport
        const response = await mcpServer.handleRequest(request);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (error) {
        console.error('MCP request error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
    return;
  }

  // 404 for everything else
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

httpServer.listen(PORT, () => {
  console.log(`🎭 Jester Hat MCP Server running on port ${PORT}`);
  console.log(`📁 Skills directory: ${SKILLS_DIR}`);
  console.log(`🔑 API keys configured: ${API_KEYS.length}`);
  console.log(`\nEndpoint: http://localhost:${PORT}/mcp`);
});
```

### 7. Package.json

```json
{
  "name": "jester-hat-mcp",
  "version": "1.0.0",
  "description": "Commercial MCP server for serving skill files",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "docker:build": "docker build -t jester-hat-mcp .",
    "docker:run": "docker run -p 3000:3000 jester-hat-mcp"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

### 8. Dockerfile

```dockerfile
FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY dist/ ./dist/
COPY skills/ ./skills/

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### 9. Fly.io Configuration (`fly.toml`)

```toml
app = "jester-hat-mcp"
primary_region = "sea"

[build]
  dockerfile = "Dockerfile"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 1

  [http_service.concurrency]
    type = "connections"
    hard_limit = 250
    soft_limit = 200

[[vm]]
  memory = "512mb"
  cpu_kind = "shared"
  cpus = 1
```

## Deployment

### 1. Initial Setup

```bash
# Install Fly.io CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
fly auth login

# Create the app
fly launch --name jester-hat-mcp

# Set API keys (generate your own production key)
fly secrets set API_KEYS="your-secure-production-key-here"

# Deploy
fly deploy
```

### 2. Generate Secure API Keys

```bash
# Generate a secure API key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Update Secrets When Needed

```bash
# Add a new customer key
fly secrets set API_KEYS="key1,key2,key3"

# View current secrets
fly secrets list
```

## Customer Integration

### Claude Desktop Integration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "jester-hat": {
      "url": "https://jester-hat-mcp.fly.dev/mcp",
      "headers": {
        "x-api-key": "customer-api-key-here"
      }
    }
  }
}
```

### Using with OpenCode

Add to `opencode.json`:

```json
{
  "mcpServers": {
    "jester-hat": {
      "type": "http",
      "url": "https://jester-hat-mcp.fly.dev/mcp",
      "headers": {
        "x-api-key": "customer-api-key-here"
      }
    }
  }
}
```

## Adding New Skills

1. Create a new `.md` file in the `skills/` directory
2. Use the filename as the skill ID (e.g., `my-new-skill.md` → `my-new-skill`)
3. Deploy with `fly deploy`

The server automatically loads all `.md` files from the skills directory on startup.

## Scaling

| Customers | Recommendation | Monthly Cost |
|-----------|----------------|--------------|
| < 50 | Fly.io 512MB | ~$3-5 |
| 50-200 | Fly.io 1GB or Railway Pro | ~$10-20 |
| 200-1000 | Railway Pro + replicas | ~$30-50 |
| 1000+ | Multiple regions, load balancer | ~$100+ |

## Monitoring

### Health Check Endpoint

```bash
curl https://jester-hat-mcp.fly.dev/health
```

Response:
```json
{
  "status": "ok",
  "skills": 25,
  "version": "1.0.0"
}
```

### Logs

```bash
fly logs
```

## Cost Breakdown

| Item | Cost |
|------|------|
| Fly.io (shared-cpu-1x, 512MB) | ~$3.20/mo |
| Let's Encrypt TLS cert | Free |
| Domain (optional) | ~$10/year |
| **Total** | **~$4/mo** |

## Security Considerations

1. **API Key Rotation**: Periodically rotate customer API keys
2. **Rate Limiting**: Implement per-key rate limiting if needed
3. **HTTPS Only**: Fly.io enforces HTTPS by default
4. **No Data Exposure**: Skills are only accessible via MCP tools, never directly browsable
5. **Audit Logging**: Add logging for access patterns

## Future Enhancements

- [ ] Per-customer skill access control (allow specific customers to access specific skills)
- [ ] Usage analytics dashboard
- [ ] Webhook notifications for skill updates
- [ ] Skill versioning
- [ ] Admin API for managing customers and skills
- [ ] Caching headers for performance optimization
