variable "project" {
  description = "Name prefix for all resources"
  type        = string
  default     = "medicart"
}

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance size (use a free-tier eligible type for your account)"
  type        = string
  default     = "t3.micro"
}

variable "public_key_path" {
  description = "Path to the SSH public key used by the CD pipeline"
  type        = string
  default     = "~/.ssh/medicart_key.pub"
}

variable "ssh_allowed_cidr" {
  description = "CIDR allowed to SSH in. GitHub-hosted runners have changing IPs, so this is open by default"
  type        = string
  default     = "0.0.0.0/0"
}
