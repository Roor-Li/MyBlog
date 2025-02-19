---
title: BZOJ 3694&&DTOJ 1972 最短路 - Roor - 博客园
tags:
  - 图论
createTime: 2018/02/14 21:31:06
permalink: /article/mcadxxts/
---
## 题面

**题目描述**

给出一个n个点m条边的无向图，n个点的编号从1~n，定义源点为1。定义最短路树如下：从源点1经过边集T到任意一点i有且仅有一条路径，且这条路径是整个图1到i的最短路径，边集T构成最短路树。

给出最短路树，求对于除了源点1外的每个点i，求最短路，要求不经过给出的最短路树上的1到i的路径的最后一条边。

**输入**

第一行包含两个数n和m，表示图中有n个点和m条边。

接下来m行，每行有四个数ai，bi，li，ti，表示图中第i条边连接ai和bi权值为li，ti为1表示这条边是最短路树上的边，ti为0表示不是最短路树上的边。

**输出**

输出n-1个数，第i个数表示从1到i+1的要求的最短路。无法到达输出-1。

**样例输入**


​    
​    5 9  
​    3 1 3 1  
​    1 4 2 1  
​    2 1 6 0  
​    2 3 4 0  
​    5 2 3 0  
​    3 2 2 1  
​    5 3 1 1  
​    3 5 2 0  
​    4 5 4 0


**样例输出**


​    
​    6 7 8 5

**提示**

对于30%的数据，n≤100，m≤2000  
对于100%的数据，n≤4000，m≤100000，1≤li≤100000

## 题解

考虑一个点的答案是怎么样的：从$1$到$i$的答案，应该是从$1$沿着树边走，然后经过一条非树边走到以$i$为根的子树中，在沿着树边向上走到$i$。画图可以证明走两条非树边一定更不优。$p[i][j]$表示$i->j$的只**经过一条两端在$i$和$j$的子树非树边**
最短路，$dis[i]$表示$1->i$的最短路，所以$ans[i]=min（p[x][i]+dis[x]）$，$x$是$i$子树中的一点。

那么只要处理$dis[i]$和$p[i][j]$，$dis[i]$只要求树上距离即可，$p[i][j]$的计算类似更新答案，$dfs$过程中枚举$1~n$个点，然后用用儿子节点更新当前节点即可。


```c++
    #include<iostream>
    #include<algorithm>
    #include<cstdio>
    #include<cstring>
    #define M 200005
    #define N 4005
    using namespace std;
    int n,m,dis[N],p[N][N],ans[N],pre[N],las[N],ind;
    int hd[N],to[M],nx[M],w[M],cnt;
    inline void add(int u,int v,int c){
        to[++cnt]=v;w[cnt]=c;nx[cnt]=hd[u];hd[u]=cnt;
    }
    inline void dfs1(int u,int f){
        pre[u]=++ind;
        for(int i=hd[u];i;i=nx[i]){
            int v=to[i];
            if(v!=f){
                dis[v]=dis[u]+w[i];
                dfs1(v,u);
            }
        }
        las[u]=ind;
    }
    inline void dfs2(int u,int f){
        for(int i=hd[u];i;i=nx[i]){
            int v=to[i];
            if(v!=f){
                dfs2(v,u);
                for(int j=1;j<=n;j++){
                    if(pre[j]>=pre[u]&&las[j]<=las[u]) continue;
                    p[u][j]=min(p[u][j],p[v][j]+w[i]);
                }
            }
        }
        for(int i=1;i<=n;i++){
            if(pre[i]>=pre[u]&&las[i]<=las[u]) continue;
            ans[u]=min(ans[u],p[u][i]+dis[i]);
        }
    }
    int main(){
        scanf("%d%d",&n,&m);
        memset(p,123,sizeof p);
        for(int i=1;i<=m;i++){
            int a,b,l,t;
            scanf("%d%d%d%d",&a,&b,&l,&t);
            if(t){add(a,b,l);add(b,a,l);}
            else p[a][b]=p[b][a]=min(p[a][b],l);
        }
        memset(ans,123,sizeof ans);
        dfs1(1,0);dfs2(1,0);
        for(int i=2;i<=n;i++)
            if(ans[i]==ans[0]) puts("-1");
            else printf("%d\n",ans[i]);
        return 0;
    }
```
## 总结

图论等， **尤其是图论题** 。很多时候要考虑答案长什么样，什么情况下最优，当有了特殊性质时，题目会更好做。

如果要证明一些性质，可以先假设一些条件，然后用反证法。例如：假设最优答案在(……)上，如果有更优的答案，那么(……)就不是(……)。之类的……

