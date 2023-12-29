## pagenationコンポーネントの動作に必要な情報
現在のページ、投稿レコードの合計の数、1ページに何件表示させるかのperPage(limit)
 currentPage={currentPage}
 totalPosts={totalPosts}
 postsPerPage={perPage}

`limit`と`offset`はデータベースクエリにおいて、ページネーションを実現するための重要な役割を果たします。

- **`limit`**: これは1ページあたりに表示するデータアイテムの数を指定します。たとえば、`limit=10`なら1ページに10個のデータアイテムを表示します。
- **`offset`**: これはどこからデータを始めるかを示します。例えば、`offset=20`なら、21番目のデータアイテムから表示が始まります。

ページネーションでは、ユーザーがページを切り替えるたびに`offset`が変更され、新しいデータが取得されます。これにより、大量のデータを一度に読み込まず、ページごとに必要な範囲のデータのみを処理できるようになります。


## Math.ceil() 関数は、引数として与えた数以上の最小の整数を返します。
```
console.log(Math.ceil(0.95));
// Expected output: 1

console.log(Math.ceil(4));
// Expected output: 4

console.log(Math.ceil(7.004));
// Expected output: 8

console.log(Math.ceil(-7.004));
// Expected output: -7
```


```jsx
// createRange関数は、指定された範囲の整数の配列を生成します。
const createRange = (start, end) => {
    // Array.fromメソッドを使用して、指定された範囲の配列を生成します。
    // 第一引数には、配列の長さを指定します。end - start + 1は範囲の長さです。
    // 第二引数には、各要素を生成するためのコールバック関数があります。
    // コールバック関数は、アンダースコア(_)で無視され、iには要素のインデックスが渡されます。
    // i + startを使って、各要素の値を計算しています。
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

// 例として、createRange関数を使用して1から5までの範囲の配列を生成します。
const resultArray = createRange(1, 5);

// 結果をコンソールに表示します。
console.log(resultArray); // [1, 2, 3, 4, 5]

```

例として、createRange(3, 7) を呼び出す場合を考えてみましょう。この関数は、範囲が3から7までの整数配列を生成します。

```javascript

const createRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

const resultArray = createRange(3, 7);
console.log(resultArray);
```

この場合、Array.from メソッドは、配列の長さが end - start + 1 となるようにします。したがって、この例では長さが 7 - 3 + 1 すなわち5となります。

コールバック関数 (_, i) => i + start では、_ は無視され、i には各要素のインデックスが渡されます。そして、各要素の値は i + start で計算されます。

具体的には次のようになります：

要素0 (i=0)：0 + 3 ＝ 3
要素1 (i=1)：1 + 3 ＝ 4
要素2 (i=2)：2 + 3 ＝ 5
要素3 (i=3)：3 + 3 ＝ 6
要素4 (i=4)：4 + 3 ＝ 7
したがって、createRange(3, 7) の結果は [3, 4, 5, 6, 7] となります。これが指定された範囲の整数の配列です。

```jsx
// currentPageが6以下の場合、以下の処理を実行します。
if (currentPage <= 6) {
    // ページネーションの表示で、「...」が表示される前の最後のページを8とします。
    // Ellipsis省略記号 省略記号の左のページ番号＝８
    const lastPageBeforeEllipsis = 8;

    // createRange関数を使って、1からlastPageBeforeEllipsisまでの範囲の整数配列を生成します。
    // そして、その配列に「...」とtotalPagesを追加して、結果を返します。
    return [...createRange(1, lastPageBeforeEllipsis), "...", totalPages];
}
```

ここで、createRange(1, lastPageBeforeEllipsis) は、1から8までの整数の配列を生成します。それに「...」と totalPages を追加して、最終的なページネーションの配列が生成されます。

例えば、totalPages が 10 の場合、生成される配列は次のようになります：

javascript
Copy code
[1, 2, 3, 4, 5, 6, 7, 8, "...", 10]
この配列がページネーションとして表示され、ユーザーにわかりやすくなります。

----------------------------------------------

```jsx
// ページネーションにおいて、中央部分のページの範囲を計算します。

// middlePagesStartは、currentPage - 3 と2の大きい方を取ります。
// これにより、currentPageから3ページ前までを含む範囲が計算されます。
const middlePagesStart = Math.max(2, currentPage - 3);

// middlePagesEndは、currentPage + 3 と totalPages - 1 の小さい方を取ります。
// これにより、currentPageから3ページ後までを含む範囲が計算されます。
const middlePagesEnd = Math.min(currentPage + 3, totalPages - 1);
```
このコードは、ページネーションの中央部分のページの範囲を計算しています。以下に詳細を説明します。

middlePagesStart の計算部分では、currentPage - 3 と 2 の大きい方を取っています。これは、currentPage から3ページ前までの範囲を示しています。ただし、最小値として2が設定されているため、最小でページ2から始まります。

middlePagesEnd の計算部分では、currentPage + 3 と totalPages - 1 の小さい方を取っています。これは、currentPage から3ページ後までの範囲を示しています。ただし、最大値として totalPages - 1 が設定されているため、最大で totalPages - 1 までとなります。

これにより、middlePagesStart から middlePagesEnd までの範囲が、ページネーションの中央部分として計算されます。


## カギはuseSearchParams PostsList.jsxにある。
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();
参考URL
https://lorem-co-ltd.com/usesearchparams-basic/

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const initialPageFromURL = Number(searchParams.get("page") || "1");
const [currentPage, setCurrentPage] = useState(initialPageFromURL);
```
このコードはReactで書かれたもので、useSearchParams フックを使用して現在のURLのクエリパラメータを取得し、それを使ってページの状態を管理しています。

まず、const [searchParams, setSearchParams] = useSearchParams(); では、useSearchParams フックを使用して、現在のURLのクエリパラメータを searchParams という変数に取得しています。これにより、URLのクエリパラメータを簡単に取得できます。

次に、const initialPageFromURL = Number(searchParams.get("page") || "1"); では、URLのクエリパラメータから "page" というキーに対応する値を取得しています。取得した値は数値に変換され、もし取得できなかった場合はデフォルトでページ1になります。

最後に、const [currentPage, setCurrentPage] = useState(initialPageFromURL); では、ページの状態を管理するために useState フックを使用しています。初期値として、先ほど取得したページの数値を設定しています。

このコードは、URLのクエリパラメータからページ情報を取得し、それをReactの状態として管理しているものです。これにより、ページが変更された際にはURLのクエリパラメータも変更され、逆もまた然りです。


searchParams.get("page") は、searchParams という名前の URLSearchParams オブジェクトから "page" というキーに対応する値を取得しています。これは、URLのクエリパラメータから特定のキーに関連する値を取り出す際に使用されます。

例えば、URLが http://example.com/?page=3&category=react のような場合、searchParams.get("page") は文字列の "3" を返します。ただし、Number 関数で数値に変換しているので、この場合は数値の 3 が取得されます。

もし指定したキーに対応する値が存在しない場合、get メソッドは null を返します。このとき、コードでは || "1" の部分が働き、デフォルトでページ1を意味する文字列 "1" が使われます。


---------------------------------------------
## ページが変更されたときに呼び出される handlePageChange 関数

```jsx
// part29追記
const handlePageChange = (page) => {
  // ページの状態を更新します
  setCurrentPage(page);

  // URLを更新して、新しいページ番号を含めます
  setSearchParams({ search: debouncedSearchTerm, page: page});
}
```
このコードは、ページが変更されたときに呼び出される handlePageChange 関数を持っています。この関数は、新しいページ番号を受け取り、そのページに状態を更新し、同時にURLのクエリパラメータも更新します。

ここで、setCurrentPage(page); は、Reactの useState フックを使用して管理されている currentPage ステートを更新しています。これにより、ページの状態が新しいページに反映されます。

次に、setSearchParams({ search: debouncedSearchTerm, page: page}); では、setSearchParams メソッドを使用してURLのクエリパラメータを更新しています。新しいページ番号 (page) と、検索語 (debouncedSearchTerm) を含むようにしています。これにより、ページが変更されたときにURLも適切に変更され、ブラウザの履歴にも反映されます。

このコードは、ページが変更されたときにReactの状態とURLを同期させることで、ユーザーエクスペリエンスを向上させています。
