---
title: docker
createTime: 2025/02/24 14:28:12
permalink: /memo/zx1psadt/
---

 这里记录了docker相关的内容

## [docker CA认证](./docker-CA认证.md)

记录了在CentOS 7环境下为Docker配置双向TLS认证的全流程，主要包含：

1. **证书体系搭建** - 通过OpenSSL逐步生成CA根证书、服务端/客户端证书，配置白名单和密钥用途限制（serverAuth/clientAuth），完成证书权限管理

2. **Docker安全加固** - 修改守护进程配置启用TLS验证，绑定证书路径，开放加密端口（2376），设置防火墙规则

3. **SpringBoot集成** - 提供Java客户端连接示例，演示如何通过证书认证与Docker服务建立安全通信

