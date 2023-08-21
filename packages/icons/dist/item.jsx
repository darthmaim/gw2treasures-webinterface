import * as React from "react";
import { forwardRef } from "react";
const item = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><path stroke="currentColor" d="M2.316 2.788A1.5 1.5 0 0 1 3.801 1.5h8.398a1.5 1.5 0 0 1 1.485 1.288l.673 4.712.735 5.146a2.5 2.5 0 0 1-2.475 2.854H3.383a2.5 2.5 0 0 1-2.475-2.854l1.408-9.858Z" /><path stroke="currentColor" d="M6.5 7.5H3.949a2 2 0 0 1-1.98-2.283l.347-2.43A1.5 1.5 0 0 1 3.801 1.5h8.398a1.5 1.5 0 0 1 1.485 1.288l.347 2.43a2 2 0 0 1-1.98 2.282H9.5m-3 0V9a1.5 1.5 0 1 0 3 0V7.5m-3 0h3" /></svg>;
const ForwardRef = forwardRef(item);
export default ForwardRef;