import { PublicClientApplication } from "@azure/msal-browser";

const hostDomain = window.location.origin;
console.log(hostDomain);


const msalConfig = {
    auth: {
        clientId: "8dd8bb98-fc15-4055-a822-8db6a37a206e", // Application (client) ID from Azure AD
        authority: "https://login.microsoftonline.com/cd823f6b-31c5-4241-b504-3707cbc03fb7",
        redirectUri: hostDomain, // Your front-end app URL
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);
