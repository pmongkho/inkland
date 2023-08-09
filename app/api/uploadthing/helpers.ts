import { generateReactHelpers } from "@uploadthing/react/hooks";
import {OurFileRouter} from './core';
 

 
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();