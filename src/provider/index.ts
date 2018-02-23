import { Element as PolymerElement } from "@polymer/polymer/polymer-element.js";

let itr: number = 0;

export default class Provider extends PolymerElement {
    static get updateEvent(): any {
        return {
            bubbles: true,
            composed: true,
            passive: true
        };
    }

    private itr: number;

    constructor() {
        super();

        this.itr = itr++;
    }

    public ready(): void {
        super.ready();

        (this as any).addEventListener("mount", this.handleMount, true);
    }

    private handleMount = (e: CustomEvent): void => {
        e.detail.providers = Object.assign({}, e.detail.providers, { foreground: (this as any).foreground });
    }

    private foregroundChanged = (newValue: string, oldValue: string): void =>  {
        if (newValue !== undefined && oldValue !== undefined) {
            (this as any).dispatchEvent(new CustomEvent("update", Provider.updateEvent));
        }
    }

    static get template(): string {
        return `<slot></slot>`;
    }

    static get properties(): any {
        return {
            foreground: {
                type: String,
                value: "#FFF",
                observer: "foregroundChanged"
            }
        };
    }
}

customElements.define("fw-provider", Provider);
