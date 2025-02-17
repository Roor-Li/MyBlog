---
title: DTOJ 4027：挖煤 - Roor - 博客园
tags:
  - DP
createTime: 2025/02/14 21:31:11
permalink: /article/2897qxjg/
---
## 题面

【问题描述】  
众所周知， 小C是挖煤好手。  
今天他带着他的魔法镐子去挖煤 ，他的镐子一开始有$w$点魔力。他的挖煤 路线上会依次经过$n$个地点，每个地点是煤矿或者补给站，设小C当前镐子魔力值为$p$，第$i$个地点如果是煤矿，他可以开采，获得$a_i*p$的金钱，但镐子的魔力值魔力值减少$k%$；如果是补给站，他可以花$a_i*p$的金钱令镐子的魔力值增加$c%$。每个地点可以进行至多一次操作。 小C想知道他的最大收益。  
【输入格式】

第一行 4个整数 $n,k,c,w$。  
接下来$n$行， 每行 两个 整数$t_i,a_i$，若$t_i=1$，$i$号地点为煤矿；若$t_i=2$，$i$号地点为补给站

【输出格式】

输出 一个 实数，表示答案，保留2位小数。

## 题解

恩，DP好题，难度不大，但是想法比较好。

对于一个煤矿，如果我们挖了那么之后的收益就要乘上$(1-k)$ 。那么，如果我们能先知道之后的收益为多少，然后再来考虑这个位置挖还是不挖就很容易了。

设$f[i]$表示从$i$开始的最大收益，转移：$f[i]=max(f[i+1],f[i+1]*(1-k)+a[i])$。补给站的转移类似。

这题考虑了从后向前DP，和自己之前写过的DP都不太一样，考场上想了半天正着做，$n^3$的DP都打炸了，直接心态崩掉。

DP题还是多写点好。


```c++
    #include<iostream>
    #include<algorithm>
    #include<cstdio>
    #include<cstring>
    #define N 100005
    using namespace std;
    int n,k,c,w,t[N],a[N];
    double f[N],ans;
    int main(){
        scanf("%d%d%d%d",&n,&k,&c,&w);
        for(int i=1;i<=n;i++) scanf("%d%d",&t[i],&a[i]);
        f[n+1]=0;
        for(int i=n;i;i--){
            if(t[i]==1) f[i]=max(f[i+1],f[i+1]*(1-1.0*k/100.0)+1.0*a[i]);
            else f[i]=max(f[i+1],f[i+1]*(1+1.0*c/100.0)-1.0*a[i]);
            ans=max(ans,f[i]*w);
        }
        printf("%.2lf\n",ans);
        return 0;
    }
```
