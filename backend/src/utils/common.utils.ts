export class CommonUtils {
    public static getObjectValues<T>(obj: { [key: string]: T }): T[] {
        return Object.keys(obj).map((key) => obj[key]);
    }
}
