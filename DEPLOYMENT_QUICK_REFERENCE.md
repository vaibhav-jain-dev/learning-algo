# Quick Reference: Deployment Changes

## 🎯 What Changed

### `scripts/deploy.sh`
✅ Added support for `ENV_VARS_B64` (base64-encoded environment variables)

### `.github/workflows/docker-deploy.yml`  
✅ Refactored to use single SSH session
✅ Added ENV_VARS base64 encoding on runner
✅ Added removal matrix output
✅ Simplified Cloudflare handling

---

## 📋 Key Features

| Feature | Details |
|---------|---------|
| **Single SSH Session** | All deployment happens in one session (no nesting) |
| **Base64 ENV_VARS** | Safe encoding of environment variables |
| **Quote Safe** | Handles: quotes, backticks, newlines, spaces |
| **Removal Matrix** | Shows what Docker resources were cleaned up |
| **Health Check** | Integrated container health verification |
| **Backward Compatible** | Local deployment unchanged, works with both raw and base64 ENV_VARS |

---

## 🚀 Usage

### Local Deployment
```bash
export SSH_HOST="example.com"
export SSH_USERNAME="ubuntu"
export ENV_VARS="KEY1=value1
KEY2=value2"
./scripts/deploy.sh
```

### GitHub Actions
1. Add secrets: `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USERNAME`, `ENV_VARS`
2. Trigger: Actions → Deploy Docker Compose → Run workflow
3. Optional: Toggle "Force restart" to rebuild containers

---

## 📊 Deployment Steps

Both local and GitHub Actions follow same 7-step process:

1. **Directory Setup** - Create/prepare project directory
2. **Code Sync** - Clone or update repository
3. **Environment** - Configure .env.override from ENV_VARS
4. **Containers** - Start/rebuild Docker containers
5. **Cleanup Matrix** - Prune old images/containers/networks
6. **Health Check** - Verify container health
7. **Cloudflare** - Check tunnel configuration (if applicable)

---

## 🔍 ENV Precedence

```
.env          ← Base configuration
.env.override ← Final authority (ENV_VARS)
```

---

## 🛡️ Security

- ✅ ENV_VARS base64 encoded on GitHub runner
- ✅ Decoded inside safe SSH session
- ✅ Single SSH session = single expansion point
- ✅ No nested heredocs with secrets
- ✅ Files created with 600 permissions

---

## 📝 Troubleshooting

### Deployment Fails with Quote Error
- **Cause**: Old workflow with nested SSH  
- **Fix**: Update to latest `.github/workflows/docker-deploy.yml`

### ENV_VARS Not Applied
- **Check**: SSH_HOST, SSH_USERNAME, SSH_PRIVATE_KEY are set
- **Check**: ENV_VARS secret is provided
- **Check**: Container health status in logs

### Containers Unhealthy
- Check removal matrix output
- Review container logs in "Performing health check" step
- Verify .env.override was created correctly

---

## ✨ Notes

- No behavior changes for `deploy.sh` when run locally
- GitHub Actions workflow is completely rewritten but maintains same deployment behavior
- Both paths support ENV_VARS with special characters, quotes, newlines
- Backward compatible: `deploy.sh` still accepts raw ENV_VARS
- Single source of truth: `deploy.sh` logic is canonical

---

## 📚 Related Documentation

- [DEPLOYMENT_CHANGES.md](DEPLOYMENT_CHANGES.md) - Detailed implementation summary
- [scripts/deploy.sh](scripts/deploy.sh) - Local deployment script
- [.github/workflows/docker-deploy.yml](.github/workflows/docker-deploy.yml) - GitHub Actions workflow
