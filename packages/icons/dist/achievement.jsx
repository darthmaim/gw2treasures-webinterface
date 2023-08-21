import * as React from "react";
import { forwardRef } from "react";
const achievement = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><path stroke="currentColor" strokeLinejoin="round" d="M4.5 2A1.5 1.5 0 0 1 6 .5h4A1.5 1.5 0 0 1 11.5 2v5a3.5 3.5 0 1 1-7 0V2ZM8 10.5v3m-3.167 2h6.334c.184 0 .333-.15.333-.333 0-.92-.746-1.667-1.667-1.667H6.167c-.92 0-1.667.746-1.667 1.667 0 .184.15.333.333.333Zm6.667-13H13a.5.5 0 0 1 .5.5v2A1.5 1.5 0 0 1 12 6.5h-.5v-4Zm-7 0H3a.5.5 0 0 0-.5.5v2A1.5 1.5 0 0 0 4 6.5h.5v-4Z" /></svg>;
const ForwardRef = forwardRef(achievement);
export default ForwardRef;