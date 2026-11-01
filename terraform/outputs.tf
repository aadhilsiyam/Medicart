output "public_ip" {
  description = "Public IP of the MediCart server (save as GitHub secret EC2_HOST)"
  value       = aws_instance.app.public_ip
}

output "app_url" {
  description = "URL where the application will be reachable after the first deployment"
  value       = "http://${aws_instance.app.public_ip}"
}
