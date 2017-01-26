import { Component } from "@angular/core";
import { CompanyAction, select, Observable, StudentAction } from "./../../store";
import { FirebaseService } from "./../../providers/firebase";
import { Router } from "@angular/router";
@Component({
    selector: "dashboard",
    template: require("./dashboard.html"),
    styles: [require("./dashboard.scss")]

})

export class DashboardContainer {
    @select(['company', 'companies']) companies$: Observable<any>;
    @select(['company', 'posts']) posts$: Observable<any>;
    @select(['student', 'students']) students$: Observable<any>;
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['company', 'isLoading']) isLoading$: Observable<any>;
    postKey: string = "";
    isPosted: boolean = false;
    constructor(private router: Router, private ca: CompanyAction, private se: StudentAction, private fb: FirebaseService) {
        this.user$.subscribe((user) => {
            if (Object.keys(user).length > 0) {
                if (user.type === 1) {
                    this.companies$.subscribe((companies) => {
                        if (companies.length == 0) {
                            this.ca.getCompany();
                        }
                    })
                    this.students$.subscribe((students) => {
                        if (students.length == 0) {
                            this.se.getStudentsList();
                        }
                    })
                    this.posts$.subscribe((posts) => {
                        if (posts.length == 0) {
                            this.ca.getPosts();
                        }
                    })
                } else if (user.type === 2) {
                    this.posts$.subscribe((posts) => {
                        if (posts.length == 0) {
                            this.ca.getPostByCompany(user.uid);
                        }
                    })
                } else if (user.type === 3) {
                    this.posts$.subscribe((posts) => {
                        if (posts.length == 0) {
                            this.ca.getPosts();
                        }
                    })
                }
            } else {
                this.router.navigate(['/signin'])
            }
        })
    }
    saveMultipath(multipath: Object) {
        console.log("#00000000000000000000000000000000000000", multipath)
        this.fb.saveMultipath(multipath).then(() => {
            console.log("Save Multipath Data");
            this.isPosted = true;
        }, (err) => {
            console.log("Error: ", err)
        })
    }
    getPostPushKey(event) {
        this.postKey = this.fb.getPushRef("/posts").key;
    }
}