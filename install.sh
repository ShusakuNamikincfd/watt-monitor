#!/bin/bash

# 設定
UUID="watt-monitor@shota.local"
EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"
LOCALE_DIR="$EXTENSION_DIR/locale"

echo "Watt Monitor 拡張機能をインストールしています..."

# ディレクトリの作成
mkdir -p "$EXTENSION_DIR"

# コアファイルのコピー
cp metadata.json "$EXTENSION_DIR/"
cp extension.js "$EXTENSION_DIR/"
cp stylesheet.css "$EXTENSION_DIR/"

# 翻訳ファイルのコンパイルとコピー
echo "翻訳をコンパイルしています..."
for po in locale/*/LC_MESSAGES/*.po; do
    lang=$(echo "$po" | cut -d'/' -f2)
    mkdir -p "$LOCALE_DIR/$lang/LC_MESSAGES"
    msgfmt "$po" -o "$LOCALE_DIR/$lang/LC_MESSAGES/watt-monitor.mo"
done

echo "$EXTENSION_DIR にインストールしました"
echo ""
echo "GNOME Shell を再起動してください:"
echo "  1. ログアウトして再ログイン（翻訳を反映させるために推奨）"
echo ""
echo "その後、拡張機能アプリから有効化してください。"
