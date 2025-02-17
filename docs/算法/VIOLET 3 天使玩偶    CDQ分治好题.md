---
title: VIOLET 3 天使玩偶----CDQ分治好题
tags:
  - CDQ分治
createTime: 2018/10/16 23:42:00
permalink: /article/mgt5f423/
---

 ## 题面
**题目描述** 

 Ayu 在七年前曾经收到过一个天使玩偶，当时她把它当作时间囊埋在了地下。而七年后 的今天，Ayu 却忘了她把天使玩偶埋在了哪里，所以她决定仅凭一点模糊的记忆来寻找它。 我们把 Ayu 生活的小镇看作一个二维平面坐标系，而 Ayu 会不定时地记起可能在某个点 (xmy) 埋下了天使玩偶；或者 Ayu 会询问你，假如她在 (x,y) ，那么她离近的天使玩偶可能埋下的地方有多远。 因为 Ayu 只会沿着平行坐标轴的方向来行动，所以在这个问题里我们定义两个点之间的距离为dist(A,B)=|Ax-Bx|+|Ay-By|。其中 Ax 表示点 A的横坐标，其余类似。 

**输入格式：** 

第一行包含两个整数n和m ，在刚开始时，Ayu 已经知道有n个点可能埋着天使玩偶， 接下来 Ayu 要进行m 次操作 接下来n行，每行两个非负整数 (xi,yi)，表示初始n个点的坐标。 再接下来m 行，每行三个非负整数 t,xi,yi。 如果t=1 ，则表示 Ayu 又回忆起了一个可能埋着玩偶的点 (xi,yi) 。 如果t=2 ，则表示 Ayu 询问如果她在点 (xi,yi) ，那么在已经回忆出来的点里，离她近的那个点有多远 

**输出格式：** 

对于每个t=2 的询问，在单独的一行内输出该询问的结果。 

输入样例#1： 

2 3  
1 1  
2 3  
2 1 2  
1 3 3  
2 4 2   

输出样例#1： 

1  
2 

~~这道题真的锻炼本蒟蒻的心态。~~

## 题解

借这篇题解也总结一下对于cdq分治的理解。 

如果能看出这题可以cdq分治，那可以好想得多。 

**对于带修改（初值也可以看做是修改）和查询的问题，考虑怎样的修改会对怎样的查询产生什么样的贡献，如果发现这能转换为偏序问题来考虑的话那么多半可以用cdq分治了。**

其实一般的偏序问题用cdq来处理的操作并不是很难，关键是对问题的转换，或者说是**对查询的转化或分解**。

这题看到二维平面以及查询和加点，那么大致就知道要怎么用cdq做了。~（如果神的话就秒切了）~ 我们按照上面的思维来，考虑哪些修改会对哪些查询会有影响。对于一个查询无非是时序早与这个查询的所有修改都对其有影响。 

嗯，这样的话，情况就很复杂了。 先不急，我们接着按上面的思路走，一个**怎样的**修改对对一个**怎样的**查询有**什么样的贡献**贡献。我们考虑题目中的这个式子 **dist(A,B)=|Ax-Bx|+|Ay-By|** 嗯，绝对值太讨厌了，我们将它拆开。那么接下来就是大力分类讨论了。**我们以一个查询点为原点建立平面直角坐标系，那么对于四个象限有不同的偏序条件和贡献计算方法（这里可以理解成将一个查询分成向四个方向的查询）。** ~~嗯，那就可以写了，四个cdq走起。~~ 额，四个cdq码量和细节都太多了，我们考虑一个更简单 ~~（细节爆炸）~~ 的做法——翻转坐标系：将所有象限都翻转成第三象限来处理，翻转很简单，**用坐标值的值域减去原坐标就是翻转后的坐标了（建议在纸上画一画）** 

想到这里就**差不多**做完了，但是我们发现如果将**n+m个点**拿去跑cdq似乎效率过不去，我们考虑优化。优化的方法很简单，就是将n个已知的点拿出来，不拿去做cdq，而是排序好，然后再单独计算这n个点对所有查询的贡献。 

这样做应该就好了，~~不过细节真的**不多**。~~


```c++
#include<iostream>

#include<algorithm>

#include<cstdio>

#include<cstring>

#define N 500005
#define V 1000002
#define ll long long using namespace std;
inline int read() {
    int p = 0;
    char c = getchar();
    while (c < '0' || c > '9') c = getchar();
    while (c >= '0' && c <= '9') p = p * 10 + (c - '0'), c = getchar();
    return p;
}
int n, m, ans[N], tr[V + 5];
struct node {
    int t, x, y, id, s;
}
a[N], b[N], c[N], d[N], e[N];
inline void flip(node & p, int k) {
    if (k) {
        if (k == 1) swap(p.x, p.y), p.x = V - p.x;
        else if (k == 2) p.x = V - p.x, p.y = V - p.y;
        else swap(p.x, p.y), p.y = V - p.y;
    }
    p.s = p.x + p.y;
}
inline bool cmp(node u, node v) {
    return u.x == v.x ? u.y < v.y : u.x < v.x;
}
inline void clean(int x) {
    for (; x <= V; x += x & -x) tr[x] = 0;
}
inline void update(int x, int v) {
    for (; x <= V; x += x & -x) tr[x] = max(tr[x], v);
}
inline int query(int x) {
    int res = 0;
    for (; x; x -= x & -x) res = max(res, tr[x]);
    return res ? res : -1e9;
}
inline void cdq(int l, int r) {
    if (l == r) return;
    int mid = l + r >> 1;
    cdq(l, mid);
    cdq(mid + 1, r);
    int i = l, j = mid + 1, ind = l;
    while (i <= mid && j <= r)
        if (d[i].x <= d[j].x) {
            if (d[i].t < 2) update(d[i].y, d[i].s);
            e[ind++] = d[i++];
        } else {
            if (d[j].t > 1) ans[d[j].id] = min(d[j].s - query(d[j].y), ans[d[j].id]);
            e[ind++] = d[j++];
        } while (j <= r) {
        if (d[j].t > 1) ans[d[j].id] = min(d[j].s - query(d[j].y), ans[d[j].id]);
        e[ind++] = d[j++];
    }
    for (int k = l; k < i; k++)
        if (d[k].t < 2) clean(d[k].y);
    while (i <= mid) e[ind++] = d[i++];
    for (int k = l; k <= r; k++) d[k] = e[k];
}
int main() {
    n = read();
    m = read();
    for (int i = 1; i <= n; i++) a[i].x = read() + 1, a[i].y = read() + 1;
    for (int i = 1; i <= m; b[i].id = i, i++) b[i].t = read(), b[i].x = read() + 1, b[i].y = read() + 1;
    memset(ans, 123, sizeof ans);
    for (int T = 0; T < 4; T++) {
        memset(tr, 0, sizeof tr);
        for (int i = 1; i <= n; i++) flip(c[i] = a[i], T);
        for (int i = 1; i <= m; i++) flip(d[i] = b[i], T);
        cdq(1, m);
        sort(c + 1, c + n + 1, cmp);
        int i = 1, j = 1;
        for (; i <= n && j <= m;)
            if (c[i].x <= d[j].x) update(c[i].y, c[i].s), i++;
            else {
                if (d[j].t > 1) ans[d[j].id] = min(d[j].s - query(d[j].y), ans[d[j].id]);
                j++;
            } for (; j <= m; j++)
            if (d[j].t > 1) ans[d[j].id] = min(d[j].s - query(d[j].y), ans[d[j].id]);
    }
    for (int i = 1; i <= m; i++)
        if (b[i].t > 1) printf("%d\n", ans[i]);
    return 0;
}
```