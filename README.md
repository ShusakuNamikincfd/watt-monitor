[English](#english) | [日本語](#日本語-japanese) | [简体中文](#简体中文-chinese)

---

# <a name="english"></a>Watt Monitor (Zorin Style)

A GNOME Shell extension that displays battery % and power consumption (Watts) in the taskbar. Designed to look native on Zorin OS.

<!-- ![Screenshot](screenshot.png) -->

## Features

- **Real-time Monitoring**: Displays Battery % and Power Usage (W).
- **Charging Status**: Shows charging/discharging icon.
- **Detailed Popup**: Click to see Voltage (V), Current (A), and Energy (Wh).
- **Native Look**: Styled to match Zorin OS / GNOME shell.
- **i18n Support**: English and Japanese (日本語) support included.

## Installation

### From Source

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/watt-monitor.git
   cd watt-monitor
   ```

2. Run the install script:
   ```bash
   ./install.sh
   ```

3. **Restart GNOME Shell**:
   - **X11**: `Alt` + `F2`, type `r`, `Enter`.
   - **Wayland**: Log Out and Log In.

4. Enable the extension via **Extensions** app.

## Requirements

- GNOME Shell 42-46 (Compatible with Zorin OS 17)
- Linux Kernel with `/sys/class/power_supply` access

## License

GPLv3

---

# <a name="日本語-japanese"></a>Watt Monitor (Zorin Style)

バッテリー残量（%）と消費電力（W）をタスクバーに表示するGNOME Shell拡張機能です。Zorin OSに馴染むデザインになっています。

<!-- ![Screenshot](screenshot.png) -->

## 主な機能

- **リアルタイム監視**: バッテリー残量と消費電力（W）を常時表示。
- **充電ステータス**: 充電中・放電中のアイコン表示。
- **詳細ポップアップ**: クリックすると電圧(V)、電流(A)、エネルギー(Wh)の詳細を表示。
- **ネイティブな外観**: Zorin OS / GNOME Shellの標準デザインに統合。
- **多言語対応**: 英語と日本語に対応。

## インストール方法

### ソースコードからインストール

1. リポジトリをクローン:
   ```bash
   git clone https://github.com/YOUR_USERNAME/watt-monitor.git
   cd watt-monitor
   ```

2. インストールスクリプトを実行:
   ```bash
   ./install.sh
   ```

3. **GNOME Shellを再起動**:
   - **X11**: `Alt` + `F2`, `r`, `Enter`.
   - **Wayland**: 一度ログアウトして再ログインしてください。

4. **拡張機能(Extensions)** アプリから有効化します。

## 動作要件

- GNOME Shell 42-46 (Zorin OS 17 動作確認済み)
- `/sys/class/power_supply` へのアクセス権があるLinuxカーネル

## ライセンス

GPLv3

---

# <a name="简体中文-chinese"></a>Watt Monitor (Zorin Style)

一款适用于 GNOME Shell 的扩展插件，可在任务栏显示电池百分比和功耗（瓦特）。专为 Zorin OS 风格设计。

<!-- ![Screenshot](screenshot.png) -->

## 功能特点

- **实时监控**: 显示电池百分比和功耗（W）。
- **充电状态**: 显示充电/放电图标。
- **详细信息**: 点击即可查看电压 (V)、电流 (A) 和能量 (Wh)。
- **原生外观**: 风格与 Zorin OS / GNOME Shell 完美融合。
- **多语言支持**: 内置英语和日语支持。

## 安装方法

### 源码安装

1. 克隆仓库:
   ```bash
   git clone https://github.com/YOUR_USERNAME/watt-monitor.git
   cd watt-monitor
   ```

2. 运行安装脚本:
   ```bash
   ./install.sh
   ```

3. **重启 GNOME Shell**:
   - **X11**: 按下 `Alt` + `F2`，输入 `r`，然后回车。
   - **Wayland**: 注销并重新登录。

4. 通过 **Extensions (扩展)** 应用启用该插件。

## 系统要求

- GNOME Shell 42-46 (兼容 Zorin OS 17)
- Linux 内核需支持 `/sys/class/power_supply` 访问

## 许可证

GPLv3
