import { Component } from "@angular/core";
import { select, Observable, CompanyAction } from "./../../store";
import { ActivatedRoute } from "@angular/router";
@Component({
    selector: "post-details",
    template: require("./details.html")
})
export class DetailsContainer {
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['company', 'temp']) temp$: Observable<any>;
    
    constructor(private ar: ActivatedRoute, private ca: CompanyAction) {
        this.ar.queryParams.subscribe((query: any) => {
            this.ca.getOnePostByCompany(query.id, query.postId)
        })
    }
}