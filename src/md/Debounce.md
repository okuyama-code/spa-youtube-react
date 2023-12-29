デバウンスは、指定された間隔が経過するまで関数の実行を遅らせるために使用される手法です。 これは、タイムアウト期間を設定することで機能し、その後、その期間内にそれ以上のトリガーが発生しない場合、関数の実行が許可されます。

フロントエンドのスロットリングとデバウンス
https://appmaster.io/ja/glossary/hurontoendonosurotsutoringutodebaunsu

```jsx

// コードの目的：
// URLのクエリパラメータから検索キーワードを取得し、デバウンスされた検索キーワードを状態として管理する

// useURLSearchParamsはカスタムフックで、
// URLのクエリパラメータにアクセスするために使用されます

// ここでは、"search" というクエリパラメータから検索キーワードを取得し、
// それをデバウンスされた状態変数 debouncedSearchTerm として管理する

const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParams("search");

// 例えば、URLが "?search=example" の場合、debouncedSearchTermの初期値は "example" となります
// これにより、URLの検索キーワードが変更された時点で、debouncedSearchTermも自動的に更新されます

```
