import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';

import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

// Time in seconds to update
const UPDATE_INTERVAL = 3;

/**
 * We need to wrap the class definition in a function to pass `_` correctly
 * or just use `_` inside methods assuming it's available in module scope.
 * The standard ESM way: imported `_` uses the domain from the Extension class context presumably
 * IF we call `initTranslations` or if Extension class does it.
 * 
 * Actually, in GNOME 45+, `Extension.gettext` is a method, but the helper `gettext`
 * exported from `extension.js` relies on `ExtensionUtils` logic under the hood or similar context.
 * 
 * However, we can't easily use `_` in the class definition (field initializers)
 * if it depends on runtime initialization.
 * Safe bet: use `_` inside methods.
 */

const WattMonitorIndicator = GObject.registerClass(
    class WattMonitorIndicator extends PanelMenu.Button {
        _init() {
            super._init(0.0, _('Watt Monitor'));

            // Layout
            let box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });

            // Icon
            this._icon = new St.Icon({
                icon_name: 'battery-level-80-symbolic',
                style_class: 'system-status-icon',
            });
            box.add_child(this._icon);

            // Label
            this._label = new St.Label({
                text: _('Loading...'),
                y_align: Clutter.ActorAlign.CENTER,
                style_class: 'watt-monitor-label'
            });
            box.add_child(this._label);

            this.add_child(box);

            // Menu items
            this._statusSection = new PopupMenu.PopupMenuSection();
            this.menu.addMenuItem(this._statusSection);

            this._detailsLabel = new St.Label({
                text: _('Collecting data...'),
                style_class: 'watt-monitor-details'
            });

            // Wrap the label in a menu item so it looks correct
            let item = new PopupMenu.PopupBaseMenuItem({ reactive: false });
            item.add_child(this._detailsLabel);
            this.menu.addMenuItem(item);

            // Start timer
            this._timer = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, UPDATE_INTERVAL, () => {
                this._update();
                return GLib.SOURCE_CONTINUE;
            });

            this._update();
        }

        _update() {
            let status = this._getBatteryStatus();
            this._label.set_text(status.panelText);
            this._detailsLabel.set_text(status.detailsText);

            // Update icon based on charging status
            if (status.isCharging) {
                this._icon.icon_name = 'battery-charging-80-symbolic';
            } else {
                this._icon.icon_name = 'battery-level-80-symbolic';
            }
        }

        _getBatteryStatus() {
            try {
                // Helper to read file safely
                const readFile = (path) => {
                    try {
                        let f = Gio.File.new_for_path(path);
                        let [success, content] = f.load_contents(null);
                        if (!success) return null;
                        return new TextDecoder().decode(content).trim();
                    } catch (e) {
                        return null;
                    }
                };

                // Find BAT0 or BAT1
                let batPath = '/sys/class/power_supply/BAT0';
                if (!GLib.file_test(batPath, GLib.FileTest.EXISTS)) {
                    batPath = '/sys/class/power_supply/BAT1';
                    if (!GLib.file_test(batPath, GLib.FileTest.EXISTS)) {
                        return {
                            panelText: _("No Battery"),
                            detailsText: _("Battery not found at ") + batPath,
                            isCharging: false
                        };
                    }
                }

                let statusRaw = readFile(`${batPath}/status`); // Charging, Discharging, Full

                // Translate status
                let statusDisplay = statusRaw;
                if (statusRaw === "Charging") statusDisplay = _("Charging");
                else if (statusRaw === "Discharging") statusDisplay = _("Discharging");
                else if (statusRaw === "Full") statusDisplay = _("Full");
                else if (statusRaw === "Not charging") statusDisplay = _("Not charging");

                let capacity = parseInt(readFile(`${batPath}/capacity`) || "0");

                // Getting Power (Watts)
                let power_now = readFile(`${batPath}/power_now`);
                let voltage_now = readFile(`${batPath}/voltage_now`);
                let current_now = readFile(`${batPath}/current_now`);

                let powerMicroCoords = 0;
                if (power_now) {
                    powerMicroCoords = parseInt(power_now);
                } else if (voltage_now && current_now) {
                    powerMicroCoords = (parseInt(voltage_now) * parseInt(current_now)) / 1000000;
                }

                let watts = (Math.abs(powerMicroCoords) / 1000000).toFixed(1);

                let isCharging = (statusRaw === "Charging");

                let panelText = `${capacity}%  ${watts}W`;

                let detailsText = `${_('Status')}: ${statusDisplay}\n` +
                    `${_('Capacity')}: ${capacity}%\n` +
                    `${_('Power')}: ${watts} W\n`;

                if (voltage_now) {
                    let v = (parseInt(voltage_now) / 1000000).toFixed(2);
                    detailsText += `${_('Voltage')}: ${v} V\n`;
                }
                if (current_now) {
                    let a = (parseInt(current_now) / 1000000).toFixed(2);
                    detailsText += `${_('Current')}: ${a} A\n`;
                }

                // Energy
                let energy_now = readFile(`${batPath}/energy_now`);
                let energy_full = readFile(`${batPath}/energy_full`);
                if (energy_now && energy_full) {
                    let wh_now = (parseInt(energy_now) / 1000000).toFixed(1);
                    let wh_full = (parseInt(energy_full) / 1000000).toFixed(1);
                    detailsText += `${_('Energy')}: ${wh_now} / ${wh_full} Wh`;
                }

                return { panelText, detailsText, isCharging };

            } catch (e) {
                console.error(e);
                return { panelText: _("Error"), detailsText: e.toString(), isCharging: false };
            }
        }

        destroy() {
            if (this._timer) {
                GLib.source_remove(this._timer);
                this._timer = null;
            }
            super.destroy();
        }
    });

export default class WattMonitorExtension extends Extension {
    enable() {
        this._indicator = new WattMonitorIndicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
    }
}
