---
title: P8148 声海  Sea of Voices
tags:
  - 排序
createTime: 2025/03/06 16:42:57
permalink: /article/rdw3siut/
---

 

## [题面](https://www.luogu.com.cn/problem/P8148)

## 题解

注意到$a_i$是单调不降的，那么很显然$a_1$和$a_2$是**可重集**$S$中最小的两个。因此，$a_1$和$a_2$很容易得到，那么进一步考虑$a_3$，发现在删去$a_1$和$a
_2$后，$a_3$可能是最小的。因为无法确定$a_3$和$a_1+a_2$的大小关系，那么很自然可以想到，如果再将$a_1+a_2$删去，$a_3$就为最小的了。

以此类推，再已知$a_1$到$a_k$时，将其能计算出的结果从$S$中删去，那么最小的就为$a_{k+1}$了。按照这个思路，先将$S$排序，然后暴力维护能够删除的结果，能够得到50分。

考虑优化，发现这个过程有点像筛法。都是从一堆数中取出符合条件的数，并且都能通过已经得到的结果来对剩余的数进行筛选。我们要保留的数是$a_i$要筛除的数是$\sum_{j=l}^{r} a_j$，注意到$a_i\le10^5$，因此我们只需要筛除$\sum_{j=l}^{r} a_j\le10^5$，我们可以开一个桶来处理。

这个桶有以下特点：

1. 当一个数出现时对应的桶$+1$
2. 当找到一个$a_i$时，将这个$a_i$能生成的所有后缀和所对应的桶都$-1$
3. 一个桶如果非负，那么这个桶对应的数为$a_i$

这个桶就相当于相当于一个标记数组，我们通过操作标记数组来对原数据进行筛除。需要注意的是这里在筛除数据时使用的是后缀和而非前缀和，举个例子：

$a_3$筛除的是：
$$
a_3\\
a_2+a_3\\
a_1+a_2+a_3
$$
$a_4$筛除的是：
$$
a_4\\
a_3+a_4\\
a_2+a_3+a_4\\
a_1+a_2+a_3+a_4
$$
很明显，后缀和能够不重复不遗漏的将需要筛除的数计算出来

```c++
#include<iostream>
#include<algorithm>
#include<cstdio>
#define N 2005
#define M 4000005
using namespace std;
int n,m,s[M];
int a[N],cnt;
int t[100005];
int main(){
	scanf("%d",&n);
	m=n*(n+1)/2;
	for(int i=1;i<=m;i++) scanf("%d",&s[i]);
	sort(s+1,s+m+1);
	for(int i=1;i<=m;i++){
		t[s[i]]++;
		if(t[s[i]]>0){
			a[++cnt]=s[i];
			if(cnt==n) break;
			int sum=0;
			for(int i=cnt;i>=1;i--){
				sum+=a[i];
				if(sum>100000) break;
				t[sum]--;
			}
		}
	}
	for(int i=1;i<=n;i++)
		printf("%d ",a[i]);
	puts("");
	return 0;
}
```

