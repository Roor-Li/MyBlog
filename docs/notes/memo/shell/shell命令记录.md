---
title: shell命令记录
createTime: 2025/02/21 21:38:30
permalink: /memo/kx4veu9w/
---
## 查看jar包进程

```sh
ps aux|grep <name>.jar
ps -ef | grep java
```

## 杀死进程

```SH
# 终止进程
kill pid
# 强制终止
kill -9 pid
```

## 防火墙

```sh
# CentOS 7
# 查看防火墙状态
firewall-cmd --state

# 关闭防火墙
systemctl stop firewalld

# 开启防火墙
systemctl start firewalld

# 对所有ip开放端口
firewall-cmd --permanent --add-port=<port>/tcp

# 重新载入（应用修改的配置）
firewall-cmd --reload
```



