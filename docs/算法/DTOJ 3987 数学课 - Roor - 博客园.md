---
title: DTOJ 3987 数学课 - Roor - 博客园
tags:
  - 卢卡斯定理
createTime: 2025/02/14 21:31:04
permalink: /article/1f115tv3/
---
## 题面

###  题目描述

wzy又来上数学课了…… 虽然他很菜，但是数学还是懂一丢丢的。老师出了一道题，给定一个包含$n$个元素的集合$P=1,2,3……n$求有多少集合$A
\subseteq P$，满足$x \in A$且$2x \notin
A$且对于$A$在$P$中的补集也要满足相同条件。给定$m$求大小为$m$的$A$有多少个，输出答案$mod~10000019$。

###  输入

第一行$n,q$，接下来$q$行，每行一个$m$。

###  输出

对于每个$m$输出答案$mod~10000019$

【样例输入】

3 3

0

1

2

【样例输出】

0

2

2

【数据范围】

$n,m<=10^{18}~q<=100000$

## 题解

又是计数类问题，应该有DP写法。 **$n,m$很大，但模数比较小，又可以考虑卢卡斯。**

**恩，思路比较多。可以先考虑观察找找性质。**

$x$和$2x$不能再同一个集合，我们将将$x$和$2x$连一条边，那么$n$个数，就被划分成了若干条链，然后对于每一条链，发现只有两种选法（间隔一个选一个），而且每条链都必须选其中一种。那么总共有多少种选法就很显然了。

考虑题目中要求的集合大小为$m$。不难发现存在无解（即答案为0）。我们假设一条链的链长为$2p$或$2p+1$，那么由于每条链都必须选其中的一半，偶数链选出的个数一定为$p$，但奇数链可以选出$p$或$p+1$。所以可以计算出
**最少要取几个（下界）** 和 **最多可以取几个（上界）**
，显然，不在这范围内的$m$就无解了。那么考虑有解情况，偶数链都选$p$不会改变选出数的个数，只有奇数链可以取$p$或$p+1$可以影响选出数的个数。我们用$m$减去下界，然后剩下的数就需要用奇数链中$p+1$多出来的$1$补齐，那么就考虑是那几条奇数链补上的一即可。


```c++
    #include<iostream>
    #include<algorithm>
    #include<cstdio>
    #include<cstring>
    #define ll long long
    #define p 10000019
    using namespace std;
    int q,logn;
    ll n,m,f[p+5],inv[p+5],l,r,las,mi[70],odd,eve;
    inline ll power(ll a,ll x){
        ll res=1;
        for(;x;a=a*a%p,x>>=1) if(x&1) res=res*a%p;
        return res;
    }
    inline ll C(ll a,ll b){
        return a<b?0:f[a]*inv[f[b]]%p*inv[f[a-b]]%p;
    }
    inline ll lucas(ll a,ll b){
        if(a<p&&b<p) return C(a,b);
        return C(a%p,b%p)*lucas(a/p,b/p)%p;
    }
    int main(){
        scanf("%lld%d",&n,&q);
        inv[1]=f[0]=1;
        for(int i=1;i<p;i++) f[i]=f[i-1]*i%p;
        for(int i=2;i<p;i++) inv[i]=inv[p%i]*(p-p/i)%p;
        for(ll i=n;i;i>>=1) logn++;
        mi[0]=1;for(int i=1;i<=logn;i++) mi[i]=mi[i-1]*2;
        for(int j=logn;j;j--){
            ll now=n/mi[j-1];
            ll num=(now+1)/2-las;
            las=(now+1)/2;
            l+=j/2*num;r+=(j+1)/2*num;
            j&1?odd+=num:eve+=num;
        }
        for(int i=1;i<=q;i++){
            scanf("%lld",&m);
            if(m<l||m>r){puts("0");continue;}
            else printf("%lld\n",lucas(odd,m-l)*power(2,eve)%p);
        }
        return 0;
    }
```
## 总结：

计数类问题真的很多都是 **排列组合** 和 **DP。** 这道题也有DP推导的方法。

