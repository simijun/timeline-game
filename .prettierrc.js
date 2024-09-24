module.exports = {
  trailingComma: "es5", // 複数行の場合、可能な限り末尾のコンマを出力
  tabWidth: 2, // タブサイズ
  semi: true, // ステートメントの最後にセミコロンを付与
  singleQuote: true, // 二重引用符の代わりに単一引用符を使用
  endOfLine: "auto", // ファイル末尾は改行
  printWidth: 120, // 1行の最大文字数をデフォルトから変更
  importOrder: [
    "^@/api/(.*)$",
    "^@/classes/(.*)$",
    "^@/common/(.*)$",
    "^@/components/(.*)$",
    "^@/contexts/(.*)$",
    "^@/features/(.*)$",
    "^@/hooks/(.*)$",
    "^@/pages/(.*)$",
    "^@/routes/(.*)$",
    "^@/styles/(.*)$",
    "^@/types/(.*)$",
    "^@/utils/(.*)$",
    "^[./]",
  ], // importの並び順
  importOrderSeparation: true, // importグループ間は1行空ける
  importOrderSortSpecifiers: true,
};
