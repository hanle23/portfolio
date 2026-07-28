---
layout: blogs
title: "Infrastructure Deployment"
category: projects
---

A Python tool for bulk-deploying student VMs on Google Cloud Platform for education use.

It talks to the GCP Compute API to create instances, firewall rules, and static IPs across many projects. VMs boot from a prebuilt custom image configured via environment variables — this repo handles deployment orchestration, not image creation or packaging.

**Stack:** Python, Google Cloud Compute API  

[GitHub](https://github.com/hanle23/Infrastructure-Deployment)
