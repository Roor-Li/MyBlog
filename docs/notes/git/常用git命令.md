---
title: 常用git命令
createTime: 2025/02/14 14:51:09
permalink: /git/7xullr8y/
---
## 添加远程仓库
```sh
git remote add <仓库别名> <url>
```

## 删除指定远程仓库
```sh
git remote rm <仓库别名>
```

## 修改本地分支名称
```sh
git branch -m <原分支名> <新分支名>
```

## 推送

```sh
# 首次推送并建立关联
git push -u origin master

# 后续推送只需（会自动推送到 origin/master）
git push

# 后续拉取只需（会自动从 origin/master 拉取）
git pull
```

-u 是 --set-upstream 的简写，这个参数的作用是建立本地分支与远程分支的追踪关系。当首次推送分支时使用这个参数后：

1. 会将本地当前分支（如 master）与指定的远程分支（origin/master）建立关联
2. 后续再使用 git push 或 git pull 时，Git 会自动知道要推送到哪个远程分支，无需再指定远程仓库和分支名

## 提交

```sh
# 需要进入编辑器输入提交信息
git commit

# 直接在命令行添加提交信息（推荐简单修改时使用）
git commit -m "修复用户登录验证逻辑"
```

