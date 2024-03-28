import { generateReactHelpers } from "@uploadthing/react/hooks";

import { type OurFileRouter } from "@/app/api/uploadthing/core";

// Generate React helpers based on the OurFileRouter type
const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

export { useUploadThing, uploadFiles };
