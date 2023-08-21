import * as React from "react";
import { forwardRef } from "react";
const more = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><circle cx={8} cy={3} r={1.25} fill="currentColor" /><circle cx={8} cy={8} r={1.25} fill="currentColor" /><circle cx={8} cy={13} r={1.25} fill="currentColor" /></svg>;
const ForwardRef = forwardRef(more);
export default ForwardRef;