import { HttpService } from './http';
import { AuthGuardService } from './authGuard';
import { FirebaseService } from './firebase';

export const providers: any[] = [
    HttpService
    , AuthGuardService
    , FirebaseService
]

export {
    HttpService
    , AuthGuardService
    , FirebaseService
}