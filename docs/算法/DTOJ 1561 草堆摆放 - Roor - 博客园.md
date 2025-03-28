---
title: DTOJ 1561 草堆摆放 - Roor - 博客园
tags:
  - 数学
createTime: 2018/02/14 21:31:03
permalink: /article/9rpbxni4/
---
## 题面

###  题目描述

FJ买了一些干草堆，他想把这些干草堆分成N堆(1<=N<=100,000)摆成一圈，其中第i堆有B_i数量的干草。不幸的是，负责运货的司机由于没有听清FJ的要求，只记住分成N堆摆成一圈这个要求，而每一堆的数量却是A_i(1<=i<=N)。当然A_i的总和肯定等于B_i的总和。

FJ可以通过移动干草来达到要求，即使得A_i=B_i，已知把一个干草移动x步需要消耗x数量的体力，相邻两个干草堆之间的步数为1。

请帮助FJ计算最少需要消耗多少体力才能完成任务。

###  输入

第一行输入一个整数N。

接下来N行，每行两个整数，其中第i+1行描述A_i和B_i(1<=A_i,B_i<=1000)。

###  输出

输出一个数表示最少需要消耗的体力。

###  样例输入


​    4   
​    7 1   
​    3 4   
​    9 2   
​    1 13 

###  样例输出


​    13

###  提示

【样例说明】

从第1堆中移动6个干草到第4堆，从第3堆中移动1个干草到第2堆，从第3堆中移动6个干草到第4堆中。

## 题解

思维好题。完全没想到，看了题解的思路才明白。

设$f_i$表示$i->i+1$运了$f_i$堆稻草，$f_n$表示$n->1$运了$f_n$堆。

那么有：

$a_1-f_1+f_n=b_1$

$a_2-f_2+f_1=b_2$

$a_3-f_3+f_2=b_3$

………

$a_n-f_n+f_{n-1}=b_n$

发现合并后没有意义，先移项：

$f_1=b_1-a_1+f_n$

$f_2=b_2-a_2+f_1$

$f_3=b_3-a_3+f_2$

………

$f_n=b_n-a_n+f_{n-1}$

将上面的$f_i$向下代入：

$f_1=b_1-a_1+f_n$

$f_2=b_2-a_2+b_1-a_1+f_n$

$f_3=b_3-a_3+b_2-a_2+b_1-a_1+f_n$

………

$f_n=f_n$

那么我们就得到了$f_i$与$f_n$的关系，取绝对值时改一下符号：

（设$s_i$表示$a_i-b_i$的前缀和，$d$表示$f_n$）

$|f_1|=|s_1-|-d||$

$|f_2|=|s_2-|-d||$

$|f_3|=|s_3-|-d||$

…………

$|f_n|=|-d|$

那么就每个式子就变成了$|x-y|$的形式，那么问题就是求数轴上每个点到同一个位置的距离最小。那么就是中位数了。


```c++
    #include<iostream>
    #include<algorithm>
    #include<cstdio>
    #include<cstring>
    #define N 100005
    using namespace std;
    int n,a,b,s[N];
    int main(){
        scanf("%d",&n);
        for(int i=1;i<=n;i++){
            scanf("%d%d",&a,&b);
            s[i]=s[i-1]+a-b;
        }
        sort(s+1,s+n+1);
        int x=-s[(n+1)/2];
        long long ans=0;
        for(int i=1;i<=n;i++) ans+=abs(s[i]+x);
        printf("%lld\n",ans);
        return 0;
    }
```
思维要好好锻炼，加油刷题吧！

