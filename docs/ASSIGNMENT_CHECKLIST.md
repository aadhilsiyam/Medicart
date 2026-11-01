# Assignment Evidence Checklist

| Report section | Marks | What to screenshot | Where in this repo |
|---|---|---|---|
| 1. Automation Principles | 15 | Written explanation only. Tie it to the FTP / laptop release and the 3-hour checkout outage | n/a |
| 2. Version Control & Branching | 15 | Repo file tree; commit history; branch list; PR page; branch protection rule | `docs/BRANCHING.md` |
| 3. CI Build & Test | 30 | `pipeline.yml`; green run showing Install, Test, Build steps; **a red run** from the failing-test PR; the blocked merge button | `.github/workflows/pipeline.yml` |
| 4. Infrastructure as Code | 25 | `main.tf`; `terraform plan`; `terraform apply` output; EC2 instance and security group in the AWS console. Explain declarative vs imperative | `terraform/` |
| 5. CD Deployment | 15 | Deploy job logs (load image, restart, smoke test); live site in the browser; footer showing the commit SHA matching the run | `pipeline.yml` (deploy job) |
| 6. Source Code link | 5 | Link to `https://github.com/aadhilsiyam/Medicart` (make sure the repo is public or shared with the marker) | n/a |

## Tool choice notes for Section 4

- **Terraform is declarative.** You describe the end state (one instance, one security group), and Terraform works out what to create, change or destroy. Re-running it is safe and gives the same result (idempotent).
- **`user_data.sh` is imperative.** It is an ordered script that installs Docker at first boot. It is kept tiny and is the only imperative part.
- Terraform was chosen over CloudFormation because it is cloud-agnostic, has a readable plan step, and keeps state so drift can be detected.
- Terraform was chosen over Ansible for provisioning because Ansible is better at configuring machines that already exist.

## Reminder: AI acknowledgement

The brief requires an "Acknowledgement of AI Contribution" section at the end of your
submission if you used AI. Say what it helped with (e.g. generating the starter files)
and what you did yourself (running, testing, screenshots, written explanations).
