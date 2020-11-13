import * as fs from 'fs';
import * as crypto from 'crypto';
import serialNumber from 'serial-number';
var conf_files;
(function (conf_files) {
    conf_files[conf_files["APPEARANCE"] = 0] = "APPEARANCE";
    conf_files[conf_files["PREFERENCE"] = 1] = "PREFERENCE";
})(conf_files || (conf_files = {}));
var conf_paths;
(function (conf_paths) {
    conf_paths["APPEARANCE"] = "./db/appearance.config";
    conf_paths["PREFERENCE"] = "./db/content_preferences.config";
})(conf_paths || (conf_paths = {}));
class DBHandler {
    constructor() {
        this.algorithm = 'aes-256-ctr';
        this.key = '';
        this.configs = conf_files;
        this.paths = conf_paths;
        this.key_generator().then((res) => {
            this.file_guard().then((res) => {
                console.log(this.key);
                this.appear = this.load_files(this.configs.APPEARANCE);
                this.preference = this.load_files(this.configs.PREFERENCE);
            });
        });
    }
    file_guard() {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(this.paths.APPEARANCE) || fs.readFileSync(this.paths.APPEARANCE).length < 2) {
                this.save_files(this.configs.APPEARANCE, JSON.stringify({}));
            }
            if (!fs.existsSync(this.paths.PREFERENCE) || fs.readFileSync(this.paths.PREFERENCE).length < 2) {
                this.save_files(this.configs.PREFERENCE, JSON.stringify({}));
            }
            resolve(true);
        });
    }
    key_generator() {
        return new Promise(((resolve, reject) => {
            serialNumber((err, value) => {
                this.key = crypto.createHash('sha256').update(String(value)).digest('base64').substr(0, 32);
                resolve(true);
            });
        }));
    }
    load_files(config) {
        const decrypt = (encrypted) => {
            const iv = encrypted.slice(0, 16);
            encrypted = encrypted.slice(16);
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
            const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
            return result;
        };
        switch (config) {
            case this.configs.APPEARANCE:
                return decrypt(fs.readFileSync(this.paths.APPEARANCE));
            case this.configs.PREFERENCE:
                return decrypt(fs.readFileSync(this.paths.PREFERENCE));
            default:
                return { 'ass': 'duck' };
        }
    }
    save_files(config, data) {
        const encrypt = (buffer) => {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
            return result;
        };
        switch (config) {
            case this.configs.APPEARANCE:
                fs.writeFileSync(this.paths.APPEARANCE, encrypt(data));
                return true;
            case this.configs.PREFERENCE:
                fs.writeFileSync(this.paths.PREFERENCE, encrypt(data));
                return true;
            default:
                return false;
        }
    }
    set_appear(config) {
        if (config === this.appear)
            return true;
        this.save_files(this.configs.APPEARANCE, config);
        return true;
    }
    get_appear() {
        return this.appear;
    }
    set_preference(config) {
        if (config === this.preference)
            return true;
        this.save_files(this.configs.PREFERENCE, config);
        return true;
    }
    get_preference() {
        return this.preference;
    }
    DEV_refresh() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.save_files(this.configs.APPEARANCE, JSON.stringify({ "newass": "penis" }));
                this.save_files(this.configs.PREFERENCE, JSON.stringify({ "newbutt": "dick" }));
                resolve(true);
            }, 2000);
        });
    }
}
export { DBHandler };
