#!/bin/bash

UUID="watt-monitor@shota.local"
EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"
LOCALE_DIR="$EXTENSION_DIR/locale"

echo "Installing Watt Monitor extension..."

# Create directory
mkdir -p "$EXTENSION_DIR"

# Copy core files
cp metadata.json "$EXTENSION_DIR/"
cp extension.js "$EXTENSION_DIR/"
cp stylesheet.css "$EXTENSION_DIR/"

# Compile and copy locales
echo "Compiling translations..."
for po in locale/*/LC_MESSAGES/*.po; do
    lang=$(echo "$po" | cut -d'/' -f2)
    mkdir -p "$LOCALE_DIR/$lang/LC_MESSAGES"
    msgfmt "$po" -o "$LOCALE_DIR/$lang/LC_MESSAGES/watt-monitor.mo"
done

echo "Installed to $EXTENSION_DIR"
echo ""
echo "Please restart GNOME Shell:"
echo "  1. Log Out and Log In (Recommended for updated translations)"
echo ""
echo "Then enable/disable the extension to refresh."
