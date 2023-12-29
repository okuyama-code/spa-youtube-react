 // URLSearchParams をオブジェクトに変換し、新しい値で指定したパラメータを更新
  const updatedParams = { ...Object.fromEntries(searchParams), [paramName]: value };
  
