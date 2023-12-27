```js
// オブジェクトをFormDataに変換するヘルパー関数
export function objectToFormData(obj, namespace = null, formData = new FormData()) {
  // オブジェクトのプロパティを走査
  for (let propertyName in obj) {
    // プロパティが有効であるかどうかを確認
    if (isValidProperty(obj, propertyName)) {
      // フォームキーを取得
      const formKey = getFormKey(namespace, propertyName);
      // FormDataに値を追加
      appendToFormData(formData, formKey, obj[propertyName]);
    }
  }
  // 最終的なFormDataを返す
  return formData;
}

// プロパティが有効であるかどうかを確認する関数
function isValidProperty(obj, propertyName) {
  return (
    Object.prototype.hasOwnProperty.call(obj, propertyName) &&
    obj[propertyName] !== undefined &&
    obj[propertyName] !== null
  );
}

// フォームキーを取得する関数
// namespaceがある場合は"[namespace][propertyName]"の形式、ない場合は"propertyName"の形式
function getFormKey(namespace, propertyName) {
  return namespace ? `${namespace}[${propertyName}]` : propertyName;
}

// FormDataに値を追加する関数
function appendToFormData(formData, formKey, value) {
  // 値の型によって異なる処理を実行
  if (value instanceof Date) {
    // Date型の場合はISOStringに変換して追加
    appendAsDate(formData, formKey, value);
  } else if (isObjectButNotFile(value)) {
    // オブジェクト（ただしFile型ではない）の場合は再帰的にobjectToFormDataを呼び出して追加
    objectToFormData(value, formKey, formData);
  } else {
    // それ以外の場合は普通に追加
    formData.append(formKey, value);
  }
}

// Date型をISOStringに変換してFormDataに追加する関数
function appendAsDate(formData, formKey, date) {
  formData.append(formKey, date.toISOString());
}

// オブジェクトがFile型でないかどうかを判定する関数
function isObjectButNotFile(value) {
  return typeof value === "object" && !(value instanceof File);
}

// FormDataをオブジェクトに変換するヘルパー関数
export function formDataToObject(formData) {
  const obj = {};
  // FormDataのキーを走査
  for (let key of formData.keys()) {
    // キーと値をオブジェクトに追加
    obj[key] = formData.get(key);
  }
  // 最終的なオブジェクトを返す
  return obj;
}

```
