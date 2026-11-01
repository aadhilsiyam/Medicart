# Setup Guide

## 0. Prerequisites

- GitHub account and this repo (`aadhilsiyam/Medicart`)
- AWS account with an IAM user (access key) that can create EC2 resources
- Terraform installed in WSL (`terraform -version`)
- Node.js 20 in WSL (`node -v`)

## 1. Replace the old files and generate the lock file

Copy this project over your existing Medicart folder, then:

```bash
cd /mnt/c/Aadhil/esoft/sample/Devopsautomation/Medicart
npm install          # creates/updates package-lock.json (required by npm ci)
npm test             # should show 7 passing tests
```

## 2. Create the branching setup and push

```bash
git checkout -b feature/initial-app
git add .
git commit -m "Add MediCart API, tests, Dockerfile, pipeline and Terraform"
git push -u origin feature/initial-app
```

Use a GitHub Personal Access Token as the password. Open a pull request into `main`.
Turn on branch protection as described in `docs/BRANCHING.md`.

## 3. Provision the server with Terraform

```bash
ssh-keygen -t ed25519 -f ~/.ssh/medicart_key -N ""

export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...

cd terraform
terraform init
terraform fmt -check
terraform validate
terraform plan
terraform apply
```

Note the `public_ip` output.

## 4. Add GitHub secrets

Repo > Settings > Secrets and variables > Actions > New repository secret:

| Secret | Value |
|--------|-------|
| `EC2_HOST` | The `public_ip` from Terraform |
| `EC2_SSH_KEY` | Full contents of `~/.ssh/medicart_key` (private key, including the BEGIN/END lines) |

## 5. Deploy

Merge the pull request into `main`. The pipeline builds, tests and deploys.
Open `http://<public_ip>` to see the live app. The footer shows the deployed commit SHA.

## 6. Demonstrate the quality gate (failing run)

```bash
git checkout main && git pull
git checkout -b fix/failing-test-demo
```

In `app.test.js`, change `expect(res.body.total).toBe(390);` to `toBe(999);`.

```bash
git commit -am "Deliberately break a test to prove the quality gate"
git push -u origin fix/failing-test-demo
```

Open a pull request. CI fails and the merge is blocked. Take screenshots, then fix
the test, push again, and show the run turning green.

## 7. Clean up to avoid AWS charges

```bash
cd terraform && terraform destroy
```

Do this after you have taken all screenshots and your sir has marked, or at least stop the instance.
