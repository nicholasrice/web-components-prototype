// tslint:disable
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./button";
import "./provider";
import "./child";
import Color from "color";
import manageJss, { DesignSystemProvider } from "@microsoft/fast-react-jss-manager";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "fw-provider": any;
            "fw-child": any;
        }
    }
}

interface IProviderProps {
    count: number;
    foreground: string;
    webComponents: boolean;
}

const styles = {
    host: {
        color: (config: any): string => {
            return config.foreground
        }
    }
};

const ReactChild = manageJss(styles)(class extends React.Component<any, any> {
    render() {
        return (
            <span className={ this.props.managedClasses.host }>Sweet child of mine </span>
        )
    }
});


const CHILDREN_COUNT = 2;
const DEPTH = 200;

function parseColor(color: string): string {
    return new Color(color).fade(0.05).hsl().string(); 
}

interface IReactTestProps {
    designSystem: any;
    count: number;
}

class ReactTest extends React.Component<IReactTestProps, {}> {
    renderChildren(): React.ReactNode[] {
        return new Array(CHILDREN_COUNT).fill(0).map((item, index) => {
            return <ReactChild key={ index } />
        });
    }

    renderProvider(): React.ReactNode {
        return (
            <ReactTest count={ this.props.count - 1 } designSystem={ this.designSystem } />
        );
    }

    get designSystem(): any {
        return Object.assign({}, this.props.designSystem, {
            foreground: parseColor(this.props.designSystem.foreground)
        });
    }

    render(): React.ReactNode {
        return (
            <DesignSystemProvider designSystem={ this.props.designSystem }>
            <span>
                { this.renderChildren() }
                { this.props.count > 0 ? this.renderProvider() : null }
            </span>
        </DesignSystemProvider>
    );
}
}

class Provider extends React.Component<IProviderProps, {}> {
private renderProvider(): React.ReactNode {
    return (
            <Provider webComponents={this.props.webComponents} count={ this.props.count - 1 } foreground={ parseColor(this.props.foreground) } />
        );
    }

    private renderChildren(): React.ReactNode[] {
        const El = this.props.webComponents ? "fw-child" : "span";

        return new Array(CHILDREN_COUNT).fill(0).map((item, index) => {
            return <El key={ index }>Sweet child of mine </El>
        });
    }

    public render(): React.ReactNode {
        const El = this.props.webComponents ? "fw-provider" : "span";

        return (
            <El foreground={ this.props.foreground }>
                { this.renderChildren() }
                { this.props.count > 0 ? this.renderProvider() : null }
            </El>
        );
    }
}

class App extends React.Component<{}, any> {
    private tag: string = "fw-button";

    constructor(props: any) {
        super(props);

        this.state = {
            emitted: false,
            color: "#F00"
        };
    }

    public render(): React.ReactNode {
        return (
            <ReactTest count={ DEPTH } designSystem={{ foreground: this.state.color }} />
        );
        // return (
        //     <Provider count={ DEPTH } foreground={ this.state.color } webComponents={ true } />
        // );
    }
}

function render(): void {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}

 render();
