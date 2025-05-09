---
title: BZOJ 3043 [Poetize6] IncDec Sequence - Roor - 博客园
tags:
  - 差分
createTime: 2018/02/14 21:31:28
permalink: /article/9uasmn3t/
---
## 题面

**题目描述**

给定一个长度为  n  的数列$a_1,a_2,……,a_n$  ​  ，每次可以选择一个区间  [l,r]  ，使这个区间内的数都加  1  或者都减
1  。

请问至少需要多少次操作才能使数列中的所有数都一样,并求出在保证最少次数的前提下,最终得到的数列有多少种。

**输入输出格式**

输入格式：

第一行一个正整数  n  
接下来  n  行,每行一个整数,第i  +1  行的整数表示  a[i]  ​  。

输出格式：

第一行输出最少操作次数  
第二行输出最终能得到多少种结果

**输入输出样例**

输入样例:

​    4  
​    1  
​    1  
​    2  
​    2  

输出样例:  


​    
​    1  
​    2  

**说明**

对于100%的数据，n≤100000, 0≤a[i]​≤2147483648。

## 题解

经典差分模型。

总结对于这类模型的做法。

考虑差分的特点：

1、反映数据之间的相对关系。

2、前缀和和是原来的数据 ~~（废话……）~~

3、原数组区间$[l,r]$加v在差分数组上变成了$dif[l]+v,dif[r+1]-v$，特别的当修改区间为$[l,n]$时，仅有$dif[l]+v$($n+1$直接忽略)

有了以上的特点我们就好分析题目了。

先考虑第一问：

要求最少操作使得数列列全部相等。如果我们将数列差分起来，那么我们要让全部数都相等，那么就是要让差分数组中每一项都为0，我们考虑要让每一项都等于多少，根据
**特点2** ，如果我们留下第一项的，只将$[2,n]$的差分数组变为0，那么数列就都是第一项的值了。所以我们只在$[2,n]$的差分序列上做操作。根据
**特点3**
，我们操作转换成了让$dif[l]+1,dif[r+1]-1$和$dif[l]-1,dif[r+1]+1$，所以我们考虑将差分数组中的正数和负数一一配对，那么最后如果剩下一些正数，那么就修改$dif[i]+1,dif[n+1]-1$就可以把正数消除，负数同理。

考虑第二问：

上面讲过，我们留下了第一项，所以数列中所有数会变成第一项的数，所以就考虑最优情况下，第一项可以有多少种取法即可。也就是考虑剩下的那些正数（或负数）和第一个位置互相抵消一部分（剩余的再和$n$抵消）的的情况，就是$dif[1]+1,dif[i]-1$


```c++
    #include<iostream>
    #include<algorithm>
    #include<cstdio>
    #include<cstring>
    #include<cmath>
    #define N 100005
    using namespace std;
    int n;
    long long a[N],dif[N],pos,neg;
    int main(){
        scanf("%d",&n);
        for(int i=1;i<=n;i++) scanf("%lld",&a[i]);
        for(int i=1;i<=n;i++) dif[i]=a[i]-a[i-1];
        for(int i=2;i<=n;i++){
            pos+=max(dif[i],0ll);
            neg-=min(dif[i],0ll);
        }
        printf("%lld\n",max(pos,neg));
        printf("%lld\n",abs(pos-neg)+1);
        return 0;
    }
```
