import * as React from "react";
import * as ReactDOM from "react-dom";
import "./button";
import "./provider";
import "./child";
import Color from "color";

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

// tslint:disable
class Provider extends React.Component<IProviderProps, {}> {
    private renderProvider(): React.ReactNode {
        return (
            <Provider webComponents={this.props.webComponents} count={ this.props.count - 1 } foreground={ new Color(this.props.foreground).fade(0.05).hsl().string() } />
        );
    }

    private renderChildren(): React.ReactNode[] {
        const El = this.props.webComponents ? "fw-child" : "span";

        return new Array(200).fill(0).map((item, index) => {
            return <El key={ index }>Sweet child of mine </El>
        });
    }

                // { this.renderChildren() }
                //<fw-child>Child </fw-child>
            //     { this.props.count > 0 ? this.renderProvider() : null }
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

    componentDidMount() {
        // window.setInterval((): void => {
        //     const color = new Color(this.state.color).mix(new Color("white"), 0.2).hex();
        //     
        //     console.log(color);
        //     this.setState({
        //         color 
        //     });
        // }, 1000)
    }

    public render(): React.ReactNode {
        // return new Array(1000).fill(0).map((item, index) => {
        //     return <span>Child </span>
        // });
        return (
            // <Span count={ 1000 } foreground={ "red" } />
            <Provider count={ 20 } foreground={ this.state.color } webComponents={ true } />
        );
    }
}

function render(): void {

    console.log("render");
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}

 render();
