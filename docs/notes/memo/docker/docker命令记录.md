---
title: docker命令记录
createTime: 2025/03/14 21:51:43
permalink: /memo/86dix4kw/
---

## build

```sh
docker buildx build [OPTIONS] PATH | URL | - 
```

 ==PATH== : 包含 Dockerfile 的目录路径或 `.`（表示当前目录）。

 ==URL== : 指向包含 Dockerfile 的远程存储库地址（如 Git 仓库）。

==-== : 从标准输入轴读取Dockerfile。

常用选项[OPTIONS]:

- -t：为构建的镜像指定名称和标签（NAME:TAG）。
- -f：指定Dockerfile的路径，默认为PATH下的Dockerfile。

## run

```sh
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

 ==IMAGE== : 指定创建容器使用的镜像

常用选项[OPTIONS]:

- -d：后台运行容器
- -it：交互式运行容器
- -p：端口映射，格式为 ==host_port:container_port== 
