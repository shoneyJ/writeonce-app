# GitHub Deployment Guide

## Overview
This document describes the GitHub Actions workflow to build and deploy the WriteOnce blog application to a production server using GitHub Container Registry (GHCR) and SSH.

## Architecture

```
GitHub Actions (CI/CD)
    │
    ├── Build: Angular app → Docker image
    ├── Push: → GHCR (ghcr.io/shoneyj/writeonce-app)
    │
    └── Deploy: SSH → writeonce.de → nginx
```

## Current GitLab Setup (Being Replaced)

| Stage | GitLab | GitHub |
|-------|--------|--------|
| Build | docker build | docker build (buildx) |
| Push | GitLab Registry | GHCR |
| Deploy | SSH | SSH |

---

## Implementation

### 1. Create GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

```yaml
name: Build & Deploy

on:
  push:
    branches: [main, ui-enhancement]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=sha,prefix=
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    
    steps:
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Add server to known hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy to server
        run: |
          IMAGE="${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest"
          
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} << 'EOF'
            # Login to GHCR
            echo "${{ secrets.GITHUB_TOKEN }}" | docker login ${{ env.REGISTRY }} -u ${{ github.actor }} --password-stdin
            
            # Pull latest image
            docker pull $IMAGE
            
            # Extract files and deploy
            docker run --rm $IMAGE sh -c "tar -czf - -C browser . " | tar -xzf - -C /usr/share/nginx/html/
            
            # Restart nginx
            docker restart writeonce-webserver
          EOF
```

---

### 2. Configure GitHub Repository Settings

#### Enable Workflow Permissions
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**:
   - ✅ Read and write
   - ✅ Allow GitHub Actions to create and approve pull requests

#### Enable GHCR Packages
1. Go to **Settings** → **Actions** → **General**
2. Under **GHCR** (if available):
   - ✅ Read and write packages

---

### 3. Add GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Value | Description |
|--------|-------|-------------|
| `SSH_HOST` | `writeonce.de` | Server hostname |
| `SSH_USER` | `deployer` | SSH username (must exist on server) |
| `SSH_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Private key for SSH |

#### Creating SSH Key (if needed)

On your local machine:
```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "github-deploy"

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub deployer@writeonce.de

# Copy private key content
cat ~/.ssh/id_ed25519
```

---

### 4. Update Dockerfile (Optional)

The existing Dockerfile works, but ensure it outputs to `browser` folder:

```dockerfile
# Stage 1: Compile and Build
FROM node:18.19.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist/browser

# Stage 2: Production image
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/dist/browser ./browser
```

**Note**: Angular 18+ uses `application` builder which outputs to `dist/browser` by default. Verify with:
```bash
npm run build
ls dist/
```

---

### 5. Server Setup

#### Ensure SSH User Exists
On your server (`writeonce.de`):
```bash
# Create deploy user (if not exists)
sudo adduser deployer
sudo usermod -aG docker deployer

# Copy SSH key
sudo mkdir /home/deployer/.ssh
sudo chmod 700 /home/deployer/.ssh
# Add public key to authorized_keys
```

#### Ensure Docker Can Run
```bash
# Add user to docker group
sudo usermod -aG docker deployer

# Test docker access
su - deployer -c "docker ps"
```

---

## Testing

### Option 1: Test on Feature Branch
1. Push to `ui-enhancement` branch:
   ```bash
   git push origin ui-enhancement
   ```
2. Workflow runs automatically
3. Check Actions tab for progress

### Option 2: Manual Trigger
1. Go to **Actions** → **Build & Deploy**
2. Click **Run workflow**
3. Select branch and run

---

## Verification

After deployment:

1. **Check GitHub Container Registry**
   - Go to your repository
   - Click **Packages** → `writeonce-app`
   - Verify image exists

2. **Check Server**
   ```bash
   ssh deployer@writeonce.de
   ls -la /usr/share/nginx/html/
   ```

3. **Test Website**
   - Visit https://writeonce.de
   - Verify all pages load
   - Test dark mode toggle

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| SSH connection failed | Verify `SSH_HOST`, `SSH_USER`, and `SSH_PRIVATE_KEY` secrets |
| Docker login failed | Ensure GITHUB_TOKEN has package write permissions |
| nginx not updated | Check container name is `writeonce-webserver` on server |
| Permission denied | Ensure deployer user has sudo or docker group access |

### View Logs

```bash
# GitHub Actions logs
# Check Actions tab in GitHub

# Server logs
ssh deployer@writeonce.de
docker logs writeonce-webserver
docker logs writeonce-frontend
```

---

## Migration Checklist

| Step | Task | Status |
|------|------|--------|
| 1 | Create `.github/workflows/deploy.yml` | ✅ Complete |
| 2 | Configure workflow permissions | ⏳ Pending |
| 3 | Add GitHub secrets | ⏳ Pending |
| 4 | Test on ui-enhancement branch | ⏳ Pending |
| 5 | Verify deployment works | ⏳ Pending |
| 6 | Update workflow to only trigger on main | ⏳ Pending |
| 7 | (Optional) Disable GitLab CI | ⏳ Pending |

---

## Image Location

After first successful deployment:
```
ghcr.io/shoneyj/writeonce-app:latest
ghcr.io/shoneyj/writeonce-app:sha-abc123
```

---

## Related Files

- `.gitlab-ci.yml` - Old GitLab CI (keep until GH deployment confirmed)
- `Dockerfile` - Docker build configuration
- `deploy.sh` - Manual deployment script (optional, can keep)

---

## Future Improvements

- [ ] Add build caching with GitHub cache
- [ ] Add deployment notifications (Slack/Discord)
- [ ] Add health check after deployment
- [ ] Add rollback capability
- [ ] Add environment-specific deployments (staging/prod)
