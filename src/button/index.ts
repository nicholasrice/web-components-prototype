import { Element as PolymerElement } from "@polymer/polymer/polymer-element.js";
import ButtonTemplate from "./button.template";
import jss from "../jss";

const styles: any = {
    host: {
        "background-color": (config: any): string => {
            return config.background;
        }
    }
};

export default class FwButton extends PolymerElement {
    protected staticStyle: string;
    private dynamicStylesheet: any;
    private classes: any;
    private red: boolean = false;

    constructor() {
        super();

        this.dynamicStylesheet = jss.createStyleSheet(styles);
        this.classes = this.dynamicStylesheet.classes;
    }

    static get is(): string { return "fw-button"; }

    static get properties(): any {
        return {
            click: {
                type: Function
            }
        };
    }

    public ready(): void {
        super.ready();

        (this as any).$.fwButtonDynamicStyles.innerHTML = this.dynamicStylesheet.toString();
        (this as any).$.fwButtonStaticStyles.innerHTML = this.staticStyle;
    }

    static get template(): string {
        return ButtonTemplate;
    }
}

customElements.define("fw-button", FwButton);
// Design-language specific implementation of skeleton
// export class FwStyledButton extends FwButton {
//     protected staticStyle = `button {
//         border: 1px solid red;
//         width: 200px;
//         background: orange;
//
//     }`;
// }
