import { unmountComponentAtNode } from "react-dom";

// prepare DOM element for component rendering
export const prepareDomElement = (container: any) => {
    container = document.createElement("div");
    document.body.appendChild(container);
}
// cleanup DOM Element
export const cleanupDomElement = (container: any) => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
}