import * as React from "react";
import { forwardRef } from "react";
const armorsmith = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><path stroke="currentColor" d="M12 .5H3A1.5 1.5 0 0 0 1.5 2v7.56a1 1 0 0 0 .324.737l5 4.584a1 1 0 0 0 1.352 0l5-4.584a1 1 0 0 0 .324-.737V2A1.5 1.5 0 0 0 12 .5Z" /><path stroke="currentColor" strokeLinecap="round" d="M4.5 4V3a.5.5 0 0 1 .5-.5h4.293a.5.5 0 0 1 .353.146l1 1a.5.5 0 0 1-.353.854H9a.5.5 0 0 0-.5.5v5.5a1 1 0 1 1-2 0V5a.5.5 0 0 0-.5-.5H5a.5.5 0 0 1-.5-.5Z" /></svg>;
const ForwardRef = forwardRef(armorsmith);
export default ForwardRef;