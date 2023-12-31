import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// TODO add refresh function

@Injectable({
    providedIn: 'root'
})
export class RouterMemory {
    constructor(
        private router : Router,
        private activatedRoute : ActivatedRoute,
    ) {
        // This is needed to make reload on same route working.
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        }
    }

    public previous:any[] = []

    public saved_args: {[route:string]:{[val:string]:any}} = {}

    public navigate(command:any[],args:{[val:string]:any}|undefined=undefined) {
        this.previous.push(this.router.url.replaceAll("%5C","\\"))
        if(args) {
            for (let [k, v] of Object.entries(args)) {
                this.updateArg(k,v)
            }
        }
        this.router.navigate(command)
    }

    public goBack() {
        let route
        try {
            route = this.previous.pop()
            route = route ? route : "/"
        } catch {
            route = "/"
        }
        this.router.navigate([route])
    }

    public retrieveArgs():any {
        return this.saved_args[this.router.url]
    }
    
    public updateArg(key:string,value:any) {
        let r = this.router.url
        if(!this.saved_args[r]) this.saved_args[r] = {}
        this.saved_args[r][key] = value
    }
}
