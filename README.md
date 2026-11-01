# MediCart

Minimal Node.js REST API for an online pharmacy, built to demonstrate an automated
CI/CD pipeline with Infrastructure as Code (DevOps Automation and Delivery, Assignment 1).

| Part | Tool | Location |
|------|------|----------|
| Application | Node.js + Express | `app.js`, `server.js`, `public/` |
| Tests | Jest + Supertest | `app.test.js` |
| Containerisation | Docker | `Dockerfile` |
| CI/CD | GitHub Actions | `.github/workflows/pipeline.yml` |
| Infrastructure as Code | Terraform (AWS EC2) | `terraform/` |
| Branching strategy | GitHub Flow | `docs/BRANCHING.md` |

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check and deployed version |
| GET | `/api/medicines` | List medicines |
| GET | `/api/medicines/:id` | One medicine |
| POST | `/api/orders` | Create an order, body: `{"items":[{"id":1,"qty":2}]}` |

## Run locally

```bash
npm install
npm test
npm start        # http://localhost:3000
```

See `docs/SETUP.md` for the full pipeline and infrastructure setup.
