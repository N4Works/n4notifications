declare module n4 {
    export interface N4NotificationsService {
        notify(type:string, message:string, primaryButtonText:string, secondaryButtonText?:string, callback?:(selected:string) => void):ng.IPromise<string>;
        notifySuccess(message:string, primaryButtonText?:string, secondaryButtonText?:string, callback?:(selected:string) => void):ng.IPromise<string>;
        notifyInformation(message:string, primaryButtonText?:string, callback?:(selected:string) => void):ng.IPromise<string>;
        notifyAlert(message:string, primaryButtonText?:string, secondaryButtonText?:string, callback?:(selected:string) => void):ng.IPromise<string>;
    }
}
