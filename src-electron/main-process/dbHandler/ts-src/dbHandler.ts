import fs from 'fs'
import crypto from 'crypto'
import serialNumber from 'serial-number'

enum conf_files {
    APPEARANCE,
    PREFERENCE
}
enum conf_paths {
    APPEARANCE = './db/appearance.config',
    PREFERENCE = './db/content_preferences.config'
}

class DBHandler {

    private appear: any;
    private preference: any;
    private readonly algorithm = 'aes-256-ctr';
    private key = '';
    private readonly configs = conf_files;
    private readonly paths = conf_paths;

    constructor() {
        serialNumber((err:any, value:string) => {
            console.log(value)
            this.key = crypto.createHash('sha256').update(String(value)).digest('base64').substr(0, 32);
            this.appear = this.load_files(this.configs.APPEARANCE);
            this.preference = this.load_files(this.configs.PREFERENCE);
        });
    }

    private load_files(config:number):object {

        const decrypt = (encrypted:Buffer) => {
            const iv = encrypted.slice(0, 16);
            encrypted = encrypted.slice(16);
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
            const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
            return result;
        };

        switch (config) {
            case this.configs.APPEARANCE:
                return decrypt(fs.readFileSync(this.paths.APPEARANCE))
            case this.configs.PREFERENCE:
                return decrypt(fs.readFileSync(this.paths.PREFERENCE))
            default:
                return {'ass':'duck'}
        }
    }

    private save_files(config:number, data:any):boolean {

        const encrypt = (buffer: Buffer) => {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
            return result;
        };

        switch (config) {
            case this.configs.APPEARANCE:
                fs.writeFileSync(this.paths.APPEARANCE,encrypt(data))
                return true
            case this.configs.PREFERENCE:
                fs.writeFileSync(this.paths.PREFERENCE,encrypt(data))
                return true
            default:
                return false
        }
    }

    set_appear(config:object):boolean {

        if(config === this.appear)
            return true

        this.save_files(this.configs.APPEARANCE, config)
        return true
    }
    get_appear():object {
        return this.appear
    }

    set_preference(config:object):boolean {

        if(config === this.preference)
            return true

        this.save_files(this.configs.PREFERENCE, config)
        return true
    }
    get_preference():object {
        return this.preference
    }

    DEV_refresh():Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                this.save_files(this.configs.APPEARANCE, JSON.stringify({"newass":"penis"}))
                this.save_files(this.configs.PREFERENCE, JSON.stringify({"newbutt":"dick"}))
                resolve(true);
            },2000)
        });
    }
}

export {DBHandler}