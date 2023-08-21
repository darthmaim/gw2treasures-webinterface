import * as React from "react";
import { forwardRef } from "react";
const profession = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><circle cx={8} cy={4} r={3.5} stroke="currentColor" /><path fill="currentColor" fillRule="evenodd" d="M7 10H3a1 1 0 0 0-1 1c0 1.35.648 2.302 1.714 2.962.877.543 2.033.877 3.286.993v1.004C3.863 15.695 1 14.166 1 11a2 2 0 0 1 2-2h5a1 1 0 0 0-1 1Z" clipRule="evenodd" /><path stroke="currentColor" strokeLinejoin="round" d="M10.5 10.5h-2v5h7v-5h-2m-3 0v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1m-3 0h3" /></svg>;
const ForwardRef = forwardRef(profession);
export default ForwardRef;