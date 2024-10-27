import { execSync } from 'child_process';

export class GitUtil {
    private static cache: { lastUpdated: number, version?: string, commit?: string } = undefined!;

    public static getLatestVersion() {
        try {
            const data = execSync('git describe --tags --exact-match').toString();
            return data.replace('\n', '');
        } catch {
            return undefined;
        }
    }

    public static getLatestCommit() {
        try {
            const data = execSync('git rev-parse --short HEAD').toString();
            return data.replace('\n', '');
        } catch {
            return undefined;
        }
    }


    public static getData() {
        if (this.cache && (this.cache.lastUpdated - Date.now()) < 30_000) 
            return this.cache;
        
        const data = {
            version: this.getLatestVersion(),
            commit: this.getLatestCommit(),
            lastUpdated: Date.now()
        };

        this.cache = data;
        return data;
    }
}