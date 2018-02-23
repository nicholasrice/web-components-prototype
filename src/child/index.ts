import { Element as PolymerElement } from "@polymer/polymer/polymer-element.js";
import jss from "../jss";

const styles: any = {
    host: {
        color: (config: any): string => {
            return config.foreground;
        }
    }
};

export default class Child extends PolymerElement {
    static get mountEvent(): any {
        return {
            bubbles: true,
            composed: true,
            passive: true,
            detail: {
                providers: {}
            }
        };
    }

    private dynamicStylesheet: any;

    constructor() {
        super();

        this.dynamicStylesheet = jss.createStyleSheet(styles, { linked: true });
    }

    public ready(): void {
        super.ready();

        // Add an event listener for when this component mounts
        (this as any).addEventListener("mount", this.handleMount);

        // Dispatch a mount event - this event will get caught and augmented by all fw-provider
        // elements prior to this element handling the event
        (this as any).dispatchEvent(new CustomEvent("mount", Child.mountEvent));

        // Add a window event listener for changes to fw-provider elements
        window.addEventListener("update", this.handleUpdate, { capture: true });
    }

    private handleMount = (e: CustomEvent): void => {
        e.stopPropagation();

        (this as any).$.style.innerHTML = this.dynamicStylesheet.update(e.detail.providers).toString();
    }

    private handleUpdate = (e: CustomEvent): void => {
        e.stopPropagation();

        if ((e.target as any).contains(this)) {
            (this as any).dispatchEvent(new CustomEvent("mount", Child.mountEvent));
        }
    }

    static get template(): string {
        return `<style id="style"></style><span class$="[[dynamicStylesheet.classes.host]]"><slot></slot></span>`;
    }
}

customElements.define("fw-child", Child);
