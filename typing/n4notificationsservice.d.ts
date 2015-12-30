declare module n4Notifications {
    export interface N4NotificationsService {
        notify(type:string, message:string, primaryButtonText:string, secondaryButtonText?:string, callback?:(selected:string) => void):Promise<string>;
        notifySuccess(message:string, primaryButtonText:string, secondaryButtonText?:string, callback?:(selected:string) => void):Promise<string>;
        notifyInformation(message:string, primaryButtonText:string, callback?:(selected:string) => void):Promise<string>;
        notifyAlert(message:string, primaryButtonText:string, secondaryButtonText?:string, callback?:(selected:string) => void):Promise<string>;
    }
}
