import { isPlatformServer } from '@angular/common';
import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({
    selector : "[appShellNoRender]"
})
export class AppShellNoRenderDirective implements OnInit {
constructor(@Inject(PLATFORM_ID) private platformid, 
    private templateref : TemplateRef<any>,
    private viewcontainer : ViewContainerRef )   {
    
    
}

    ngOnInit() {
        if (isPlatformServer(this.platformid)) {
            this.viewcontainer.clear();
        }
        else {
            this.viewcontainer.createEmbeddedView(this.templateref);
            
        }

    }
}