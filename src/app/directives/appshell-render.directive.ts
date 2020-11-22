import { isPlatformServer } from '@angular/common';
import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({
    selector : "[appShellRender]"
})
export class AppShellRenderDirective implements OnInit {
constructor(@Inject(PLATFORM_ID) private platformid, 
    private templateref : TemplateRef<any>,
    private viewcontainer : ViewContainerRef )   {
    
    
}

    ngOnInit() {
        if (isPlatformServer(this.platformid)) {
            this.viewcontainer.createEmbeddedView(this.templateref);
        }
        else {
            this.viewcontainer.clear();
        }

    }
}